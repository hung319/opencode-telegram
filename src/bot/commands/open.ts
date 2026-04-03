import { exec } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import path from "node:path";
import { CommandContext, Context } from "grammy";
import { getCurrentProject } from "../../settings/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getThreadSendOptions } from "../scope.js";

const execAsync = promisify(exec);
const MAX_FILE_SIZE = 50 * 1024; // 50KB

export async function openCommand(ctx: CommandContext<Context>): Promise<void> {
  const scope = getScopeFromContext(ctx);
  const currentProject = getCurrentProject(getScopeFromContext(ctx)?.key ?? "global");

  if (!currentProject) {
    await ctx.reply(
      t("open.no_project"),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  const text = ctx.message?.text ?? "";
  const filePath = text.split(/\s+/).slice(1).join(" ");

  if (!filePath) {
    await ctx.reply(
      t("open.usage"),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  const fullPath = path.join(currentProject.worktree, filePath);

  try {
    const stat = await fs.stat(fullPath);

    if (!stat.isFile()) {
      await ctx.reply(
        t("open.not_found", { path: filePath }),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    if (stat.size > MAX_FILE_SIZE) {
      await ctx.reply(
        t("open.too_large", {
          path: filePath,
          size: formatFileSize(stat.size),
          max: formatFileSize(MAX_FILE_SIZE),
        }),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const content = await fs.readFile(fullPath, "utf-8");
    const lang = getLanguageFromExtension(filePath);
    const message = t("open.header", { path: filePath }) + `\`\`\`${lang}\n${content}\n\`\`\``;

    await ctx.reply(message, {
      parse_mode: "Markdown",
      ...getThreadSendOptions(scope?.threadId ?? null),
    });
  } catch (error) {
    await ctx.reply(
      t("open.not_found", { path: filePath }),
      getThreadSendOptions(scope?.threadId ?? null),
    );
  }
}

function formatFileSize(bytes: number): string {
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)}MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${bytes}B`;
}

function getLanguageFromExtension(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const langMap: Record<string, string> = {
    ".ts": "typescript",
    ".tsx": "typescript",
    ".js": "javascript",
    ".jsx": "javascript",
    ".py": "python",
    ".go": "go",
    ".rs": "rust",
    ".java": "java",
    ".rb": "ruby",
    ".php": "php",
    ".sh": "bash",
    ".bash": "bash",
    ".zsh": "bash",
    ".json": "json",
    ".yaml": "yaml",
    ".yml": "yaml",
    ".toml": "toml",
    ".md": "markdown",
    ".html": "html",
    ".css": "css",
    ".sql": "sql",
    ".xml": "xml",
    ".dockerfile": "dockerfile",
  };

  const basename = path.basename(filePath).toLowerCase();
  if (basename === "dockerfile") return "dockerfile";
  if (basename === "makefile") return "makefile";

  return langMap[ext] || "";
}
