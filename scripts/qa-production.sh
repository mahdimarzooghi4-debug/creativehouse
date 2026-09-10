#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
ADMIN_USERNAME="${QA_ADMIN_USERNAME:-admin}"
ADMIN_PASSWORD="${QA_ADMIN_PASSWORD:-replace-with-a-strong-password-min-12-chars}"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

fail() {
  echo "QA failed: $*" >&2
  exit 1
}

status_of() {
  curl -sS -o "$TMP_DIR/body" -w '%{http_code}' "$@"
}

expect_status() {
  local expected="$1"
  shift
  local actual
  actual="$(status_of "$@")"
  [[ "$actual" == "$expected" ]] || fail "expected HTTP $expected, got $actual for $*"
}

expect_body() {
  local needle="$1"
  shift
  curl -fsS "$@" > "$TMP_DIR/body"
  grep -Fq "$needle" "$TMP_DIR/body" || fail "response did not contain: $needle"
}

echo "Checking public routes..."
for route in / /about /startups /programs /programs?type=event /news /licenses /collaboration /admin/login /api/health; do
  expect_status 200 "$BASE_URL$route"
done

if grep -R "figma.com/api/mcp" app components >/dev/null 2>&1; then
  fail "temporary Figma MCP asset URL is still referenced in production code"
fi

if grep -R 'src="/images/' app components >/dev/null 2>&1; then
  fail "hard-coded /images asset reference remains without a checked-in production asset"
fi

echo "Checking responsive safeguards..."
grep -Fq 'import "./responsive.css";' app/layout.tsx || fail "responsive stylesheet is not loaded by the root layout"
grep -Fq 'min-width: 0 !important;' app/responsive.css || fail "public layout still lacks the mobile min-width override"
grep -Fq '@media (max-width: 760px)' app/responsive.css || fail "mobile breakpoint is missing"
grep -Fq '.site-footer .footer-grid' app/responsive.css || fail "responsive footer override is missing"
grep -Fq '.about-page .public-page__main' app/responsive.css || fail "responsive About override is missing"

echo "Checking admin protection..."
unauth_status="$(curl -sS -o /dev/null -w '%{http_code}' "$BASE_URL/admin")"
[[ "$unauth_status" == "307" || "$unauth_status" == "308" ]] || fail "unauthenticated /admin did not redirect"

login_headers="$TMP_DIR/login-headers"
login_status="$(curl -sS -D "$login_headers" -o /dev/null -w '%{http_code}' \
  -X POST \
  -F "username=$ADMIN_USERNAME" \
  -F "password=$ADMIN_PASSWORD" \
  -F "next=/admin/content" \
  "$BASE_URL/api/admin/login")"
[[ "$login_status" == "303" ]] || fail "admin login returned HTTP $login_status"

grep -Eqi '^location: .*\/admin/content' "$login_headers" || fail "login did not preserve requested admin destination"
session="$(grep -i '^set-cookie:' "$login_headers" | sed -n 's/.*ayene_admin_session=\([^;]*\).*/\1/p' | head -n 1)"
[[ -n "$session" ]] || fail "admin session cookie was not issued"
auth_header="Cookie: ayene_admin_session=$session"

for route in /admin /admin/content /admin/startups /admin/startups/new /admin/programs /admin/programs/new /admin/news /admin/news/new /admin/partners /admin/partners/new /admin/licenses /admin/licenses/new /admin/collaboration /admin/homepage /admin/settings; do
  expect_status 200 -H "$auth_header" "$BASE_URL$route"
done

echo "Checking real startup CRUD..."
startup_name="qa-startup"
create_status="$(curl -sS -o /dev/null -w '%{http_code}' \
  -H "$auth_header" \
  -X POST \
  -F 'operation=publish' \
  -F "name=$startup_name" \
  -F 'field=QA' \
  -F 'stage=idea' \
  -F 'summary=Production QA startup record' \
  "$BASE_URL/api/admin/startups")"
[[ "$create_status" == "303" ]] || fail "startup create returned HTTP $create_status"
expect_body "$startup_name" "$BASE_URL/startups/qa-startup"
expect_status 200 -H "$auth_header" "$BASE_URL/admin/startups/qa-startup"

delete_status="$(curl -sS -o /dev/null -w '%{http_code}' \
  -H "$auth_header" \
  -X POST \
  -F 'operation=delete' \
  "$BASE_URL/api/admin/startups/qa-startup")"
[[ "$delete_status" == "303" ]] || fail "startup delete returned HTTP $delete_status"
expect_status 404 "$BASE_URL/startups/qa-startup"

echo "Checking partner website link..."
partner_name="qa-partner"
partner_create_status="$(curl -sS -o /dev/null -w '%{http_code}' \
  -H "$auth_header" \
  -X POST \
  -F 'operation=publish' \
  -F "name=$partner_name" \
  -F 'website=qa-partner.example' \
  -F 'order=0' \
  "$BASE_URL/api/admin/partners")"
[[ "$partner_create_status" == "303" ]] || fail "partner create returned HTTP $partner_create_status"
expect_body 'href="https://qa-partner.example/"' "$BASE_URL/"
partner_delete_status="$(curl -sS -o /dev/null -w '%{http_code}' \
  -H "$auth_header" \
  -X POST \
  -F 'operation=delete' \
  "$BASE_URL/api/admin/partners/qa-partner")"
[[ "$partner_delete_status" == "303" ]] || fail "partner delete returned HTTP $partner_delete_status"

echo "Checking public collaboration submission..."
collab_headers="$TMP_DIR/collab-headers"
collab_status="$(curl -sS -D "$collab_headers" -o /dev/null -w '%{http_code}' \
  -X POST \
  --data-urlencode 'fullName=qa-contact' \
  --data-urlencode 'phone=09121234567' \
  --data-urlencode 'email=qa@example.com' \
  --data-urlencode 'type=mentor' \
  --data-urlencode 'subject=qa-subject' \
  --data-urlencode 'description=This is a production quality assurance collaboration request.' \
  "$BASE_URL/api/collaboration")"
[[ "$collab_status" == "303" ]] || fail "collaboration submit returned HTTP $collab_status"
grep -Eqi '^location: .*result=sent' "$collab_headers" || fail "collaboration submission did not report a successful save"
expect_body "qa-contact" -H "$auth_header" "$BASE_URL/admin/collaboration?q=qa-contact"

echo "Production QA passed."
