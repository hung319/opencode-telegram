import { CommandContext, Context } from "grammy";
import { showVariantSelectionMenu } from "../handlers/variant.js";
import { getScopeFromContext, getThreadSendOptions } from "../scope.js";
import { t } from "../../i18n/index.js";

export async function variantCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    await showVariantSelectionMenu(ctx as Context);
  } catch {
    const scope = getScopeFromContext(ctx);
    await ctx.reply(t("variant.menu.error"), getThreadSendOptions(scope?.threadId ?? null));
  }
}
