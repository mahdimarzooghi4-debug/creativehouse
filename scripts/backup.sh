#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env.production ]]; then
  echo "Missing .env.production. Copy .env.production.example and fill production values first." >&2
  exit 1
fi

mkdir -p backups
HOST_UID="$(id -u)" HOST_GID="$(id -g)" docker compose --profile tools run --rm backup
