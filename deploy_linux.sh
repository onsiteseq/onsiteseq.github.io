#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SSH_KEY="$SCRIPT_DIR/gorbenkoteh2"
REMOTE_USER="user"
REMOTE_HOST="91.188.212.199"
REMOTE_PORT="2222"
REMOTE_PATH="/var/www/onsiteseq/"

# Права на ключ (SSH требует 600)
chmod 600 "$SSH_KEY"

# 1. Очистка
echo "==> Cleaning Jekyll site..."
cd "$SCRIPT_DIR"
bundle exec jekyll clean

# 2. Сборка
echo "==> Building Jekyll site..."
bundle exec jekyll build

# 3. Деплой через rsync
echo "==> Syncing to $REMOTE_HOST..."
rsync -avz --checksum --delete \
  -e "ssh -i $SSH_KEY -p $REMOTE_PORT -o StrictHostKeyChecking=no" \
  ./_site/ \
  "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"

echo "==> Deploy successful!"
