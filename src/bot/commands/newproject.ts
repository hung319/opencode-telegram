import { CommandContext, Context } from "grammy";
import { opencodeClient } from "../../opencode/client.js";
import { setCurrentProject, getGroupProjects } from "../../settings/manager.js";
import { logger } from "../../utils/logger.js";
import { t } from "../../i18n/index.js";
import { getScopeFromContext, getScopeKeyFromContext, getThreadSendOptions } from "../scope.js";
import { CHAT_TYPE } from "../constants.js";

export async function newprojectCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    if (ctx.chat?.type === CHAT_TYPE.PRIVATE) {
      await ctx.reply(
        "⚠️ /newproject chỉ khả dụng trong nhóm.",
        getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
      );
      return;
    }

    const scope = getScopeFromContext(ctx);
    if (scope?.context !== "group-general") {
      await ctx.reply(
        "⚠️ Chạy /newproject từ chủ đề General.",
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const { data: projects, error } = await opencodeClient.project.list();

    if (error || !projects || !Array.isArray(projects)) {
      await ctx.reply(
        t("newproject.fetch_error"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const existingProjectIds = getGroupProjects(ctx.chat.id).map((p) => p.id);
    const availableProjects = projects.filter(
      (p: { id?: string }) => !existingProjectIds.includes(p.id ?? ""),
    );

    if (availableProjects.length === 0) {
      await ctx.reply(
        t("newproject.no_available"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    let message = t("newproject.available") + "\n\n";
    for (const project of availableProjects) {
      const name = (project as { name?: string }).name || (project as { id?: string }).id || "unknown";
      const worktree = (project as { worktree?: string }).worktree || "";
      message += `• **${name}**\n  \`${worktree}\`\n\n`;
    }

    message += t("newproject.how_to_add");

    await ctx.reply(
      message,
      {
        parse_mode: "Markdown",
        ...getThreadSendOptions(scope?.threadId ?? null),
      },
    );

    logger.info(`[NewProjectCommand] Listed ${availableProjects.length} available projects for chat ${ctx.chat.id}`);
  } catch (error) {
    logger.error("[NewProjectCommand] Error:", error);
    await ctx.reply(
      t("newproject.error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}

export async function addprojectCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    if (ctx.chat?.type === CHAT_TYPE.PRIVATE) {
      await ctx.reply(
        "⚠️ /addproject chỉ khả dụng trong nhóm.",
        getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
      );
      return;
    }

    const scope = getScopeFromContext(ctx);
    if (scope?.context !== "group-general") {
      await ctx.reply(
        "⚠️ Chạy /addproject từ chủ đề General.",
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const args = ctx.match.trim();
    if (!args) {
      await ctx.reply(
        t("addproject.usage"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const scopeKey = getScopeKeyFromContext(ctx);

    const { data: projects, error } = await opencodeClient.project.list();

    if (error || !projects || !Array.isArray(projects)) {
      await ctx.reply(
        t("addproject.fetch_error"),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const targetProject = projects.find(
      (p: { id?: string; name?: string; worktree?: string }) =>
        p.id === args || p.name === args || p.worktree === args,
    );

    if (!targetProject) {
      await ctx.reply(
        t("addproject.not_found", { query: args }),
        getThreadSendOptions(scope?.threadId ?? null),
      );
      return;
    }

    const projectInfo = {
      id: (targetProject as { id: string }).id,
      worktree: (targetProject as { worktree: string }).worktree,
      name: (targetProject as { name?: string }).name,
    };

    setCurrentProject(projectInfo, scopeKey);

    await ctx.reply(
      t("addproject.added", { name: projectInfo.name || projectInfo.id }),
      getThreadSendOptions(scope?.threadId ?? null),
    );

    logger.info(`[AddProjectCommand] Added project ${projectInfo.id} to chat ${ctx.chat.id}`);
  } catch (error) {
    logger.error("[AddProjectCommand] Error:", error);
    await ctx.reply(
      t("addproject.error"),
      getThreadSendOptions(getScopeFromContext(ctx)?.threadId ?? null),
    );
  }
}
