import { CommandContext, Context } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { getCurrentSession } from "../../session/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";

export async function todoCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    const scope = getScopeFromContext(ctx);
    const scopeKey = getScopeKeyFromContext(ctx);
    const currentSession = getCurrentSession(scopeKey);

    if (!currentSession) {
      await ctx.reply(t("todo.no_session"), getThreadSendOptions(scope?.threadId ?? null));
      return;
    }

    const { data: todos, error } = await opencodeClient.session.todo({
      sessionID: currentSession.id,
      directory: currentSession.directory,
    });

    if (error || !todos) {
      await ctx.reply(
        t("todo.fetch_error"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const todoItems = Array.isArray(todos) ? todos : [];

    if (todoItems.length === 0) {
      await ctx.reply(
        t("todo.empty"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const title = currentSession.title || t("pinned.default_session_title");
    const todoText = todoItems
      .map((item: { content?: string; status?: string }) => {
        const statusIcon = item.status === "completed"
          ? t("todo.completed")
          : t("todo.pending");
        const content = item.content || "";
        return `${statusIcon} ${content}`;
      })
      .join("\n");

    await ctx.reply(
      t("todo.title", { title }) + "\n\n" + todoText,
      getThreadSendOptions(scope?.threadId ?? null),
    );

    logger.info(`[TodoCommand] Todo list displayed for session: ${currentSession.id}`);
  } catch (error) {
    logger.error("[TodoCommand] Error:", error);
    await ctx.reply(
      t("todo.fetch_error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}
