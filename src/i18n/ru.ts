import type { I18nDictionary } from "./en.js";

export const ru: I18nDictionary = {
  "cmd.description.status": "Статус сервера и сессии",
  "cmd.description.new": "Создать новую сессию",
  "cmd.description.abort": "Прервать текущее действие",
  "cmd.description.stop": "Прервать текущее действие",
  "cmd.description.sessions": "Список сессий",
  "cmd.description.last": "Показать последнее сообщение сессии",
  "cmd.description.tts": "Переключить TTS-ответы",
  "cmd.description.projects": "Список проектов",
  "cmd.description.task": "Создать отложенную задачу",
  "cmd.description.tasklist": "Список отложенных задач",
  "cmd.description.commands": "Пользовательские команды",
  "cmd.description.model": "Выбрать модель",
  "cmd.description.agent": "Выбрать режим агента",
  "cmd.description.cleanup": "Закрыть устаревшие темы",
  "cmd.description.variant": "Выбрать вариант модели",
  "cmd.description.context": "Сжать контекст сессии",
  "cmd.description.ssh": "Настроить SSH для Git",
  "cmd.description.opencode_start": "Запустить OpenCode сервер",
  "cmd.description.opencode_stop": "Остановить OpenCode сервер",
  "cmd.description.help": "Справка",

  "callback.unknown_command": "Неизвестная команда",
  "callback.processing_error": "Ошибка обработки",

  "error.load_agents": "❌ Ошибка при загрузке списка агентов",
  "error.load_models": "❌ Ошибка при загрузке списка моделей",
  "error.load_variants": "❌ Ошибка при загрузке списка вариантов",
  "error.context_button": "❌ Ошибка при обработке кнопки контекста",
  "error.generic": "🔴 Произошла ошибка.",

  "interaction.blocked.expired": "⚠️ Текущая интеракция устарела. Запустите ее снова.",
  "interaction.blocked.expected_callback":
    "⚠️ Для этого шага используйте inline-кнопки или нажмите Отмена.",
  "interaction.blocked.expected_text": "⚠️ Для этого шага отправьте текстовое сообщение.",
  "interaction.blocked.expected_command": "⚠️ Для этого шага отправьте команду.",
  "interaction.blocked.command_not_allowed": "⚠️ Эта команда недоступна на текущем шаге.",
  "interaction.blocked.finish_current":
    "⚠️ Сначала завершите текущую интеракцию (ответьте или отмените), затем откройте другое меню.",

  "inline.blocked.expected_choice": "⚠️ Выберите вариант через inline-кнопки или нажмите Отмена.",
  "inline.blocked.command_not_allowed": "⚠️ Эта команда недоступна, пока активно inline-меню.",

  "question.blocked.expected_answer":
    "⚠️ Ответьте на текущий вопрос кнопками, через Свой ответ, или нажмите Отмена.",
  "question.blocked.command_not_allowed":
    "⚠️ Эта команда недоступна, пока не завершен текущий опрос.",

  "inline.button.cancel": "❌ Отмена",
  "inline.inactive_callback": "Это меню уже неактивно",
  "inline.cancelled_callback": "Отменено",

  "common.unknown": "неизвестна",
  "common.unknown_error": "неизвестная ошибка",

  "start.welcome":
    "👋 Добро пожаловать в OpenCode Telegram Group Topics Bot!\n\nИспользуйте команды:\n/projects — выбрать проект\n/sessions — список сессий\n/new — новая сессия\n/status — статус\n/help — справка\n\nРежим, модель и вариант выбираются кнопками внизу.",
  "help.keyboard_hint":
    "💡 Режим, модель, вариант и действия с контекстом доступны через нижние кнопки клавиатуры.",
  "help.text":
    "📖 **Справка**\n\n/status - Проверить статус сервера\n/sessions - Список сессий\n/new - Создать новую сессию\n/help - Справка",

  "bot.thinking": "💭 Думаю...",
  "bot.project_not_selected": "🏗 Проект не выбран.\n\nСначала выберите проект командой /projects.",
  "bot.creating_session": "🔄 Создаю новую сессию...",
  "bot.create_session_error":
    "🔴 Не удалось создать сессию. Попробуйте команду /new или проверьте статус сервера /status.",
  "bot.session_created": "✅ Сессия создана: {title}",
  "bot.session_busy":
    "⏳ Предыдущий запрос все еще выполняется, поэтому новый не был запущен.\n\nПочему так: в одной сессии OpenCode обрабатывает только один активный запуск одновременно.\nЧто делать: дождитесь ответа, либо используйте /abort, если процесс завис, и отправьте сообщение снова.",
  "bot.session_queued":
    "📝 Ваше сообщение поставлено в очередь для этой сессии.\n\nПозиция в очереди: {position}\nЧто будет дальше: оно запустится автоматически после завершения текущего запуска.",
  "bot.session_queue_started":
    "▶️ Запускается следующее сообщение из очереди для этой сессии.\n\nСообщение из очереди:\n{preview}",
  "bot.session_reset_project_mismatch":
    "⚠️ Активная сессия не соответствует выбранному проекту, поэтому была сброшена. Используйте /sessions для выбора или /new для создания новой сессии.",
  "bot.prompt_send_error":
    "⚠️ Не удалось передать это сообщение в OpenCode.\n\nВозможная причина: временный сбой соединения между ботом и сервером OpenCode.\nЧто делать: отправьте сообщение еще раз. Если ошибка повторяется, выполните /status и проверьте доступность OpenCode.",
  "bot.prompt_send_error_session_not_found":
    "⚠️ Не удалось передать сообщение, потому что активная сессия больше недоступна.\n\nПочему так: сессия могла быть сброшена, переключена или удалена.\nЧто делать: выберите сессию через /sessions или создайте новую через /new, затем отправьте сообщение снова.",
  "bot.session_error": "🔴 OpenCode вернул ошибку: {message}",
  "bot.session_retry":
    "🔁 {message}\n\nПровайдер возвращает одну и ту же ошибку при повторных запросах. Используйте /abort для остановки.",
  "bot.unknown_command": "⚠️ Неизвестная команда: {command}. Используйте /help для списка команд.",
  "bot.photo_downloading": "⏳ Скачиваю фото...",
  "bot.photo_too_large": "⚠️ Фото слишком большое (макс. {maxSizeMb}МБ)",
  "bot.photo_model_no_image":
    "⚠️ Текущая модель не поддерживает изображения. Отправляю только текст.",
  "bot.photo_download_error": "🔴 Не удалось скачать фото",
  "bot.photo_no_caption": "💡 Совет: Добавьте подпись, чтобы описать, что делать с этим фото.",
  "bot.file_downloading": "⏳ Скачиваю файл...",
  "bot.file_too_large": "⚠️ Файл слишком большой (макс. {maxSizeMb}МБ)",
  "bot.file_download_error": "🔴 Не удалось скачать файл",
  "bot.model_no_pdf": "⚠️ Текущая модель не поддерживает PDF. Отправляю только текст.",
  "bot.text_file_too_large": "⚠️ Текстовый файл слишком большой (макс. {maxSizeKb}КБ)",

  "status.header_running": "🟢 OpenCode Server запущен",
  "status.health.healthy": "Healthy",
  "status.health.unhealthy": "Unhealthy",
  "status.line.health": "Статус: {health}",
  "status.line.version": "Версия: {version}",
  "status.line.managed_yes": "Управляется ботом: Да",
  "status.line.managed_no": "Управляется ботом: Нет",
  "status.line.pid": "PID: {pid}",
  "status.line.uptime_sec": "Uptime: {seconds} сек",
  "status.line.mode": "Режим: {mode}",
  "status.line.model": "Модель: {model}",
  "status.line.tts": "TTS-ответы: {tts}",
  "status.tts.on": "Вкл",
  "status.tts.off": "Выкл",
  "status.agent_not_set": "не установлен",
  "status.project_selected": "🏗 Проект: {project}",
  "status.project_not_selected": "🏗 Проект: не выбран",
  "status.project_hint": "Используйте /projects для выбора проекта",
  "status.session_selected": "📋 Текущая сессия: {title}",
  "status.session_not_selected": "📋 Текущая сессия: не выбрана",
  "status.session_hint": "Используйте /sessions для выбора или /new для создания",
  "status.server_unavailable":
    "🔴 OpenCode Server недоступен\n\nИспользуйте /opencode_start для запуска сервера.",

  "status.mcp.header": "🔌 MCP серверы:",
  "status.mcp.connected": "🟢",
  "status.mcp.disabled": "⚫",
  "status.mcp.failed": "🔴",
  "status.mcp.unknown": "❓",
  "status.lsp.header": "🔤 LSP серверы:",
  "status.lsp.running": "🟢",
  "status.lsp.stopped": "🔴",
  "status.formatter.header": "✨ Форматировщики:",
  "status.formatter.enabled": "🟢",
  "status.formatter.disabled": "🔴",

  "tts.enabled": "🔊 TTS-ответы включены для этой области чата.",
  "tts.enabled_not_configured":
    "🔊 TTS-ответы включены для этой области чата.\n\nУчетные данные TTS пока не настроены. Укажите `TTS_API_URL` и `TTS_API_KEY` или используйте `STT_API_URL` и `STT_API_KEY` как резервный вариант.",
  "tts.disabled": "🔇 TTS-ответы выключены для этой области чата.",

  "projects.empty":
    "📭 Проектов нет.\n\nОткройте директорию в OpenCode и создайте хотя бы одну сессию, после этого она появится здесь.",
  "projects.select": "Выберите проект:",
  "projects.select_with_current": "Выберите проект:\n\nТекущий: 🏗 {project}",
  "projects.page_indicator": "Страница {current}/{total}",
  "projects.prev_page": "⬅️ Назад",
  "projects.next_page": "Вперёд ➡️",
  "projects.fetch_error":
    "🔴 OpenCode Server недоступен или произошла ошибка при получении списка проектов.",
  "projects.page_load_error": "Не удалось загрузить эту страницу. Попробуйте снова.",
  "projects.selected":
    "✅ Проект выбран: {project}\n\n📋 Сессия сброшена. Используйте /sessions или /new для работы с этим проектом.",
  "projects.select_error": "🔴 Ошибка при выборе проекта.",
  "projects.locked.topic_scope":
    "⚠️ Этот топик привязан к собственному контексту проекта/сессии. Переключайте проекты только из General до создания топиков.",
  "projects.locked.group_project":
    "⚠️ Эта группа уже настроена для проекта: {project}. Создайте новую группу, если хотите работать с другим репозиторием.",
  "projects.locked.callback": "Смена проекта для этой группы заблокирована.",

  "sessions.project_not_selected":
    "🏗 Проект не выбран.\n\nСначала выберите проект командой /projects.",
  "sessions.empty": "📭 Сессий нет.\n\nСоздайте новую сессию командой /new.",
  "sessions.select": "Выберите сессию:",
  "sessions.select_page": "Выберите сессию (страница {page}):",
  "sessions.fetch_error":
    "🔴 OpenCode Server недоступен или произошла ошибка при получении списка сессий.",
  "sessions.select_project_first": "🔴 Проект не выбран. Используйте /projects.",
  "sessions.page_empty_callback": "На этой странице нет сессий",
  "sessions.page_load_error_callback":
    "Не удалось загрузить эту страницу. Пожалуйста, попробуйте снова.",
  "sessions.button.prev_page": "⬅️ Назад",
  "sessions.button.next_page": "Вперёд ➡️",
  "sessions.topic_locked":
    "⚠️ Эта тема привязана к текущей сессии. Используйте /new в General, чтобы создать новую тему.",
  "sessions.general_overview": "Обзор сессий по темам:",
  "sessions.general_item": "• {topic} (тред #{thread}) - {status}",
  "sessions.general_empty": "Тем сессий пока нет. Используйте /new для создания.",
  "sessions.bound_topic_link": "🔗 Топик для этой сессии: {url}",
  "sessions.created_topic_link": "✅ Топик для этой сессии создан: {url}",
  "sessions.loading_context": "⏳ Загружаю контекст и последние сообщения...",
  "sessions.selected": "✅ Сессия выбрана: {title}",
  "sessions.select_error": "🔴 Ошибка при выборе сессии.",
  "sessions.preview.empty": "Последних сообщений нет.",
  "sessions.preview.title": "Последние сообщения:",
  "sessions.preview.you": "Вы:",
  "sessions.preview.agent": "Агент:",
  "sessions.resume.assistant_title": "Последнее сообщение агента:",
  "sessions.resume.last_turn_title": "Последнее видимое сообщение:",

  "last.title": "Последнее сообщение:",
  "last.session_not_selected": "📋 Сессия не выбрана. Сначала используйте /sessions или /new.",
  "last.empty": "В этой сессии нет недавних видимых сообщений.",
  "last.fetch_error": "🔴 Не удалось загрузить последнее сообщение сессии.",

  "new.project_not_selected": "🏗 Проект не выбран.\n\nСначала выберите проект командой /projects.",
  "new.created": "✅ Создана новая сессия: {title}",
  "new.topic_only_in_general":
    "⚠️ Запустите /new в теме General, чтобы создать отдельную тему сессии.",
  "new.requires_forum_general":
    "⚠️ /new требует тему General в супергруппе с включёнными форумами.",
  "new.topic_created": "✅ Тема сессии готова: {title}",
  "new.general_created": "✅ Созданы новая сессия OpenCode и тема группы.",
  "new.topic_create_error":
    "🔴 Не удалось создать тему сессии. Проверьте права форума и попробуйте снова.",
  "new.topic_create_no_rights":
    '🔴 Я не могу создавать темы форума в этой группе. Выдайте боту право "Управление темами" и повторите /new.',
  "new.general_open_link": "🔗 Открыть тему: {url}",
  "new.create_error": "🔴 OpenCode Server недоступен или произошла ошибка при создании сессии.",

  "task.project_not_selected":
    "🏗 Проект не выбран.\n\nСначала выберите проект командой /projects.",
  "task.output_topic_blocked":
    "⚠️ Промпты отключены в Scheduled Task Output. Используйте 🎛️ Session Control для управления проектами, сессиями и отложенными задачами.",
  "task.output_topic_commands_only":
    "⚠️ Большинство команд отключено в Scheduled Task Output. Используйте 🎛️ Session Control для управления проектами, сессиями и отложенными задачами.",
  "task.schedule_prompt":
    "Отправьте расписание для этой задачи. Примеры: `каждый будний день в 09:00` или `завтра в 18:30`.\n\nПосле разбора расписания вы еще можете изменить настройки агента и модели из 🎛️ Session Control перед отправкой финального промпта.",
  "task.schedule_parsing": "⏳ Я все еще разбираю расписание. Дождитесь предпросмотра.",
  "task.schedule_preview":
    "Расписание распознано.\n\nОписание: {summary}\nСледующий запуск: {nextRunAt}",
  "task.prompt_prompt":
    "Отправьте промпт для этой отложенной задачи. Вы все еще можете изменить агента, модель или вариант из 🎛️ Session Control; задача использует те значения, которые активны в момент отправки финального промпта.",
  "task.schedule_error":
    "⚠️ Я не смог разобрать это расписание: {message}\n\nОтправьте более понятное описание.",
  "task.created":
    "✅ Отложенная задача создана.\n\nРасписание: {summary}\nСледующий запуск: {nextRunAt}",
  "task.created_topic_link": "🔗 Запуски по расписанию будут публиковаться здесь: {url}",
  "task.create_error": "🔴 Не удалось создать отложенную задачу.",
  "task.blocked.expected_text":
    "⚠️ Сначала завершите настройку отложенной задачи или используйте /abort для отмены.",
  "task.blocked.command_not_allowed":
    "⚠️ Эта команда недоступна, пока активна настройка отложенной задачи.",
  "task.blocked.finish_or_abort_to_change_defaults":
    "⚠️ Эта задача уже запомнила текущие настройки по умолчанию из 🎛️ Session Control. Завершите ее как есть или используйте /abort и снова запустите /task, если нужны другие настройки.",
  "task.blocked.only_defaults_before_prompt":
    "⚠️ Идет настройка отложенной задачи. До отправки финального промпта можно менять только значения агента, модели или варианта; иначе завершите настройку или используйте /abort.",
  "task.list.title": "Отложенные задачи:",
  "task.list.empty": "📭 Для этого проекта в этом чате нет отложенных задач.",
  "task.list.none": "не запланировано",
  "task.list.next_run": "Следующий запуск: {value}",
  "task.list.status": "Статус: {value}",
  "task.list.prompt": "Промпт: {value}",
  "task.list.delete_button": "Удалить #{index}",
  "task.list.deleted": "Отложенная задача удалена",
  "task.list.delete_missing": "Отложенная задача не найдена",
  "task.list.delete_error": "Не удалось удалить отложенную задачу",

  "cleanup.topic_use_general": "⚠️ Выполните /cleanup из темы General.",
  "cleanup.requires_forum_general":
    "⚠️ /cleanup доступен только в теме General супергруппы с включёнными форумами.",
  "cleanup.no_topics": "✅ Нет тем сессий для очистки.",
  "cleanup.result":
    "🧹 Очистка завершена. Проверено: {inspected}, закрыто: {closed}, пропущено: {skipped}, ошибок: {failed}.",

  "stop.no_active_session":
    "🛑 Агент не был запущен\n\nСначала создайте сессию командой /new или выберите существующую через /sessions.",
  "stop.cancelled_interaction":
    "✅ Текущая настройка отменена. Теперь можно изменить параметры по умолчанию или начать заново.",
  "stop.in_progress":
    "🛑 Отключил поток событий и отправляю сигнал прерывания...\n\nОжидание остановки агента.",
  "stop.warn_unconfirmed":
    "⚠️ Поток событий остановлен, но сервер не подтвердил прерывание.\n\nПроверьте /status и повторите /abort через пару секунд.",
  "stop.warn_maybe_finished":
    "⚠️ Поток событий остановлен, но агент мог уже завершиться к моменту запроса.",
  "stop.success":
    "✅ Действие агента прервано. Новые сообщения от текущего запуска больше не придут.",
  "stop.warn_still_busy":
    "⚠️ Сигнал отправлен, но агент еще busy.\n\nПоток событий уже отключен, поэтому бот не будет присылать промежуточные сообщения.",
  "stop.warn_timeout":
    "⚠️ Таймаут запроса на прерывание.\n\nПоток событий уже отключен, повторите /abort через пару секунд.",
  "stop.warn_local_only":
    "⚠️ Поток событий остановлен локально, но при прерывании на сервере произошла ошибка.",
  "stop.error":
    "🔴 Ошибка при прерывании действия.\n\nПоток событий остановлен, попробуйте /abort еще раз.",

  "opencode_start.already_running_managed":
    "⚠️ OpenCode Server уже запущен\n\nPID: {pid}\nUptime: {seconds} секунд",
  "opencode_start.already_running_external":
    "✅ OpenCode Server уже запущен внешним процессом\n\nВерсия: {version}\n\nЭтот сервер не был запущен через бота, поэтому команда /opencode-stop не сможет его остановить.",
  "opencode_start.starting": "🔄 Запускаю OpenCode Server...",
  "opencode_start.start_error":
    "🔴 Не удалось запустить OpenCode Server\n\nОшибка: {error}\n\nПроверьте, что OpenCode CLI установлен и доступен в PATH:\nopencode --version\nnpm install -g @opencode-ai/cli",
  "opencode_start.started_not_ready":
    "⚠️ OpenCode Server запущен, но не отвечает\n\nPID: {pid}\n\nСервер может запускаться. Попробуйте /status через несколько секунд.",
  "opencode_start.success": "✅ OpenCode Server успешно запущен\n\nPID: {pid}\nВерсия: {version}",
  "opencode_start.error":
    "🔴 Произошла ошибка при запуске сервера.\n\nПроверьте логи приложения для подробностей.",
  "opencode_stop.external_running":
    "⚠️ OpenCode Server запущен внешним процессом\n\nЭтот сервер не был запущен через /opencode-start.\nОстановите его вручную или используйте /status для проверки состояния.",
  "opencode_stop.not_running": "⚠️ OpenCode Server не запущен",
  "opencode_stop.stopping": "🛑 Останавливаю OpenCode Server...\n\nPID: {pid}",
  "opencode_stop.stop_error": "🔴 Не удалось остановить OpenCode Server\n\nОшибка: {error}",
  "opencode_stop.success": "✅ OpenCode Server успешно остановлен",
  "opencode_stop.error":
    "🔴 Произошла ошибка при остановке сервера.\n\nПроверьте логи приложения для подробностей.",

  "agent.changed_callback": "Режим изменен: {name}",
  "agent.changed_message": "✅ Режим изменен на: {name}",
  "agent.change_error_callback": "Ошибка при смене режима",
  "agent.menu.current": "Текущий режим: {name}\n\nВыберите режим:",
  "agent.menu.select": "Выберите режим работы:",
  "agent.menu.empty": "⚠️ Нет доступных агентов",
  "agent.menu.error": "🔴 Не удалось получить список агентов",

  "model.changed_callback": "Модель изменена: {name}",
  "model.changed_message": "✅ Модель изменена на: {name}",
  "model.change_error_callback": "Ошибка при смене модели",
  "model.menu.empty": "⚠️ Нет доступных моделей",
  "model.menu.select": "Выберите модель:",
  "model.menu.current": "Текущая модель: {name}\n\nВыберите модель:",
  "model.menu.favorites_title": "⭐ Избранное (Добавляйте модели в избранное через OpenCode CLI)",
  "model.menu.favorites_empty": "— Список пуст.",
  "model.menu.recent_title": "🕘 Недавние",
  "model.menu.recent_empty": "— Список пуст.",
  "model.menu.favorites_hint":
    "ℹ️ Добавляйте модели в избранное через OpenCode CLI, чтобы они были вверху списка.",
  "model.menu.error": "🔴 Не удалось получить список моделей",

  "variant.model_not_selected_callback": "Ошибка: модель не выбрана",
  "variant.changed_callback": "Вариант изменен: {name}",
  "variant.changed_message": "✅ Вариант изменен на: {name}",
  "variant.change_error_callback": "Ошибка при смене варианта",
  "variant.select_model_first": "⚠️ Сначала выберите модель",
  "variant.menu.empty": "⚠️ Нет доступных вариантов",
  "variant.menu.current": "Текущий вариант: {name}\n\nВыберите вариант:",
  "variant.menu.error": "🔴 Не удалось получить список вариантов",

  "context.button.confirm": "✅ Да, сжать контекст",
  "context.no_active_session": "⚠️ Нет активной сессии. Создайте сессию командой /new",
  "context.no_context_limit": "⚠️ Лимит контекста недоступен. Сначала откройте топик сессии.",
  "context.status_text":
    "📊 **Статус контекста**\n\nСессия: {title}\nТокены: {used} / {limit} ({percent}%)\n`{bar}`\n\nИспользуйте compact для уменьшения использования контекста, удалив старые сообщения.",
  "context.general_not_available":
    "⚠️ Сжатие контекста доступно только внутри топика сессии, а не в General.",
  "context.general_not_available_callback": "Сначала откройте топик сессии.",
  "context.callback_session_not_found": "Сессия не найдена",
  "context.callback_compacting": "Сжатие контекста...",
  "context.progress": "⏳ Сжимаю контекст...",
  "context.error": "❌ Ошибка при сжатии контекста",
  "context.success": "✅ Контекст успешно сжат",
  "context.after_compaction": "✅ Окно контекста после сжатия: {context}",

  "permission.inactive_callback": "Запрос разрешения неактивен",
  "permission.processing_error_callback": "Ошибка при обработке",
  "permission.no_active_request_callback": "Ошибка: нет активного запроса",
  "permission.reply.once": "Разрешено однократно",
  "permission.reply.always": "Разрешено всегда",
  "permission.reply.reject": "Отклонено",
  "permission.send_reply_error": "❌ Не удалось отправить ответ на запрос разрешения",
  "permission.blocked.expected_reply": "⚠️ Сначала ответьте на запрос разрешения кнопками выше.",
  "permission.blocked.command_not_allowed":
    "⚠️ Эта команда недоступна, пока вы не ответите на запрос разрешения.",
  "permission.header": "{emoji} Запрос разрешения: {name}\n\n",
  "permission.button.allow": "✅ Разрешить один раз",
  "permission.button.always": "🔓 Разрешить всегда",
  "permission.button.reject": "❌ Отклонить",
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
  "permission.name.external_directory": "Внешняя директория",

  "question.inactive_callback": "Опрос неактивен",
  "question.processing_error_callback": "Ошибка при обработке",
  "question.select_one_required_callback": "Выберите хотя бы один вариант",
  "question.enter_custom_callback": "Введите свой ответ сообщением",
  "question.cancelled": "❌ Опрос отменен",
  "question.answer_already_received": "Ответ уже получен, подождите...",
  "question.completed_no_answers": "✅ Опрос завершен (без ответов)",
  "question.no_active_project": "❌ Нет активного проекта",
  "question.no_active_request": "❌ Нет активного запроса",
  "question.send_answers_error": "❌ Не удалось отправить ответы агенту",
  "question.multi_hint": "\n(Можно выбрать несколько вариантов)",
  "question.button.submit": "✅ Готово",
  "question.button.custom": "🔤 Свой ответ",
  "question.button.cancel": "❌ Отмена",
  "question.use_custom_button_first":
    '⚠️ Чтобы отправить текст, сначала нажмите кнопку "Свой ответ" для текущего вопроса.',
  "question.summary.title": "✅ Опрос завершен!\n\n",
  "question.summary.question": "Вопрос {index}:\n{question}\n\n",
  "question.summary.answer": "Ответ:\n{answer}\n\n",

  "keyboard.agent_mode": "{emoji} {name} Mode",
  "keyboard.context": "📊 {used} / {limit} ({percent}%)",
  "keyboard.context_empty": "📊 Управление",
  "keyboard.general_defaults": "Параметры новой сессии:",
  "keyboard.general_defaults_info":
    "Эти значения будут применяться к новым сессиям, созданным в этой группе:\n• Агент\n• Модель\n• Вариант",
  "keyboard.variant": "💭 {name}",
  "keyboard.variant_default": "💡 Default",
  "keyboard.updated": "⌨️ Клавиатура обновлена",
  "keyboard.dm.status": "/status",
  "keyboard.dm.help": "/help",
  "keyboard.dm.opencode_start": "/opencode_start",
  "keyboard.dm.opencode_stop": "/opencode_stop",

  "pinned.default_session_title": "new session",
  "pinned.unknown": "Unknown",
  "pinned.line.project": "Project: {project}",
  "pinned.line.model": "Model: {model}",
  "pinned.line.agent": "Agent: {agent}",
  "pinned.line.branch": "Branch: {branch}",
  "pinned.line.status": "Status: {status}",
  "pinned.line.created": "Created: {time}",
  "pinned.line.messages": "Messages: {count}",
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

  "tool.todo.overflow": "*(ещё {count} задач)*",
  "tool.file_header.write":
    "Write File/Path: {path}\n============================================================\n\n",
  "tool.file_header.edit":
    "Edit File/Path: {path}\n============================================================\n\n",

  "runtime.wizard.ask_token": "Введите токен Telegram-бота (получить у @BotFather).\n> ",
  "runtime.wizard.ask_language":
    "Выберите язык интерфейса.\nВведите номер языка из списка или код локали.\nНажмите Enter, чтобы оставить язык по умолчанию: {defaultLocale}\n{options}\n> ",
  "runtime.wizard.language_invalid":
    "Введите номер языка из списка или поддерживаемый код локали.\n",
  "runtime.wizard.language_selected": "Выбран язык: {language}\n",
  "runtime.wizard.token_required": "Токен обязателен. Попробуйте еще раз.\n",
  "runtime.wizard.token_invalid":
    "Похоже на невалидный токен (ожидается формат <id>:<secret>). Попробуйте еще раз.\n",
  "runtime.wizard.ask_user_id": "Введите ваш Telegram User ID (можно узнать у @userinfobot).\n> ",
  "runtime.wizard.user_id_invalid": "Введите положительное целое число (> 0).\n",
  "runtime.wizard.ask_api_url":
    "Введите URL OpenCode API (опционально).\nНажмите Enter для значения по умолчанию: {defaultUrl}\n> ",
  "runtime.wizard.ask_server_username":
    "Введите имя пользователя сервера OpenCode (опционально).\nНажмите Enter для значения по умолчанию: {defaultUsername}\n> ",
  "runtime.wizard.ask_server_password":
    "Введите пароль сервера OpenCode (опционально, ввод скрыт).\nНажмите Enter, чтобы пропустить.\n> ",
  "runtime.wizard.api_url_invalid":
    "Введите корректный URL (http/https) или нажмите Enter для значения по умолчанию.\n",
  "runtime.wizard.start": "Настройка OpenCode Telegram Group Topics Bot.\n",
  "runtime.wizard.saved": "Конфигурация сохранена:\n- {envPath}\n- {settingsPath}\n",
  "runtime.wizard.not_configured_starting":
    "Приложение еще не сконфигурировано. Запускаю wizard...\n",
  "runtime.wizard.tty_required":
    "Интерактивный wizard требует TTY-терминал. Запустите `opencode-telegram-group-topics-bot config` в интерактивной оболочке.",

  "rename.no_session": "⚠️ Нет активной сессии. Сначала создайте или выберите сессию.",
  "rename.prompt": "📝 Введите новое название сессии:\n\nТекущее: {title}",
  "rename.empty_title": "⚠️ Название не может быть пустым.",
  "rename.success": "✅ Сессия переименована в: {title}",
  "rename.error": "🔴 Не удалось переименовать сессию.",
  "rename.cancelled": "❌ Переименование отменено.",
  "rename.inactive_callback": "Запрос переименования неактивен",
  "rename.inactive": "⚠️ Запрос переименования неактивен. Выполните /rename снова.",
  "rename.blocked.expected_name":
    "⚠️ Введите новое название текстом или нажмите Отмена в сообщении переименования.",
  "rename.blocked.command_not_allowed":
    "⚠️ Эта команда недоступна, пока ожидается новое название сессии.",
  "rename.button.cancel": "❌ Отмена",

  "commands.select": "Выберите команду OpenCode:",
  "commands.empty": "📭 Для этого проекта нет доступных команд OpenCode.",
  "commands.fetch_error": "🔴 Не удалось загрузить список команд OpenCode.",
  "commands.no_description": "Без описания",
  "commands.select_page": "Выберите команду OpenCode ({current}/{total}):",
  "commands.button.execute": "✅ Выполнить",
  "commands.button.prev_page": "⬅️ Назад",
  "commands.button.next_page": "Далее ➡️",
  "commands.button.cancel": "❌ Отмена",
  "commands.confirm":
    "Выполнить {command}? Отправьте текстовым сообщением аргументы или нажмите Выполнить, чтобы запустить команду без изменений.",
  "commands.inactive_callback": "Это меню команд уже неактивно",
  "commands.cancelled_callback": "Отменено",
  "commands.execute_callback": "Запускаю команду...",
  "commands.executing": "⚡ Запускаю команду OpenCode\n{command}",
  "commands.arguments_empty":
    "⚠️ Аргументы не могут быть пустыми. Отправьте текст или нажмите Выполнить.",
  "commands.execute_error": "🔴 Не удалось выполнить команду OpenCode.",

  "cmd.description.rename": "Переименовать текущую сессию",

  "cli.usage":
    "Использование:\n  opencode-telegram-group-topics-bot [start] [--mode sources|installed]\n  opencode-telegram-group-topics-bot status\n  opencode-telegram-group-topics-bot stop\n  opencode-telegram-group-topics-bot config [--mode sources|installed]\n\nЗаметки:\n  - Без команды по умолчанию используется `start`\n  - Для `config` по умолчанию используется режим `installed`, если не указан `--mode sources`",
  "cli.placeholder.status":
    "Команда `status` пока работает как заглушка. Реальная проверка статуса появится на этапе service-слоя (Этап 5).",
  "cli.placeholder.stop":
    "Команда `stop` пока работает как заглушка. Реальная остановка фонового процесса появится на этапе service-слоя (Этап 5).",
  "cli.placeholder.unavailable": "Команда недоступна.",
  "cli.error.prefix": "CLI error: {message}",
  "cli.args.unknown_command": "Неизвестная команда: {value}",
  "cli.args.mode_requires_value": "Опция --mode требует значение: sources|installed",
  "cli.args.invalid_mode": "Некорректное значение --mode: {value}. Ожидается sources|installed",
  "cli.args.unknown_option": "Неизвестная опция: {value}",
  "cli.args.mode_only_start": "Опция --mode поддерживается только для команд start и config",

  "legacy.models.fetch_error":
    "🔴 Не удалось получить список моделей. Проверьте статус сервера /status.",
  "legacy.models.empty": "📋 Нет доступных моделей. Настройте провайдеры через OpenCode.",
  "legacy.models.header": "📋 Доступные модели:\n\n",
  "legacy.models.no_provider_models": "  ⚠️ Нет доступных моделей\n",
  "legacy.models.env_hint": "💡 Для использования модели в .env:\n",
  "legacy.models.error": "🔴 Произошла ошибка при получении списка моделей.",

  "stt.recognizing": "🎤 Распознаю аудио...",
  "stt.recognized": "🎤 Распознано:\n{text}",
  "stt.not_configured":
    "🎤 Распознавание голоса не настроено.\n\nУстановите STT_API_URL и STT_API_KEY в .env для включения.",
  "stt.error": "🔴 Не удалось распознать аудио: {error}",
  "stt.empty_result": "🎤 В аудиосообщении не обнаружена речь.",

  "start.welcome_dm":
    "👋 В режиме ЛС доступны только команды статуса/управления ботом и сервером.\n\nДля работы с проектами и сессиями используйте топик в группе.",
  "status.global_overview": "📈 Глобальный обзор",
  "status.global_projects": "Проекты: {count}",
  "status.global_sessions": "Сессии: {count}",
  "dm.restricted.command":
    "⚠️ Команды управления сессией отключены в ЛС. Используйте топик в группе для работы с проектами/сессиями.",
  "dm.restricted.prompt":
    "⚠️ Промпты отключены в ЛС. Используйте топик в группе для запуска задач OpenCode.",
  "help.dm.title": "Команды управления в ЛС",
  "help.dm.command_start": "показать подсказки режима ЛС",
  "help.dm.hint": "Используйте топики в группе для работы с проектами/сессиями.",
  "status.dm.title": "Обзор статуса в ЛС",
  "status.dm.hint": "Используйте топики в группе для запуска сессий OpenCode.",
  "group.general.prompts_disabled":
    "⚠️ Промпты отключены в теме General. Используйте /new, чтобы создать отдельную тему сессии.",
  "topic.unbound":
    "⚠️ Эта тема не связана ни с одной сессией. Перейдите в тему General и выполните /new.",

  "cmd.description.delete": "Delete current session",
  "cmd.description.share": "Share session link",
  "cmd.description.config": "View/edit OpenCode config",
  "cmd.description.fork": "Fork session at message",
  "cmd.description.todo": "View session todo list",
  "cmd.description.files": "Browse project files",
  "cmd.description.mcp": "Manage MCP servers",
  "cmd.description.revert": "Revert last action",
  "cmd.description.unrevert": "Unrevert messages in session",
  "cmd.description.messages": "View session messages",

  "delete.no_session": "⚠️ No active session. Create or select a session first.",
  "delete.confirm": "🗑️ Delete session \"{title}\"?\n\nThis will permanently remove the session and all its data. This cannot be undone.\n\nTap Delete to confirm or Cancel to abort.",
  "delete.deleted": "✅ Session deleted: {title}",
  "delete.error": "🔴 Failed to delete session.",
  "delete.cancelled": "❌ Delete cancelled.",
  "delete.inactive_callback": "Delete request is inactive",
  "delete.button.confirm": "🗑️ Delete",
  "delete.button.cancel": "❌ Cancel",

  "share.no_session": "⚠️ No active session. Create or select a session first.",
  "share.creating": "🔄 Creating share link...",
  "share.created": "🔗 Share link: {url}",
  "share.unshared": "✅ Session unshared.",
  "share.already_shared": "🔗 Session is already shared: {url}",
  "share.not_shared": "⚠️ This session is not shared.",
  "share.error": "🔴 Failed to share session.",
  "share.unshare_error": "🔴 Failed to unshare session.",
  "share.select_share_unshare": "Session sharing options:\n\nCurrent: {status}",
  "share.status.shared": "Shared",
  "share.status.not_shared": "Not shared",
  "share.button.create": "🔗 Create link",
  "share.button.remove": "❌ Remove link",

  "config.fetch_error": "🔴 Failed to load OpenCode config.",
  "config.updated": "✅ Config updated successfully.",
  "config.update_error": "🔴 Failed to update config.",
  "config.current": "📋 Current config:\n\n{config}",
  "config.select_section": "Select config section to edit:",
  "config.no_changes": "⚠️ No changes detected.",
  "config.button.view": "📋 View full config",
  "config.button.edit": "✏️ Edit config",

  "fork.no_session": "⚠️ No active session. Create or select a session first.",
  "fork.created": "✅ Forked session: {title}",
  "fork.error": "🔴 Failed to fork session.",
  "fork.select_message": "Select the message to fork from:",
  "fork.no_messages": "📭 No messages found to fork from.",

  "todo.no_session": "⚠️ No active session. Create or select a session first.",
  "todo.empty": "📭 No tasks in this session.",
  "todo.title": "📋 Todo list for session: {title}",
  "todo.fetch_error": "🔴 Failed to load todo list.",
  "todo.item": "• {task}",
  "todo.completed": "✅",
  "todo.pending": "⏳",

  "files.no_session": "⚠️ No active session. Create or select a session first.",
  "files.no_project": "🏗 Project is not selected.\n\nFirst select a project with /projects.",
  "files.root": "📂 Project files (root):",
  "files.directory": "📂 {name}/",
  "files.file": "📄 {name}",
  "files.read_error": "🔴 Failed to read file: {path}",
  "files.list_error": "🔴 Failed to list directory: {path}",
  "files.back": "⬅️ Back",
  "files.file_content": "📄 File: {path}\n\n{content}",
  "files.file_too_large": "⚠️ File is too large to display ({size} bytes).",
  "files.select_file": "Select a file or directory:",
  "files.path_indicator": "📂 Path: {path}",

  "mcp.status_title": "🔌 MCP Servers Status",
  "mcp.no_servers": "📭 No MCP servers configured.",
  "mcp.fetch_error": "🔴 Failed to load MCP servers status.",
  "mcp.add_prompt": "Send MCP server config in JSON format:\n\nExample:\n```json\n{\"name\": \"my-server\", \"config\": {\"command\": \"npx\", \"args\": [\"-y\", \"@modelcontextprotocol/server-example\"]}}\n```",
  "mcp.added": "✅ MCP server added: {name}",
  "mcp.add_error": "🔴 Failed to add MCP server.",
  "mcp.connecting": "🔄 Connecting MCP server: {name}...",
  "mcp.connected": "✅ MCP server connected: {name}",
  "mcp.disconnected": "✅ MCP server disconnected: {name}",
  "mcp.disconnect_error": "🔴 Failed to disconnect MCP server.",
  "mcp.connect_error": "🔴 Failed to connect MCP server.",
  "mcp.button.status": "📊 Status",
  "mcp.button.add": "➕ Add server",
  "mcp.button.connect": "🔗 Connect",
  "mcp.button.disconnect": "🔌 Disconnect",
  "mcp.server_status_running": "🟢 Running",
  "mcp.server_status_stopped": "🔴 Stopped",
  "mcp.server_status_error": "❌ Error",

  "revert.no_session": "⚠️ No active session. Create or select a session first.",
  "revert.success": "✅ Message reverted successfully.",
  "revert.error": "🔴 Failed to revert message.",
  "revert.no_message": "⚠️ No message to revert in this session.",
  "unrevert.no_session": "⚠️ No active session. Create or select a session first.",
  "unrevert.success": "✅ Messages unreverted successfully.",
  "unrevert.error": "🔴 Failed to unrevert messages.",

  "messages.no_session": "⚠️ No active session. Create or select a session first.",
  "messages.empty": "📭 No messages in this session.",
  "messages.title": "💬 Messages for session: {title}",
  "messages.fetch_error": "🔴 Failed to load messages.",
  "messages.user": "👤 You: {text}",
  "messages.assistant": "🤖 Agent: {text}",
  "messages.page_indicator": "Page {current}/{total}",
  "messages.button.prev_page": "⬅️ Prev",
  "messages.button.next_page": "Next ➡️",
  "messages.button.cancel": "❌ Cancel",
  "messages.page_empty_callback": "No messages on this page",
  "messages.page_load_error_callback": "Cannot load this page. Please try again.",

  "cmd.description.newproject": "List available projects",
  "cmd.description.addproject": "Add project to this group",
  "cmd.description.manage": "Manage OpenCode config",
  "newproject.fetch_error": "🔴 Failed to load project list.",
  "newproject.no_available": "✅ All available projects are already added to this group.",
  "newproject.available": "📋 Available projects to add:",
  "newproject.how_to_add": "\n💡 Use /addproject <name-or-id> to add.",
  "newproject.error": "🔴 Error loading project list.",
  "addproject.usage": "💡 Usage: /addproject <name-or-id>\n\nUse /newproject to see available projects.",
  "addproject.fetch_error": "🔴 Failed to load project list.",
  "addproject.not_found": "🔴 Project not found: {query}",
  "addproject.added": "✅ Added project: {name}",
  "addproject.error": "🔴 Error adding project.",
  "projects.multi_info": "💡 This group supports multiple projects. Use /newproject to see available, /addproject to add.",

  "ssh.usage": "🔧 Настройка SSH для Git\n\nКоманды:\n/ssh list - Показать все маппинги\n/ssh add <user> <host> <приватный-ключ> - Добавить SSH ключ напрямую\n/ssh remove <host> <user> - Удалить маппинг\n\nПример: /ssh add hoangxg4 github.com -----BEGIN OPENSSH PRIVATE KEY-----...\n\nПоддерживает: github.com, gitlab.com, bitbucket.org",
  "ssh.available_keys": "🔑 Доступные SSH ключи ({count}):",
  "ssh.configured_hosts": "📋 Настроенные SSH хосты ({count}):",
  "ssh.invalid_url": "❌ Неверный SSH URL. Формат: git@github.com:username/repo.git",
  "ssh.already_configured": "✅ Хост {host} уже настроен:\n  Ключ: {keyPath}",
  "ssh.no_keys_found": "❌ SSH ключи не найдены в ~/.ssh. Создайте: ssh-keygen -t ed25519",
  "ssh.configured_success": "✅ SSH хост успешно настроен!\n\nХост: {host}\nКлюч: {keyPath}\n\nТест подключения пройден.",
  "ssh.configured_test_failed": "⚠️ SSH хост настроен, но тест подключения не пройден.\n\nХост: {host}\nКлюч: {keyPath}\n\nПроверьте, что SSH ключ добавлен в Git провайдер.",
  "ssh.error": "❌ Ошибка настройки SSH: {message}",
  "ssh.add_usage": "Использование: /ssh add <user> <host> <содержимое-приватного-ключа>\nПример: /ssh add hoangxg4 github.com -----BEGIN OPENSSH PRIVATE KEY-----\\n...",
  "ssh.remove_usage": "Использование: /ssh remove <host> <user>\nПример: /ssh remove github.com hoangxg4",
  "ssh.unsupported_host": "❌ Неподдерживаемый хост: {host}\nПоддерживаемые: {supported}",
  "ssh.invalid_key": "❌ Невалидный SSH приватный ключ. Содержимое должно включать 'BEGIN' и 'PRIVATE KEY'.",
  "ssh.list_header": "🔧 SSH Git маппинги",
  "ssh.no_mappings": "Нет настроенных маппингов. Используйте /ssh add <user> <key> [host]",
  "ssh.key_not_found": "❌ SSH ключ не найден: {keyPath}",
  "ssh.added_success": "✅ SSH маппинг добавлен!\n\nПользователь: {user}\nХост: {host}\nПсевдоним хоста: {hostAlias}\nКлюч: {keyPath}\n\nНастроен Git URL rewrite. git clone/push в git@{host}:{user}/repo.git теперь будет использовать этот ключ.",
  "ssh.add_error": "❌ Ошибка добавления SSH маппинга: {message}",
  "ssh.not_found": "❌ Маппинг для {user}@{host} не найден",
  "ssh.removed_success": "✅ SSH маппинг для {user}@{host} удален",
  "ssh.remove_error": "❌ Ошибка удаления SSH маппинга: {message}",
};
