import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Context, CommandContext } from "grammy";
import { cleanupCommand } from "../../../src/bot/commands/cleanup.js";

const mocked = vi.hoisted(() => ({
  sessionGetMock: vi.fn(),
  getTopicBindingsByChatMock: vi.fn(),
  updateTopicBindingStatusMock: vi.fn(),
  closeForumTopicMock: vi.fn(),
}));

vi.mock("../../../src/opencode/client.js", () => ({
  opencodeClient: {
    session: {
      get: mocked.sessionGetMock,
    },
  },
}));

vi.mock("../../../src/topic/manager.js", () => ({
  getTopicBindingsByChat: mocked.getTopicBindingsByChatMock,
  updateTopicBindingStatus: mocked.updateTopicBindingStatusMock,
}));

vi.mock("../../../src/i18n/index.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../../src/i18n/index.js")>();
  return {
    ...actual,
    t: (key: string, params?: Record<string, unknown>) => {
      const messages: Record<string, string> = {
        "cleanup.requires_forum_general": "⚠️ Run /cleanup from the General topic.",
        "cleanup.no_topics": "✅ No topic sessions to clean up.",
        "cleanup.result":
          "🧹 Cleanup complete. Checked: {inspected}, closed: {closed}, skipped: {skipped}, failed: {failed}.",
      };
      let msg = messages[key] || key;
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          msg = msg.replace(`{${k}}`, String(v));
        }
      }
      return msg;
    },
  };
});

function createMockContext(options: {
  chatId?: number;
  chatType?: string;
  threadId?: number | null;
  isForum?: boolean;
  context?: string;
}): CommandContext<Context> {
  const chatType = options.chatType ?? "supergroup";
  const isForum = options.isForum ?? true;
  const threadId = options.threadId ?? null;

  return {
    chat: options.chatId
      ? {
          id: options.chatId,
          type: chatType,
          ...(isForum && { is_forum: true }),
        }
      : null,
    message: {
      message_thread_id: threadId ?? undefined,
      text: "/cleanup",
    },
    api: {
      closeForumTopic: mocked.closeForumTopicMock,
    },
    reply: vi.fn().mockResolvedValue(undefined),
  } as unknown as CommandContext<Context>;
}

describe("bot/commands/cleanup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocked.getTopicBindingsByChatMock.mockReturnValue([]);
    mocked.sessionGetMock.mockResolvedValue({ data: null, error: null });
  });

  it("rejects command when not in General topic", async () => {
    const ctx = createMockContext({
      chatId: -100,
      threadId: 55, // Not General topic
      isForum: true,
    });

    await cleanupCommand(ctx);

    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining("General"),
      expect.any(Object),
    );
    expect(mocked.getTopicBindingsByChatMock).not.toHaveBeenCalled();
  });

  it("rejects command in non-forum chat", async () => {
    const ctx = createMockContext({
      chatId: -100,
      isForum: false,
    });

    await cleanupCommand(ctx);

    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining("General"),
      expect.any(Object),
    );
  });

  it("shows no topics message when there are no bindings", async () => {
    mocked.getTopicBindingsByChatMock.mockReturnValue([]);

    const ctx = createMockContext({
      chatId: -100,
      threadId: 1, // General topic
      isForum: true,
    });

    await cleanupCommand(ctx);

    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining("No topic sessions"),
      expect.any(Object),
    );
  });

  it("skips already closed topics", async () => {
    mocked.getTopicBindingsByChatMock.mockReturnValue([
      {
        scopeKey: "scope1",
        chatId: -100,
        threadId: 55,
        sessionId: "session1",
        projectId: "project1",
        status: "closed",
      },
    ]);

    const ctx = createMockContext({
      chatId: -100,
      threadId: 1,
      isForum: true,
    });

    await cleanupCommand(ctx);

    expect(mocked.sessionGetMock).not.toHaveBeenCalled();
    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining("Checked: 1, closed: 0, skipped: 1"),
      expect.any(Object),
    );
  });

  it("closes topic when session no longer exists", async () => {
    mocked.getTopicBindingsByChatMock.mockReturnValue([
      {
        scopeKey: "scope1",
        chatId: -100,
        threadId: 55,
        sessionId: "session1",
        projectId: "project1",
        status: "active",
      },
    ]);
    mocked.sessionGetMock.mockResolvedValue({ data: null, error: new Error("Not found") });

    const ctx = createMockContext({
      chatId: -100,
      threadId: 1,
      isForum: true,
    });

    await cleanupCommand(ctx);

    expect(mocked.closeForumTopicMock).toHaveBeenCalledWith(-100, 55);
    expect(mocked.updateTopicBindingStatusMock).toHaveBeenCalled();
    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining("closed: 1"),
      expect.any(Object),
    );
  });

  it("skips topics when session still exists", async () => {
    mocked.getTopicBindingsByChatMock.mockReturnValue([
      {
        scopeKey: "scope1",
        chatId: -100,
        threadId: 55,
        sessionId: "session1",
        projectId: "project1",
        status: "active",
      },
    ]);
    mocked.sessionGetMock.mockResolvedValue({
      data: { id: "session1", title: "Test" },
      error: null,
    });

    const ctx = createMockContext({
      chatId: -100,
      threadId: 1,
      isForum: true,
    });

    await cleanupCommand(ctx);

    expect(mocked.closeForumTopicMock).not.toHaveBeenCalled();
    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining("skipped: 1"),
      expect.any(Object),
    );
  });

  it("handles closeForumTopic errors gracefully", async () => {
    mocked.getTopicBindingsByChatMock.mockReturnValue([
      {
        scopeKey: "scope1",
        chatId: -100,
        threadId: 55,
        sessionId: "session1",
        projectId: "project1",
        status: "active",
      },
    ]);
    mocked.sessionGetMock.mockResolvedValue({ data: null, error: new Error("Not found") });
    mocked.closeForumTopicMock.mockRejectedValue(new Error("API error"));

    const ctx = createMockContext({
      chatId: -100,
      threadId: 1,
      isForum: true,
    });

    await cleanupCommand(ctx);

    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining("failed: 1"),
      expect.any(Object),
    );
  });

  it("skips General topic thread", async () => {
    mocked.getTopicBindingsByChatMock.mockReturnValue([
      {
        scopeKey: "scope1",
        chatId: -100,
        threadId: 1, // General topic
        sessionId: "session1",
        projectId: "project1",
        status: "active",
      },
    ]);
    mocked.sessionGetMock.mockResolvedValue({ data: null, error: new Error("Not found") });

    const ctx = createMockContext({
      chatId: -100,
      threadId: 1,
      isForum: true,
    });

    await cleanupCommand(ctx);

    expect(mocked.closeForumTopicMock).not.toHaveBeenCalled();
    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining("skipped: 1"),
      expect.any(Object),
    );
  });
});
