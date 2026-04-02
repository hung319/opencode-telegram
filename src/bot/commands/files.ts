import { CommandContext, Context, InlineKeyboard } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { getCurrentSession } from "../../session/manager.js";
import { interactionManager } from "../../interaction/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";
import { splitLongMessage } from "../utils/message-splitter.js";

const FILES_CALLBACK_PREFIX = "files:";
const FILES_PAGE_SIZE = 10;

export async function filesCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    const scope = getScopeFromContext(ctx);
    const scopeKey = getScopeKeyFromContext(ctx);
    const currentSession = getCurrentSession(scopeKey);

    if (!currentSession) {
      await ctx.reply("⚠️ No active session. Create or select a session first.", getThreadSendOptions(scope?.threadId ?? null));
      return;
    }

    await showDirectory(ctx, currentSession.directory, "", 0);
  } catch (error) {
    logger.error("[FilesCommand] Error:", error);
    await ctx.reply(
      t("files.list_error", { path: "/" }),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}

async function showDirectory(
  ctx: Context,
  directory: string,
  subPath: string,
  page: number,
): Promise<void> {
  const scopeKey = getScopeKeyFromContext(ctx);

  const { data: files, error } = await opencodeClient.file.list({
    path: subPath || ".",
    directory,
  });

  if (error || !files) {
    await ctx.reply(
      t("files.list_error", { path: subPath || "/" }),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
    return;
  }

  const fileItems = Array.isArray(files) ? files : [];
  const displayPath = subPath || "/";

  const dirs = fileItems.filter((f) => (f as unknown as { isDir?: boolean }).isDir);
  const regularFiles = fileItems.filter((f) => !(f as unknown as { isDir?: boolean }).isDir);

  const allItems = [...dirs, ...regularFiles];
  const totalPages = Math.ceil(allItems.length / FILES_PAGE_SIZE) || 1;
  const currentPage = Math.min(Math.max(0, page), totalPages - 1);
  const start = currentPage * FILES_PAGE_SIZE;
  const end = start + FILES_PAGE_SIZE;
  const pageItems = allItems.slice(start, end);

  let text = t("files.path_indicator", { path: displayPath }) + "\n\n";

  if (pageItems.length === 0) {
    text += "📭 Empty directory.";
  } else {
    for (const item of pageItems) {
      const name = (item as { name?: string }).name || "unknown";
      if ((item as { isDir?: boolean }).isDir) {
        text += t("files.directory", { name }) + "\n";
      } else {
        text += t("files.file", { name }) + "\n";
      }
    }
  }

  if (totalPages > 1) {
    text += `\n${t("messages.page_indicator", { current: currentPage + 1, total: totalPages })}`;
  }

  const keyboard = new InlineKeyboard();

  for (const item of pageItems) {
    const name = (item as { name?: string }).name || "unknown";
    const isDir = (item as { isDir?: boolean }).isDir;
    const newPath = subPath ? `${subPath}/${name}` : name;
    const encodedPath = encodeURIComponent(newPath);

    if (isDir) {
      keyboard.text(`📂 ${name}`, `${FILES_CALLBACK_PREFIX}dir:${encodedPath}:0`);
    } else {
      keyboard.text(`📄 ${name}`, `${FILES_CALLBACK_PREFIX}file:${encodedPath}`);
    }
    keyboard.row();
  }

  if (totalPages > 1) {
    if (currentPage > 0) {
      keyboard.text(t("messages.button.prev_page"), `${FILES_CALLBACK_PREFIX}page:${encodeURIComponent(subPath)}:${currentPage - 1}`);
    }
    if (currentPage < totalPages - 1) {
      keyboard.text(t("messages.button.next_page"), `${FILES_CALLBACK_PREFIX}page:${encodeURIComponent(subPath)}:${currentPage + 1}`);
    }
    keyboard.row();
  }

  if (subPath) {
    const parentPath = subPath.includes("/")
      ? subPath.substring(0, subPath.lastIndexOf("/"))
      : "";
    keyboard.text(t("files.back"), `${FILES_CALLBACK_PREFIX}dir:${encodeURIComponent(parentPath)}:0`);
  }

  const message = await ctx.reply(text, {
    reply_markup: keyboard,
    ...getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
  });

  interactionManager.start(
    {
      kind: "inline",
      expectedInput: "callback",
      metadata: {
        menuKind: "files",
        messageId: message.message_id,
        directory,
      },
    },
    scopeKey,
  );
}

export async function handleFilesCallback(ctx: Context): Promise<boolean> {
  const data = ctx.callbackQuery?.data;
  if (!data || !data.startsWith(FILES_CALLBACK_PREFIX)) {
    return false;
  }

  const scopeKey = getScopeKeyFromContext(ctx);
  const interactionState = interactionManager.getSnapshot(scopeKey);

  if (
    interactionState?.kind !== "inline" ||
    interactionState.metadata.menuKind !== "files"
  ) {
    await ctx.answerCallbackQuery({ text: t("inline.inactive_callback"), show_alert: true });
    return true;
  }

  await ctx.answerCallbackQuery();
  await ctx.deleteMessage().catch(() => {});

  const directory = interactionState.metadata.directory as string;
  const parts = data.slice(FILES_CALLBACK_PREFIX.length).split(":");
  const action = parts[0];

  try {
    if (action === "dir") {
      const subPath = decodeURIComponent(parts[1]);
      const page = parseInt(parts[2] || "0", 10);
      await showDirectory(ctx, directory, subPath, page);
    } else if (action === "file") {
      const filePath = decodeURIComponent(parts[1]);
      const { data: content, error } = await opencodeClient.file.read({
        path: filePath,
        directory,
      });

      if (error || !content) {
        await ctx.reply(
          t("files.read_error", { path: filePath }),
          getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
        );
        return true;
      }

      const contentStr = typeof content === "string" ? content : JSON.stringify(content);
      const fullContent = t("files.file_content", { path: filePath, content: contentStr });
      const chunks = splitLongMessage(fullContent);

      for (const chunk of chunks) {
        await ctx.reply(chunk, {
          parse_mode: "HTML",
          ...getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
        });
      }
    } else if (action === "page") {
      const subPath = decodeURIComponent(parts[1]);
      const page = parseInt(parts[2] || "0", 10);
      await showDirectory(ctx, directory, subPath, page);
    }
  } catch (error) {
    logger.error("[FilesHandler] Error:", error);
    await ctx.reply(
      t("files.read_error", { path: parts[1] || "unknown" }),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }

  return true;
}
