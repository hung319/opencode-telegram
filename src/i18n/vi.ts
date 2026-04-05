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
  "cmd.description.variant": "Chọn biến thể mô hình",
  "cmd.description.context": "Nén ngữ cảnh phiên",
  "cmd.description.ssh": "Cấu hình SSH cho Git",
  "cmd.description.opencode_start": "Khởi động máy chủ OpenCode",
  "cmd.description.opencode_stop": "Dừng máy chủ OpenCode",
  "cmd.description.help": "Trợ giúp",

  "callback.unknown_command": "Lệnh không xác định",
  "callback.processing_error": "Lỗi xử lý",

  "error.load_agents": "❌ Không tải được danh sách agent",
  "error.load_models": "❌ Không tải được danh sách mô hình",
  "error.load_variants": "❌ Không tải được danh sách biến thể",
  "error.context_button": "❌ Không xử lý được nút ngữ cảnh",
  "error.generic": "🔴 Đã xảy ra lỗi.",

  "interaction.blocked.expired": "⚠️ Tương tác này đã hết hạn. Vui lòng bắt đầu lại.",
  "interaction.blocked.expected_callback":
    "⚠️ Vui lòng sử dụng các nút inline cho bước này hoặc nhấn Hủy.",
  "interaction.blocked.expected_text": "⚠️ Vui lòng gửi tin nhắn văn bản cho bước này.",
  "interaction.blocked.expected_command": "⚠️ Vui lòng gửi lệnh cho bước này.",
  "interaction.blocked.command_not_allowed":
    "⚠️ Lệnh này không khả dụng trong bước hiện tại.",
  "interaction.blocked.finish_current":
    "⚠️ Hoàn thành tương tác hiện tại trước (trả lời hoặc hủy), sau đó mở menu khác.",

  "inline.blocked.expected_choice": "⚠️ Chọn một tùy chọn bằng nút inline hoặc nhấn Hủy.",
  "inline.blocked.command_not_allowed":
    "⚠️ Lệnh này không khả dụng khi menu inline đang hoạt động.",

  "question.blocked.expected_answer":
    "⚠️ Trả lời câu hỏi hiện tại bằng nút, Trả lời tùy chỉnh, hoặc Hủy.",
  "question.blocked.command_not_allowed":
    "⚠️ Lệnh này không khả dụng cho đến khi luồng câu hỏi hiện tại hoàn tất.",

  "inline.button.cancel": "❌ Hủy",
  "inline.inactive_callback": "Menu này không hoạt động",
  "inline.cancelled_callback": "Đã hủy",

  "common.unknown": "không xác định",
  "common.unknown_error": "lỗi không xác định",

  "start.welcome":
    "👋 Chào mừng đến với OpenCode Telegram Group Topics Bot!\n\nSử dụng lệnh:\n/projects — chọn dự án\n/sessions — danh sách phiên\n/new — phiên mới\n/status — trạng thái\n/help — trợ giúp\n\nSử dụng các nút phía dưới để chọn chế độ agent, mô hình và biến thể.",
  "start.welcome_dm":
    "👋 Chế độ DM chỉ giới hạn ở lệnh trạng thái và điều khiển bot/máy chủ.\n\nSử dụng luồng chủ đề nhóm để làm việc với dự án/phiên.",
  "help.keyboard_hint":
    "💡 Sử dụng các nút bàn phím phía dưới cho chế độ agent, mô hình, biến thể và thao tác ngữ cảnh.",
  "help.text":
    "📖 **Trợ giúp**\n\n/status - Kiểm tra trạng thái máy chủ\n/sessions - Danh sách phiên\n/new - Tạo phiên mới\n/help - Trợ giúp",

  "bot.thinking": "💭 Đang suy nghĩ...",
  "bot.project_not_selected":
    "🏗 Chưa chọn dự án.\n\nTrước tiên hãy chọn dự án với /projects.",
  "bot.creating_session": "🔄 Đang tạo phiên mới...",
  "bot.create_session_error":
    "🔴 Không tạo được phiên. Thử /new hoặc kiểm tra trạng thái máy chủ với /status.",
  "bot.session_created": "✅ Đã tạo phiên: {title}",
  "bot.session_busy":
    "⏳ Yêu cầu cuối cùng của bạn vẫn đang chạy, nên yêu cầu mới này chưa được bắt đầu.\n\nTại sao: OpenCode chỉ chấp nhận một lần chạy hoạt động mỗi phiên.\nPhải làm gì: đợi phản hồi hiện tại, hoặc dùng /abort nếu bị treo, sau đó gửi lại tin nhắn.",
  "bot.session_queued":
    "📝 Tin nhắn của bạn đã được xếp hàng cho phiên này.\n\nVị trí trong hàng: {position}\nTiếp theo: sẽ tự động bắt đầu sau khi lần chạy hiện tại hoàn tất.",
  "bot.session_queue_started":
    "▶️ Đang bắt đầu tin nhắn tiếp theo trong hàng cho phiên này.\n\nTin nhắn trong hàng:\n{preview}",
  "bot.session_reset_project_mismatch":
    "⚠️ Phiên hoạt động không khớp với dự án đã chọn, nên đã được đặt lại. Dùng /sessions để chọn hoặc /new để tạo phiên mới.",
  "bot.prompt_send_error":
    "⚠️ Không thể gửi tin nhắn này đến OpenCode.\n\nNguyên nhân: sự cố kết nối tạm thời giữa bot và máy chủ OpenCode.\nPhải làm gì: gửi lại tin nhắn. Nếu vẫn tiếp tục, chạy /status và kiểm tra OpenCode có thể truy cập được không.",
  "bot.prompt_send_error_session_not_found":
    "⚠️ Không thể gửi tin nhắn vì phiên hoạt động không còn khả dụng.\n\nTại sao: phiên có thể đã được đặt lại, thay đổi hoặc xóa.\nPhải làm gì: chọn phiên với /sessions hoặc tạo mới với /new, sau đó gửi lại tin nhắn.",
  "bot.session_error": "🔴 OpenCode trả về lỗi: {message}",
  "bot.session_retry":
    "🔁 {message}\n\nNhà cung cấp liên tục trả về cùng lỗi khi thử lại. Dùng /abort để hủy.",
  "bot.unknown_command": "⚠️ Lệnh không xác định: {command}. Dùng /help để xem các lệnh khả dụng.",
  "bot.photo_downloading": "⏳ Đang tải ảnh xuống...",
  "bot.photo_too_large": "⚠️ Ảnh quá lớn (tối đa {maxSizeMb}MB)",
  "bot.photo_model_no_image": "⚠️ Mô hình hiện tại không hỗ trợ đầu vào hình ảnh. Chỉ gửi văn bản.",
  "bot.photo_download_error": "🔴 Không tải được ảnh",
  "bot.photo_no_caption": "💡 Mẹo: Thêm chú thích để mô tả những gì bạn muốn làm với ảnh này.",
  "bot.file_downloading": "⏳ Đang tải tệp xuống...",
  "bot.file_too_large": "⚠️ Tệp quá lớn (tối đa {maxSizeMb}MB)",
  "bot.file_download_error": "🔴 Không tải được tệp",
  "bot.model_no_pdf": "⚠️ Mô hình hiện tại không hỗ trợ đầu vào PDF. Chỉ gửi văn bản.",
  "bot.text_file_too_large": "⚠️ Tệp văn bản quá lớn (tối đa {maxSizeKb}KB)",

  "status.header_running": "🟢 Máy chủ OpenCode đang chạy",
  "status.health.healthy": "Khỏe mạnh",
  "status.health.unhealthy": "Không khỏe mạnh",
  "status.line.health": "Trạng thái: {health}",
  "status.line.version": "Phiên bản: {version}",
  "status.line.managed_yes": "Khởi động bởi bot: Có",
  "status.line.managed_no": "Khởi động bởi bot: Không (tiến trình bên ngoài)",
  "status.line.pid": "PID: {pid}",
  "status.line.uptime_sec": "Thời gian chạy: {seconds} giây",
  "status.line.mode": "Chế độ: {mode}",
  "status.line.model": "Mô hình: {model}",
  "status.line.tts": "Trả lời TTS: {tts}",
  "status.tts.on": "Bật",
  "status.tts.off": "Tắt",
  "status.agent_not_set": "chưa đặt",
  "status.project_selected": "🏗 Dự án: {project}",
  "status.project_not_selected": "🏗 Dự án: chưa chọn",
  "status.project_hint": "Sử dụng /projects để chọn dự án",
  "status.session_selected": "📋 Phiên hiện tại: {title}",
  "status.session_not_selected": "📋 Phiên hiện tại: chưa chọn",
  "status.session_hint": "Sử dụng /sessions để chọn hoặc /new để tạo",
  "status.global_overview": "📈 Tổng quan toàn cục",
  "status.global_projects": "Dự án: {count}",
  "status.global_sessions": "Phiên: {count}",
  "status.server_unavailable":
    "🔴 Máy chủ OpenCode không khả dụng\n\nSử dụng /opencode_start để khởi động máy chủ.",

  "status.mcp.header": "🔌 Máy chủ MCP:",
  "status.mcp.connected": "🟢",
  "status.mcp.disabled": "⚫",
  "status.mcp.failed": "🔴",
  "status.mcp.unknown": "❓",
  "status.lsp.header": "🔤 Máy chủ LSP:",
  "status.lsp.running": "🟢",
  "status.lsp.stopped": "🔴",
  "status.formatter.header": "✨ Bộ định dạng:",
  "status.formatter.enabled": "🟢",
  "status.formatter.disabled": "🔴",

  "tts.enabled": "🔊 Đã bật trả lời TTS cho phạm vi trò chuyện này.",
  "tts.enabled_not_configured":
    "🔊 Đã bật trả lời TTS cho phạm vi trò chuyện này.\n\nThông tin xác thực TTS chưa được cấu hình. Đặt `TTS_API_URL` và `TTS_API_KEY`, hoặc để chúng dùng dự phòng từ `STT_API_URL` và `STT_API_KEY`.",
  "tts.disabled": "🔇 Đã tắt trả lời TTS cho phạm vi trò chuyện này.",

  "dm.restricted.command":
    "⚠️ Lệnh điều khiển phiên bị tắt trong DM. Sử dụng luồng chủ đề nhóm để làm việc với dự án/phiên.",
  "dm.restricted.prompt":
    "⚠️ Prompt bị tắt trong DM. Sử dụng luồng chủ đề nhóm để chạy tác vụ OpenCode.",
  "help.dm.title": "Lệnh điều khiển DM",
  "help.dm.command_start": "hiển thị hướng dẫn chế độ DM",
  "help.dm.hint": "Sử dụng luồng chủ đề nhóm để làm việc với dự án/phiên.",
  "status.dm.title": "Tổng quan trạng thái DM",
  "status.dm.hint": "Sử dụng luồng chủ đề nhóm để chạy phiên OpenCode.",
  "group.general.prompts_disabled":
    "⚠️ Prompt bị tắt trong chủ đề General. Sử dụng /new để tạo chủ đề phiên riêng.",
  "topic.unbound": "⚠️ Chủ đề này không được liên kết với phiên nào. Vào chủ đề General và chạy /new.",

  "projects.empty":
    "📭 Không tìm thấy dự án nào.\n\nMở một thư mục trong OpenCode và tạo ít nhất một phiên, sau đó nó sẽ xuất hiện ở đây.",
  "projects.select": "Chọn một dự án:",
  "projects.select_with_current": "Chọn một dự án:\n\nHiện tại: 🏗 {project}",
  "projects.page_indicator": "Trang {current}/{total}",
  "projects.prev_page": "⬅️ Trước",
  "projects.next_page": "Tiếp ➡️",
  "projects.fetch_error":
    "🔴 Máy chủ OpenCode không khả dụng hoặc đã xảy ra lỗi khi tải dự án.",
  "projects.page_load_error": "Không thể tải trang này. Vui lòng thử lại.",
  "projects.selected":
    "✅ Đã chọn dự án: {project}\n\n📋 Phiên đã được đặt lại. Sử dụng /sessions hoặc /new cho dự án này.",
  "projects.select_error": "🔴 Không thể chọn dự án.",
  "projects.locked.topic_scope":
    "⚠️ Chủ đề này bị ràng buộc với phạm vi dự án/phiên của riêng nó. Chỉ chuyển đổi dự án từ General trước khi tạo chủ đề.",
  "projects.locked.group_project":
    "⚠️ Nhóm này đã được cấu hình cho dự án: {project}. Tạo nhóm mới nếu bạn muốn làm việc với kho lưu trữ khác.",
  "projects.locked.callback": "Chuyển đổi dự án bị khóa cho nhóm này.",

  "sessions.project_not_selected":
    "🏗 Chưa chọn dự án.\n\nTrước tiên hãy chọn dự án với /projects.",
  "sessions.empty": "📭 Không tìm thấy phiên nào.\n\nTạo phiên mới với /new.",
  "sessions.select": "Chọn một phiên:",
  "sessions.select_page": "Chọn một phiên (trang {page}):",
  "sessions.fetch_error":
    "🔴 Máy chủ OpenCode không khả dụng hoặc đã xảy ra lỗi khi tải phiên.",
  "sessions.select_project_first": "🔴 Chưa chọn dự án. Sử dụng /projects.",
  "sessions.page_empty_callback": "Không có phiên nào trên trang này",
  "sessions.page_load_error_callback": "Không thể tải trang này. Vui lòng thử lại.",
  "sessions.button.prev_page": "⬅️ Trước",
  "sessions.button.next_page": "Tiếp ➡️",
  "sessions.topic_locked":
    "⚠️ Chủ đề này bị ràng buộc với phiên hiện tại. Sử dụng /new trong General để tạo chủ đề khác.",
  "sessions.general_overview": "Tổng quan phiên chủ đề:",
  "sessions.general_item": "• {topic} (luồng #{thread}) - {status}",
  "sessions.general_empty": "Chưa có chủ đề phiên nào. Sử dụng /new để tạo.",
  "sessions.bound_topic_link": "🔗 Chủ đề cho phiên này: {url}",
  "sessions.created_topic_link": "✅ Đã tạo chủ đề cho phiên này: {url}",
  "sessions.loading_context": "⏳ Đang tải ngữ cảnh và tin nhắn mới nhất...",
  "sessions.selected": "✅ Đã chọn phiên: {title}",
  "sessions.select_error": "🔴 Không thể chọn phiên.",
  "sessions.preview.empty": "Không có tin nhắn gần đây.",
  "sessions.preview.title": "Tin nhắn gần đây:",
  "sessions.preview.you": "Bạn:",
  "sessions.preview.agent": "Agent:",
  "sessions.resume.assistant_title": "Tin nhắn agent cuối cùng:",
  "sessions.resume.last_turn_title": "Tin nhắn hiển thị cuối cùng:",
  "sessions.no_active_session": "⚠️ Không có phiên hoạt động trong topic này.",
  "sessions.summary.header": "📋 **Tóm tắt phiên**\n\n**{title}**",
  "sessions.summary.id": "ID: `{id}`",
  "sessions.summary.tokens": "Token: {used} / {limit}",
  "sessions.summary.directory": "Project: `{dir}`",
  "sessions.button.hide_message": "🙈 Ẩn tin nhắn này",
  "sessions.button.close_session": "🔒 Đóng phiên",
  "sessions.message_hidden": "Đã ẩn tin nhắn",
  "sessions.hide_error": "Không thể ẩn tin nhắn",
  "sessions.session_closed": "Đã đóng phiên",
  "sessions.closed_notification": "✅ Đã đóng phiên: {title}",
  "sessions.close_error": "Không thể đóng phiên",

  "last.title": "Tin nhắn mới nhất:",
  "last.session_not_selected": "📋 Chưa chọn phiên. Sử dụng /sessions hoặc /new trước.",
  "last.empty": "Không có tin nhắn hiển thị gần đây trong phiên này.",
  "last.fetch_error": "🔴 Không tải được tin nhắn phiên mới nhất.",

  "new.project_not_selected":
    "🏗 Chưa chọn dự án.\n\nTrước tiên hãy chọn dự án với /projects.",
  "new.created": "✅ Đã tạo phiên mới: {title}",
  "new.topic_only_in_general":
    "⚠️ Chạy /new từ chủ đề General để tạo chủ đề phiên riêng.",
  "new.requires_forum_general": "⚠️ /new yêu cầu chủ đề General trong nhóm siêu cấp có diễn đàn.",
  "new.topic_created": "✅ Chủ đề phiên đã sẵn sàng: {title}",
  "new.general_created": "✅ Đã tạo phiên OpenCode mới và chủ đề nhóm.",
  "new.topic_create_error":
    "🔴 Không tạo được chủ đề phiên. Kiểm tra quyền diễn đàn và thử lại.",
  "new.topic_create_no_rights":
    "🔴 Bot không thể tạo chủ đề diễn đàn trong nhóm này. Vui lòng cấp quyền quản lý chủ đề cho bot, sau đó thử lại /new.",
  "new.general_open_link": "🔗 Mở chủ đề: {url}",
  "new.create_error":
    "🔴 Máy chủ OpenCode không khả dụng hoặc đã xảy ra lỗi khi tạo phiên.",

  "task.project_not_selected":
    "🏗 Chưa chọn dự án.\n\nTrước tiên hãy chọn dự án với /projects.",
  "task.output_topic_blocked":
    "⚠️ Prompt bị tắt trong Đầu ra tác vụ định kỳ. Sử dụng 🎛️ Điều khiển phiên để quản lý dự án, phiên và tác vụ định kỳ.",
  "task.output_topic_commands_only":
    "⚠️ Hầu hết lệnh bị tắt trong Đầu ra tác vụ định kỳ. Sử dụng 🎛️ Điều khiển phiên để quản lý dự án, phiên và tác vụ định kỳ.",
  "task.schedule_prompt":
    "Gửi lịch biểu cho tác vụ này. Ví dụ: `mỗi ngày trong tuần lúc 09:00` hoặc `ngày mai lúc 18:30`.\n\nSau khi lịch biểu được phân tích, bạn vẫn có thể thay đổi mặc định agent và mô hình từ 🎛️ Điều khiển phiên trước khi gửi prompt cuối cùng.",
  "task.schedule_parsing":
    "⏳ Vẫn đang phân tích lịch biểu. Đợi bản xem trước trước khi gửi thêm văn bản.",
  "task.schedule_preview": "Đã phân tích lịch biểu.\n\nTóm tắt: {summary}\nLần chạy tiếp theo: {nextRunAt}",
  "task.prompt_prompt":
    "Gửi prompt cho tác vụ định kỳ này. Bạn vẫn có thể thay đổi mặc định agent, mô hình hoặc biến thể từ 🎛️ Điều khiển phiên trước khi gửi; tác vụ này sẽ sử dụng bất kỳ mặc định nào đang hoạt động khi bạn gửi prompt cuối cùng.",
  "task.schedule_error":
    "⚠️ Không thể phân tích lịch biểu: {message}\n\nGửi mô tả lịch biểu rõ ràng hơn.",
  "task.created": "✅ Đã tạo tác vụ định kỳ.\n\nLịch biểu: {summary}\nLần chạy tiếp theo: {nextRunAt}",
  "task.created_topic_link": "🔗 Các lần chạy định kỳ sẽ được đăng tại đây: {url}",
  "task.create_error": "🔴 Không tạo được tác vụ định kỳ.",
  "task.blocked.expected_text":
    "⚠️ Hoàn thành thiết lập tác vụ định kỳ trước bằng cách gửi văn bản được yêu cầu, hoặc dùng /abort để hủy.",
  "task.blocked.command_not_allowed":
    "⚠️ Lệnh này không khả dụng khi thiết lập tác vụ định kỳ đang hoạt động.",
  "task.blocked.finish_or_abort_to_change_defaults":
    "⚠️ Tác vụ này đã ghi nhận các mặc định 🎛️ Điều khiển phiên hiện tại. Hoàn thành nó như hiện tại, hoặc dùng /abort và bắt đầu /task lại nếu bạn muốn mặc định khác.",
  "task.blocked.only_defaults_before_prompt":
    "⚠️ Thiết lập tác vụ định kỳ đang hoạt động. Trước prompt cuối cùng, bạn chỉ có thể thay đổi mặc định agent, mô hình hoặc biến thể; nếu không hãy hoàn thành thiết lập hoặc dùng /abort.",
  "task.list.title": "Tác vụ định kỳ:",
  "task.list.empty": "📭 Không có tác vụ định kỳ nào cho dự án này trong trò chuyện này.",
  "task.list.none": "không lên lịch",
  "task.list.next_run": "Lần chạy tiếp theo: {value}",
  "task.list.status": "Trạng thái: {value}",
  "task.list.prompt": "Prompt: {value}",
  "task.list.delete_button": "Xóa #{index}",
  "task.list.deleted": "Đã xóa tác vụ định kỳ",
  "task.list.delete_missing": "Không tìm thấy tác vụ định kỳ",
  "task.list.delete_error": "Không xóa được tác vụ định kỳ",

  "cleanup.topic_use_general": "⚠️ Chạy /cleanup từ chủ đề General.",
  "cleanup.requires_forum_general":
    "⚠️ /cleanup chỉ khả dụng trong chủ đề General của nhóm siêu cấp có diễn đàn.",
  "cleanup.no_topics": "✅ Không có phiên chủ đề nào cần dọn dẹp.",
  "cleanup.result":
    "🧹 Dọn dẹp hoàn tất. Đã kiểm tra: {inspected}, đã đóng: {closed}, bỏ qua: {skipped}, thất bại: {failed}.",

  "stop.no_active_session":
    "🛑 Agent chưa được khởi động\n\nTạo phiên với /new hoặc chọn một phiên qua /sessions.",
  "stop.cancelled_interaction":
    "✅ Đã hủy thiết lập hiện tại. Bạn có thể thay đổi mặc định hoặc bắt đầu lại.",
  "stop.in_progress":
    "🛑 Đã dừng luồng sự kiện, đang gửi tín hiệu hủy...\n\nĐang đợi agent dừng.",
  "stop.warn_unconfirmed":
    "⚠️ Đã dừng luồng sự kiện, nhưng máy chủ không xác nhận hủy.\n\nKiểm tra /status và thử lại /abort sau vài giây.",
  "stop.warn_maybe_finished": "⚠️ Đã dừng luồng sự kiện, nhưng agent có thể đã hoàn tất.",
  "stop.success": "✅ Đã ngắt hành động của agent. Sẽ không còn tin nhắn nào từ lần chạy này.",
  "stop.warn_still_busy":
    "⚠️ Đã gửi tín hiệu, nhưng agent vẫn đang bận.\n\nLuồng sự kiện đã bị tắt, nên sẽ không có tin nhắn trung gian nào được gửi.",
  "stop.warn_timeout":
    "⚠️ Hết thời gian yêu cầu hủy.\n\nLuồng sự kiện đã bị tắt, thử lại /abort sau vài giây.",
  "stop.warn_local_only": "⚠️ Đã dừng luồng sự kiện cục bộ, nhưng hủy phía máy chủ thất bại.",
  "stop.error": "🔴 Không dừng được hành động.\n\nLuồng sự kiện đã dừng, thử lại /abort.",

  "opencode_start.already_running_managed":
    "⚠️ Máy chủ OpenCode đang chạy\n\nPID: {pid}\nThời gian chạy: {seconds} giây",
  "opencode_start.already_running_external":
    "✅ Máy chủ OpenCode đang chạy dưới dạng tiến trình bên ngoài\n\nPhiên bản: {version}\n\nMáy chủ này không được khởi động bởi bot, nên /opencode_stop không thể dừng nó.",
  "opencode_start.starting": "🔄 Đang khởi động máy chủ OpenCode...",
  "opencode_start.start_error":
    "🔴 Không khởi động được máy chủ OpenCode\n\nLỗi: {error}\n\nKiểm tra OpenCode CLI đã được cài đặt và khả dụng trong PATH:\nopencode --version\nnpm install -g @opencode-ai/cli",
  "opencode_start.started_not_ready":
    "⚠️ Máy chủ OpenCode đã khởi động, nhưng không phản hồi\n\nPID: {pid}\n\nMáy chủ có thể vẫn đang khởi động. Thử /status sau vài giây.",
  "opencode_start.success":
    "✅ Máy chủ OpenCode đã khởi động thành công\n\nPID: {pid}\nPhiên bản: {version}",
  "opencode_start.error":
    "🔴 Đã xảy ra lỗi khi khởi động máy chủ.\n\nKiểm tra nhật ký ứng dụng để biết chi tiết.",
  "opencode_stop.external_running":
    "⚠️ Máy chủ OpenCode đang chạy dưới dạng tiến trình bên ngoài\n\nMáy chủ này không được khởi động qua /opencode-start.\nDừng thủ công hoặc dùng /status để kiểm tra trạng thái.",
  "opencode_stop.not_running": "⚠️ Máy chủ OpenCode không chạy",
  "opencode_stop.stopping": "🛑 Đang dừng máy chủ OpenCode...\n\nPID: {pid}",
  "opencode_stop.stop_error": "🔴 Không dừng được máy chủ OpenCode\n\nLỗi: {error}",
  "opencode_stop.success": "✅ Máy chủ OpenCode đã dừng thành công",
  "opencode_stop.error":
    "🔴 Đã xảy ra lỗi khi dừng máy chủ.\n\nKiểm tra nhật ký ứng dụng để biết chi tiết.",

  "agent.changed_callback": "Đã thay đổi chế độ: {name}",
  "agent.changed_message": "✅ Đã chuyển chế độ sang: {name}",
  "agent.change_error_callback": "❌ Không thay đổi được chế độ",
  "agent.menu.current": "Chế độ hiện tại: {name}\n\nChọn chế độ:",
  "agent.menu.select": "Chọn chế độ làm việc:",
  "agent.menu.empty": "⚠️ Không có agent khả dụng",
  "agent.menu.error": "🔴 Không lấy được danh sách agent",

  "model.changed_callback": "Đã thay đổi mô hình: {name}",
  "model.changed_message": "✅ Đã chuyển mô hình sang: {name}",
  "model.change_error_callback": "❌ Không thay đổi được mô hình",
  "model.menu.empty": "⚠️ Không có mô hình khả dụng",
  "model.menu.select": "Chọn mô hình:",
  "model.menu.current": "Mô hình hiện tại: {name}\n\nChọn mô hình:",
  "model.menu.favorites_title": "⭐ Yêu thích (Thêm mô hình vào yêu thích trong OpenCode CLI)",
  "model.menu.favorites_empty": "— Trống.",
  "model.menu.recent_title": "🕘 Gần đây",
  "model.menu.recent_empty": "— Trống.",
  "model.menu.favorites_hint":
    "ℹ️ Thêm mô hình vào yêu thích trong OpenCode CLI để giữ chúng ở đầu danh sách.",
  "model.menu.error": "🔴 Không lấy được danh sách mô hình",

  "variant.model_not_selected_callback": "Lỗi: chưa chọn mô hình",
  "variant.changed_callback": "Đã thay đổi biến thể: {name}",
  "variant.changed_message": "✅ Đã chuyển biến thể sang: {name}",
  "variant.change_error_callback": "❌ Không thay đổi được biến thể",
  "variant.select_model_first": "⚠️ Chọn mô hình trước",
  "variant.menu.empty": "⚠️ Không có biến thể khả dụng",
  "variant.menu.current": "Biến thể hiện tại: {name}\n\nChọn biến thể:",
  "variant.menu.error": "🔴 Không lấy được danh sách biến thể",

  "context.button.confirm": "✅ Có, thu gọn ngữ cảnh",
  "context.no_active_session": "⚠️ Không có phiên hoạt động. Tạo phiên với /new",
  "context.no_context_limit": "⚠️ Giới hạn ngữ cảnh không khả dụng. Mở topic phiên trước.",
  "context.status_text":
    "📊 **Trạng thái ngữ cảnh**\n\nPhiên: {title}\nToken: {used} / {limit} ({percent}%)\n`{bar}`\n\nDùng compact để giảm sử dụng ngữ cảnh bằng cách xóa tin nhắn cũ.",
  "context.general_not_available":
    "⚠️ Thu gọn ngữ cảnh chỉ khả dụng trong chủ đề phiên, không khả dụng trong General.",
  "context.general_not_available_callback": "Mở chủ đề phiên trước.",
  "context.callback_session_not_found": "Không tìm thấy phiên",
  "context.callback_compacting": "Đang thu gọn ngữ cảnh...",
  "context.progress": "⏳ Đang thu gọn ngữ cảnh...",
  "context.error": "❌ Thu gọn ngữ cảnh thất bại",
  "context.success": "✅ Thu gọn ngữ cảnh thành công",
  "context.after_compaction": "✅ Cửa sổ ngữ cảnh sau khi thu gọn là {context}",

  "permission.inactive_callback": "Yêu cầu quyền không hoạt động",
  "permission.processing_error_callback": "Lỗi xử lý",
  "permission.no_active_request_callback": "Lỗi: không có yêu cầu hoạt động",
  "permission.reply.once": "Cho phép một lần",
  "permission.reply.always": "Luôn cho phép",
  "permission.reply.reject": "Từ chối",
  "permission.send_reply_error": "❌ Không gửi được phản hồi quyền",
  "permission.blocked.expected_reply":
    "⚠️ Vui lòng trả lời yêu cầu quyền trước bằng các nút ở trên.",
  "permission.blocked.command_not_allowed":
    "⚠️ Lệnh này không khả dụng cho đến khi bạn trả lời yêu cầu quyền.",
  "permission.header": "{emoji} Yêu cầu quyền: {name}\n\n",
  "permission.button.allow": "✅ Cho phép một lần",
  "permission.button.always": "🔓 Luôn cho phép",
  "permission.button.reject": "❌ Từ chối",
  "permission.name.bash": "Bash",
  "permission.name.edit": "Chỉnh sửa",
  "permission.name.write": "Ghi",
  "permission.name.read": "Đọc",
  "permission.name.webfetch": "Truy cập web",
  "permission.name.websearch": "Tìm kiếm web",
  "permission.name.glob": "Tìm kiếm tệp",
  "permission.name.grep": "Tìm kiếm nội dung",
  "permission.name.list": "Liệt kê thư mục",
  "permission.name.task": "Tác vụ",
  "permission.name.lsp": "LSP",
  "permission.name.external_directory": "Thư mục bên ngoài",

  "question.inactive_callback": "Poll không hoạt động",
  "question.processing_error_callback": "Lỗi xử lý",
  "question.select_one_required_callback": "Chọn ít nhất một tùy chọn",
  "question.enter_custom_callback": "Gửi câu trả lời tùy chỉnh của bạn như một tin nhắn",
  "question.cancelled": "❌ Đã hủy poll",
  "question.answer_already_received": "Đã nhận câu trả lời, vui lòng đợi...",
  "question.completed_no_answers": "✅ Poll đã hoàn tất (không có câu trả lời)",
  "question.no_active_project": "❌ Không có dự án hoạt động",
  "question.no_active_request": "❌ Không có yêu cầu hoạt động",
  "question.send_answers_error": "❌ Không gửi được câu trả lời đến agent",
  "question.multi_hint": "\n(Bạn có thể chọn nhiều tùy chọn)",
  "question.button.submit": "✅ Xong",
  "question.button.custom": "🔤 Trả lời tùy chỉnh",
  "question.button.cancel": "❌ Hủy",
  "question.use_custom_button_first":
    '⚠️ Để gửi văn bản, trước tiên hãy nhấn "🔤 Trả lời tùy chỉnh" cho câu hỏi hiện tại.',
  "question.summary.title": "✅ Poll đã hoàn tất!\n\n",
  "question.summary.question": "Câu hỏi {index}:\n{question}\n\n",
  "question.summary.answer": "Câu trả lời:\n{answer}\n\n",

  "keyboard.agent_mode": "{emoji} Chế độ {name}",
  "keyboard.context": "📊 {used} / {limit} ({percent}%)",
  "keyboard.context_empty": "📊 Điều khiển",
  "keyboard.sessions": "📋 Sessions",
  "keyboard.projects": "🏗 Projects",
  "keyboard.thinking": "🧠 Thinking",
  "keyboard.config": "⚙️ Config",
  "keyboard.general_defaults": "Mặc định phiên mới:",
  "keyboard.general_defaults_info":
    "Các mặc định này áp dụng cho phiên mới được tạo trong nhóm này:\n• Agent\n• Mô hình\n• Biến thể",
  "keyboard.variant": "💭 {name}",
  "keyboard.variant_default": "💡 Mặc định",
  "keyboard.updated": "⌨️ Bàn phím đã cập nhật",
  "keyboard.dm.status": "/status",
  "keyboard.dm.help": "/help",
  "keyboard.dm.opencode_start": "/opencode_start",
  "keyboard.dm.opencode_stop": "/opencode_stop",

  "pinned.default_session_title": "phiên mới",
  "pinned.unknown": "Không xác định",
  "pinned.line.project": "Dự án: {project}",
  "pinned.line.model": "Mô hình: {model}",
  "pinned.line.agent": "Agent: {agent}",
  "pinned.line.branch": "Branch: {branch}",
  "pinned.line.status": "Trạng thái: {status}",
  "pinned.line.created": "Tạo: {time}",
  "pinned.line.messages": "Tin nhắn: {count}",
  "pinned.line.context": "Ngữ cảnh: {used} / {limit} ({percent}%)",
  "pinned.line.cost": "Chi phí: {cost}",
  "subagent.completed": "Hoàn thành",
  "subagent.failed": "Thất bại",
  "subagent.working": "Đang làm",
  "subagent.line.task": "Tác vụ: {task}",
  "subagent.line.agent": "Agent: {agent}",
  "pinned.files.title": "Tệp ({count}):",
  "pinned.files.item": "  {path}{diff}",
  "pinned.files.more": "  ... và {count} tệp khác",
  "pinned.status_active": "Đang xử lý",
  "pinned.status_completed": "Hoàn thành",

  "tool.todo.overflow": "*({count} tác vụ khác)*",
  "tool.file_header.write":
    "Ghi tệp/đường dẫn: {path}\n============================================================\n\n",
  "tool.file_header.edit":
    "Chỉnh sửa tệp/đường dẫn: {path}\n============================================================\n\n",

  "runtime.wizard.ask_token": "Nhập token bot Telegram (lấy từ @BotFather).\n> ",
  "runtime.wizard.ask_language":
    "Chọn ngôn ngữ giao diện.\nNhập số ngôn ngữ từ danh sách hoặc mã locale.\nNhấn Enter để giữ ngôn ngữ mặc định: {defaultLocale}\n{options}\n> ",
  "runtime.wizard.language_invalid":
    "Nhập số ngôn ngữ từ danh sách hoặc mã locale được hỗ trợ.\n",
  "runtime.wizard.language_selected": "Ngôn ngữ đã chọn: {language}\n",
  "runtime.wizard.token_required": "Yêu cầu token. Vui lòng thử lại.\n",
  "runtime.wizard.token_invalid":
    "Token có vẻ không hợp lệ (định dạng dự kiến <id>:<secret>). Vui lòng thử lại.\n",
  "runtime.wizard.ask_user_id":
    "Nhập User ID Telegram của bạn (lấy từ @userinfobot).\n> ",
  "runtime.wizard.user_id_invalid": "Nhập số nguyên dương (> 0).\n",
  "runtime.wizard.ask_api_url":
    "Nhập URL API OpenCode (tùy chọn).\nNhấn Enter để dùng mặc định: {defaultUrl}\n> ",
  "runtime.wizard.ask_server_username":
    "Nhập username máy chủ OpenCode (tùy chọn).\nNhấn Enter để dùng mặc định: {defaultUsername}\n> ",
  "runtime.wizard.ask_server_password":
    "Nhập mật khẩu máy chủ OpenCode (tùy chọn, nhập ẩn).\nNhấn Enter để bỏ qua.\n> ",
  "runtime.wizard.api_url_invalid": "Nhập URL hợp lệ (http/https) hoặc nhấn Enter để dùng mặc định.\n",
  "runtime.wizard.start": "Thiết lập OpenCode Telegram Group Topics Bot.\n",
  "runtime.wizard.saved": "Đã lưu cấu hình:\n- {envPath}\n- {settingsPath}\n",
  "runtime.wizard.not_configured_starting":
    "Ứng dụng chưa được cấu hình. Đang khởi động trình hướng dẫn...\n",
  "runtime.wizard.tty_required":
    "Trình hướng dẫn tương tác yêu cầu terminal TTY. Chạy `opencode-telegram-group-topics-bot config` trong shell tương tác.",

  "rename.no_session": "⚠️ Không có phiên hoạt động. Tạo hoặc chọn phiên trước.",
  "rename.prompt": "📝 Nhập tiêu đề mới cho phiên:\n\nHiện tại: {title}",
  "rename.empty_title": "⚠️ Tiêu đề không được để trống.",
  "rename.success": "✅ Đã đổi tên phiên thành: {title}",
  "rename.error": "🔴 Không đổi tên được phiên.",
  "rename.cancelled": "❌ Đã hủy đổi tên.",
  "rename.inactive_callback": "Yêu cầu đổi tên không hoạt động",
  "rename.inactive": "⚠️ Yêu cầu đổi tên không hoạt động. Chạy /rename lại.",
  "rename.blocked.expected_name":
    "⚠️ Nhập tên phiên mới dưới dạng văn bản hoặc nhấn Hủy trong tin nhắn đổi tên.",
  "rename.blocked.command_not_allowed":
    "⚠️ Lệnh này không khả dụng khi đổi tên đang đợi tên mới.",
  "rename.button.cancel": "❌ Hủy",

  "commands.select": "Chọn một lệnh OpenCode:",
  "commands.empty": "📭 Không có lệnh OpenCode nào khả dụng cho dự án này.",
  "commands.fetch_error": "🔴 Không tải được lệnh OpenCode.",
  "commands.no_description": "Không có mô tả",
  "commands.select_page": "Chọn một lệnh OpenCode ({current}/{total}):",
  "commands.button.execute": "✅ Thực thi",
  "commands.button.prev_page": "⬅️ Trước",
  "commands.button.next_page": "Tiếp ➡️",
  "commands.button.cancel": "❌ Hủy",
  "commands.confirm":
    "Chạy {command}? Gửi phản hồi văn bản để truyền đối số, hoặc nhấn Thực thi để chạy nguyên bản.",
  "commands.inactive_callback": "Menu lệnh này không hoạt động",
  "commands.cancelled_callback": "Đã hủy",
  "commands.execute_callback": "Đang thực thi lệnh...",
  "commands.executing": "⚡ Đang khởi động lệnh OpenCode\n{command}",
  "commands.arguments_empty": "⚠️ Đối số không được để trống. Gửi văn bản hoặc nhấn Thực thi.",
  "commands.execute_error": "🔴 Không thực thi được lệnh OpenCode.",

  "delete.no_session": "⚠️ Không có phiên hoạt động. Tạo hoặc chọn phiên trước.",
  "delete.confirm": "🗑️ Xóa phiên \"{title}\"?\n\nThao tác này sẽ xóa vĩnh viễn phiên và tất cả dữ liệu. Không thể hoàn tác.\n\nNhấn Xóa để xác nhận hoặc Hủy để hủy bỏ.",
  "delete.deleted": "✅ Đã xóa phiên: {title}",
  "delete.error": "🔴 Không xóa được phiên.",
  "delete.cancelled": "❌ Đã hủy xóa.",
  "delete.inactive_callback": "Yêu cầu xóa không hoạt động",
  "delete.button.confirm": "🗑️ Xóa",
  "delete.button.cancel": "❌ Hủy",

  "share.no_session": "⚠️ Không có phiên hoạt động. Tạo hoặc chọn phiên trước.",
  "share.creating": "🔄 Đang tạo liên kết chia sẻ...",
  "share.created": "🔗 Liên kết chia sẻ: {url}",
  "share.unshared": "✅ Đã hủy chia sẻ phiên.",
  "share.already_shared": "🔗 Phiên đã được chia sẻ: {url}",
  "share.not_shared": "⚠️ Phiên này chưa được chia sẻ.",
  "share.error": "🔴 Không chia sẻ được phiên.",
  "share.unshare_error": "🔴 Không hủy chia sẻ được phiên.",
  "share.select_share_unshare": "Tùy chọn chia sẻ phiên:\n\nHiện tại: {status}",
  "share.status.shared": "Đã chia sẻ",
  "share.status.not_shared": "Chưa chia sẻ",
  "share.button.create": "🔗 Tạo liên kết",
  "share.button.remove": "❌ Xóa liên kết",

  "config.fetch_error": "🔴 Không tải được cấu hình OpenCode.",
  "config.updated": "✅ Đã cập nhật cấu hình thành công.",
  "config.update_error": "🔴 Không cập nhật được cấu hình.",
  "config.current": "📋 Cấu hình hiện tại:\n\n{config}",
  "config.select_section": "Chọn phần cấu hình để chỉnh sửa:",
  "config.no_changes": "⚠️ Không có thay đổi nào.",
  "config.button.view": "📋 Xem toàn bộ cấu hình",
  "config.button.edit": "✏️ Chỉnh sửa cấu hình",
  "config.menu": "⚙️ **Cài đặt**\n\nQuản lý MCP, plugins, providers hoặc xem raw config:",
  "config.btn.manage": "🔌 MCP / Plugins / Providers",
  "config.btn.raw": "📋 Xem Raw Config",
  "config.btn.close": "❌ Đóng",
  "config.raw_display": "📋 **Raw Config:**\n\n<pre>{config}</pre>",
  "config.error": "Đã xảy ra lỗi",
  "config.abort_text": "Gửi tin nhắn hoặc /abort để hủy.",

  "manage.menu": "🔧 **Quản lý OpenCode**\n\nChọn mục:",
  "manage.btn.mcp": "MCP Servers",
  "manage.btn.plugins": "Plugins",
  "manage.btn.providers": "Providers",
  "manage.btn.config": "Config",
  "manage.btn.close": "Đóng",

  "fork.no_session": "⚠️ Không có phiên hoạt động. Tạo hoặc chọn phiên trước.",
  "fork.created": "✅ Đã fork phiên: {title}",
  "fork.error": "🔴 Không fork được phiên.",
  "fork.select_message": "Chọn tin nhắn để fork từ:",
  "fork.no_messages": "📭 Không tìm thấy tin nhắn nào để fork.",

  "todo.no_session": "⚠️ Không có phiên hoạt động. Tạo hoặc chọn phiên trước.",
  "todo.empty": "📭 Không có tác vụ nào trong phiên này.",
  "todo.title": "📋 Danh sách todo cho phiên: {title}",
  "todo.fetch_error": "🔴 Không tải được danh sách todo.",
  "todo.item": "• {task}",
  "todo.completed": "✅",
  "todo.pending": "⏳",

  "files.no_session": "⚠️ Không có phiên hoạt động. Tạo hoặc chọn phiên trước.",
  "files.no_project": "🏗 Chưa chọn dự án.\n\nTrước tiên hãy chọn dự án với /projects.",
  "files.root": "📂 Tệp dự án (gốc):",
  "files.directory": "📂 {name}/",
  "files.file": "📄 {name}",
  "files.read_error": "🔴 Không đọc được tệp: {path}",
  "files.list_error": "🔴 Không liệt kê được thư mục: {path}",
  "files.back": "⬅️ Quay lại",
  "files.file_content": "📄 Tệp: {path}\n\n{content}",
  "files.file_too_large": "⚠️ Tệp quá lớn để hiển thị ({size} byte).",
  "files.select_file": "Chọn tệp hoặc thư mục:",
  "files.path_indicator": "📂 Đường dẫn: {path}",

  "mcp.status_title": "🔌 Trạng thái máy chủ MCP",
  "mcp.no_servers": "📭 Không có máy chủ MCP nào được cấu hình.",
  "mcp.fetch_error": "🔴 Không tải được trạng thái máy chủ MCP.",
  "mcp.add_prompt": "Gửi cấu hình máy chủ MCP dưới dạng JSON:\n\nVí dụ:\n```json\n{\"name\": \"my-server\", \"config\": {\"command\": \"npx\", \"args\": [\"-y\", \"@modelcontextprotocol/server-example\"]}}\n```",
  "mcp.added": "✅ Đã thêm máy chủ MCP: {name}",
  "mcp.add_error": "🔴 Không thêm được máy chủ MCP.",
  "mcp.connecting": "🔄 Đang kết nối máy chủ MCP: {name}...",
  "mcp.connected": "✅ Đã kết nối máy chủ MCP: {name}",
  "mcp.disconnected": "✅ Đã ngắt kết nối máy chủ MCP: {name}",
  "mcp.disconnect_error": "🔴 Không ngắt kết nối được máy chủ MCP.",
  "mcp.connect_error": "🔴 Không kết nối được máy chủ MCP.",
  "mcp.button.status": "📊 Trạng thái",
  "mcp.button.add": "➕ Thêm máy chủ",
  "mcp.button.connect": "🔗 Kết nối",
  "mcp.button.disconnect": "🔌 Ngắt kết nối",
  "mcp.server_status_running": "🟢 Đang chạy",
  "mcp.server_status_stopped": "🔴 Đã dừng",
  "mcp.server_status_error": "❌ Lỗi",

  "revert.no_session": "⚠️ Không có phiên hoạt động. Tạo hoặc chọn phiên trước.",
  "revert.success": "✅ Đã hoàn tác tin nhắn thành công.",
  "revert.error": "🔴 Không hoàn tác được tin nhắn.",
  "revert.no_message": "⚠️ Không có tin nhắn nào để hoàn tác trong phiên này.",

  "unrevert.no_session": "⚠️ Không có phiên hoạt động. Tạo hoặc chọn phiên trước.",
  "unrevert.success": "✅ Đã khôi phục tin nhắn thành công.",
  "unrevert.error": "🔴 Không khôi phục được tin nhắn.",

  "cmd.description.unrevert": "Khôi phục tin nhắn trong phiên",

  "messages.no_session": "⚠️ Không có phiên hoạt động. Tạo hoặc chọn phiên trước.",
  "messages.empty": "📭 Không có tin nhắn nào trong phiên này.",
  "messages.title": "💬 Tin nhắn cho phiên: {title}",
  "messages.fetch_error": "🔴 Không tải được tin nhắn.",
  "messages.user": "👤 Bạn: {text}",
  "messages.assistant": "🤖 Agent: {text}",
  "messages.page_indicator": "Trang {current}/{total}",
  "messages.button.prev_page": "⬅️ Trước",
  "messages.button.next_page": "Tiếp ➡️",
  "messages.button.cancel": "❌ Hủy",
  "messages.page_empty_callback": "Không có tin nhắn trên trang này",
  "messages.page_load_error_callback": "Không thể tải trang này. Vui lòng thử lại.",

  "cmd.description.delete": "Xóa phiên hiện tại",
  "cmd.description.share": "Chia sẻ liên kết phiên",
  "cmd.description.config": "Xem/chỉnh cấu hình OpenCode",
  "cmd.description.fork": "Fork phiên tại tin nhắn",
  "cmd.description.todo": "Xem danh sách todo của phiên",
  "cmd.description.files": "Duyệt tệp dự án",
  "cmd.description.mcp": "Quản lý máy chủ MCP",
  "cmd.description.revert": "Hoàn tác hành động cuối",
  "cmd.description.messages": "Xem tin nhắn phiên",
  "cmd.description.newproject": "Danh sách project khả dụng",
  "cmd.description.addproject": "Thêm project vào nhóm",
  "cmd.description.manage": "Quản lý cấu hình OpenCode",

  "cmd.description.rename": "Đổi tên phiên hiện tại",

  "cli.usage":
    "Sử dụng:\n  opencode-telegram-group-topics-bot [start] [--mode sources|installed]\n  opencode-telegram-group-topics-bot status\n  opencode-telegram-group-topics-bot stop\n  opencode-telegram-group-topics-bot config [--mode sources|installed]\n\nGhi chú:\n  - Không có lệnh sẽ mặc định là `start`\n  - `config` mặc định là chế độ installed trừ khi cung cấp `--mode sources`",
  "cli.placeholder.status":
    "Lệnh `status` hiện là chỗ giữ chỗ. Kiểm tra trạng thái thực sẽ được thêm ở lớp dịch vụ (Giai đoạn 5).",
  "cli.placeholder.stop":
    "Lệnh `stop` hiện là chỗ giữ chỗ. Dừng tiến trình nền thực sẽ được thêm ở lớp dịch vụ (Giai đoạn 5).",
  "cli.placeholder.unavailable": "Lệnh không khả dụng.",
  "cli.error.prefix": "Lỗi CLI: {message}",
  "cli.args.unknown_command": "Lệnh không xác định: {value}",
  "cli.args.mode_requires_value": "Tùy chọn --mode yêu cầu giá trị: sources|installed",
  "cli.args.invalid_mode": "Giá trị mode không hợp lệ: {value}. Mong đợi sources|installed",
  "cli.args.unknown_option": "Tùy chọn không xác định: {value}",
  "cli.args.mode_only_start": "Tùy chọn --mode chỉ được hỗ trợ cho lệnh start và config",

  "legacy.models.fetch_error": "🔴 Không lấy được danh sách mô hình. Kiểm tra trạng thái máy chủ với /status.",
  "legacy.models.empty": "📋 Không có mô hình khả dụng. Cấu hình nhà cung cấp trong OpenCode.",
  "legacy.models.header": "📋 Các mô hình khả dụng:\n\n",
  "legacy.models.no_provider_models": "  ⚠️ Không có mô hình khả dụng\n",
  "legacy.models.env_hint": "💡 Để sử dụng mô hình trong .env:\n",
  "legacy.models.error": "🔴 Đã xảy ra lỗi khi tải danh sách mô hình.",

  "stt.recognizing": "🎤 Đang nhận dạng âm thanh...",
  "stt.recognized": "🎤 Đã nhận dạng:\n{text}",
  "stt.not_configured":
    "🎤 Nhận dạng giọng nói chưa được cấu hình.\n\nĐặt STT_API_URL và STT_API_KEY trong .env để bật.",
  "stt.error": "🔴 Không nhận dạng được âm thanh: {error}",
  "stt.empty_result": "🎤 Không phát hiện giọng nói trong tin nhắn âm thanh.",

  "newproject.fetch_error": "🔴 Không thể tải danh sách project.",
  "newproject.no_available": "✅ Tất cả project khả dụng đã được thêm vào nhóm này.",
  "newproject.available": "📋 Project khả dụng để thêm:",
  "newproject.how_to_add": "\n💡 Dùng /addproject <tên-hoặc-id-project> để thêm.",
  "newproject.error": "🔴 Lỗi khi tải danh sách project.",

  "addproject.usage": "💡 Cách dùng: /addproject <tên-hoặc-id-project>\n\nDùng /newproject để xem danh sách project khả dụng.",
  "addproject.fetch_error": "🔴 Không thể tải danh sách project.",
  "addproject.not_found": "🔴 Không tìm thấy project: {query}",
  "addproject.added": "✅ Đã thêm project: {name}",
  "addproject.error": "🔴 Lỗi khi thêm project.",

  "projects.multi_info": "💡 Nhóm này hỗ trợ nhiều project. Dùng /newproject để xem project khả dụng, /addproject để thêm.",

  "ssh.usage": "🔧 Cấu hình SSH cho Git\n\nLệnh:\n/ssh list - Xem tất cả mapping\n/ssh add <user> <host> <private-key> - Thêm SSH key trực tiếp\n/ssh remove <host> <user> - Xóa mapping\n\nVí dụ: /ssh add hoangxg4 github.com -----BEGIN OPENSSH PRIVATE KEY-----...\nVí dụ: /ssh add dev git.myserver.com -----BEGIN OPENSSH PRIVATE KEY-----...\n\nHoạt động với mọi Git host: GitHub, GitLab, Bitbucket, self-hosted, v.v.",
  "ssh.available_keys": "🔑 SSH keys khả dụng ({count}):",
  "ssh.configured_hosts": "📋 SSH hosts đã cấu hình ({count}):",
  "ssh.invalid_url": "❌ SSH URL không hợp lệ. Định dạng: git@github.com:username/repo.git",
  "ssh.already_configured": "✅ Host {host} đã được cấu hình:\n  Key: {keyPath}",
  "ssh.no_keys_found": "❌ Không tìm thấy SSH key trong ~/.ssh. Tạo bằng: ssh-keygen -t ed25519",
  "ssh.configured_success": "✅ Cấu hình SSH host thành công!\n\nHost: {host}\nKey: {keyPath}\n\nKiểm tra kết nối thành công.",
  "ssh.configured_test_failed": "⚠️ Đã cấu hình SSH host, nhưng kiểm tra kết nối thất bại.\n\nHost: {host}\nKey: {keyPath}\n\nVui lòng xác minh SSH key đã được thêm vào Git provider.",
  "ssh.error": "❌ Lỗi khi cấu hình SSH: {message}",
  "ssh.add_usage": "Cách dùng: /ssh add <user> <host> <nội-dung-private-key>\nVí dụ: /ssh add hoangxg4 github.com -----BEGIN OPENSSH PRIVATE KEY-----\\n...",
  "ssh.remove_usage": "Cách dùng: /ssh remove <host> <user>\nVí dụ: /ssh remove github.com hoangxg4",
  "ssh.unsupported_host": "❌ Host không hỗ trợ: {host}\nHost hỗ trợ: {supported}",
  "ssh.invalid_host": "❌ Tên host không hợp lệ: {host}",
  "ssh.invalid_key": "❌ SSH private key không hợp lệ. Nội dung phải chứa 'BEGIN' và 'PRIVATE KEY'.",
  "ssh.list_header": "🔧 SSH Git Mappings",
  "ssh.no_mappings": "Chưa có mapping nào. Dùng /ssh add <user> <key> [host]",
  "ssh.key_not_found": "❌ Không tìm thấy SSH key: {keyPath}",
  "ssh.added_success": "✅ Đã thêm SSH mapping!\n\nUser: {user}\nHost: {host}\nHost alias: {hostAlias}\nKey: {keyPath}\n\nĐã cấu hình Git URL rewrite. git clone/push đến git@{host}:{user}/repo.git sẽ dùng key này.",
  "ssh.add_error": "❌ Lỗi khi thêm SSH mapping: {message}",
  "ssh.not_found": "❌ Không tìm thấy mapping cho {user}@{host}",
  "ssh.removed_success": "✅ Đã xóa SSH mapping cho {user}@{host}",
  "ssh.remove_error": "❌ Lỗi khi xóa SSH mapping: {message}",

  "cmd.description.clone": "Clone Git repository",
  "cmd.description.ls": "Duyệt tệp project",
  "cmd.description.open": "Mở nội dung tệp",
  "cmd.description.worktree": "Quản lý git worktree",

  "clone.usage": "🔧 Clone Git repository\n\nCách dùng: /clone <git-url>\nVí dụ: /clone git@github.com:user/repo.git",
  "clone.invalid_url": "❌ Git URL không hợp lệ. Dùng SSH (git@github.com:user/repo.git) hoặc HTTPS.",
  "clone.cloning": "🔄 Đang clone {repo}...",
  "clone.success": "✅ Đã clone {repo}\n\nĐường dẫn: {path}\n\nDùng /addproject để thêm vào nhóm.",
  "clone.error": "❌ Clone thất bại: {message}",

  "ls.no_project": "⚠️ Chưa chọn project. Dùng /projects trước.",
  "ls.empty": "📂 Thư mục {path} trống.",
  "ls.header": "📂 **{project}** - `{path}`",
  "ls.truncated": "Hiển thị {max} mục đầu tiên.",
  "ls.no_dirs": "Không có thư mục con",
  "ls.error": "❌ Không thể liệt kê thư mục.",

  "open.no_project": "⚠️ Chưa chọn project. Dùng /projects trước.",
  "open.usage": "📄 Mở tệp\n\nCách dùng: /open <đường-dẫn>\nVí dụ: /open src/index.ts",
  "open.not_found": "❌ Không tìm thấy tệp: {path}",
  "open.too_large": "📄 Tệp {path} quá lớn ({size}). Tối đa: {max}.",
  "open.header": "📄 **{path}**\n\n",

  "worktree.list_header": "🌿 Git Worktrees",
  "worktree.no_worktrees": "Không tìm thấy worktree nào.",
  "worktree.usage": "🌿 Quản lý git worktree\n\n/worktree list - Xem worktrees\n/worktree create <branch> - Tạo worktree cho branch",
  "worktree.no_project": "⚠️ Chưa chọn project.",
  "worktree.create_usage": "Cách dùng: /worktree create <branch>",
  "worktree.created": "✅ Đã tạo worktree cho branch: {branch}\nĐường dẫn: {path}",
  "worktree.error": "❌ Lỗi khi quản lý worktree: {message}",
  "worktree.switching": "Đang chuyển sang branch: {branch}",
  "worktree.switched": "✅ Đã chuyển sang branch: {branch}",

  "bot.server_crash": "🔴 **Máy chủ OpenCode bị crash**\n\nMáy chủ OpenCode đã dừng bất ngờ.\nDùng `/status` để kiểm tra hoặc `/opencode_start` để khởi động lại.",
} as const;
