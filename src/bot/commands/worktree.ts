import { exec } from "node:child_process";
import { promisify } from "node:util";
import { CommandContext, Context, InlineKeyboard } from "grammy";
import { getCurrentProject } from "../../settings/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";

const execAsync = promisify(exec);

interface WorktreeInfo {
  path: string;
  branch: string;
  isCurrent: boolean;
}

async function listWorktrees(projectDir: string): Promise<WorktreeInfo[]> {
  try {
    const { stdout } = await execAsync(`cd "${projectDir}" && git worktree list --porcelain`);
    const worktrees: WorktreeInfo[] = [];
    let current: Partial<WorktreeInfo> = {};

    for (const line of stdout.trim().split("\n")) {
      if (line.startsWith("worktree ")) {
        if (current.path) {
          worktrees.push(current as WorktreeInfo);
        }
        current = { path: line.slice(9).trim(), isCurrent: false };
      } else if (line.startsWith("branch ") && current.path) {
        current.branch = line.slice(7).trim().replace(/^refs\/heads\//, "");
      } else if (line.startsWith("HEAD") && current.path) {
        const headRef = line.slice(5).trim();
        if (headRef === projectDir) {
          current.isCurrent = true;
        }
      }
    }

    if (current.path) {
      worktrees.push(current as WorktreeInfo);
    }

    return worktrees;
  } catch {
    return [];
  }
}

export async function worktreeCommand(ctx: CommandContext<Context>): Promise<void> {
  const scope = getScopeFromContext(ctx);
  const scopeKey = getScopeKeyFromContext(ctx);
  const currentProject = getCurrentProject(scopeKey);
  const text = ctx.message?.text ?? "";
  const args = text.split(/\s+/).slice(1);
  const subcommand = args[0]?.toLowerCase();

  if (!currentProject) {
    await ctx.reply(
      t("worktree.no_project"),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  if (!subcommand || subcommand === "list" || subcommand === "ls") {
    await handleWorktreeList(ctx, scope, currentProject.worktree);
    return;
  }

  if (subcommand === "create" || subcommand === "add") {
    const branch = args[1];
    if (!branch) {
      await ctx.reply(
        t("worktree.create_usage"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }
    await handleWorktreeCreate(ctx, scope, scopeKey, currentProject.worktree, branch);
    return;
  }

  await ctx.reply(
    t("worktree.usage"),
    getThreadSendOptions(scope?.threadId ?? null),
  );
}

async function handleWorktreeList(
  ctx: CommandContext<Context>,
  scope: ReturnType<typeof getScopeFromContext>,
  projectDir: string,
): Promise<void> {
  const worktrees = await listWorktrees(projectDir);

  if (worktrees.length === 0) {
    await ctx.reply(
      t("worktree.no_worktrees"),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  let message = t("worktree.list_header");
  for (const wt of worktrees) {
    const status = wt.isCurrent ? "📍" : "🌿";
    message += `\n${status} **${wt.branch}** → \`${wt.path}\``;
  }

  const keyboard = new InlineKeyboard();
  for (const wt of worktrees) {
    if (!wt.isCurrent) {
      keyboard.text(`🌿 ${wt.branch}`, `worktree:switch:${wt.branch}`);
      keyboard.row();
    }
  }

  await ctx.reply(message, {
    parse_mode: "Markdown",
    reply_markup: keyboard.inline_keyboard.length > 0 ? keyboard : undefined,
    ...getThreadSendOptions(scope?.threadId ?? null),
  });
}

async function handleWorktreeCreate(
  ctx: CommandContext<Context>,
  scope: ReturnType<typeof getScopeFromContext>,
  scopeKey: string,
  projectDir: string,
  branch: string,
): Promise<void> {
  const worktreesDir = `${projectDir}-worktrees`;
  const worktreePath = `${worktreesDir}/${branch}`;

  try {
    await execAsync(`mkdir -p "${worktreesDir}"`);
    await execAsync(`cd "${projectDir}" && git worktree add "${worktreePath}" "${branch}" 2>/dev/null || git worktree add "${worktreePath}" -b "${branch}"`);

    await ctx.reply(
      t("worktree.created", { branch, path: worktreePath }),
      getThreadSendOptions(scope?.threadId ?? null),
    );

    logger.info(`[Worktree] Created worktree for ${branch} at ${worktreePath}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    await ctx.reply(
      t("worktree.error", { message: errorMessage }),
      getThreadSendOptions(scope?.threadId ?? null),
    );
  }
}

export async function handleWorktreeCallback(ctx: Context): Promise<boolean> {
  const callbackQuery = ctx.callbackQuery;
  if (!callbackQuery?.data || !callbackQuery.data.startsWith("worktree:")) {
    return false;
  }

  const [, action, branch] = callbackQuery.data.split(":");
  const scopeKey = getScopeKeyFromContext(ctx);
  const currentProject = getCurrentProject(scopeKey);

  if (!currentProject) {
    await ctx.answerCallbackQuery({ text: t("worktree.no_project") });
    return true;
  }

  if (action === "switch" && branch) {
    try {
      await ctx.answerCallbackQuery({ text: t("worktree.switching", { branch }) });
      await execAsync(`cd "${currentProject.worktree}" && git checkout "${branch}"`);
      await ctx.reply(t("worktree.switched", { branch }));
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      await ctx.answerCallbackQuery({ text: t("worktree.error", { message: errorMessage }) });
      return true;
    }
  }

  return false;
}
