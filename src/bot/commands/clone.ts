import { exec } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { CommandContext, Context } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { setCurrentProject } from "../../settings/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";

const execAsync = promisify(exec);

const PROJECTS_DIR = path.join(os.homedir(), "opencode-projects");

async function ensureProjectsDir(): Promise<void> {
  await fs.mkdir(PROJECTS_DIR, { recursive: true });
}

function parseGitUrl(url: string): { host: string; user: string; repo: string } | null {
  const sshMatch = url.match(/^git@([^:]+):([^/]+)\/(.+?)(\.git)?$/);
  if (sshMatch) {
    return { host: sshMatch[1], user: sshMatch[2], repo: sshMatch[3] };
  }

  const httpsMatch = url.match(/^https?:\/\/([^/]+)\/([^/]+)\/(.+?)(\.git)?$/);
  if (httpsMatch) {
    return { host: httpsMatch[1], user: httpsMatch[2], repo: httpsMatch[3] };
  }

  return null;
}

export async function cloneCommand(ctx: CommandContext<Context>): Promise<void> {
  const scope = getScopeFromContext(ctx);
  const scopeKey = getScopeKeyFromContext(ctx);
  const text = ctx.message?.text ?? "";
  const args = text.split(/\s+/).slice(1);
  const gitUrl = args[0];

  if (!gitUrl) {
    await ctx.reply(
      t("clone.usage"),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  const parsed = parseGitUrl(gitUrl);
  if (!parsed) {
    await ctx.reply(
      t("clone.invalid_url"),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  await ensureProjectsDir();

  const projectDir = path.join(PROJECTS_DIR, parsed.repo);
  const statusMsg = await ctx.reply(t("clone.cloning", { repo: parsed.repo }));

  try {
    await execAsync(`git clone "${gitUrl}" "${projectDir}"`);

    const { data: projects } = await opencodeClient.project.list();
    const existingProject = projects?.find(
      (p: { worktree?: string }) => p.worktree === projectDir,
    );

    if (existingProject) {
      const projectInfo = {
        id: (existingProject as { id: string }).id,
        worktree: projectDir,
        name: parsed.repo,
      };
      setCurrentProject(projectInfo, scopeKey);
    }

    await ctx.api.editMessageText(
      ctx.chat!.id,
      statusMsg.message_id,
      t("clone.success", { repo: parsed.repo, path: projectDir }),
    );

    logger.info(`[Clone] Cloned ${gitUrl} to ${projectDir}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    await ctx.api.editMessageText(
      ctx.chat!.id,
      statusMsg.message_id,
      t("clone.error", { message: errorMessage }),
    );
    logger.error("[Clone] Failed to clone:", error);
  }
}
