import { CommandContext, Context, InlineKeyboard } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { getCurrentSession } from "../../session/manager.js";
import { interactionManager } from "../../interaction/manager.js";
import { INTERACTION_CLEAR_REASON } from "../../interaction/constants.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";

const MCP_CALLBACK_PREFIX = "mcp:";

export async function mcpCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    const scope = getScopeFromContext(ctx);
    const scopeKey = getScopeKeyFromContext(ctx);
    const currentSession = getCurrentSession(scopeKey);
    const directory = currentSession?.directory;

    const { data: mcpStatus, error } = await opencodeClient.mcp.status({ directory });

    if (error) {
      await ctx.reply(
        t("mcp.fetch_error"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const keyboard = new InlineKeyboard()
      .text(t("mcp.button.add"), `${MCP_CALLBACK_PREFIX}add`);

    let text = t("mcp.status_title") + "\n\n";

    const servers = mcpStatus as Record<string, { status?: string }>;
    if (!servers || Object.keys(servers).length === 0) {
      text += t("mcp.no_servers");
    } else {
      for (const [name, info] of Object.entries(servers)) {
        const status = info?.status || "unknown";
        let statusIcon = "❓";
        if (status === "running" || status === "connected") {
          statusIcon = t("mcp.server_status_running").split(" ")[0];
        } else if (status === "stopped" || status === "disconnected") {
          statusIcon = t("mcp.server_status_stopped").split(" ")[0];
        } else if (status === "error") {
          statusIcon = t("mcp.server_status_error").split(" ")[0];
        }

        text += `${statusIcon} **${name}** - ${status}\n`;

        if (status === "stopped" || status === "disconnected") {
          keyboard.text(`${t("mcp.button.connect")} ${name}`, `${MCP_CALLBACK_PREFIX}connect:${name}`);
        } else if (status === "running" || status === "connected") {
          keyboard.text(`${t("mcp.button.disconnect")} ${name}`, `${MCP_CALLBACK_PREFIX}disconnect:${name}`);
        }
        keyboard.row();
      }
    }

    const message = await ctx.reply(text, {
      reply_markup: keyboard,
      parse_mode: "Markdown",
      ...getThreadSendOptions(scope?.threadId ?? null),
    });

    interactionManager.start(
      {
        kind: "inline",
        expectedInput: "callback",
        metadata: {
          menuKind: "mcp",
          messageId: message.message_id,
          directory,
        },
      },
      scopeKey,
    );

    logger.info(`[McpCommand] MCP status displayed for project: ${directory || "global"}`);
  } catch (error) {
    logger.error("[McpCommand] Error:", error);
    await ctx.reply(
      t("mcp.fetch_error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}

export async function handleMcpCallback(ctx: Context): Promise<boolean> {
  const data = ctx.callbackQuery?.data;
  if (!data || !data.startsWith(MCP_CALLBACK_PREFIX)) {
    return false;
  }

  const scopeKey = getScopeKeyFromContext(ctx);
  const interactionState = interactionManager.getSnapshot(scopeKey);

  if (
    interactionState?.kind !== "inline" ||
    interactionState.metadata.menuKind !== "mcp"
  ) {
    await ctx.answerCallbackQuery({ text: t("inline.inactive_callback"), show_alert: true });
    return true;
  }

  const directory = interactionState.metadata.directory as string;
  const action = data.slice(MCP_CALLBACK_PREFIX.length);

  await ctx.answerCallbackQuery();

  if (action === "add") {
    await ctx.editMessageText(t("mcp.add_prompt")).catch(() => {});
    interactionManager.start(
      {
        kind: "custom",
        expectedInput: "text",
        metadata: { directory, action: "mcp_add" },
      },
      scopeKey,
    );
    return true;
  }

  if (action.startsWith("connect:")) {
    const serverName = action.slice("connect:".length);
    await ctx.editMessageText(t("mcp.connecting", { name: serverName })).catch(() => {});

    try {
      await opencodeClient.mcp.connect({ name: serverName });
      await ctx.editMessageText(t("mcp.connected", { name: serverName })).catch(() => {});
      logger.info(`[McpHandler] Server connected: ${serverName}`);
    } catch (error) {
      logger.error("[McpHandler] Connect error:", error);
      await ctx.editMessageText(t("mcp.connect_error")).catch(() => {});
    }
    return true;
  }

  if (action.startsWith("disconnect:")) {
    const serverName = action.slice("disconnect:".length);

    try {
      await opencodeClient.mcp.disconnect({ name: serverName });
      await ctx.editMessageText(t("mcp.disconnected", { name: serverName })).catch(() => {});
      logger.info(`[McpHandler] Server disconnected: ${serverName}`);
    } catch (error) {
      logger.error("[McpHandler] Disconnect error:", error);
      await ctx.editMessageText(t("mcp.disconnect_error")).catch(() => {});
    }
    return true;
  }

  return false;
}

export async function handleMcpTextAnswer(ctx: Context): Promise<boolean> {
  const scopeKey = getScopeKeyFromContext(ctx);
  const interactionState = interactionManager.getSnapshot(scopeKey);

  if (interactionState?.kind !== "custom" || interactionState.metadata.action !== "mcp_add") {
    return false;
  }

  const text = ctx.message?.text;
  if (!text || text.startsWith("/")) {
    return false;
  }

  try {
    const config = JSON.parse(text);
    const serverName = config.name || "unnamed-server";

    await opencodeClient.mcp.add({
      name: serverName,
      config: config.config || config,
    });

    interactionManager.clear(INTERACTION_CLEAR_REASON.MANUAL, scopeKey);
    await ctx.reply(t("mcp.added", { name: serverName }));
    logger.info(`[McpHandler] Server added: ${serverName}`);
  } catch (error) {
    logger.error("[McpHandler] Add error:", error);
    await ctx.reply(t("mcp.add_error"));
  }

  return true;
}
