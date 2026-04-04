import { CommandContext, Context, InlineKeyboard } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { getCurrentSession } from "../../session/manager.js";
import { interactionManager } from "../../interaction/manager.js";
import { INTERACTION_CLEAR_REASON } from "../../interaction/constants.js";
import { manageCommand } from "./manage.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";
import { splitLongMessage } from "../utils/message-splitter.js";

const CONFIG_CALLBACK_PREFIX = "config:";

export async function configCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    const scope = getScopeFromContext(ctx);
    const scopeKey = getScopeKeyFromContext(ctx);

    const keyboard = new InlineKeyboard()
      .text("🔌 MCP / Plugins / Providers", `${CONFIG_CALLBACK_PREFIX}manage`)
      .row()
      .text("📋 View Raw Config", `${CONFIG_CALLBACK_PREFIX}raw`)
      .row()
      .text("❌ Close", `${CONFIG_CALLBACK_PREFIX}close`)
      .row();

    const message = await ctx.reply(
      t("config.menu"),
      {
        reply_markup: keyboard,
        ...getThreadSendOptions(scope?.threadId ?? null),
      },
    );

    interactionManager.start(
      {
        kind: "inline",
        expectedInput: "callback",
        metadata: {
          menuKind: "config",
          messageId: message.message_id,
        },
      },
      scopeKey,
    );

    logger.info("[ConfigCommand] Config menu opened");
  } catch (error) {
    logger.error("[ConfigCommand] Error:", error);
    await ctx.reply(
      t("config.fetch_error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}

export async function handleConfigCallback(ctx: Context): Promise<boolean> {
  const data = ctx.callbackQuery?.data;
  if (!data || !data.startsWith(CONFIG_CALLBACK_PREFIX)) {
    return false;
  }

  const scopeKey = getScopeKeyFromContext(ctx);
  const interactionState = interactionManager.getSnapshot(scopeKey);

  // Allow config interactions even if not strictly in "config" state (e.g. if user clicks fast)
  // but generally we check state.
  
  const action = data.slice(CONFIG_CALLBACK_PREFIX.length);

  await ctx.answerCallbackQuery();

  try {
    if (action === "close") {
      interactionManager.clear(INTERACTION_CLEAR_REASON.MANUAL, scopeKey);
      await ctx.deleteMessage().catch((err) => logger.debug("Silent operation failed:", err));
      return true;
    }

    // Redirect to the full management menu (MCP/Plugins/Providers)
    if (action === "manage") {
      await ctx.deleteMessage().catch((err) => logger.debug("Silent operation failed:", err));
      // Cast to CommandContext as manageCommand expects it, though it mostly uses Context methods
      await manageCommand(ctx as CommandContext<Context>);
      return true;
    }

    // Show raw JSON config
    if (action === "raw") {
      const currentSession = getCurrentSession(scopeKey);
      const directory = currentSession?.directory;

      const { data: config, error } = await opencodeClient.config.get({
        directory,
      });

      if (error || !config) {
        await ctx.editMessageText(t("config.fetch_error"));
        return true;
      }

      const configText = JSON.stringify(config, null, 2);
      const truncated = configText.length > 3500
        ? `${configText.slice(0, 3500)}\n\n... (truncated)`
        : configText;

      await ctx.editMessageText(t("config.raw_display", { config: truncated }), {
        parse_mode: "HTML",
      });
      return true;
    }
  } catch (error) {
    logger.error("[ConfigCallback] Error:", error);
    await ctx.answerCallbackQuery({ text: t("config.error"), show_alert: true });
  }

  return true;
}
