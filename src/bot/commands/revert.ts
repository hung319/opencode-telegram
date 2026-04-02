import { CommandContext, Context } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { getCurrentSession } from "../../session/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";

export async function revertCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    const scope = getScopeFromContext(ctx);
    const scopeKey = getScopeKeyFromContext(ctx);
    const currentSession = getCurrentSession(scopeKey);

    if (!currentSession) {
      await ctx.reply(t("revert.no_session"), getThreadSendOptions(scope?.threadId ?? null));
      return;
    }

    const { data: messages, error } = await opencodeClient.session.messages({
      sessionID: currentSession.id,
      directory: currentSession.directory,
      limit: 10,
    });

    if (error || !messages || !Array.isArray(messages) || messages.length === 0) {
      await ctx.reply(
        t("revert.no_message"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const messagesList = messages as unknown as Array<{ info?: { role?: string; id?: string }; parts?: unknown[] }>;
    const lastUserMessage = messagesList
      .filter((m) => m.info?.role === "user")
      .pop();

    if (!lastUserMessage?.info?.id) {
      await ctx.reply(
        t("revert.no_message"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const messageId = lastUserMessage.info.id;
    if (!messageId) {
      await ctx.reply(
        t("revert.no_message"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const { error: revertError } = await opencodeClient.session.revert({
      sessionID: currentSession.id,
      directory: currentSession.directory,
      messageID: messageId,
    });

    if (revertError) {
      throw revertError;
    }

    await ctx.reply(
      t("revert.success"),
      getThreadSendOptions(scope?.threadId ?? null),
    );

    logger.info(`[RevertCommand] Message reverted in session: ${currentSession.id}`);
  } catch (error) {
    logger.error("[RevertCommand] Error:", error);
    await ctx.reply(
      t("revert.error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}
