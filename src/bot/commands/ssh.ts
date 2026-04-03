import { exec } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { CommandContext, Context } from "grammy";
import { getScopeFromContext, getThreadSendOptions } from "../scope.js";
import { t } from "../../i18n/index.js";

const execAsync = promisify(exec);

const SUPPORTED_HOSTS = ["github.com", "gitlab.com", "bitbucket.org"] as const;
type SupportedHost = (typeof SUPPORTED_HOSTS)[number];

interface SshMapping {
  user: string;
  keyName: string;
  keyPath: string;
  host: string;
}

function getHostAlias(host: string, user: string): string {
  return `${host}-${user}`;
}

function isSupportedHost(host: string): boolean {
  return SUPPORTED_HOSTS.includes(host as SupportedHost);
}

async function findExistingKeys(): Promise<string[]> {
  const sshDir = path.join(os.homedir(), ".ssh");

  try {
    const entries = await fs.readdir(sshDir);
    return entries
      .filter((name) => {
        return (
          !name.endsWith(".pub") &&
          !name.endsWith(".old") &&
          !name.includes("known_hosts") &&
          !name.includes("config")
        );
      })
      .map((name) => path.join(sshDir, name));
  } catch {
    return [];
  }
}

async function readSshConfig(): Promise<string> {
  const sshConfigPath = path.join(os.homedir(), ".ssh", "config");

  try {
    return await fs.readFile(sshConfigPath, "utf-8");
  } catch {
    return "";
  }
}

async function writeSshConfig(content: string): Promise<void> {
  const sshDir = path.join(os.homedir(), ".ssh");
  const sshConfigPath = path.join(sshDir, "config");

  try {
    await fs.mkdir(sshDir, { mode: 0o700, recursive: true });
    await fs.writeFile(sshConfigPath, content, { mode: 0o600 });
  } catch (error) {
    throw new Error(`Failed to write SSH config: ${(error as Error).message}`);
  }
}

async function savePrivateKey(keyName: string, content: string): Promise<string> {
  const sshDir = path.join(os.homedir(), ".ssh");
  const keyPath = path.join(sshDir, keyName);

  await fs.mkdir(sshDir, { mode: 0o700, recursive: true });
  await fs.writeFile(keyPath, content, { mode: 0o600 });

  return keyPath;
}

function parseExistingMappings(config: string): SshMapping[] {
  const mappings: SshMapping[] = [];
  const lines = config.split("\n");
  let currentHost: string | null = null;
  let currentUser: string | null = null;
  let currentKeyPath: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const hostMatch = trimmed.match(/^Host\s+(.+)$/i);
    if (hostMatch) {
      if (currentHost && currentHost.includes("-") && currentUser && currentKeyPath) {
        const parts = currentHost.split("-");
        const host = parts.slice(0, -1).join("-");
        const user = parts[parts.length - 1];
        const keyName = path.basename(currentKeyPath);
        mappings.push({ user, keyName, keyPath: currentKeyPath, host });
      }
      currentHost = hostMatch[1];
      currentUser = null;
      currentKeyPath = null;
      continue;
    }

    const userMatch = trimmed.match(/^User\s+(.+)$/i);
    if (userMatch) {
      currentUser = userMatch[1];
    }

    const keyMatch = trimmed.match(/^IdentityFile\s+(.+)$/i);
    if (keyMatch) {
      currentKeyPath = keyMatch[1].replace(/"/g, "");
    }
  }

  if (currentHost && currentHost.includes("-") && currentUser && currentKeyPath) {
    const parts = currentHost.split("-");
    const host = parts.slice(0, -1).join("-");
    const user = parts[parts.length - 1];
    const keyName = path.basename(currentKeyPath);
    mappings.push({ user, keyName, keyPath: currentKeyPath, host });
  }

  return mappings;
}

