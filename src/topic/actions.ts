import { Context } from "grammy";
import { config } from "../config.js";
import { logger } from "../utils/logger.js";
import { updateTopicBindingStatus } from "../topic/manager.js";
import { TOPIC_SESSION_STATUS } from "../settings/manager.js";

interface TopicActionOptions {
  api: Context["api"];
  chatId: number;
  threadId: number;
  sessionTitle?: string;
}

export async function closeForumTopic(options: TopicActionOptions): Promise<void> {
  const { api, chatId, threadId } = options;

  try {
    await api.closeForumTopic(chatId, threadId);
    updateTopicBindingStatus(chatId, threadId, TOPIC_SESSION_STATUS.CLOSED);
    logger.info(`[TopicAction] Closed topic: chat=${chatId}, thread=${threadId}`);
  } catch (error) {
    logger.warn(`[TopicAction] Failed to close topic: chat=${chatId}, thread=${threadId}`, error);
  }
}

export async function deleteForumTopic(options: TopicActionOptions): Promise<void> {
  const { api, chatId, threadId } = options;

  try {
    await api.deleteForumTopic(chatId, threadId);
    updateTopicBindingStatus(chatId, threadId, TOPIC_SESSION_STATUS.CLOSED);
    logger.info(`[TopicAction] Deleted topic: chat=${chatId}, thread=${threadId}`);
  } catch (error) {
    logger.warn(`[TopicAction] Failed to delete topic: chat=${chatId}, thread=${threadId}`, error);
  }
}

export async function renameForumTopic(options: TopicActionOptions, suffix: string): Promise<void> {
  const { api, chatId, threadId, sessionTitle } = options;

  if (!sessionTitle) {
    return;
  }

  try {
    const newName = `${sessionTitle} ${suffix}`;
    await api.editForumTopic(chatId, threadId, { name: newName });
    logger.info(`[TopicAction] Renamed topic: chat=${chatId}, thread=${threadId} → "${newName}"`);
  } catch (error) {
    logger.warn(`[TopicAction] Failed to rename topic: chat=${chatId}, thread=${threadId}`, error);
  }
}

export async function handleSessionTopicCleanup(options: TopicActionOptions): Promise<void> {
  if (config.bot.deleteTopicOnSessionDelete) {
    if (options.sessionTitle) {
      await renameForumTopic(options, "[deleted]");
    }
    await deleteForumTopic(options);
  } else {
    if (options.sessionTitle) {
      await renameForumTopic(options, "[closed]");
    }
    await closeForumTopic(options);
  }
}
