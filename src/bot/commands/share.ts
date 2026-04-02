import { CommandContext, Context, InlineKeyboard } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { getCurrentSession } from "../../session/manager.js";
import { interactionManager } from "../../interaction/manager.js";
import { INTERACTION_CLEAR_REASON } from "../../interaction/constants.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";

const SHARE_CALLBACK_PREFIX = "share:";

export async function shareCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    const scope = getScopeFromContext(ctx);
    const scopeKey = getScopeKeyFromContext(ctx);
    const currentSession = getCurrentSession(scopeKey);

    if (!currentSession) {
      await ctx.reply(t("share.no_session"), getThreadSendOptions(scope?.threadId ?? null));
      return;
    }

    const { data: sessionInfo, error } = await opencodeClient.session.get({
      sessionID: currentSession.id,
      directory: currentSession.directory,
    });

    if (error || !sessionInfo) {
      await ctx.reply(t("share.error"), getThreadSendOptions(scope?.threadId ?? null));
      return;
    }

    const isShared = !!sessionInfo.share?.url;
    const statusText = isShared
      ? t("share.status.shared")
      : t("share.status.not_shared");

    const keyboard = new InlineKeyboard()
      .text(t("share.button.create"), `${SHARE_CALLBACK_PREFIX}create`)
      .row();

    if (isShared) {
      keyboard.text(t("share.button.remove"), `${SHARE_CALLBACK_PREFIX}remove`);
    }

    const message = await ctx.reply(t("share.select_share_unshare", { status: statusText }), {
      reply_markup: keyboard,
      ...getThreadSendOptions(scope?.threadId ?? null),
    });

    interactionManager.start(
      {
        kind: "inline",
        expectedInput: "callback",
        metadata: {
          menuKind: "share",
          messageId: message.message_id,
          sessionId: currentSession.id,
          directory: currentSession.directory,
        },
      },
      scopeKey,
    );

    logger.info(`[ShareCommand] Share menu opened for session: ${currentSession.id}`);
  } catch (error) {
    logger.error("[ShareCommand] Error:", error);
    await ctx.reply(
      t("share.error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}

export async function handleShareCallback(ctx: Context): Promise<boolean> {
  const data = ctx.callbackQuery?.data;
  if (!data || !data.startsWith(SHARE_CALLBACK_PREFIX)) {
    return false;
  }

  const scopeKey = getScopeKeyFromContext(ctx);
  const action = data.slice(SHARE_CALLBACK_PREFIX.length);

  const interactionState = interactionManager.getSnapshot(scopeKey);
  if (
    interactionState?.kind !== "inline" ||
    interactionState.metadata.menuKind !== "share"
  ) {
    await ctx.answerCallbackQuery({ text: t("inline.inactive_callback"), show_alert: true });
    return true;
  }

  const sessionId = interactionState.metadata.sessionId as string;
  const directory = interactionState.metadata.directory as string;

  if (!sessionId) {
    interactionManager.clear(INTERACTION_CLEAR_REASON.EXPIRED, scopeKey);
    await ctx.answerCallbackQuery({ text: t("inline.inactive_callback"), show_alert: true });
    return true;
  }

  await ctx.answerCallbackQuery();

  try {
    if (action === "create") {
      await ctx.editMessageText(t("share.creating")).catch(() => {});

      const { data: shareResult, error: shareError } = await opencodeClient.session.share({
        sessionID: sessionId,
        directory,
      });

      if (shareError || !shareResult?.share?.url) {
        throw shareError || new Error("Failed to create share link");
      }

      interactionManager.clear(INTERACTION_CLEAR_REASON.MANUAL, scopeKey);
      await ctx.editMessageText(t("share.created", { url: shareResult.share.url })).catch(() => {});
      logger.info(`[ShareHandler] Session shared: ${sessionId}, url: ${shareResult.share.url}`);
    } else if (action === "remove") {
      const { error: unshareError } = await opencodeClient.session.unshare({
        sessionID: sessionId,
        directory,
      });

      if (unshareError) {
        throw unshareError;
      }

      interactionManager.clear(INTERACTION_CLEAR_REASON.MANUAL, scopeKey);
      await ctx.editMessageText(t("share.unshared")).catch(() => {});
      logger.info(`[ShareHandler] Session unshared: ${sessionId}`);
    }
  } catch (error) {
    logger.error("[ShareHandler] Error:", error);
    const errorMsg = action === "create" ? t("share.error") : t("share.unshare_error");
    await ctx.editMessageText(errorMsg).catch(() => {});
  }

  return true;
}
