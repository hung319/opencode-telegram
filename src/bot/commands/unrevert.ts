import { CommandContext, Context } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { getCurrentSession } from "../../session/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";

export async function unrevertCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    const scope = getScopeFromContext(ctx);
    const scopeKey = getScopeKeyFromContext(ctx);
    const currentSession = getCurrentSession(scopeKey);

    if (!currentSession) {
      await ctx.reply(t("unrevert.no_session"), getThreadSendOptions(scope?.threadId ?? null));
      return;
    }

    const { error } = await opencodeClient.session.unrevert({
      sessionID: currentSession.id,
      directory: currentSession.directory,
    });

    if (error) {
      throw error;
    }

    await ctx.reply(
      t("unrevert.success"),
      getThreadSendOptions(scope?.threadId ?? null),
    );

    logger.info(`[UnrevertCommand] Messages unreverted in session: ${currentSession.id}`);
  } catch (error) {
    logger.error("[UnrevertCommand] Error:", error);
    await ctx.reply(
      t("unrevert.error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}
