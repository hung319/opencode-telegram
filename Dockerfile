FROM node:20-slim

# Install system dependencies including build tools for native modules (better-sqlite3)
RUN apt-get update && \
    apt-get install -y git bash curl python3 make gcc g++ && \
    rm -rf /var/lib/apt/lists/*

# Install OpenCode CLI globally
RUN npm install -g opencode-ai

WORKDIR /workspace

# Copy and install bot dependencies (with native module build)
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build && npm link

# Default environment (can be overridden by docker-compose or docker run -e)
ENV HOME=/root
ENV OPENCODE_API_URL=http://127.0.0.1:4096
ENV OPENCODE_AUTO_START=true

EXPOSE 4096

CMD ["opencode-telegram-group-topics-bot", "start"]
