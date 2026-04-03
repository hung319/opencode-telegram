import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ScheduledTask } from "../../src/scheduled-task/types.js";

const mocked = vi.hoisted(() => ({
  healthMock: vi.fn(),
  sessionCreateMock: vi.fn(),
  sessionPromptMock: vi.fn(),
  sessionDeleteMock: vi.fn(),
}));

vi.mock("../../src/opencode/client.js", () => ({
  opencodeClient: {
    global: {
      health: mocked.healthMock,
    },
    session: {
      create: mocked.sessionCreateMock,
      prompt: mocked.sessionPromptMock,
      delete: mocked.sessionDeleteMock,
    },
  },
}));

vi.mock("../../src/utils/logger.js", () => ({
  logger: {
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    error: vi.fn(),
  },
}));

const sampleTask: ScheduledTask = {
  id: "task-1",
  projectId: "proj-1",
  projectWorktree: "/repo",
  createdFromScopeKey: "scope-1",
  agent: "build",
  model: { providerID: "openai", modelID: "gpt-5", variant: null },
  delivery: { chatId: 42, threadId: null },
  scheduleText: "every day at 09:00",
  scheduleSummary: "Every day at 09:00",
  timezone: "UTC",
  prompt: "Run tests",
  createdAt: new Date().toISOString(),
  nextRunAt: null,
  lastRunAt: null,
  runCount: 0,
  lastStatus: "idle",
  lastError: null,
  kind: "once",
  runAt: new Date().toISOString(),
};

describe("scheduled-task/executor health check", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("skips task when server health check fails", async () => {
    mocked.healthMock.mockResolvedValue({ data: null, error: new Error("Server down") });

    const { executeScheduledTask } = await import(
      "../../src/scheduled-task/executor.js"
    );

    const result = await executeScheduledTask(sampleTask);

    expect(result.status).toBe("error");
    expect(result.errorMessage).toContain("not healthy or not responding");
    expect(mocked.sessionCreateMock).not.toHaveBeenCalled();
  });

  it("skips task when server is unhealthy", async () => {
    mocked.healthMock.mockResolvedValue({ data: { healthy: false }, error: null });

    const { executeScheduledTask } = await import(
      "../../src/scheduled-task/executor.js"
    );

    const result = await executeScheduledTask(sampleTask);

    expect(result.status).toBe("error");
    expect(result.errorMessage).toContain("not healthy or not responding");
    expect(mocked.sessionCreateMock).not.toHaveBeenCalled();
  });

  it("proceeds when server is healthy", async () => {
    mocked.healthMock.mockResolvedValue({ data: { healthy: true }, error: null });
    mocked.sessionCreateMock.mockResolvedValue({
      data: { id: "session-1", directory: "/repo", title: "Scheduled task run" },
      error: null,
    });
    mocked.sessionPromptMock.mockResolvedValue({
      data: { parts: [{ type: "text", text: "Tests passed" }] },
      error: null,
    });
    mocked.sessionDeleteMock.mockResolvedValue({ data: null, error: null });

    const { executeScheduledTask } = await import(
      "../../src/scheduled-task/executor.js"
    );

    const result = await executeScheduledTask(sampleTask);

    expect(result.status).toBe("success");
    expect(result.resultText).toBe("Tests passed");
    expect(mocked.sessionCreateMock).toHaveBeenCalled();
    expect(mocked.sessionDeleteMock).toHaveBeenCalled();
  });
});
