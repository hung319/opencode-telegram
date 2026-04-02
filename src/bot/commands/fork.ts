import { CommandContext, Context } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { getCurrentSession, setCurrentSession } from "../../session/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";

export async function forkCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    const scope = getScopeFromContext(ctx);
    const scopeKey = getScopeKeyFromContext(ctx);
    const currentSession = getCurrentSession(scopeKey);

    if (!currentSession) {
      await ctx.reply(t("fork.no_session"), getThreadSendOptions(scope?.threadId ?? null));
      return;
    }

    const message = await ctx.reply(t("bot.creating_session"));

    const { data: forkedSession, error } = await opencodeClient.session.fork({
      sessionID: currentSession.id,
      directory: currentSession.directory,
    });

    if (error || !forkedSession) {
      await ctx.api.deleteMessage(ctx.chat!.id, message.message_id).catch(() => {});
      await ctx.reply(
        t("fork.error"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const newSession = {
      id: forkedSession.id,
      title: forkedSession.title || t("pinned.default_session_title"),
      directory: forkedSession.directory || currentSession.directory,
    };

    setCurrentSession(newSession, scopeKey);

    await ctx.api.editMessageText(
      ctx.chat!.id,
      message.message_id,
      t("fork.created", { title: newSession.title }),
    );

    logger.info(`[ForkCommand] Session forked: ${currentSession.id} -> ${newSession.id}`);
  } catch (error) {
    logger.error("[ForkCommand] Error:", error);
    await ctx.reply(
      t("fork.error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}
