import { CommandContext, Context } from "grammy";
import { showAgentSelectionMenu } from "../handlers/agent.js";
import { getScopeFromContext, getThreadSendOptions } from "../scope.js";
import { t } from "../../i18n/index.js";

export async function agentCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    await showAgentSelectionMenu(ctx as Context);
  } catch {
    const scope = getScopeFromContext(ctx);
    await ctx.reply(t("agent.menu.error"), getThreadSendOptions(scope?.threadId ?? null));
  }
}
