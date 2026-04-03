import { exec } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { CommandContext, Context } from "grammy";
import { getScopeFromContext, getThreadSendOptions } from "../scope.js";
import { t } from "../../i18n/index.js";

const execAsync = promisify(exec);

interface SshUrlParts {
  username: string;
  host: string;
  repo: string;
}

interface SshKeyEntry {
  username: string;
  keyPath: string;
}

function parseSshUrl(url: string): SshUrlParts | null {
  const match = url.match(/^git@([^:]+):([^/]+)\/(.+?)(\.git)?$/i);
  if (!match) {
    return null;
  }

  return {
    username: match[2],
    host: match[1],
    repo: match[3],
  };
}

async function findSshKeys(): Promise<string[]> {
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

function parseExistingHosts(config: string): Map<string, SshKeyEntry> {
  const hosts = new Map<string, SshKeyEntry>();
  const lines = config.split("\n");
  let currentHost: string | null = null;
  let currentKeyPath: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const hostMatch = trimmed.match(/^Host\s+(.+)$/i);
    if (hostMatch) {
      if (currentHost && currentKeyPath) {
        hosts.set(currentHost, { username: currentHost, keyPath: currentKeyPath });
      }
      currentHost = hostMatch[1];
      currentKeyPath = null;
      continue;
    }

    const keyMatch = trimmed.match(/^IdentityFile\s+(.+)$/i);
    if (keyMatch) {
      currentKeyPath = keyMatch[1].replace(/"/g, "");
    }
  }

  if (currentHost && currentKeyPath) {
    hosts.set(currentHost, { username: currentHost, keyPath: currentKeyPath });
  }

  return hosts;
}

async function addSshHost(host: string, username: string, keyPath: string): Promise<void> {
  const config = await readSshConfig();
  const existingHosts = parseExistingHosts(config);

  if (existingHosts.has(host)) {
    throw new Error(`Host "${host}" already exists in SSH config`);
  }

  const newEntry = `\nHost ${host}\n  HostName ${host}\n  User ${username}\n  IdentityFile ${keyPath}\n  IdentitiesOnly yes\n`;

  const updatedConfig = config.trimEnd() + newEntry;
  await writeSshConfig(updatedConfig);
}

async function testSshConnection(host: string): Promise<boolean> {
  try {
    const { stdout } = await execAsync(`ssh -T -o StrictHostKeyChecking=no -o ConnectTimeout=5 git@${host} 2>&1`);
    return stdout.includes("successfully authenticated") || stdout.includes("Hi ") || stdout.includes("logged in");
  } catch {
    return false;
  }
}

export async function sshCommand(ctx: CommandContext<Context>): Promise<void> {
  const scope = getScopeFromContext(ctx);
  const text = ctx.message?.text ?? "";

  const parts = text.split(/\s+/);
  const sshUrl = parts[1];

  if (!sshUrl) {
    const keys = await findSshKeys();
    const config = await readSshConfig();
    const existingHosts = parseExistingHosts(config);

    let message = t("ssh.usage");

    if (keys.length > 0) {
      message += "\n\n" + t("ssh.available_keys", { count: keys.length });
      for (const key of keys.slice(0, 5)) {
        message += `\n  • ${key}`;
      }
      if (keys.length > 5) {
        message += `\n  ... and ${keys.length - 5} more`;
      }
    }

    if (existingHosts.size > 0) {
      message += "\n\n" + t("ssh.configured_hosts", { count: existingHosts.size });
      for (const [host, entry] of existingHosts) {
        message += `\n  • ${host} → ${entry.keyPath}`;
      }
    }

    await ctx.reply(message, getThreadSendOptions(scope?.threadId ?? null));
    return;
  }

  const parsed = parseSshUrl(sshUrl);
  if (!parsed) {
    await ctx.reply(
      t("ssh.invalid_url"),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  const keys = await findSshKeys();
  const config = await readSshConfig();
  const existingHosts = parseExistingHosts(config);

  const hostKey = `${parsed.host}-${parsed.username}`;

  if (existingHosts.has(hostKey)) {
    const entry = existingHosts.get(hostKey)!;
    await ctx.reply(
      t("ssh.already_configured", { host: hostKey, keyPath: entry.keyPath }),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  if (keys.length === 0) {
    await ctx.reply(
      t("ssh.no_keys_found"),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  try {
    await addSshHost(hostKey, parsed.username, keys[0]);

    const isConnected = await testSshConnection(hostKey);

    if (isConnected) {
      await ctx.reply(
        t("ssh.configured_success", { host: hostKey, keyPath: keys[0] }),
        getThreadSendOptions(scope?.threadId ?? null),
      );
    } else {
      await ctx.reply(
        t("ssh.configured_test_failed", { host: hostKey, keyPath: keys[0] }),
        getThreadSendOptions(scope?.threadId ?? null),
      );
    }
  } catch (error) {
    await ctx.reply(
      t("ssh.error", { message: (error as Error).message }),
      getThreadSendOptions(scope?.threadId ?? null),
    );
  }
}
