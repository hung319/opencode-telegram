import { CommandContext, Context } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { getCurrentSession } from "../../session/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";
import { splitLongMessage } from "../utils/message-splitter.js";

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
    const fullText = t("config.current", { config: configText });
    const chunks = splitLongMessage(fullText);

    const sendOptions = {
      parse_mode: "HTML" as const,
      ...getThreadSendOptions(scope?.threadId ?? null),
    };

    for (const chunk of chunks) {
      await ctx.reply(chunk, sendOptions);
    }

    logger.info(`[ConfigCommand] Config displayed for project: ${directory || "global"} (${chunks.length} chunks)`);
  } catch (error) {
    logger.error("[ConfigCommand] Error:", error);
    await ctx.reply(
      t("config.fetch_error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}
