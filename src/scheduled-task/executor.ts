import { opencodeClient } from "../opencode/client.js";
import { logger } from "../utils/logger.js";
import type { ScheduledTask, ScheduledTaskExecutionResult } from "./types.js";

const SCHEDULED_TASK_AGENT = "build";
const SCHEDULED_TASK_SESSION_TITLE = "Scheduled task run";
const HEALTH_CHECK_TIMEOUT_MS = 5000;
const PROMPT_TIMEOUT_MS = 300_000; // 5 minutes

/**
 * Check if OpenCode server is healthy before running scheduled tasks.
 * Returns true if server is ready, false otherwise.
 */
async function checkServerHealth(): Promise<boolean> {
  try {
    const { data, error } = await Promise.race([
      opencodeClient.global.health(),
      new Promise<{ data: null; error: Error }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: new Error("Health check timeout") }), HEALTH_CHECK_TIMEOUT_MS),
      ),
    ]);

    if (error || !data) {
      logger.warn("[ScheduledTaskExecutor] Server health check failed:", error);
      return false;
    }

    return data.healthy === true;
  } catch (error) {
    logger.warn("[ScheduledTaskExecutor] Server health check error:", error);
    return false;
  }
}

function collectResponseText(
  parts: Array<{ type?: string; text?: string; ignored?: boolean }>,
): string {
  return parts
    .filter((part) => part.type === "text" && typeof part.text === "string" && !part.ignored)
    .map((part) => part.text)
    .join("")
    .trim();
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }

  if (typeof error === "string" && error.trim()) {
    return error.trim();
  }

  return "Unknown scheduled task execution error";
}

export async function executeScheduledTask(
  task: ScheduledTask,
): Promise<ScheduledTaskExecutionResult> {
  const startedAt = new Date().toISOString();
  let sessionId: string | null = null;

  try {
    // Check server health before attempting to run the task
    const isHealthy = await checkServerHealth();
    if (!isHealthy) {
      throw new Error(
        "OpenCode server is not healthy or not responding. " +
          "Scheduled task skipped.",
      );
    }

    const { data: session, error: createError } = await opencodeClient.session.create({
      directory: task.projectWorktree,
      title: SCHEDULED_TASK_SESSION_TITLE,
    });

    if (createError || !session) {
      throw createError || new Error("Failed to create temporary scheduled task session");
    }

    sessionId = session.id;

    const promptOptions: {
      sessionID: string;
      directory: string;
      parts: Array<{ type: "text"; text: string }>;
      agent: string;
      model?: { providerID: string; modelID: string };
      variant?: string;
    } = {
      sessionID: session.id,
      directory: session.directory,
      parts: [{ type: "text", text: task.prompt }],
      agent: task.agent ?? SCHEDULED_TASK_AGENT,
    };

    if (task.model.providerID && task.model.modelID) {
      promptOptions.model = {
        providerID: task.model.providerID,
        modelID: task.model.modelID,
      };
    }

    if (task.model.variant) {
      promptOptions.variant = task.model.variant;
    }

    const { data: response, error: promptError } = await Promise.race([
      opencodeClient.session.prompt(promptOptions),
      new Promise<{ data: null; error: Error }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: new Error("Prompt execution timed out") }), PROMPT_TIMEOUT_MS),
      ),
    ]);

    if (promptError || !response) {
      throw promptError || new Error("Scheduled task prompt execution failed");
    }

    const resultText = collectResponseText(response.parts);
    if (!resultText) {
      throw new Error("Scheduled task returned an empty assistant response");
    }

    return {
      taskId: task.id,
      status: "success",
      startedAt,
      finishedAt: new Date().toISOString(),
      resultText,
      errorMessage: null,
    };
  } catch (error) {
    const errorMessage = toErrorMessage(error);
    logger.warn(
      `[ScheduledTaskExecutor] Task execution failed: id=${task.id}, message=${errorMessage}`,
    );

    return {
      taskId: task.id,
      status: "error",
      startedAt,
      finishedAt: new Date().toISOString(),
      resultText: null,
      errorMessage,
    };
  } finally {
    if (sessionId) {
      try {
        await opencodeClient.session.delete({ sessionID: sessionId });
      } catch (error) {
        logger.warn(
          `[ScheduledTaskExecutor] Failed to delete temporary session: sessionId=${sessionId}`,
          error,
        );
      }
    }
  }
}