async function addSshMapping(user: string, keyName: string, keyContent: string, host: string): Promise<{ hostAlias: string; keyPath: string }> {
  const config = await readSshConfig();
  const existing = parseExistingMappings(config);
  const hostAlias = getHostAlias(host, user);

  const alreadyExists = existing.some(
    (m) => m.host === host && m.user === user,
  );

  if (alreadyExists) {
    throw new Error(`Mapping for ${user}@${host} already exists. Use /ssh remove ${host} ${user} first.`);
  }

  const keyPath = await savePrivateKey(keyName, keyContent);

  const newEntry = `\nHost ${hostAlias}\n  HostName ${host}\n  User git\n  IdentityFile ${keyPath}\n  IdentitiesOnly yes\n`;

  const updatedConfig = config.trimEnd() + newEntry;
  await writeSshConfig(updatedConfig);

  await configureGitUrlRewrite(host, user, hostAlias, true);

  return { hostAlias, keyPath };
}

async function removeSshMapping(host: string, user: string): Promise<void> {
  const config = await readSshConfig();
  const hostAlias = getHostAlias(host, user);
  const lines = config.split("\n");
  const filtered: string[] = [];
  let skipBlock = false;
  let inTargetBlock = false;
  let keyPathToDelete: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("Host ") && trimmed.includes(hostAlias)) {
      skipBlock = true;
      inTargetBlock = true;
      continue;
    }

    if (skipBlock && inTargetBlock) {
      const keyMatch = trimmed.match(/^IdentityFile\s+(.+)$/i);
      if (keyMatch) {
        keyPathToDelete = keyMatch[1].replace(/"/g, "");
      }

      if (trimmed.startsWith("Host ") || (trimmed.length > 0 && !trimmed.startsWith("#") && !/^\s/.test(line))) {
        skipBlock = false;
        inTargetBlock = false;
        filtered.push(line);
      }
      continue;
    }

    filtered.push(line);
  }

  await writeSshConfig(filtered.join("\n"));

  if (keyPathToDelete) {
    try {
      await fs.unlink(keyPathToDelete);
    } catch {
      // Key file might not exist, ignore
    }
  }

  await configureGitUrlRewrite(host, user, hostAlias, false);
}

async function configureGitUrlRewrite(
  host: string,
  user: string,
  hostAlias: string,
  add: boolean,
): Promise<void> {
  const fromUrl = `git@${host}:${user}/`;
  const toUrl = `git@${hostAlias}:`;

  if (add) {
    try {
      await execAsync(`git config --global url."${toUrl}".insteadOf "${fromUrl}"`);
    } catch {
      // git might not be installed, which is ok
    }
  } else {
    try {
      await execAsync(`git config --global --unset url."${toUrl}".insteadOf`);
    } catch {
      // ignore
    }
  }
}

async function getGitUrlRewrites(): Promise<Map<string, string>> {
  const rewrites = new Map<string, string>();

  try {
    const { stdout } = await execAsync("git config --global --get-regexp url\\..*\\.insteadOf 2>/dev/null");
    for (const line of stdout.trim().split("\n").filter(Boolean)) {
      const match = line.match(/^url\."(.+)"\.insteadOf\s+(.+)$/);
      if (match) {
        rewrites.set(match[2], match[1]);
      }
    }
  } catch {
    // ignore
  }

  return rewrites;
}

