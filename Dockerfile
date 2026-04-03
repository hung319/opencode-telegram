FROM node:20-slim

# Install system dependencies
RUN apt-get update && \
    apt-get install -y git bash curl python3 make gcc && \
    rm -rf /var/lib/apt/lists/*

# Install OpenCode CLI globally
RUN npm install -g opencode-ai

WORKDIR /workspace

# Copy and install bot
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build && npm link

# Set environment
ENV HOME=/root
ENV OPENCODE_API_URL=http://127.0.0.1:4096
ENV OPENCODE_AUTO_START=true

# Create startup script that lets the bot manage OpenCode lifecycle
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'set -e' >> /start.sh && \
    echo '' >> /start.sh && \
    echo 'CONFIG_DIR="$HOME/.config/opencode-telegram-group-topics-bot"' >> /start.sh && \
    echo 'CONFIG_FILE="$CONFIG_DIR/.env"' >> /start.sh && \
    echo 'mkdir -p "$CONFIG_DIR"' >> /start.sh && \
    echo '' >> /start.sh && \
    echo '# Create .env config file' >> /start.sh && \
    echo 'echo "TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}" > "$CONFIG_FILE"' >> /start.sh && \
    echo 'echo "TELEGRAM_ALLOWED_USER_ID=${TELEGRAM_ALLOWED_USER_ID}" >> "$CONFIG_FILE"' >> /start.sh && \
    echo 'echo "OPENCODE_API_URL=${OPENCODE_API_URL:-http://127.0.0.1:4096}" >> "$CONFIG_FILE"' >> /start.sh && \
    echo 'echo "OPENCODE_MODEL_PROVIDER=${OPENCODE_MODEL_PROVIDER:-opencode}" >> "$CONFIG_FILE"' >> /start.sh && \
    echo 'echo "OPENCODE_MODEL_ID=${OPENCODE_MODEL_ID:-big-pickle}" >> "$CONFIG_FILE"' >> /start.sh && \
    echo 'echo "BOT_LOCALE=${BOT_LOCALE:-en}" >> "$CONFIG_FILE"' >> /start.sh && \
    echo 'echo "COMPACT_MODE=${COMPACT_MODE:-false}" >> "$CONFIG_FILE"' >> /start.sh && \
    echo '' >> /start.sh && \
    echo '# Function to add optional env vars' >> /start.sh && \
    echo 'add_env() { if [ -n "$(eval echo \$$1)" ]; then echo "$1=$(eval echo \$$1)" >> "$CONFIG_FILE"; fi; }' >> /start.sh && \
    echo '' >> /start.sh && \
    echo '# Add optional environment variables' >> /start.sh && \
    echo 'add_env HIDE_THINKING_MESSAGES' >> /start.sh && \
    echo 'add_env HIDE_TOOL_CALL_MESSAGES' >> /start.sh && \
    echo 'add_env SERVICE_MESSAGES_INTERVAL_SEC' >> /start.sh && \
    echo 'add_env COMPACT_MODE' >> /start.sh && \
    echo 'add_env LOG_LEVEL' >> /start.sh && \
    echo 'add_env ANTHROPIC_API_KEY' >> /start.sh && \
    echo 'add_env OPENAI_API_KEY' >> /start.sh && \
    echo 'add_env GEMINI_API_KEY' >> /start.sh && \
    echo 'add_env STT_API_KEY' >> /start.sh && \
    echo 'add_env STT_API_URL' >> /start.sh && \
    echo 'add_env TTS_API_KEY' >> /start.sh && \
    echo 'add_env TTS_API_URL' >> /start.sh && \
    echo 'add_env TELEGRAM_PROXY_URL' >> /start.sh && \
    echo '' >> /start.sh && \
    echo '# Start the bot - it will auto-start OpenCode via OPENCODE_AUTO_START' >> /start.sh && \
    echo 'echo "🤖 Starting Telegram Bot..."' >> /start.sh && \
    echo 'echo "💡 OpenCode server will be auto-started by the bot."' >> /start.sh && \
    echo 'exec opencode-telegram-group-topics-bot start' >> /start.sh && \
    chmod +x /start.sh

EXPOSE 4096

CMD ["/start.sh"]
