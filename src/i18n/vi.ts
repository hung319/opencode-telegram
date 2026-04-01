export const vi = {
  "cmd.description.status": "Trạng thái máy chủ và phiên",
  "cmd.description.new": "Tạo phiên mới",
  "cmd.description.abort": "Hủy hành động hiện tại",
  "cmd.description.stop": "Dừng hành động hiện tại",
  "cmd.description.sessions": "Danh sách phiên",
  "cmd.description.last": "Hiển thị tin nhắn phiên mới nhất",
  "cmd.description.tts": "Bật/tắt trả lời TTS",
  "cmd.description.projects": "Danh sách dự án",
  "cmd.description.task": "Tạo tác vụ định kỳ",
  "cmd.description.tasklist": "Danh sách tác vụ định kỳ",
  "cmd.description.commands": "Lệnh tùy chỉnh",
  "cmd.description.model": "Chọn mô hình",
  "cmd.description.agent": "Chọn chế độ agent",
  "cmd.description.cleanup": "Đóng các luồng cũ",
  "cmd.description.opencode_start": "Khởi động máy chủ OpenCode",
  "cmd.description.opencode_stop": "Dừng máy chủ OpenCode",
  "cmd.description.help": "Trợ giúp",
  "cmd.description.rename": "Đổi tên phiên hiện tại",

  "callback.unknown_command": "Lệnh không xác định",
  "callback.processing_error": "Lỗi xử lý",

  "error.load_agents": "❌ Không tải được danh sách agents",
  "error.load_models": "❌ Không tải được danh sách mô hình",
  "error.load_variants": "❌ Không tải được danh sách variants",
  "error.context_button": "❌ Không xử lý được nút context",
  "error.generic": "🔴 Đã xảy ra lỗi.",

  "interaction.blocked.expired": "⚠️ Tương tác này đã hết hạn. Vui lòng bắt đầu lại.",
  "interaction.blocked.expected_callback": "⚠️ Vui lòng sử dụng các nút inline cho bước này hoặc nhấn Cancel.",
  "interaction.blocked.expected_text": "⚠️ Vui lòng gửi tin nhắn văn bản cho bước này.",
  "interaction.blocked.expected_command": "⚠️ Vui lòng gửi lệnh cho bước này.",
  "interaction.blocked.command_not_allowed": "⚠️ Lệnh này không khả dụng ở bước hiện tại.",
  "interaction.blocked.finish_current": "⚠️ Hoàn thành tương tác hiện tại trước (trả lời hoặc hủy), sau đó mở menu khác.",

  "inline.blocked.expected_choice": "⚠️ Chọn tùy chọn bằng các nút inline hoặc nhấn Cancel.",
  "inline.blocked.command_not_allowed": "⚠️ Lệnh này không khả dụng khi menu inline đang hoạt động.",

  "question.blocked.expected_answer": "⚠️ Trả lời câu hỏi hiện tại bằng nút, Custom answer, hoặc Cancel.",
  "question.blocked.command_not_allowed": "⚠️ Lệnh này không khả dụng cho đến khi hoàn thành luồng câu hỏi hiện tại.",

  "inline.button.cancel": "❌ Hủy",
  "inline.inactive_callback": "Menu này không hoạt động",
  "inline.cancelled_callback": "Đã hủy",

  "common.unknown": "không xác định",
  "common.unknown_error": "lỗi không xác định",

  "start.welcome": "👋 Chào mừng đến với OpenCode Telegram Group Topics Bot!\n\nSử dụng lệnh:\n/projects — chọn dự án\n/sessions — danh sách phiên\n/new — phiên mới\n/status — trạng thái\n/help — trợ giúp\n\nSử dụng các nút dưới để chọn chế độ agent, mô hình và variant.",
  "start.welcome_dm": "👋 Chế độ DM giới hạn ở trạng thái bot/máy chủ và lệnh điều khiển.\n\nSử dụng luồng topic trong nhóm để làm việc với dự án/phiên.",
  "help.keyboard_hint": "💡 Sử dụng các nút bàn phím dưới cùng cho chế độ agent, mô hình, variant và các hành động context.",
  "help.text": "📖 **Trợ giúp**\n\n/status - Kiểm tra trạng thái máy chủ\n/sessions - Danh sách phiên\n/new - Tạo phiên mới\n/help - Trợ giúp",

  "bot.thinking": "💭 Đang suy nghĩ...",
  "bot.project_not_selected": "🏗 Chưa chọn dự án.\n\nTrước tiên chọn dự án với /projects.",
  "bot.creating_session": "🔄 Đang tạo phiên mới...",
  "bot.create_session_error": "🔴 Không tạo được phiên. Thử /new hoặc kiểm tra trạng thái máy chủ với /status.",
  "bot.session_created": "✅ Đã tạo phiên: {title}",
  "bot.session_busy": "⏳ Yêu cầu trước đó vẫn đang chạy, nên yêu cầu mới này không được bắt đầu.\n\nTại sao: OpenCode chỉ chấp nhận một hoạt động active mỗi phiên.\nCần làm gì: đợi câu trả lời hiện tại, hoặc dùng /abort nếu có vẻ bị kẹt, sau đó gửi lại tin nhắn.",
  "bot.session_queued": "📝 Tin nhắn của bạn đã được xếp hàng cho phiên này.\n\nVị trí trong hàng: {position}\nĐiều gì sẽ xảy ra tiếp: nó sẽ tự động bắt đầu sau khi hoạt động hiện tại kết thúc.",
  "bot.session_queue_started": "▶️ Bắt đầu tin nhắn xếp hàng tiếp theo cho phiên này.\n\nTin nhắn xếp hàng:\n{preview}",
  "bot.session_reset_project_mismatch": "⚠️ Phiên đang hoạt động không khớp với dự án đã chọn, nên nó đã được đặt lại. Sử dụng /sessions để chọn hoặc /new để tạo phiên mới.",
  "bot.prompt_send_error": "⚠️ Không thể gửi tin nhắn này đến OpenCode.\n\nNguyên nhân có thể: sự cố kết nối tạm thời giữa bot và máy chủ OpenCode.\nCần làm gì: gửi lại tin nhắn. Nếu tiếp tục, chạy /status và kiểm tra OpenCode có thể truy cập được không.",
  "bot.prompt_send_error_session_not_found": "⚠️ Không thể gửi tin nhắn vì phiên đang hoạt động không còn khả dụng.\n\nTại sao: phiên có thể đã được đặt lại, thay đổi hoặc xóa.\nCần làm gì: chọn phiên với /sessions hoặc tạo phiên mới với /new, sau đó gửi lại tin nhắn.",
  "bot.session_error": "🔴 OpenCode trả về lỗi: {message}",
  "bot.session_retry": "🔁 {message}\n\nProvider tiếp tục trả về cùng một lỗi khi thử lại. Sử dụng /abort để hủy.",
  "bot.unknown_command": "⚠️ Lệnh không xác định: {command}. Sử dụng /help để xem các lệnh khả dụng.",
  "bot.photo_downloading": "⏳ Đang tải ảnh...",
  "bot.photo_too_large": "⚠️ Ảnh quá lớn (tối đa {maxSizeMb}MB)",
  "bot.photo_model_no_image": "⚠️ Mô hình hiện tại không hỗ trợ đầu vào hình ảnh. Chỉ gửi văn bản.",
  "bot.photo_download_error": "🔴 Không tải được ảnh",
  "bot.photo_no_caption": "💡 Gợi ý: Thêm mô tả để cho biết bạn muốn làm gì với ảnh này.",
  "bot.file_downloading": "⏳ Đang tải file...",
  "bot.file_too_large": "⚠️ File quá lớn (tối đa {maxSizeMb}MB)",
  "bot.file_download_error": "🔴 Không tải được file",
  "bot.model_no_pdf": "⚠️ Mô hình hiện tại không hỗ trợ đầu vào PDF. Chỉ gửi văn bản.",
  "bot.text_file_too_large": "⚠️ File văn bản quá lớn (tối đa {maxSizeKb}KB)",

  "status.header_running": "🟢 OpenCode Server is running",
  "status.health.healthy": "Healthy",
  "status.health.unhealthy": "Unhealthy",
  "status.line.health": "Status: {health}",
  "status.line.version": "Version: {version}",
  "status.line.managed_yes": "Started by this bot: Yes",
  "status.line.managed_no": "Started by this bot: No (external process)",
  "status.line.pid": "PID: {pid}",
  "status.line.uptime_sec": "Uptime: {seconds} sec",
  "status.line.mode": "Mode: {mode}",
  "status.line.model": "Model: {model}",
  "status.line.tts": "TTS replies: {tts}",
  "status.tts.on": "On",
  "status.tts.off": "Off",
  "status.agent_not_set": "not set",
  "status.project_selected": "🏗 Project: {project}",
  "status.project_not_selected": "🏗 Project: not selected",
  "status.project_hint": "Use /projects to select a project",
  "status.session_selected": "📋 Current session: {title}",
  "status.session_not_selected": "📋 Current session: not selected",
  "status.session_hint": "Use /sessions to select one or /new to create one",
  "status.global_overview": "📈 Global overview",
  "status.global_projects": "Projects: {count}",
  "status.global_sessions": "Sessions: {count}",
  "status.server_unavailable":
    "🔴 OpenCode Server is unavailable\n\nUse /opencode_start to start the server.",

  "tts.enabled": "🔊 TTS replies enabled for this chat scope.",
  "tts.enabled_not_configured":
    "🔊 TTS replies enabled for this chat scope.\n\nTTS credentials are not configured yet. Set `TTS_API_URL` and `TTS_API_KEY`, or let them fall back to `STT_API_URL` and `STT_API_KEY`.",
  "tts.disabled": "🔇 TTS replies disabled for this chat scope.",

  "dm.restricted.command":
    "⚠️ Session control commands are disabled in DM. Use a group topic thread for project/session work.",
  "dm.restricted.prompt":
    "⚠️ Prompts are disabled in DM. Use a group topic thread to run OpenCode tasks.",
  "help.dm.title": "DM control commands",
  "help.dm.command_start": "show DM mode guidance",
  "help.dm.hint": "Use group topic threads for project/session work.",
  "status.dm.title": "DM status overview",
  "status.dm.hint": "Use group topic threads to run OpenCode sessions.",
  "group.general.prompts_disabled":
    "⚠️ Prompts are disabled in General topic. Use /new to create a dedicated session topic.",
  "topic.unbound": "⚠️ This topic is not linked to any session. Go to General topic and run /new.",

  "projects.empty":
    "📭 No projects found.\n\nOpen a directory in OpenCode and create at least one session, then it will appear here.",
  "projects.select": "Select a project:",
  "projects.select_with_current": "Select a project:\n\nCurrent: 🏗 {project}",
  "projects.page_indicator": "Page {current}/{total}",
  "projects.prev_page": "⬅️ Previous",
  "projects.next_page": "Next ➡️",
  "projects.fetch_error":
    "🔴 OpenCode Server is unavailable or an error occurred while loading projects.",
  "projects.page_load_error": "Cannot load this page. Please try again.",
  "projects.selected":
    "✅ Project selected: {project}\n\n📋 Session was reset. Use /sessions or /new for this project.",
  "projects.select_error": "🔴 Failed to select project.",
  "projects.locked.topic_scope":
    "⚠️ This topic is bound to its own project/session scope. Switch projects only from General before creating topics.",
  "projects.locked.group_project":
    "⚠️ This group is already configured for project: {project}. Create a new group if you want to work on another repository.",
  "projects.locked.callback": "Project switching is locked for this group.",

  "sessions.project_not_selected":
    "🏗 Project is not selected.\n\nFirst select a project with /projects.",
  "sessions.empty": "📭 No sessions found.\n\nCreate a new session with /new.",
  "sessions.select": "Select a session:",
  "sessions.select_page": "Select a session (page {page}):",
  "sessions.fetch_error":
    "🔴 OpenCode Server is unavailable or an error occurred while loading sessions.",
  "sessions.select_project_first": "🔴 Project is not selected. Use /projects.",
  "sessions.page_empty_callback": "No sessions on this page",
  "sessions.page_load_error_callback": "Cannot load this page. Please try again.",
  "sessions.button.prev_page": "⬅️ Prev",
  "sessions.button.next_page": "Next ➡️",
  "sessions.topic_locked":
    "⚠️ This topic is bound to its current session. Use /new in General to create another topic.",
  "sessions.general_overview": "Topic sessions overview:",
  "sessions.general_item": "• {topic} (thread #{thread}) - {status}",
  "sessions.general_empty": "No session topics yet. Use /new to create one.",
  "sessions.bound_topic_link": "🔗 Topic for this session: {url}",
  "sessions.created_topic_link": "✅ Created topic for this session: {url}",
  "sessions.loading_context": "⏳ Loading context and latest messages...",
  "sessions.selected": "✅ Session selected: {title}",
  "sessions.select_error": "🔴 Failed to select session.",
  "sessions.preview.empty": "No recent messages.",
  "sessions.preview.title": "Recent messages:",
  "sessions.preview.you": "You:",
  "sessions.preview.agent": "Agent:",
  "sessions.resume.assistant_title": "Last agent message:",
  "sessions.resume.last_turn_title": "Last visible message:",

  "last.title": "Latest message:",
  "last.session_not_selected": "📋 No session selected. Use /sessions or /new first.",
  "last.empty": "No recent visible messages in this session.",
  "last.fetch_error": "🔴 Failed to load the latest session message.",

  "new.project_not_selected":
    "🏗 Project is not selected.\n\nFirst select a project with /projects.",
  "new.created": "✅ New session created: {title}",
  "new.topic_only_in_general":
    "⚠️ Run /new from the General topic to create a dedicated session topic.",
  "new.requires_forum_general": "⚠️ /new requires the General topic in a forum-enabled supergroup.",
  "new.topic_created": "✅ Session topic is ready: {title}",
  "new.general_created": "✅ Created a new OpenCode session and group topic.",
  "new.topic_create_error":
    "🔴 Failed to create a session topic. Check forum permissions and try again.",
  "new.topic_create_no_rights":
    "🔴 I cannot create forum topics in this group. Please grant the bot topic management permission (Manage Topics), then retry /new.",
  "new.general_open_link": "🔗 Open topic: {url}",
  "new.create_error":
    "🔴 OpenCode Server is unavailable or an error occurred while creating session.",

  "task.project_not_selected":
    "🏗 Project is not selected.\n\nFirst select a project with /projects.",
  "task.output_topic_blocked":
    "⚠️ Prompts are disabled in Scheduled Task Output. Use 🎛️ Session Control to manage projects, sessions, and scheduled tasks.",
  "task.output_topic_commands_only":
    "⚠️ Most commands are disabled in Scheduled Task Output. Use 🎛️ Session Control to manage projects, sessions, and scheduled tasks.",
  "task.schedule_prompt":
    "Send the schedule for this task. Examples: `every weekday at 09:00` or `tomorrow at 18:30`.\n\nAfter the schedule is parsed, you can still change agent and model defaults from 🎛️ Session Control before sending the final task prompt.",
  "task.schedule_parsing":
    "⏳ Still parsing the schedule. Wait for the preview before sending more text.",
  "task.schedule_preview": "Schedule parsed.\n\nSummary: {summary}\nNext run: {nextRunAt}",
  "task.prompt_prompt":
    "Send the prompt for this scheduled task. You can still change the 🎛️ Session Control agent, model, or variant before sending it; this task will use whatever defaults are active when you send the final prompt.",
  "task.schedule_error":
    "⚠️ I could not parse that schedule: {message}\n\nSend a clearer schedule description.",
  "task.created": "✅ Scheduled task created.\n\nSchedule: {summary}\nNext run: {nextRunAt}",
  "task.created_topic_link": "🔗 Scheduled runs will be posted here: {url}",
  "task.create_error": "🔴 Failed to create the scheduled task.",
  "task.blocked.expected_text":
    "⚠️ Finish the scheduled task setup first by sending the requested text, or use /abort to cancel.",
  "task.blocked.command_not_allowed":
    "⚠️ This command is not available while scheduled task setup is active.",
  "task.blocked.finish_or_abort_to_change_defaults":
    "⚠️ This task already captured the current 🎛️ Session Control defaults. Finish it as-is, or use /abort and start /task again if you want different defaults.",
  "task.blocked.only_defaults_before_prompt":
    "⚠️ Scheduled task setup is active. Before the final prompt, you can only change agent, model, or variant defaults; otherwise finish the setup or use /abort.",
  "task.list.title": "Scheduled tasks:",
  "task.list.empty": "📭 No scheduled tasks for this project in this chat.",
  "task.list.none": "not scheduled",
  "task.list.next_run": "Next run: {value}",
  "task.list.status": "Status: {value}",
  "task.list.prompt": "Prompt: {value}",
  "task.list.delete_button": "Delete #{index}",
  "task.list.deleted": "Scheduled task deleted",
  "task.list.delete_missing": "Scheduled task not found",
  "task.list.delete_error": "Failed to delete scheduled task",

  "cleanup.topic_use_general": "⚠️ Run /cleanup from the General topic.",
  "cleanup.requires_forum_general":
    "⚠️ /cleanup is available only in the General topic of a forum-enabled supergroup.",
  "cleanup.no_topics": "✅ No topic sessions to clean up.",
  "cleanup.result":
    "🧹 Cleanup complete. Checked: {inspected}, closed: {closed}, skipped: {skipped}, failed: {failed}.",

  "stop.no_active_session":
    "🛑 Agent was not started\n\nCreate a session with /new or select one via /sessions.",
  "stop.cancelled_interaction":
    "✅ Cancelled the current setup. You can now change defaults or start again.",
  "stop.in_progress":
    "🛑 Event stream stopped, sending abort signal...\n\nWaiting for agent to stop.",
  "stop.warn_unconfirmed":
    "⚠️ Event stream stopped, but server did not confirm abort.\n\nCheck /status and retry /abort in a few seconds.",
  "stop.warn_maybe_finished": "⚠️ Event stream stopped, but the agent may have already finished.",
  "stop.success": "✅ Agent action interrupted. No more messages from this run will be sent.",
  "stop.warn_still_busy":
    "⚠️ Signal sent, but agent is still busy.\n\nEvent stream is already disabled, so no intermediate messages will be sent.",
  "stop.warn_timeout":
    "⚠️ Abort request timeout.\n\nEvent stream is already disabled, retry /abort in a few seconds.",
  "stop.warn_local_only": "⚠️ Event stream stopped locally, but server-side abort failed.",
  "stop.error": "🔴 Failed to stop action.\n\nEvent stream is stopped, try /abort again.",

  "opencode_start.already_running_managed":
    "⚠️ OpenCode Server is already running\n\nPID: {pid}\nUptime: {seconds} seconds",
  "opencode_start.already_running_external":
    "✅ OpenCode Server is already running as an external process\n\nVersion: {version}\n\nThis server was not started by bot, so /opencode-stop cannot stop it.",
  "opencode_start.starting": "🔄 Starting OpenCode Server...",
  "opencode_start.start_error":
    "🔴 Failed to start OpenCode Server\n\nError: {error}\n\nCheck that OpenCode CLI is installed and available in PATH:\nopencode --version\nnpm install -g @opencode-ai/cli",
  "opencode_start.started_not_ready":
    "⚠️ OpenCode Server started, but is not responding\n\nPID: {pid}\n\nServer may still be starting. Try /status in a few seconds.",
  "opencode_start.success":
    "✅ OpenCode Server started successfully\n\nPID: {pid}\nVersion: {version}",
  "opencode_start.error":
    "🔴 An error occurred while starting server.\n\nCheck application logs for details.",
  "opencode_stop.external_running":
    "⚠️ OpenCode Server is running as an external process\n\nThis server was not started via /opencode-start.\nStop it manually or use /status to check state.",
  "opencode_stop.not_running": "⚠️ OpenCode Server is not running",
  "opencode_stop.stopping": "🛑 Stopping OpenCode Server...\n\nPID: {pid}",
  "opencode_stop.stop_error": "🔴 Failed to stop OpenCode Server\n\nError: {error}",
  "opencode_stop.success": "✅ OpenCode Server stopped successfully",
  "opencode_stop.error":
    "🔴 An error occurred while stopping server.\n\nCheck application logs for details.",

  "agent.changed_callback": "Mode changed: {name}",
  "agent.changed_message": "✅ Mode changed to: {name}",
  "agent.change_error_callback": "Failed to change mode",
  "agent.menu.current": "Current mode: {name}\n\nSelect mode:",
  "agent.menu.select": "Select work mode:",
  "agent.menu.empty": "⚠️ No available agents",
  "agent.menu.error": "🔴 Failed to get agents list",

  "model.changed_callback": "Model changed: {name}",
  "model.changed_message": "✅ Model changed to: {name}",
  "model.change_error_callback": "Failed to change model",
  "model.menu.empty": "⚠️ No available models",
  "model.menu.select": "Select model:",
  "model.menu.current": "Current model: {name}\n\nSelect model:",
  "model.menu.favorites_title": "⭐ Favorites (Add models to favorites in OpenCode CLI)",
  "model.menu.favorites_empty": "— Empty.",
  "model.menu.recent_title": "🕘 Recent",
  "model.menu.recent_empty": "— Empty.",
  "model.menu.favorites_hint":
    "ℹ️ Add models to favorites in OpenCode CLI to keep them at the top.",
  "model.menu.error": "🔴 Failed to get models list",

  "variant.model_not_selected_callback": "Error: model is not selected",
  "variant.changed_callback": "Variant changed: {name}",
  "variant.changed_message": "✅ Variant changed to: {name}",
  "variant.change_error_callback": "Failed to change variant",
  "variant.select_model_first": "⚠️ Select a model first",
  "variant.menu.empty": "⚠️ No available variants",
  "variant.menu.current": "Current variant: {name}\n\nSelect variant:",
  "variant.menu.error": "🔴 Failed to get variants list",

  "context.button.confirm": "✅ Yes, compact context",
  "context.no_active_session": "⚠️ No active session. Create a session with /new",
  "context.confirm_text":
    '📊 Context compaction for session "{title}"\n\nThis will reduce context usage by removing old messages from history. Current task will not be interrupted.\n\nContinue?',
  "context.general_not_available":
    "⚠️ Context compaction is only available inside a session topic, not in General.",
  "context.general_not_available_callback": "Open a session topic first.",
  "context.callback_session_not_found": "Session not found",
  "context.callback_compacting": "Compacting context...",
  "context.progress": "⏳ Compacting context...",
  "context.error": "❌ Context compaction failed",
  "context.success": "✅ Context compacted successfully",
  "context.after_compaction": "✅ Context window after compaction is {context}",

  "permission.inactive_callback": "Permission request is inactive",
  "permission.processing_error_callback": "Processing error",
  "permission.no_active_request_callback": "Error: no active request",
  "permission.reply.once": "Allowed once",
  "permission.reply.always": "Always allowed",
  "permission.reply.reject": "Rejected",
  "permission.send_reply_error": "❌ Failed to send permission reply",
  "permission.blocked.expected_reply":
    "⚠️ Please answer the permission request first using the buttons above.",
  "permission.blocked.command_not_allowed":
    "⚠️ This command is not available until you answer the permission request.",
  "permission.header": "{emoji} Permission request: {name}\n\n",
  "permission.button.allow": "✅ Allow once",
  "permission.button.always": "🔓 Allow always",
  "permission.button.reject": "❌ Reject",
  "permission.name.bash": "Bash",
  "permission.name.edit": "Edit",
  "permission.name.write": "Write",
  "permission.name.read": "Read",
  "permission.name.webfetch": "Web Fetch",
  "permission.name.websearch": "Web Search",
  "permission.name.glob": "File Search",
  "permission.name.grep": "Content Search",
  "permission.name.list": "List Directory",
  "permission.name.task": "Task",
  "permission.name.lsp": "LSP",
  "permission.name.external_directory": "External Directory",

  "question.inactive_callback": "Poll is inactive",
  "question.processing_error_callback": "Processing error",
  "question.select_one_required_callback": "Select at least one option",
  "question.enter_custom_callback": "Send your custom answer as a message",
  "question.cancelled": "❌ Poll cancelled",
  "question.answer_already_received": "Answer already received, please wait...",
  "question.completed_no_answers": "✅ Poll completed (no answers)",
  "question.no_active_project": "❌ No active project",
  "question.no_active_request": "❌ No active request",
  "question.send_answers_error": "❌ Failed to send answers to agent",
  "question.multi_hint": "\n(You can select multiple options)",
  "question.button.submit": "✅ Done",
  "question.button.custom": "🔤 Custom answer",
  "question.button.cancel": "❌ Cancel",
  "question.use_custom_button_first":
    '⚠️ To send text, tap "Custom answer" for the current question first.',
  "question.summary.title": "✅ Poll completed!\n\n",
  "question.summary.question": "Question {index}:\n{question}\n\n",
  "question.summary.answer": "Answer:\n{answer}\n\n",

  "keyboard.agent_mode": "{emoji} {name} Mode",
  "keyboard.context": "📊 {used} / {limit} ({percent}%)",
  "keyboard.context_empty": "📊 Controls",
  "keyboard.general_defaults": "New Session Defaults:",
  "keyboard.general_defaults_info":
    "These defaults apply to newly created sessions in this group:\n• Agent\n• Model\n• Variant",
  "keyboard.variant": "💭 {name}",
  "keyboard.variant_default": "💡 Default",
  "keyboard.updated": "⌨️ Keyboard updated",
  "keyboard.dm.status": "/status",
  "keyboard.dm.help": "/help",
  "keyboard.dm.opencode_start": "/opencode_start",
  "keyboard.dm.opencode_stop": "/opencode_stop",

  "pinned.default_session_title": "new session",
  "pinned.unknown": "Unknown",
  "pinned.line.project": "Project: {project}",
  "pinned.line.model": "Model: {model}",
  "pinned.line.context": "Context: {used} / {limit} ({percent}%)",
  "pinned.line.cost": "Cost: {cost}",
  "subagent.completed": "Completed",
  "subagent.failed": "Failed",
  "subagent.working": "Working",
  "subagent.line.task": "Task: {task}",
  "subagent.line.agent": "Agent: {agent}",
  "pinned.files.title": "Files ({count}):",
  "pinned.files.item": "  {path}{diff}",
  "pinned.files.more": "  ... and {count} more",

  "tool.todo.overflow": "*({count} more tasks)*",
  "tool.file_header.write":
    "Write File/Path: {path}\n============================================================\n\n",
  "tool.file_header.edit":
    "Edit File/Path: {path}\n============================================================\n\n",

  "runtime.wizard.ask_token": "Enter Telegram bot token (get it from @BotFather).\n> ",
  "runtime.wizard.ask_language":
    "Select interface language.\nEnter the language number from the list or locale code.\nPress Enter to keep default language: {defaultLocale}\n{options}\n> ",
  "runtime.wizard.language_invalid":
    "Enter a language number from the list or a supported locale code.\n",
  "runtime.wizard.language_selected": "Selected language: {language}\n",
  "runtime.wizard.token_required": "Token is required. Please try again.\n",
  "runtime.wizard.token_invalid":
    "Token looks invalid (expected format <id>:<secret>). Please try again.\n",
  "runtime.wizard.ask_user_id":
    "Enter your Telegram User ID (you can get it from @userinfobot).\n> ",
  "runtime.wizard.user_id_invalid": "Enter a positive integer (> 0).\n",
  "runtime.wizard.ask_api_url":
    "Enter OpenCode API URL (optional).\nPress Enter to use default: {defaultUrl}\n> ",
  "runtime.wizard.ask_server_username":
    "Enter OpenCode server username (optional).\nPress Enter to use default: {defaultUsername}\n> ",
  "runtime.wizard.ask_server_password":
    "Enter OpenCode server password (optional, input hidden).\nPress Enter to skip.\n> ",
  "runtime.wizard.api_url_invalid": "Enter a valid URL (http/https) or press Enter for default.\n",
  "runtime.wizard.start": "OpenCode Telegram Group Topics Bot setup.\n",
  "runtime.wizard.saved": "Configuration saved:\n- {envPath}\n- {settingsPath}\n",
  "runtime.wizard.not_configured_starting":
    "Application is not configured yet. Starting wizard...\n",
  "runtime.wizard.tty_required":
    "Interactive wizard requires a TTY terminal. Run `opencode-telegram-group-topics-bot config` in an interactive shell.",

  "rename.no_session": "⚠️ No active session. Create or select a session first.",
  "rename.prompt": "📝 Enter new title for session:\n\nCurrent: {title}",
  "rename.empty_title": "⚠️ Title cannot be empty.",
  "rename.success": "✅ Session renamed to: {title}",
  "rename.error": "🔴 Failed to rename session.",
  "rename.cancelled": "❌ Rename cancelled.",
  "rename.inactive_callback": "Rename request is inactive",
  "rename.inactive": "⚠️ Rename request is not active. Run /rename again.",
  "rename.blocked.expected_name":
    "⚠️ Enter a new session name as text or tap Cancel in rename message.",
  "rename.blocked.command_not_allowed":
    "⚠️ This command is not available while rename is waiting for a new name.",
  "rename.button.cancel": "❌ Cancel",

  "commands.select": "Choose an OpenCode command:",
  "commands.empty": "📭 No OpenCode commands are available for this project.",
  "commands.fetch_error": "🔴 Failed to load OpenCode commands.",
  "commands.no_description": "No description",
  "commands.select_page": "Choose an OpenCode command ({current}/{total}):",
  "commands.button.execute": "✅ Execute",
  "commands.button.prev_page": "⬅️ Prev",
  "commands.button.next_page": "Next ➡️",
  "commands.button.cancel": "❌ Cancel",
  "commands.confirm":
    "Run {command}? Send a text reply to pass arguments, or tap Execute to run it as-is.",
  "commands.inactive_callback": "This command menu is inactive",
  "commands.cancelled_callback": "Cancelled",
  "commands.execute_callback": "Executing command...",
  "commands.executing": "⚡ Starting OpenCode command\n{command}",
  "commands.arguments_empty": "⚠️ Arguments cannot be empty. Send text or tap Execute.",
  "commands.execute_error": "🔴 Failed to execute OpenCode command.",

  "cli.usage":
    "Usage:\n  opencode-telegram-group-topics-bot [start] [--mode sources|installed]\n  opencode-telegram-group-topics-bot status\n  opencode-telegram-group-topics-bot stop\n  opencode-telegram-group-topics-bot config [--mode sources|installed]\n\nNotes:\n  - No command defaults to `start`\n  - `config` defaults to installed mode unless `--mode sources` is provided",
  "cli.placeholder.status":
    "Command `status` is currently a placeholder. Real status checks will be added in service layer (Phase 5).",
  "cli.placeholder.stop":
    "Command `stop` is currently a placeholder. Real background process stop will be added in service layer (Phase 5).",
  "cli.placeholder.unavailable": "Command is unavailable.",
  "cli.error.prefix": "CLI error: {message}",
  "cli.args.unknown_command": "Unknown command: {value}",
  "cli.args.mode_requires_value": "Option --mode requires a value: sources|installed",
  "cli.args.invalid_mode": "Invalid mode value: {value}. Expected sources|installed",
  "cli.args.unknown_option": "Unknown option: {value}",
  "cli.args.mode_only_start": "Option --mode is supported only for the start and config commands",

  "legacy.models.fetch_error": "🔴 Failed to get models list. Check server status with /status.",
  "legacy.models.empty": "📋 No available models. Configure providers in OpenCode.",
  "legacy.models.header": "📋 Available models:\n\n",
  "legacy.models.no_provider_models": "  ⚠️ No available models\n",
  "legacy.models.env_hint": "💡 To use model in .env:\n",
  "legacy.models.error": "🔴 An error occurred while loading models list.",

  "stt.recognizing": "🎤 Recognizing audio...",
  "stt.recognized": "🎤 Recognized:\n{text}",
  "stt.not_configured":
    "🎤 Voice recognition is not configured.\n\nSet STT_API_URL and STT_API_KEY in .env to enable it.",
  "stt.error": "🔴 Failed to recognize audio: {error}",
  "stt.empty_result": "🎤 No speech detected in the audio message.",
} as const;
