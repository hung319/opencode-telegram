import { CommandContext, Context, InlineKeyboard } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { getCurrentSession } from "../../session/manager.js";
import { interactionManager } from "../../interaction/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";

const MESSAGES_CALLBACK_PREFIX = "messages:";
const MESSAGES_PAGE_SIZE = 10;

export async function messagesCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    const scope = getScopeFromContext(ctx);
    const scopeKey = getScopeKeyFromContext(ctx);
    const currentSession = getCurrentSession(scopeKey);

    if (!currentSession) {
      await ctx.reply(t("messages.no_session"), getThreadSendOptions(scope?.threadId ?? null));
      return;
    }

    await showMessagesPage(ctx, currentSession.id, currentSession.directory, 0);
  } catch (error) {
    logger.error("[MessagesCommand] Error:", error);
    await ctx.reply(
      t("messages.fetch_error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}

async function showMessagesPage(
  ctx: Context,
  sessionId: string,
  directory: string,
  page: number,
): Promise<void> {
  const scopeKey = getScopeKeyFromContext(ctx);

  const { data: messages, error } = await opencodeClient.session.messages({
    sessionID: sessionId,
    directory,
    limit: 100,
  });

  if (error || !messages || !Array.isArray(messages)) {
    await ctx.reply(
      t("messages.fetch_error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
    return;
  }

  const visibleMessages = (messages as unknown as Array<{ info?: { role?: string; summary?: string } }>).filter(
    (m) => m.info?.role === "user" || m.info?.role === "assistant",
  );

  if (visibleMessages.length === 0) {
    await ctx.reply(
      t("messages.empty"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
    return;
  }

  const totalPages = Math.ceil(visibleMessages.length / MESSAGES_PAGE_SIZE) || 1;
  const currentPage = Math.min(Math.max(0, page), totalPages - 1);
  const start = currentPage * MESSAGES_PAGE_SIZE;
  const end = start + MESSAGES_PAGE_SIZE;
  const pageMessages = visibleMessages.slice(start, end);

  const sessionTitle = getCurrentSession(scopeKey)?.title || t("pinned.default_session_title");
  let text = t("messages.title", { title: sessionTitle }) + "\n\n";

  for (const msg of pageMessages) {
    const role = (msg as { role?: string }).role;
    const summary = (msg as { summary?: string }).summary;
    const preview = summary || "(no content)";
    const truncatedPreview = preview.length > 200
      ? `${preview.slice(0, 197)}...`
      : preview;

    if (role === "user") {
      text += t("messages.user", { text: truncatedPreview }) + "\n\n";
    } else {
      text += t("messages.assistant", { text: truncatedPreview }) + "\n\n";
    }
  }

  if (totalPages > 1) {
    text += t("messages.page_indicator", { current: currentPage + 1, total: totalPages });
  }

  const keyboard = new InlineKeyboard();

  if (totalPages > 1) {
    if (currentPage > 0) {
      keyboard.text(t("messages.button.prev_page"), `${MESSAGES_CALLBACK_PREFIX}page:${currentPage - 1}`);
    }
    if (currentPage < totalPages - 1) {
      keyboard.text(t("messages.button.next_page"), `${MESSAGES_CALLBACK_PREFIX}page:${currentPage + 1}`);
    }
    keyboard.row();
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
        menuKind: "messages",
        messageId: message.message_id,
        sessionId,
        directory,
      },
    },
    scopeKey,
  );
}

export async function handleMessagesCallback(ctx: Context): Promise<boolean> {
  const data = ctx.callbackQuery?.data;
  if (!data || !data.startsWith(MESSAGES_CALLBACK_PREFIX)) {
    return false;
  }

  const scopeKey = getScopeKeyFromContext(ctx);
  const interactionState = interactionManager.getSnapshot(scopeKey);

  if (
    interactionState?.kind !== "inline" ||
    interactionState.metadata.menuKind !== "messages"
  ) {
    await ctx.answerCallbackQuery({ text: t("inline.inactive_callback"), show_alert: true });
    return true;
  }

  const sessionId = interactionState.metadata.sessionId as string;
  const directory = interactionState.metadata.directory as string;

  if (!sessionId) {
    await ctx.answerCallbackQuery({ text: t("messages.page_empty_callback"), show_alert: true });
    return true;
  }

  await ctx.answerCallbackQuery();
  await ctx.deleteMessage().catch(() => {});

  const parts = data.slice(MESSAGES_CALLBACK_PREFIX.length).split(":");
  const action = parts[0];

  if (action === "page") {
    const page = parseInt(parts[1] || "0", 10);
    try {
      await showMessagesPage(ctx, sessionId, directory, page);
    } catch (error) {
      logger.error("[MessagesHandler] Page load error:", error);
      await ctx.reply(
        t("messages.page_load_error_callback"),
        getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
      );
    }
  }

  return true;
}
