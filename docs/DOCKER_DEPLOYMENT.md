# Docker Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- Telegram Bot Token (from @BotFather)
- Your Telegram User ID (from @userinfobot)

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/hung319/opencode-telegram.git
cd opencode-telegram
```

### 2. Create environment file

Create a `.env` file in the project root:

```bash
# Required
TELEGRAM_BOT_TOKEN=your-bot-token-here
TELEGRAM_ALLOWED_USER_ID=your-telegram-user-id

# Optional - Model settings
OPENCODE_MODEL_PROVIDER=opencode
OPENCODE_MODEL_ID=big-pickle

# Optional - Bot settings
BOT_LOCALE=en
COMPACT_MODE=false
LOG_LEVEL=info
```

### 3. Start with Docker Compose

```bash
docker compose up -d
```

### 4. Check logs

```bash
docker compose logs -f
```

## Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `TELEGRAM_BOT_TOKEN` | Yes | - | Bot token from @BotFather |
| `TELEGRAM_ALLOWED_USER_ID` | Yes | - | Your Telegram user ID |
| `OPENCODE_MODEL_PROVIDER` | No | `opencode` | AI model provider |
| `OPENCODE_MODEL_ID` | No | `big-pickle` | AI model ID |
| `BOT_LOCALE` | No | `en` | Bot language (en/vi/de/es/ru/zh/fr) |
| `COMPACT_MODE` | No | `false` | Enable compact mode |
| `LOG_LEVEL` | No | `info` | Logging level (debug/info/warn/error) |
| `HIDE_THINKING_MESSAGES` | No | `false` | Hide thinking indicators |
| `HIDE_TOOL_CALL_MESSAGES` | No | `false` | Hide tool call messages |
| `SERVICE_MESSAGES_INTERVAL_SEC` | No | `2` | Service message batching interval |
| `ANTHROPIC_API_KEY` | No | - | Anthropic API key |
| `OPENAI_API_KEY` | No | - | OpenAI API key |
| `GEMINI_API_KEY` | No | - | Gemini API key |
| `STT_API_URL` | No | - | STT API endpoint |
| `STT_API_KEY` | No | - | STT API key |
| `TTS_API_URL` | No | - | TTS API endpoint |
| `TTS_API_KEY` | No | - | TTS API key |
| `TELEGRAM_PROXY_URL` | No | - | Telegram proxy URL |

### Volumes

The container uses named volumes for persistence:

- `opencode-config` - OpenCode and bot configuration
- `opencode-data` - OpenCode data and cache

To backup:

```bash
docker compose exec bot tar -czf /tmp/backup.tar.gz /root/.config /root/.opencode
docker compose cp bot:/tmp/backup.tar.gz ./backup.tar.gz
```

## Building Custom Image

```bash
docker build -t opencode-telegram-bot .
```

## Resource Limits

The default docker-compose.yml includes resource limits:
- Memory: 2GB max, 512MB reserved
- CPU: 2 cores max, 0.5 cores reserved

Adjust these in `docker-compose.yml` based on your needs.

## Troubleshooting

### Bot not starting

Check logs:
```bash
docker compose logs bot
```

### OpenCode server issues

The container includes OpenCode CLI. If you need to use an external OpenCode server:

1. Modify `docker-compose.yml` to remove the OpenCode startup
2. Set `OPENCODE_API_URL` to your external server URL

### Permission issues

If you encounter permission issues:
```bash
docker compose exec bot chown -R root:root /root/.config
```
