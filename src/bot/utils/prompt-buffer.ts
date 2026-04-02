import { logger } from "../../utils/logger.js";

interface PendingPrompt {
  text: string;
  timer: ReturnType<typeof setTimeout>;
  resolve: (text: string) => void;
}

const pendingPrompts = new Map<string, PendingPrompt>();

const DEBOUNCE_MS = 1500;

export function getPromptDebounceKey(chatId: number, userId: number, threadId: number | null): string {
  return `${chatId}:${userId}:${threadId ?? 0}`;
}

export function debouncePrompt(
  key: string,
  text: string,
): Promise<string> {
  return new Promise((resolve) => {
    const existing = pendingPrompts.get(key);

    if (existing) {
      clearTimeout(existing.timer);
      existing.text += "\n" + text;
      logger.debug(`[PromptBuffer] Extended pending prompt for key=${key}, totalLength=${existing.text.length}`);
    } else {
      logger.debug(`[PromptBuffer] Starting new pending prompt for key=${key}`);
    }

    const entry: PendingPrompt = {
      text: existing?.text ?? text,
      timer: setTimeout(() => {
        pendingPrompts.delete(key);
        resolve(entry.text);
      }, DEBOUNCE_MS),
      resolve,
    };

    pendingPrompts.set(key, entry);
  });
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
