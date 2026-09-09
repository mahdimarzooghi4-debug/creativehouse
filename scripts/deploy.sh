#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

for command in git docker curl; do
  if ! command -v "$command" >/dev/null 2>&1; then
    echo "Required command not found: $command" >&2
    exit 1
  fi
done

if [[ ! -f .env.production ]]; then
  echo "Missing .env.production. Copy .env.production.example and fill production values first." >&2
  exit 1
fi

# Back up the current live data before changing code or applying migrations.
if docker volume inspect creativehouse_creativehouse_data >/dev/null 2>&1 \
  && docker image inspect creativehouse-app:latest >/dev/null 2>&1; then
  echo "Creating pre-deploy backup..."
  bash scripts/backup.sh
fi

echo "Updating main branch..."
git pull --ff-only origin main

echo "Building application and migration images..."
docker compose build app migrate

echo "Applying Prisma migrations..."
docker compose --profile tools run --rm migrate

echo "Enabling SQLite WAL journal mode..."
docker compose run --rm --no-deps --entrypoint sqlite3 app /data/creativehouse.db "PRAGMA journal_mode=WAL;"

echo "Starting application..."
docker compose up -d app

echo "Waiting for health check..."
for attempt in $(seq 1 30); do
  if curl --fail --silent --show-error http://127.0.0.1:3000/api/health >/dev/null 2>&1; then
    echo "Deployment is healthy."
    docker compose ps
    exit 0
  fi
  sleep 2
done

echo "Application did not become healthy in time." >&2
docker compose logs --tail=100 app >&2
exit 1
