import { readFile } from "node:fs/promises";

import { createBot } from "../bot/index.js";
import { config } from "../config.js";
import { reconcileStoredModelSelection } from "../model/manager.js";
import { loadSettings } from "../settings/manager.js";
import { processManager } from "../process/manager.js";
import { warmupSessionDirectoryCache } from "../session/cache-manager.js";
import { createScheduledTaskRuntime } from "../scheduled-task/runtime.js";
import { getRuntimeMode } from "../runtime/mode.js";
import { getRuntimePaths } from "../runtime/paths.js";
import { logger } from "../utils/logger.js";

async function getBotVersion(): Promise<string> {
  try {
    const packageJsonPath = new URL("../../package.json", import.meta.url);
    const packageJsonContent = await readFile(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonContent) as { version?: string };

    return packageJson.version ?? "unknown";
  } catch (error) {
    logger.warn("[App] Failed to read bot version", error);
    return "unknown";
  }
}

export async function startBotApp(): Promise<void> {
  const mode = getRuntimeMode();
  const runtimePaths = getRuntimePaths();
  const version = await getBotVersion();

  logger.info(`Starting OpenCode Telegram Group Topics Bot v${version}...`);
  logger.info(`Config loaded from ${runtimePaths.envFilePath}`);
  logger.info(`Allowed User ID: ${config.telegram.allowedUserId}`);
  logger.debug(`[Runtime] Application start mode: ${mode}`);

  await loadSettings();
  await processManager.initialize();
  await reconcileStoredModelSelection();
  await warmupSessionDirectoryCache();

  // Auto-start OpenCode server if configured (e.g. in Docker)
  if (config.opencode.autoStart && !processManager.isRunning()) {
    logger.info("[App] Auto-starting OpenCode server (OPENCODE_AUTO_START=true)...");
    const result = await processManager.start();
    if (result.success) {
      logger.info(`[App] OpenCode server auto-started with PID=${processManager.getPID()}`);
    } else {
      logger.error(`[App] Failed to auto-start OpenCode server: ${result.error}`);
    }
  }

  const bot = createBot();
  createScheduledTaskRuntime(bot).start();

  const webhookInfo = await bot.api.getWebhookInfo();
  if (webhookInfo.url) {
    logger.info(`[Bot] Webhook detected: ${webhookInfo.url}, removing...`);
    await bot.api.deleteWebhook();
    logger.info("[Bot] Webhook removed, switching to long polling");
  }

  await bot.start({
    onStart: (botInfo) => {
      logger.info(`Bot @${botInfo.username} started!`);
    },
  });
}
