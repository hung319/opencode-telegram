import { CommandContext, Context, InlineKeyboard } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { getCurrentSession } from "../../session/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";

const CONFIG_CALLBACK_PREFIX = "config:";

export async function configCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    const scope = getScopeFromContext(ctx);
    const keyboard = buildConfigKeyboard();

    await ctx.reply(
      t("config.menu"),
      {
        reply_markup: keyboard,
        ...getThreadSendOptions(scope?.threadId ?? null),
      },
    );
  } catch (error) {
    logger.error("[ConfigCommand] Error:", error);
    await ctx.reply(
      t("config.fetch_error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}

function buildConfigKeyboard(): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  keyboard
    .text(t("config.btn.model"), `${CONFIG_CALLBACK_PREFIX}model`)
    .text(t("config.btn.agent"), `${CONFIG_CALLBACK_PREFIX}agent`)
    .row()
    .text(t("config.btn.variant"), `${CONFIG_CALLBACK_PREFIX}variant`)
    .text(t("config.btn.thinking"), `${CONFIG_CALLBACK_PREFIX}thinking`)
    .row()
    .text(t("config.btn.context"), `${CONFIG_CALLBACK_PREFIX}context`)
    .text(t("config.btn.view_raw"), `${CONFIG_CALLBACK_PREFIX}raw`)
    .row();

  return keyboard;
}

export async function handleConfigCallback(ctx: Context): Promise<boolean> {
  const data = ctx.callbackQuery?.data;
  if (!data || !data.startsWith(CONFIG_CALLBACK_PREFIX)) {
    return false;
  }

  const action = data.slice(CONFIG_CALLBACK_PREFIX.length);

  if (action === "model") {
    await ctx.answerCallbackQuery({ text: t("config.use_slash", { cmd: "/model" }) });
    return true;
  }

  if (action === "agent") {
    await ctx.answerCallbackQuery({ text: t("config.use_slash", { cmd: "/agent" }) });
    return true;
  }

  if (action === "variant") {
    await ctx.answerCallbackQuery({ text: t("config.use_slash", { cmd: "/variant" }) });
    return true;
  }

  if (action === "thinking") {
    await ctx.answerCallbackQuery({ text: t("config.use_slash", { cmd: "/thinking" }) });
    return true;
  }

  if (action === "context") {
    await ctx.answerCallbackQuery({ text: t("config.use_slash", { cmd: "/context" }) });
    return true;
  }

  if (action === "raw") {
    await ctx.answerCallbackQuery();
    const scope = getScopeFromContext(ctx);
    const scopeKey = getScopeKeyFromContext(ctx);
    const currentSession = getCurrentSession(scopeKey);
    const directory = currentSession?.directory;

    try {
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
    } catch {
      await ctx.editMessageText(t("config.fetch_error"));
      return true;
    }
  }

  return false;
}
