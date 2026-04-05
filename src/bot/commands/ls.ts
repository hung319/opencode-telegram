import fs from "node:fs/promises";
import path from "node:path";
import { CommandContext, Context, InlineKeyboard } from "grammy";
import { getCurrentProject } from "../../settings/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";

const MAX_FILES = 50;

interface FileEntry {
  name: string;
  type: "file" | "directory";
  size?: number;
}

async function listDirectory(dirPath: string, subPath: string = ""): Promise<{ files: FileEntry[]; currentPath: string }> {
  const fullPath = subPath ? path.join(dirPath, subPath) : dirPath;

  try {
    const entries = await fs.readdir(fullPath, { withFileTypes: true });
    const files: FileEntry[] = [];

    for (const entry of entries) {
      if (files.length >= MAX_FILES) break;

      if (entry.name === "." || entry.name === "..") continue;

      const stat = entry.isDirectory()
        ? { isDirectory: () => true, size: 0 }
        : await fs.stat(path.join(fullPath, entry.name));

      files.push({
        name: entry.name,
        type: entry.isDirectory() ? "directory" : "file",
        size: stat.size,
      });
    }

    return { files, currentPath: subPath };
  } catch {
    return { files: [], currentPath: subPath };
  }
}

function formatFileSize(bytes: number): string {
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)}MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${bytes}B`;
}

export async function lsCommand(ctx: CommandContext<Context>): Promise<void> {
  const scope = getScopeFromContext(ctx);
  const scopeKey = getScopeKeyFromContext(ctx);
  const currentProject = getCurrentProject(scopeKey);

  if (!currentProject) {
    await ctx.reply(
      t("ls.no_project"),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  const text = ctx.message?.text ?? "";
  const subPath = text.split(/\s+/).slice(1).join(" ") || "";

  const { files, currentPath } = await listDirectory(currentProject.worktree, subPath);

  if (files.length === 0) {
    await ctx.reply(
      t("ls.empty", { path: currentPath || "/" }),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  const displayPath = currentPath || "/";
  let message = t("ls.header", { path: displayPath, project: currentProject.name || currentProject.id });

  const dirs = files.filter((f) => f.type === "directory");
  const fileEntries = files.filter((f) => f.type === "file");

  for (const dir of dirs) {
    message += `\n📁 ${dir.name}/`;
  }

  for (const file of fileEntries) {
    message += `\n📄 ${file.name} (${formatFileSize(file.size || 0)})`;
  }

  if (files.length >= MAX_FILES) {
    message += `\n\n${t("ls.truncated", { max: MAX_FILES })}`;
  }

  // Build inline keyboard with navigation
  const keyboard = new InlineKeyboard();

  if (currentPath) {
    const parentPath = path.dirname(currentPath);
    keyboard.text("⬆️ ..", `ls:..:${parentPath === "." ? "" : parentPath}`);
    keyboard.row();
  }

  const shownDirs = dirs.slice(0, 9);
  for (const dir of shownDirs) {
    const newPath = currentPath ? path.join(currentPath, dir.name) : dir.name;
    keyboard.text(`📁 ${dir.name}`, `ls:dir:${newPath}`);
    keyboard.row();
  }

  if (keyboard.inline_keyboard.length === 0) {
    keyboard.text(t("ls.no_dirs"), "ls:none");
  }

  await ctx.reply(message, {
    reply_markup: keyboard,
    ...getThreadSendOptions(scope?.threadId ?? null),
  });
}

export async function handleLsCallback(ctx: Context): Promise<boolean> {
  const callbackQuery = ctx.callbackQuery;
  if (!callbackQuery?.data || !callbackQuery.data.startsWith("ls:")) {
    return false;
  }

  const scopeKey = getScopeKeyFromContext(ctx);
  const currentProject = getCurrentProject(scopeKey);

  if (!currentProject) {
    await ctx.answerCallbackQuery({ text: t("ls.no_project") });
    return true;
  }

  const [, action, ...pathParts] = callbackQuery.data.split(":");
  const targetPath = pathParts.join(":");

  try {
    let navigatePath = targetPath || "";

    if (action === "..") {
      navigatePath = targetPath || "";
    } else if (action === "dir") {
      navigatePath = targetPath || "";
    }

    const { files, currentPath } = await listDirectory(currentProject.worktree, navigatePath);

    const displayPath = currentPath || "/";
    let message = t("ls.header", { path: displayPath, project: currentProject.name || currentProject.id });

    const dirs = files.filter((f) => f.type === "directory");
    const fileEntries = files.filter((f) => f.type === "file");

    for (const dir of dirs) {
      message += `\n📁 ${dir.name}/`;
    }

    for (const file of fileEntries) {
      message += `\n📄 ${file.name} (${formatFileSize(file.size || 0)})`;
    }

    const keyboard = new InlineKeyboard();

    if (currentPath) {
      const parentPath = path.dirname(currentPath);
      keyboard.text("⬆️ ..", `ls:..:${parentPath === "." ? "" : parentPath}`);
      keyboard.row();
    }

    const shownDirs = dirs.slice(0, 9);
    for (const dir of shownDirs) {
      const newPath = currentPath ? path.join(currentPath, dir.name) : dir.name;
      keyboard.text(`📁 ${dir.name}`, `ls:dir:${newPath}`);
      keyboard.row();
    }

    await ctx.editMessageText(message, { reply_markup: keyboard });
    await ctx.answerCallbackQuery();
    return true;
  } catch (err) {
    logger.error("[Ls] Error navigating:", err);
    await ctx.answerCallbackQuery({ text: t("ls.error") });
    return true;
  }
}
