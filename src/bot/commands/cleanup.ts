import { CommandContext, Context } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import {
  TOPIC_SESSION_STATUS,
  TopicSessionBinding,
} from "../../settings/manager.js";
import {
  getTopicBindingsByChat,
  updateTopicBindingStatus,
} from "../../topic/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { BOT_I18N_KEY, CHAT_TYPE, TELEGRAM_CHAT_FIELD } from "../constants.js";
import {
  GENERAL_TOPIC_THREAD_ID,
  SCOPE_CONTEXT,
  getScopeFromContext,
  getThreadSendOptions,
} from "../scope.js";

interface CleanupResult {
  inspected: number;
  closed: number;
  skipped: number;
  failed: number;
  errors: string[];
}

function isGeneralForumScope(ctx: Context): boolean {
  const scope = getScopeFromContext(ctx);
  const isForumEnabled =
    ctx.chat?.type === CHAT_TYPE.SUPERGROUP &&
    Reflect.get(ctx.chat, TELEGRAM_CHAT_FIELD.IS_FORUM) === true;

  return Boolean(
    isForumEnabled &&
    scope?.context === SCOPE_CONTEXT.GROUP_GENERAL &&
    (scope.threadId === null || scope.threadId === GENERAL_TOPIC_THREAD_ID),
  );
}

async function checkSessionExists(sessionId: string): Promise<boolean> {
  try {
    const { data, error } = await opencodeClient.session.get({ sessionID: sessionId });
    return !error && !!data;
  } catch {
    return false;
  }
}

async function closeTopicIfNeeded(
  chatId: number,
  threadId: number,
  binding: TopicSessionBinding,
  api: CommandContext<Context>["api"],
  result: CleanupResult,
): Promise<void> {
  // Skip if already closed/stale
  if (
    binding.status === TOPIC_SESSION_STATUS.CLOSED ||
    binding.status === TOPIC_SESSION_STATUS.STALE
  ) {
    result.skipped++;
    return;
  }

  // Skip General topic (thread 1)
  if (threadId === GENERAL_TOPIC_THREAD_ID) {
    result.skipped++;
    return;
  }

  // Check if session still exists
  const sessionExists = await checkSessionExists(binding.sessionId);

  if (!sessionExists) {
    try {
      // Close the topic via Telegram API
      await api.closeForumTopic(chatId, threadId);

      // Update binding status
      updateTopicBindingStatus(chatId, threadId, TOPIC_SESSION_STATUS.CLOSED);

      result.closed++;
      logger.info(
        `[Cleanup] Closed stale topic: chat=${chatId}, thread=${threadId}, session=${binding.sessionId}`,
      );
    } catch (error) {
      result.failed++;
      const errorMessage = error instanceof Error ? error.message : String(error);
      result.errors.push(`Thread ${threadId}: ${errorMessage}`);
      logger.warn(
        `[Cleanup] Failed to close topic: chat=${chatId}, thread=${threadId}`,
        error,
      );
    }
  } else {
    result.skipped++;
  }
}

export async function cleanupCommand(ctx: CommandContext<Context>): Promise<void> {
  const scope = getScopeFromContext(ctx);

  // Only allow in General topic
  if (!ctx.chat || !isGeneralForumScope(ctx)) {
    await ctx.reply(
      t(BOT_I18N_KEY.CLEANUP_REQUIRES_FORUM_GENERAL),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  const chatId = ctx.chat.id;
  const bindings = getTopicBindingsByChat(chatId);

  if (bindings.length === 0) {
    await ctx.reply(
      t(BOT_I18N_KEY.CLEANUP_NO_TOPICS),
      getThreadSendOptions(scope?.threadId ?? null),
    );
    return;
  }

  const result: CleanupResult = {
    inspected: 0,
    closed: 0,
    skipped: 0,
    failed: 0,
    errors: [],
  };

  // Process all bindings
  for (const binding of bindings) {
    result.inspected++;
    await closeTopicIfNeeded(chatId, binding.threadId, binding, ctx.api, result);
  }

  // Send result
  const message = t(BOT_I18N_KEY.CLEANUP_RESULT, {
    inspected: result.inspected,
    closed: result.closed,
    skipped: result.skipped,
    failed: result.failed,
  });

  await ctx.reply(message, getThreadSendOptions(scope?.threadId ?? null));
}
