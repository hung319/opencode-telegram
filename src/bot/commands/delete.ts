import { CommandContext, Context, InlineKeyboard } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { getCurrentSession, setCurrentSession } from "../../session/manager.js";
import { interactionManager } from "../../interaction/manager.js";
import { INTERACTION_CLEAR_REASON } from "../../interaction/constants.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";

const DELETE_CALLBACK_PREFIX = "delete:";

export async function deleteCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    const scope = getScopeFromContext(ctx);
    const scopeKey = getScopeKeyFromContext(ctx);
    const currentSession = getCurrentSession(scopeKey);

    if (!currentSession) {
      await ctx.reply(t("delete.no_session"), getThreadSendOptions(scope?.threadId ?? null));
      return;
    }

    let displayedTitle = currentSession.title;
    try {
      const { data: latestSession, error: latestSessionError } = await opencodeClient.session.get({
        sessionID: currentSession.id,
        directory: currentSession.directory,
      });

      if (!latestSessionError && latestSession?.title) {
        displayedTitle = latestSession.title;
        setCurrentSession(
          {
            id: currentSession.id,
            title: latestSession.title,
            directory: currentSession.directory,
          },
          scopeKey,
        );
      }
    } catch (latestTitleError) {
      logger.debug("[DeleteCommand] Failed to fetch latest session title", {
        sessionId: currentSession.id,
        latestTitleError,
      });
    }

    const keyboard = new InlineKeyboard()
      .text(t("delete.button.confirm"), `${DELETE_CALLBACK_PREFIX}confirm`)
      .row()
      .text(t("delete.button.cancel"), `${DELETE_CALLBACK_PREFIX}cancel`);

    const message = await ctx.reply(t("delete.confirm", { title: displayedTitle }), {
      reply_markup: keyboard,
      ...getThreadSendOptions(scope?.threadId ?? null),
    });

    interactionManager.start(
      {
        kind: "inline",
        expectedInput: "callback",
        metadata: {
          menuKind: "delete",
          messageId: message.message_id,
          sessionId: currentSession.id,
          directory: currentSession.directory,
        },
      },
      scopeKey,
    );

    logger.info(`[DeleteCommand] Waiting for delete confirmation for session: ${currentSession.id}`);
  } catch (error) {
    logger.error("[DeleteCommand] Error starting delete flow:", error);
    await ctx.reply(
      t("delete.error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}

export async function handleDeleteCallback(ctx: Context): Promise<boolean> {
  const data = ctx.callbackQuery?.data;
  if (!data || !data.startsWith(DELETE_CALLBACK_PREFIX)) {
    return false;
  }

  const scopeKey = getScopeKeyFromContext(ctx);
  const action = data.slice(DELETE_CALLBACK_PREFIX.length);

  if (action === "cancel") {
    interactionManager.clear(INTERACTION_CLEAR_REASON.MANUAL, scopeKey);
    await ctx.answerCallbackQuery({ text: t("delete.cancelled") });
    await ctx.deleteMessage().catch((err) => logger.debug("Silent operation failed:", err));
    return true;
  }

  if (action !== "confirm") {
    return false;
  }

  const interactionState = interactionManager.getSnapshot(scopeKey);
  if (
    interactionState?.kind !== "inline" ||
    interactionState.metadata.menuKind !== "delete"
  ) {
    await ctx.answerCallbackQuery({ text: t("delete.inactive_callback"), show_alert: true });
    return true;
  }

  const sessionId = interactionState.metadata.sessionId as string;
  const directory = interactionState.metadata.directory as string;

  if (!sessionId) {
    interactionManager.clear(INTERACTION_CLEAR_REASON.EXPIRED, scopeKey);
    await ctx.answerCallbackQuery({ text: t("delete.inactive_callback"), show_alert: true });
    return true;
  }

  await ctx.answerCallbackQuery();

  try {
    const { error } = await opencodeClient.session.delete({
      sessionID: sessionId,
      directory,
    });

    if (error) {
      throw error;
    }

    const scopeKey2 = getScopeKeyFromContext(ctx);
    const currentSession = getCurrentSession(scopeKey2);
    if (currentSession && currentSession.id === sessionId) {
      setCurrentSession(
        {
          id: "",
          title: "",
          directory: "",
        },
        scopeKey2,
      );
    }
    interactionManager.clear(INTERACTION_CLEAR_REASON.MANUAL, scopeKey);
    await ctx.editMessageText(t("delete.deleted", { title: sessionId })).catch((err) => logger.debug("Silent operation failed:", err));

    logger.info(`[DeleteHandler] Session deleted: ${sessionId}`);
  } catch (error) {
    logger.error("[DeleteHandler] Error deleting session:", error);
    await ctx.editMessageText(t("delete.error")).catch((err) => logger.debug("Silent operation failed:", err));
  }

  return true;
}
