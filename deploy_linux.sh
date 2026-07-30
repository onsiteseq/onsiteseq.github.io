#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SSH_KEY="$SCRIPT_DIR/gorbenkoteh2"
REMOTE_USER="user"
REMOTE_HOST="91.188.212.199"
REMOTE_PORT="2222"
REMOTE_PATH="/var/www/onsiteseq/"

# Добавляем vendored bundle в PATH, чтобы не зависеть от глобального Bundler
VENDOR_BUNDLE_BIN="$(find "$SCRIPT_DIR/vendor/bundle" -maxdepth 3 -type d -name bin 2>/dev/null | head -n1)"
if [ -n "$VENDOR_BUNDLE_BIN" ]; then
    export PATH="$VENDOR_BUNDLE_BIN:$PATH"
fi

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
