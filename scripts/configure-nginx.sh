#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: bash scripts/configure-nginx.sh example.com" >&2
  exit 1
fi

DOMAIN="$1"
if [[ ! "$DOMAIN" =~ ^[A-Za-z0-9.-]+$ ]]; then
  echo "Invalid domain name." >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATE="$ROOT_DIR/deploy/nginx/creativehouse.conf.template"
TMP_FILE="$(mktemp)"
trap 'rm -f "$TMP_FILE"' EXIT

sed "s/__DOMAIN__/$DOMAIN/g" "$TEMPLATE" > "$TMP_FILE"
sudo install -m 0644 "$TMP_FILE" /etc/nginx/sites-available/creativehouse
sudo ln -sfn /etc/nginx/sites-available/creativehouse /etc/nginx/sites-enabled/creativehouse
sudo nginx -t
sudo systemctl reload nginx

echo "Nginx configured for $DOMAIN."
echo "After DNS points to this server, enable HTTPS with scripts/enable-ssl.sh."
