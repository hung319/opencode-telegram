import { Context, InlineKeyboard } from "grammy";
import { selectModel, fetchCurrentModel, getModelSelectionLists, getFullModelCatalog } from "../../model/manager.js";
import { formatModelForDisplay } from "../../model/types.js";
import type { FavoriteModel, ModelInfo, ModelSelectionLists } from "../../model/types.js";
import { formatVariantForButton } from "../../variant/manager.js";
import { logger } from "../../utils/logger.js";
import { createMainKeyboard } from "../utils/keyboard.js";
import { getStoredAgent } from "../../agent/manager.js";
import { pinnedMessageManager } from "../../pinned/manager.js";
import { keyboardManager } from "../../keyboard/manager.js";
import {
  clearActiveInlineMenu,
  ensureActiveInlineMenu,
  replyWithInlineMenu,
  updateInlineMenuMessage,
} from "./inline-menu.js";
import { t } from "../../i18n/index.js";
import {
  SCOPE_CONTEXT,
  getScopeFromContext,
  getScopeFromKey,
  getScopeKeyFromContext,
  getThreadSendOptions,
} from "../scope.js";

const MODELS_PER_PAGE = 15;

function buildModelSelectionMenuText(modelLists: ModelSelectionLists, hasCatalog: boolean): string {
  const lines = [t("model.menu.select"), ""];

  if (modelLists.favorites.length > 0) {
    lines.push(t("model.menu.favorites_title"));
  } else {
    lines.push(t("model.menu.favorites_empty"));
  }

  if (modelLists.recent.length > 0) {
    lines.push(t("model.menu.recent_title"));
  } else if (modelLists.favorites.length > 0) {
    lines.push(t("model.menu.recent_empty"));
  }

  if (hasCatalog) {
    lines.push("");
    lines.push("📋 All Models from OpenCode Server");
  }

  return lines.join("\n");
}

function buildCatalogPageKeyboard(
  catalogModels: FavoriteModel[],
  currentPage: number,
  totalPages: number,
  currentModel?: ModelInfo,
): InlineKeyboard {
  const keyboard = new InlineKeyboard();
  const start = currentPage * MODELS_PER_PAGE;
  const end = Math.min(start + MODELS_PER_PAGE, catalogModels.length);
  const pageModels = catalogModels.slice(start, end);

  keyboard.text("📋 --- Page " + (currentPage + 1) + "/" + totalPages + " ---").row();

  pageModels.forEach((model) => {
    const isActive =
      currentModel &&
      model.providerID === currentModel.providerID &&
      model.modelID === currentModel.modelID;
    const label = `${isActive ? "✅ " : ""}📎 ${model.providerID}/${model.modelID}`;
    keyboard.text(label, `model:${model.providerID}:${model.modelID}`).row();
  });

  const navRow: Array<{ label: string; data: string }> = [];
  if (currentPage > 0) {
    navRow.push({ label: "◀️ Prev", data: `model_page:${currentPage - 1}` });
  }
  if (currentPage < totalPages - 1) {
    navRow.push({ label: "Next ▶️", data: `model_page:${currentPage + 1}` });
  }
  if (navRow.length > 0) {
    for (const btn of navRow) {
      keyboard.text(btn.label, btn.data);
    }
    keyboard.row();
  }

  keyboard.text("⬆️ Back to Main", "model_main");
  return keyboard;
}

export async function handleModelPageNavigation(ctx: Context): Promise<boolean> {
  const callbackQuery = ctx.callbackQuery;
  if (!callbackQuery?.data || !callbackQuery.data.startsWith("model_page:")) {
    return false;
  }

  const isActiveMenu = await ensureActiveInlineMenu(ctx, "model");
  if (!isActiveMenu) {
    return true;
  }

  const scopeKey = getScopeKeyFromContext(ctx);
  const page = parseInt(callbackQuery.data.split(":")[1], 10);
  if (isNaN(page) || page < 0) {
    return true;
  }

  try {
    const lists = await getModelSelectionLists();
    const catalog = await getFullModelCatalog();
    const currentModel = fetchCurrentModel(scopeKey);

    const existingKeys = new Set<string>();
    [...lists.favorites, ...lists.recent].forEach((m) => existingKeys.add(`${m.providerID}/${m.modelID}`));

    const catalogModels: FavoriteModel[] = [];
    if (catalog) {
      for (const provider of catalog.providers) {
        for (const modelID of Object.keys(provider.models)) {
          const key = `${provider.id}/${modelID}`;
          if (!existingKeys.has(key)) {
            catalogModels.push({ providerID: provider.id, modelID });
          }
        }
      }
    }

    const totalPages = Math.ceil(catalogModels.length / MODELS_PER_PAGE);
    const safePage = Math.min(page, totalPages - 1);

    const keyboard = buildCatalogPageKeyboard(catalogModels, safePage, totalPages, currentModel);
    const text = t("model.menu.select") + "\n\n📋 All Models (" + catalogModels.length + " total)";

    await ctx.answerCallbackQuery();
    await updateInlineMenuMessage(ctx, { text, keyboard });

    return true;
  } catch (err) {
    logger.error("[ModelHandler] Error handling model page navigation:", err);
    return false;
  }
}

