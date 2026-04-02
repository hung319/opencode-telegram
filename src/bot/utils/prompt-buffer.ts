import { logger } from "../../utils/logger.js";

interface PendingPrompt {
  text: string;
  timer: ReturnType<typeof setTimeout>;
  isFirst: boolean;
}

const pendingPrompts = new Map<string, PendingPrompt>();

const DEBOUNCE_MS = 1500;

export function getPromptDebounceKey(chatId: number, userId: number, threadId: number | null): string {
  return `${chatId}:${userId}:${threadId ?? 0}`;
}

/**
 * Debounce multi-part messages from Telegram.
 * Returns true if this is the first part (caller should wait for debounce),
 * false if this is a continuation (caller should skip processing).
 * After debounce timeout, the accumulated text is returned via the callback.
 */
export function debouncePrompt(
  key: string,
  text: string,
  callback: (combinedText: string) => void,
): boolean {
  const existing = pendingPrompts.get(key);

  if (existing) {
    clearTimeout(existing.timer);
    existing.text += "\n" + text;
    logger.debug(`[PromptBuffer] Extended pending prompt for key=${key}, totalLength=${existing.text.length}`);
    return false;
  }

  logger.debug(`[PromptBuffer] Starting new pending prompt for key=${key}`);

  const entry: PendingPrompt = {
    text,
    isFirst: true,
    timer: setTimeout(() => {
      pendingPrompts.delete(key);
      callback(entry.text);
    }, DEBOUNCE_MS),
  };

  pendingPrompts.set(key, entry);
  return true;
}

export function cancelPendingPrompt(key: string): void {
  const existing = pendingPrompts.get(key);
  if (existing) {
    clearTimeout(existing.timer);
    pendingPrompts.delete(key);
    logger.debug(`[PromptBuffer] Cancelled pending prompt for key=${key}`);
  }
}

export function clearAllPendingPrompts(): void {
  for (const [, entry] of pendingPrompts) {
    clearTimeout(entry.timer);
  }
  pendingPrompts.clear();
}
