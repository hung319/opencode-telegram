import { CommandContext, Context } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { getCurrentSession } from "../../session/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";

export async function configCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    const scope = getScopeFromContext(ctx);
    const scopeKey = getScopeKeyFromContext(ctx);
    const currentSession = getCurrentSession(scopeKey);
    const directory = currentSession?.directory;

    const { data: config, error } = await opencodeClient.config.get({
      directory,
    });

    if (error || !config) {
      await ctx.reply(
        t("config.fetch_error"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const configText = JSON.stringify(config, null, 2);
    const truncatedConfig = configText.length > 4000
      ? `${configText.slice(0, 3997)}...`
      : configText;

    await ctx.reply(
      t("config.current", { config: truncatedConfig }),
      {
        parse_mode: "HTML",
        ...getThreadSendOptions(scope?.threadId ?? null),
      },
    );

    logger.info(`[ConfigCommand] Config displayed for project: ${directory || "global"}`);
  } catch (error) {
    logger.error("[ConfigCommand] Error:", error);
    await ctx.reply(
      t("config.fetch_error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}
