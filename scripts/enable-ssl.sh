#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: bash scripts/enable-ssl.sh example.com admin@example.com" >&2
  exit 1
fi

DOMAIN="$1"
EMAIL="$2"

if [[ ! "$DOMAIN" =~ ^[A-Za-z0-9.-]+$ ]]; then
  echo "Invalid domain name." >&2
  exit 1
fi

if ! command -v certbot >/dev/null 2>&1; then
  echo "certbot is not installed. Install certbot and python3-certbot-nginx first." >&2
  exit 1
fi

sudo certbot --nginx \
  --non-interactive \
  --agree-tos \
  --redirect \
  --email "$EMAIL" \
  -d "$DOMAIN"

sudo nginx -t
sudo systemctl reload nginx
sudo systemctl enable --now certbot.timer >/dev/null 2>&1 || true

echo "HTTPS enabled for $DOMAIN."
