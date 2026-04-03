import { CommandContext, Context } from "grammy";
import { showModelSelectionMenu } from "../handlers/model.js";
import { getScopeFromContext, getThreadSendOptions } from "../scope.js";
import { t } from "../../i18n/index.js";

export async function modelCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    await showModelSelectionMenu(ctx as Context);
  } catch {
    const scope = getScopeFromContext(ctx);
    await ctx.reply(t("model.menu.error"), getThreadSendOptions(scope?.threadId ?? null));
  }
}