export async function handleModelMainMenu(ctx: Context): Promise<boolean> {
  const callbackQuery = ctx.callbackQuery;
  if (!callbackQuery?.data || callbackQuery.data !== "model_main") {
    return false;
  }

  const isActiveMenu = await ensureActiveInlineMenu(ctx, "model");
  if (!isActiveMenu) {
    return true;
  }

  try {
    const scopeKey = getScopeKeyFromContext(ctx);
    const currentModel = fetchCurrentModel(scopeKey);
    const modelLists = await getModelSelectionLists();
    const catalog = await getFullModelCatalog();
    const keyboard = await buildModelSelectionMenu(currentModel, modelLists);
    const text = buildModelSelectionMenuText(modelLists, !!catalog);

    await ctx.answerCallbackQuery();
    await updateInlineMenuMessage(ctx, { text, keyboard });

    return true;
  } catch (err) {
    logger.error("[ModelHandler] Error handling model main menu:", err);
    return false;
  }
}

/**
 * Handle model selection callback
 * @param ctx grammY context
 * @returns true if handled, false otherwise
 */
export async function handleModelSelect(ctx: Context): Promise<boolean> {
  const callbackQuery = ctx.callbackQuery;

  if (!callbackQuery?.data || !callbackQuery.data.startsWith("model:")) {
    return false;
  }

  const isActiveMenu = await ensureActiveInlineMenu(ctx, "model");
  if (!isActiveMenu) {
    return true;
  }

  logger.debug(`[ModelHandler] Received callback: ${callbackQuery.data}`);

  try {
    const scopeKey = getScopeKeyFromContext(ctx);
    if (ctx.chat) {
      keyboardManager.initialize(ctx.api, ctx.chat.id, scopeKey);
    }

    // Parse callback data: "model:providerID:modelID"
    const parts = callbackQuery.data.split(":");
    if (parts.length < 3) {
      logger.error(`[ModelHandler] Invalid callback data format: ${callbackQuery.data}`);
      clearActiveInlineMenu("model_select_invalid_callback", scopeKey);
      await ctx.answerCallbackQuery({ text: t("model.change_error_callback") }).catch((err) => logger.debug("Silent operation failed:", err));
      return true;
    }

    const providerID = parts[1];
    const modelID = parts.slice(2).join(":"); // Handle model IDs that may contain ":"

    const modelInfo: ModelInfo = {
      providerID,
      modelID,
      variant: "default", // Reset to default when switching models
    };

    // Select model and persist
    selectModel(modelInfo, scopeKey);

    // Update keyboard manager state (may not be initialized if no session selected)
    keyboardManager.updateModel(modelInfo, scopeKey);

    // Refresh context limit for new model
    await pinnedMessageManager.refreshContextLimit(scopeKey);

    // Update Reply Keyboard with new model and context
    const currentAgent = getStoredAgent(scopeKey);
    const contextInfo =
      pinnedMessageManager.getContextInfo(scopeKey) ??
      (pinnedMessageManager.getContextLimit(scopeKey) > 0
        ? { tokensUsed: 0, tokensLimit: pinnedMessageManager.getContextLimit(scopeKey) }
        : keyboardManager.getContextInfo(scopeKey));

    if (contextInfo) {
      keyboardManager.updateContext(contextInfo.tokensUsed, contextInfo.tokensLimit, scopeKey);
    }

    const variantName = formatVariantForButton(modelInfo.variant || "default");
    const scope = getScopeFromKey(scopeKey);
    const keyboard = createMainKeyboard(
      currentAgent,
      modelInfo,
      contextInfo ?? undefined,
      variantName,
      scope?.context === SCOPE_CONTEXT.GROUP_GENERAL
        ? {
            contextFirst: true,
            contextLabel: t("keyboard.general_defaults"),
          }
        : undefined,
    );
    const displayName = formatModelForDisplay(modelInfo.providerID, modelInfo.modelID);
    const threadId = getScopeFromContext(ctx)?.threadId ?? null;

    clearActiveInlineMenu("model_selected", scopeKey);

    // Send confirmation message with updated keyboard
    await ctx.answerCallbackQuery({ text: t("model.changed_callback", { name: displayName }) });
    await ctx.reply(t("model.changed_message", { name: displayName }), {
      reply_markup: keyboard,
      ...getThreadSendOptions(threadId),
    });

    // Delete the inline menu message
    await ctx.deleteMessage().catch((err) => logger.debug("Silent operation failed:", err));

    return true;
  } catch (err) {
    clearActiveInlineMenu("model_select_error", getScopeKeyFromContext(ctx));
    logger.error("[ModelHandler] Error handling model select:", err);
    await ctx.answerCallbackQuery({ text: t("model.change_error_callback") }).catch((err) => logger.debug("Silent operation failed:", err));
    return false;
  }
}

