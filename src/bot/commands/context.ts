import { CommandContext, Context } from "grammy";
import { handleContextButtonPress } from "../handlers/context.js";
import { getScopeFromContext, getThreadSendOptions } from "../scope.js";
import { t } from "../../i18n/index.js";

export async function contextCommand(ctx: CommandContext<Context>): Promise<void> {
  const scope = getScopeFromContext(ctx);

  try {
    await handleContextButtonPress(ctx as Context);
  } catch {
    await ctx.reply(t("context.no_active_session"), getThreadSendOptions(scope?.threadId ?? null));
  }
}