export async function sshCommand(ctx: CommandContext<Context>): Promise<void> {
  const scope = getScopeFromContext(ctx);
  const text = ctx.message?.text ?? "";
  const parts = text.split(/\s+/).filter(Boolean);

  const subcommand = parts[1]?.toLowerCase();

  if (!subcommand || subcommand === "list" || subcommand === "ls") {
    await handleSshList(ctx, scope);
    return;
  }

  if (subcommand === "add") {
    const user = parts[2];
    const host = parts[3];

    if (!user || !host) {
      await ctx.reply(
        t("ssh.add_usage"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const addMarker = `/ssh add ${user} ${host}`;
    const keyContent = text.slice(text.indexOf(addMarker) + addMarker.length).trim();

    if (!keyContent) {
      await ctx.reply(
        t("ssh.add_usage"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    if (!isSupportedHost(host)) {
      await ctx.reply(
        t("ssh.unsupported_host", { host, supported: SUPPORTED_HOSTS.join(", ") }),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    await handleSshAdd(ctx, scope, user, host, keyContent);
    return;
  }

  if (subcommand === "remove" || subcommand === "rm") {
    const host = parts[2];
    const user = parts[3];

    if (!host || !user) {
      await ctx.reply(
        t("ssh.remove_usage"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    await handleSshRemove(ctx, scope, host, user);
    return;
  }

  await ctx.reply(
    t("ssh.usage"),
    getThreadSendOptions(scope?.threadId ?? null),
  );
}

async function handleSshList(
  ctx: CommandContext<Context>,
  scope: ReturnType<typeof getScopeFromContext>,
): Promise<void> {
  const config = await readSshConfig();
  const mappings = parseExistingMappings(config);
  const rewrites = await getGitUrlRewrites();
  const keys = await findExistingKeys();

  let message = t("ssh.list_header");

  if (mappings.length === 0) {
    message += "\n\n" + t("ssh.no_mappings");
  } else {
    for (const mapping of mappings) {
      const hostAlias = getHostAlias(mapping.host, mapping.user);
      const rewriteActive = rewrites.has(`git@${mapping.host}:${mapping.user}/`);
      const status = rewriteActive ? "✅" : "⚠️";
      message += `\n${status} **${mapping.user}@${mapping.host}**`;
      message += `\n   Alias: ${hostAlias}`;
      message += `\n   Key: ${mapping.keyName}`;
    }
  }

  if (keys.length > 0) {
    message += "\n\n" + t("ssh.available_keys", { count: keys.length });
    for (const key of keys.slice(0, 5)) {
      message += `\n  • ${path.basename(key)}`;
    }
    if (keys.length > 5) {
      message += `\n  ... +${keys.length - 5}`;
    }
  }

  await ctx.reply(message, getThreadSendOptions(scope?.threadId ?? null));
}

async function handleSshAdd(
  ctx: CommandContext<Context>,
  scope: ReturnType<typeof getScopeFromContext>,
  user: string,
  host: string,
  keyContent: string,
): Promise<void> {
  const decodedKey = keyContent.replace(/\\n/g, "\n");

  if (!decodedKey.includes("BEGIN") || !decodedKey.includes("PRIVATE KEY")) {
    await ctx.reply(
      t("ssh.invalid_key"),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  const keyName = `${host}-${user}`;

  try {
    const { hostAlias } = await addSshMapping(user, keyName, decodedKey, host);

    await ctx.reply(
      t("ssh.added_success", { user, host, hostAlias, keyName }),
      getThreadSendOptions(scope?.threadId ?? null),
    );
  } catch (error) {
    await ctx.reply(
      t("ssh.add_error", { message: (error as Error).message }),
      getThreadSendOptions(scope?.threadId ?? null),
    );
  }
}

async function handleSshRemove(
  ctx: CommandContext<Context>,
  scope: ReturnType<typeof getScopeFromContext>,
  host: string,
  user: string,
): Promise<void> {
  const config = await readSshConfig();
  const mappings = parseExistingMappings(config);
  const exists = mappings.some((m) => m.host === host && m.user === user);

  if (!exists) {
    await ctx.reply(
      t("ssh.not_found", { user, host }),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  try {
    await removeSshMapping(host, user);
    await ctx.reply(
      t("ssh.removed_success", { user, host }),
      getThreadSendOptions(scope?.threadId ?? null),
    );
  } catch (error) {
    await ctx.reply(
      t("ssh.remove_error", { message: (error as Error).message }),
      getThreadSendOptions(scope?.threadId ?? null),
    );
  }
}