/**
 * Build inline keyboard with favorite, recent, and ALL models from catalog
 * @param currentModel Current model for highlighting
 * @returns InlineKeyboard with model selection buttons
 */
export async function buildModelSelectionMenu(
  currentModel?: ModelInfo,
  modelLists?: ModelSelectionLists,
): Promise<InlineKeyboard> {
  const keyboard = new InlineKeyboard();
  const lists = modelLists ?? (await getModelSelectionLists());
  const favorites = lists.favorites;
  const recent = lists.recent;

  const addButton = (model: FavoriteModel, prefix: string): void => {
    const isActive =
      currentModel &&
      model.providerID === currentModel.providerID &&
      model.modelID === currentModel.modelID;

    const label = `${prefix} ${model.providerID}/${model.modelID}`;
    const labelWithCheck = isActive ? `✅ ${label}` : label;

    keyboard.text(labelWithCheck, `model:${model.providerID}:${model.modelID}`).row();
  };

  if (favorites.length > 0) {
    keyboard.text("⭐ --- Favorites ---").row();
    favorites.forEach((model) => addButton(model, "⭐"));
  }

  if (recent.length > 0) {
    keyboard.text("🕘 --- Recent ---").row();
    recent.forEach((model) => addButton(model, "🕘"));
  }

  const catalog = await getFullModelCatalog();
  if (catalog && catalog.providers.length > 0) {
    keyboard.text("📋 --- All Models ---").row();

    const existingKeys = new Set<string>();
    [...favorites, ...recent].forEach((m) => existingKeys.add(`${m.providerID}/${m.modelID}`));

    const catalogModels: FavoriteModel[] = [];
    for (const provider of catalog.providers) {
      const modelIDs = Object.keys(provider.models);
      for (const modelID of modelIDs) {
        const key = `${provider.id}/${modelID}`;
        if (!existingKeys.has(key)) {
          catalogModels.push({ providerID: provider.id, modelID });
        }
      }
    }

    const totalPages = Math.ceil(catalogModels.length / MODELS_PER_PAGE);
    if (catalogModels.length > MODELS_PER_PAGE) {
      keyboard.text(`📋 Browse All (${catalogModels.length} models, ${totalPages} pages)`, "model_page:0").row();
    } else {
      catalogModels.forEach((model) => addButton(model, "📎"));
    }
  }

  if (favorites.length === 0 && recent.length === 0 && !catalog) {
    logger.warn("[ModelHandler] No model choices found and catalog unavailable");
  }

  return keyboard;
}

/**
 * Show model selection menu
 * @param ctx grammY context
 */
export async function showModelSelectionMenu(ctx: Context): Promise<void> {
  try {
    const threadId = getScopeFromContext(ctx)?.threadId ?? null;
    const scopeKey = getScopeKeyFromContext(ctx);
    const currentModel = fetchCurrentModel(scopeKey);
    const modelLists = await getModelSelectionLists();
    const catalog = await getFullModelCatalog();
    const keyboard = await buildModelSelectionMenu(currentModel, modelLists);

    if (keyboard.inline_keyboard.length === 0) {
      await ctx.reply(t("model.menu.empty"), getThreadSendOptions(threadId));
      return;
    }

    const text = buildModelSelectionMenuText(modelLists, !!catalog);

    await replyWithInlineMenu(ctx, {
      menuKind: "model",
      text,
      keyboard,
    });
  } catch (err) {
    logger.error("[ModelHandler] Error showing model menu:", err);
    await ctx.reply(t("model.menu.error"), getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null));
  }
}
