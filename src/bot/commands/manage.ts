import { CommandContext, Context, InlineKeyboard } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { getCurrentSession } from "../../session/manager.js";
import { interactionManager } from "../../interaction/manager.js";
import { INTERACTION_CLEAR_REASON } from "../../interaction/constants.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";
import { splitLongMessage } from "../utils/message-splitter.js";

const MANAGE_CALLBACK_PREFIX = "manage:";

export async function manageCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    const scope = getScopeFromContext(ctx);
    const scopeKey = getScopeKeyFromContext(ctx);
    const currentSession = getCurrentSession(scopeKey);
    const directory = currentSession?.directory;

    const keyboard = new InlineKeyboard()
      .text("MCP Servers", `${MANAGE_CALLBACK_PREFIX}mcp_status`)
      .row()
      .text("Plugins", `${MANAGE_CALLBACK_PREFIX}plugins_list`)
      .row()
      .text("Providers", `${MANAGE_CALLBACK_PREFIX}providers_list`)
      .row()
      .text("Config", `${MANAGE_CALLBACK_PREFIX}config_view`)
      .row()
      .text("Close", `${MANAGE_CALLBACK_PREFIX}close`);

    const message = await ctx.reply(
      "Manage OpenCode\n\nChoose a section:",
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
          menuKind: "manage",
          messageId: message.message_id,
          directory,
        },
      },
      scopeKey,
    );

    logger.info("[ManageCommand] Menu opened");
  } catch (error) {
    logger.error("[ManageCommand] Error:", error);
    await ctx.reply(
      "Failed to open manage menu.",
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}

export async function handleManageCallback(ctx: Context): Promise<boolean> {
  const data = ctx.callbackQuery?.data;
  if (!data || !data.startsWith(MANAGE_CALLBACK_PREFIX)) {
    return false;
  }

  const scopeKey = getScopeKeyFromContext(ctx);
  const interactionState = interactionManager.getSnapshot(scopeKey);

  if (
    interactionState?.kind !== "inline" ||
    interactionState.metadata.menuKind !== "manage"
  ) {
    await ctx.answerCallbackQuery({ text: t("inline.inactive_callback"), show_alert: true });
    return true;
  }

  const directory = interactionState.metadata.directory as string;
  const action = data.slice(MANAGE_CALLBACK_PREFIX.length);

  await ctx.answerCallbackQuery();

  try {
    if (action === "close") {
      interactionManager.clear(INTERACTION_CLEAR_REASON.MANUAL, scopeKey);
      await ctx.deleteMessage().catch(() => {});
      return true;
    }

    if (action === "mcp_status") {
      await showMcpStatus(ctx, directory, scopeKey);
    } else if (action === "plugins_list") {
      await showPlugins(ctx, directory, scopeKey);
    } else if (action === "providers_list") {
      await showProviders(ctx, directory, scopeKey);
    } else if (action === "config_view") {
      await showConfig(ctx, directory, scopeKey);
    } else if (action.startsWith("mcp_remove:")) {
      await removeMcpServer(ctx, action.slice("mcp_remove:".length), directory, scopeKey);
    } else if (action.startsWith("mcp_disable:")) {
      await toggleMcpServer(ctx, action.slice("mcp_disable:".length), directory, scopeKey, false);
    } else if (action.startsWith("mcp_enable:")) {
      await toggleMcpServer(ctx, action.slice("mcp_enable:".length), directory, scopeKey, true);
    } else if (action.startsWith("plugin_remove:")) {
      await removePlugin(ctx, action.slice("plugin_remove:".length), directory, scopeKey);
    } else if (action === "plugins_add_prompt") {
      await promptAddPlugin(ctx, scopeKey);
    } else if (action === "mcp_add_prompt") {
      await promptAddMcp(ctx, scopeKey);
    } else if (action.startsWith("provider_auth:")) {
      await showProviderAuth(ctx, action.slice("provider_auth:".length), directory, scopeKey);
    } else if (action === "back") {
      await showMainMenu(ctx, scopeKey);
    } else if (action === "mcp_back") {
      await showMcpStatus(ctx, directory, scopeKey);
    } else if (action === "plugins_back") {
      await showPlugins(ctx, directory, scopeKey);
    } else if (action === "providers_back") {
      await showProviders(ctx, directory, scopeKey);
    }
  } catch (error) {
    logger.error("[ManageHandler] Error:", error);
    await ctx.reply(
      "Error processing request.",
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }

  return true;
}

export async function handleManageTextAnswer(ctx: Context): Promise<boolean> {
  const scopeKey = getScopeKeyFromContext(ctx);
  const interactionState = interactionManager.getSnapshot(scopeKey);

  if (
    interactionState?.kind !== "custom" ||
    (interactionState.metadata.action !== "mcp_add" && interactionState.metadata.action !== "plugin_add")
  ) {
    return false;
  }

  const text = ctx.message?.text;
  if (!text || text.startsWith("/")) {
    return false;
  }

  const directory = interactionState.metadata.directory as string;
  const action = interactionState.metadata.action as string;

  try {
    if (action === "mcp_add") {
      const config = JSON.parse(text);
      const serverName = config.name || "unnamed-server";

      await opencodeClient.mcp.add({
        name: serverName,
        config: config.config || config,
      });

      interactionManager.clear(INTERACTION_CLEAR_REASON.MANUAL, scopeKey);
      await ctx.reply(`Added MCP server: ${serverName}`);
      logger.info(`[ManageHandler] Added MCP server: ${serverName}`);
    } else if (action === "plugin_add") {
      const { data: currentConfig, error: configError } = await opencodeClient.config.get({ directory });

      if (configError || !currentConfig) {
        await ctx.reply("Failed to load config.");
        return true;
      }

      const cfg = currentConfig as { plugin?: string[] };
      const plugins = cfg.plugin || [];
      const pluginName = text.trim();

      if (plugins.includes(pluginName)) {
        await ctx.reply(`Plugin already installed: ${pluginName}`);
        return true;
      }

      plugins.push(pluginName);
      (cfg as Record<string, unknown>).plugin = plugins;

      const { error: updateError } = await opencodeClient.config.update({
        directory,
        config: cfg as Record<string, unknown>,
      });

      if (updateError) {
        await ctx.reply(`Failed to add plugin: ${pluginName}`);
        return true;
      }

      interactionManager.clear(INTERACTION_CLEAR_REASON.MANUAL, scopeKey);
      await ctx.reply(`Added plugin: ${pluginName}`);
      logger.info(`[ManageHandler] Added plugin: ${pluginName}`);
    }
  } catch (error) {
    logger.error("[ManageHandler] Text answer error:", error);
    await ctx.reply("Error processing input.");
  }

  return true;
}

async function showMainMenu(ctx: Context, _scopeKey: string): Promise<void> {
  const keyboard = new InlineKeyboard()
    .text("MCP Servers", `${MANAGE_CALLBACK_PREFIX}mcp_status`)
    .row()
    .text("Plugins", `${MANAGE_CALLBACK_PREFIX}plugins_list`)
    .row()
    .text("Providers", `${MANAGE_CALLBACK_PREFIX}providers_list`)
    .row()
    .text("Config", `${MANAGE_CALLBACK_PREFIX}config_view`)
    .row()
    .text("Close", `${MANAGE_CALLBACK_PREFIX}close`);

  await ctx.editMessageText(
    "Manage OpenCode\n\nChoose a section:",
    { reply_markup: keyboard },
  );
}

async function showMcpStatus(
  ctx: Context,
  directory: string,
  _scopeKey: string,
): Promise<void> {
  const { data: mcpStatus, error } = await opencodeClient.mcp.status({ directory });

  if (error) {
    await ctx.editMessageText("Failed to load MCP status.", {
      reply_markup: new InlineKeyboard().text("Back", `${MANAGE_CALLBACK_PREFIX}back`),
    });
    return;
  }

  const servers = mcpStatus as Record<string, { status?: string }>;
  const serverNames = Object.keys(servers || {});

  if (serverNames.length === 0) {
    await ctx.editMessageText("No MCP servers configured.", {
      reply_markup: new InlineKeyboard()
        .text("Add MCP", `${MANAGE_CALLBACK_PREFIX}mcp_add_prompt`)
        .row()
        .text("Back", `${MANAGE_CALLBACK_PREFIX}back`),
    });
    return;
  }

  let text = "MCP Servers\n\n";
  const keyboard = new InlineKeyboard();

  for (const name of serverNames) {
    const info = servers[name];
    const status = info?.status || "unknown";

    text += `${name} - ${status}\n`;

    if (status === "disabled") {
      keyboard.text(`Enable ${name}`, `${MANAGE_CALLBACK_PREFIX}mcp_enable:${name}`);
    } else {
      keyboard.text(`Disable ${name}`, `${MANAGE_CALLBACK_PREFIX}mcp_disable:${name}`);
    }
    keyboard.row();
    keyboard.text(`Remove ${name}`, `${MANAGE_CALLBACK_PREFIX}mcp_remove:${name}`);
    keyboard.row();
  }

  keyboard
    .text("Add MCP", `${MANAGE_CALLBACK_PREFIX}mcp_add_prompt`)
    .row()
    .text("Back", `${MANAGE_CALLBACK_PREFIX}mcp_back`);

  await ctx.editMessageText(text, {
    reply_markup: keyboard,
  });
}

async function removeMcpServer(
  ctx: Context,
  serverName: string,
  directory: string,
  _scopeKey: string,
): Promise<void> {
  const { data: config, error: configError } = await opencodeClient.config.get({ directory });

  if (configError || !config) {
    await ctx.editMessageText("Failed to load config.", {
      reply_markup: new InlineKeyboard().text("Back", `${MANAGE_CALLBACK_PREFIX}mcp_back`),
    });
    return;
  }

  const currentConfig = config as { mcp?: Record<string, unknown> };
  if (currentConfig.mcp) {
    delete currentConfig.mcp[serverName];
  }

  const { error: updateError } = await opencodeClient.config.update({
    directory,
    config: currentConfig as Record<string, unknown>,
  });

  if (updateError) {
    await ctx.editMessageText(`Failed to remove MCP server: ${serverName}`, {
      reply_markup: new InlineKeyboard().text("Back", `${MANAGE_CALLBACK_PREFIX}mcp_back`),
    });
    return;
  }

  await ctx.editMessageText(`Removed MCP server: ${serverName}`, {
    reply_markup: new InlineKeyboard()
      .text("MCP Servers", `${MANAGE_CALLBACK_PREFIX}mcp_status`)
      .row()
      .text("Back", `${MANAGE_CALLBACK_PREFIX}mcp_back`),
  });

  logger.info(`[ManageHandler] Removed MCP server: ${serverName}`);
}

async function toggleMcpServer(
  ctx: Context,
  serverName: string,
  directory: string,
  _scopeKey: string,
  enabled: boolean,
): Promise<void> {
  const { data: config, error: configError } = await opencodeClient.config.get({ directory });

  if (configError || !config) {
    await ctx.editMessageText("Failed to load config.", {
      reply_markup: new InlineKeyboard().text("Back", `${MANAGE_CALLBACK_PREFIX}mcp_back`),
    });
    return;
  }

  const currentConfig = config as { mcp?: Record<string, { enabled?: boolean }> };
  if (currentConfig.mcp && currentConfig.mcp[serverName]) {
    currentConfig.mcp[serverName] = {
      ...currentConfig.mcp[serverName],
      enabled,
    };
  }

  const { error: updateError } = await opencodeClient.config.update({
    directory,
    config: currentConfig as Record<string, unknown>,
  });

  if (updateError) {
    await ctx.editMessageText(`Failed to update MCP server: ${serverName}`, {
      reply_markup: new InlineKeyboard().text("Back", `${MANAGE_CALLBACK_PREFIX}mcp_back`),
    });
    return;
  }

  await ctx.editMessageText(`${enabled ? "Enabled" : "Disabled"} MCP server: ${serverName}`, {
    reply_markup: new InlineKeyboard()
      .text("MCP Servers", `${MANAGE_CALLBACK_PREFIX}mcp_status`)
      .row()
      .text("Back", `${MANAGE_CALLBACK_PREFIX}mcp_back`),
  });

  logger.info(`[ManageHandler] Toggled MCP server: ${serverName} = ${enabled}`);
}

async function promptAddMcp(ctx: Context, scopeKey: string): Promise<void> {
  await ctx.editMessageText(
    "Send MCP server config in JSON format:\n\nExample:\n" +
    '{"name": "my-server", "config": {"type": "local", "command": ["npx", "-y", "@modelcontextprotocol/server-example"]}}',
    { reply_markup: new InlineKeyboard().text("Cancel", `${MANAGE_CALLBACK_PREFIX}mcp_back`) },
  );

  interactionManager.start(
    {
      kind: "custom",
      expectedInput: "text",
      metadata: { action: "mcp_add" },
    },
    scopeKey,
  );
}

async function showPlugins(
  ctx: Context,
  directory: string,
  _scopeKey: string,
): Promise<void> {
  const { data: config, error } = await opencodeClient.config.get({ directory });

  if (error || !config) {
    await ctx.editMessageText("Failed to load config.", {
      reply_markup: new InlineKeyboard().text("Back", `${MANAGE_CALLBACK_PREFIX}back`),
    });
    return;
  }

  const cfg = config as { plugin?: string[] };
  const plugins = cfg.plugin || [];

  if (plugins.length === 0) {
    await ctx.editMessageText("No plugins installed.", {
      reply_markup: new InlineKeyboard()
        .text("Add Plugin", `${MANAGE_CALLBACK_PREFIX}plugins_add_prompt`)
        .row()
        .text("Back", `${MANAGE_CALLBACK_PREFIX}back`),
    });
    return;
  }

  let text = "Plugins\n\n";
  const keyboard = new InlineKeyboard();

  for (const plugin of plugins) {
    text += `• ${plugin}\n`;
    keyboard.text(`Remove ${plugin}`, `${MANAGE_CALLBACK_PREFIX}plugin_remove:${plugin}`);
    keyboard.row();
  }

  keyboard
    .text("Add Plugin", `${MANAGE_CALLBACK_PREFIX}plugins_add_prompt`)
    .row()
    .text("Back", `${MANAGE_CALLBACK_PREFIX}plugins_back`);

  await ctx.editMessageText(text, {
    reply_markup: keyboard,
  });
}

async function removePlugin(
  ctx: Context,
  pluginName: string,
  directory: string,
  _scopeKey: string,
): Promise<void> {
  const { data: config, error: configError } = await opencodeClient.config.get({ directory });

  if (configError || !config) {
    await ctx.editMessageText("Failed to load config.", {
      reply_markup: new InlineKeyboard().text("Back", `${MANAGE_CALLBACK_PREFIX}plugins_back`),
    });
    return;
  }

  const cfg = config as { plugin?: string[] };
  const plugins = (cfg.plugin || []).filter((p) => p !== pluginName);
  (cfg as Record<string, unknown>).plugin = plugins;

  const { error: updateError } = await opencodeClient.config.update({
    directory,
    config: cfg as Record<string, unknown>,
  });

  if (updateError) {
    await ctx.editMessageText(`Failed to remove plugin: ${pluginName}`, {
      reply_markup: new InlineKeyboard().text("Back", `${MANAGE_CALLBACK_PREFIX}plugins_back`),
    });
    return;
  }

  await ctx.editMessageText(`Removed plugin: ${pluginName}`, {
    reply_markup: new InlineKeyboard()
      .text("Plugins", `${MANAGE_CALLBACK_PREFIX}plugins_list`)
      .row()
      .text("Back", `${MANAGE_CALLBACK_PREFIX}plugins_back`),
  });

  logger.info(`[ManageHandler] Removed plugin: ${pluginName}`);
}

async function promptAddPlugin(ctx: Context, scopeKey: string): Promise<void> {
  await ctx.editMessageText(
    "Send plugin npm package name to install:\n\nExamples:\n• opencode-helicone-session\n• @sveltejs/opencode",
    { reply_markup: new InlineKeyboard().text("Cancel", `${MANAGE_CALLBACK_PREFIX}plugins_back`) },
  );

  interactionManager.start(
    {
      kind: "custom",
      expectedInput: "text",
      metadata: { action: "plugin_add" },
    },
    scopeKey,
  );
}

async function showProviders(
  ctx: Context,
  directory: string,
  _scopeKey: string,
): Promise<void> {
  const { data: providers, error } = await opencodeClient.provider.list({ directory });

  if (error || !providers) {
    await ctx.editMessageText("Failed to load providers.", {
      reply_markup: new InlineKeyboard().text("Back", `${MANAGE_CALLBACK_PREFIX}back`),
    });
    return;
  }

  const allProviders = (providers as { all?: Array<{ id?: string; name?: string }> }).all || [];

  if (allProviders.length === 0) {
    await ctx.editMessageText("No providers configured.", {
      reply_markup: new InlineKeyboard().text("Back", `${MANAGE_CALLBACK_PREFIX}providers_back`),
    });
    return;
  }

  let text = "Providers\n\n";
  const keyboard = new InlineKeyboard();

  for (const provider of allProviders) {
    const id = (provider as { id?: string }).id || "unknown";
    const name = (provider as { name?: string }).name || id;
    text += `• ${name} (${id})\n`;
    keyboard.text(`Auth ${name}`, `${MANAGE_CALLBACK_PREFIX}provider_auth:${id}`);
    keyboard.row();
  }

  keyboard.text("Back", `${MANAGE_CALLBACK_PREFIX}providers_back`);

  await ctx.editMessageText(text, {
    reply_markup: keyboard,
  });
}

async function showProviderAuth(
  ctx: Context,
  providerId: string,
  directory: string,
  _scopeKey: string,
): Promise<void> {
  const { data: authMethods, error } = await opencodeClient.provider.auth({ directory });

  if (error || !authMethods) {
    await ctx.editMessageText("Failed to load auth methods.", {
      reply_markup: new InlineKeyboard().text("Back", `${MANAGE_CALLBACK_PREFIX}providers_back`),
    });
    return;
  }

  const methods = (authMethods as Record<string, Array<{ type?: string }>>)[providerId] || [];

  if (methods.length === 0) {
    await ctx.editMessageText(`No auth methods for ${providerId}. Use API key in config.`, {
      reply_markup: new InlineKeyboard().text("Back", `${MANAGE_CALLBACK_PREFIX}providers_back`),
    });
    return;
  }

  let text = `Auth for ${providerId}\n\n`;
  const keyboard = new InlineKeyboard();

  for (const method of methods) {
    const type = (method as { type?: string }).type || "unknown";
    text += `• ${type}\n`;
  }

  text += "\nTo set API key, use config update or set in opencode.json";

  keyboard.text("Back", `${MANAGE_CALLBACK_PREFIX}providers_back`);

  await ctx.editMessageText(text, {
    reply_markup: keyboard,
  });
}

async function showConfig(
  ctx: Context,
  directory: string,
  _scopeKey: string,
): Promise<void> {
  const { data: config, error } = await opencodeClient.config.get({ directory });

  if (error || !config) {
    await ctx.editMessageText("Failed to load config.", {
      reply_markup: new InlineKeyboard().text("Back", `${MANAGE_CALLBACK_PREFIX}back`),
    });
    return;
  }

  const configText = JSON.stringify(config, null, 2);
  const fullText = `Config:\n\n${configText}`;
  const chunks = splitLongMessage(fullText);

  await ctx.editMessageText(chunks[0], {
    reply_markup: new InlineKeyboard().text("Back", `${MANAGE_CALLBACK_PREFIX}back`),
  });

  for (let i = 1; i < chunks.length; i++) {
    await ctx.reply(chunks[i]);
  }
}
