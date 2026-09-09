# Production deployment

This project is intentionally deployed as a small, maintainable stack:

- Ubuntu LTS VPS
- Nginx on the host for ports 80/443 and TLS
- Next.js in Docker, bound only to `127.0.0.1:3000`
- Prisma + SQLite on a persistent Docker volume
- Uploaded files on the same persistent volume

No PostgreSQL, Redis, Kubernetes, or external authentication service is required.

## Recommended VPS

For the current public-relations workload, start with:

- 2 vCPU
- 4 GB RAM
- 40–80 GB SSD
- Ubuntu 24.04 LTS (22.04 LTS is also fine)

Only ports 22, 80 and 443 should be reachable from the internet. Port 3000 stays localhost-only.

## 1. Prepare the server

Install Git, Docker with the Compose plugin, Nginx, Certbot and curl. Package names vary slightly by Ubuntu release; after installation these commands must work:

```bash
git --version
docker --version
docker compose version
nginx -v
certbot --version
curl --version
```

Recommended firewall baseline:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

Use SSH keys for the deployment user. Do not expose Docker or port 3000 publicly.

## 2. Clone and configure

A conventional location is `/opt/creativehouse`:

```bash
sudo mkdir -p /opt/creativehouse
sudo chown "$USER":"$USER" /opt/creativehouse
git clone https://github.com/mahdimarzooghi4-debug/creativehouse.git /opt/creativehouse
cd /opt/creativehouse
cp .env.production.example .env.production
```

Generate a production auth secret:

```bash
openssl rand -base64 48
```

Edit `.env.production` and set:

- `AUTH_SECRET` to the generated random value
- `ADMIN_INITIAL_USERNAME`
- a strong `ADMIN_INITIAL_PASSWORD` of at least 12 characters
- `ADMIN_INITIAL_NAME`

Keep this line unchanged unless the storage design changes:

```env
DATABASE_URL="file:/data/creativehouse.db"
```

`.env.production` is ignored by Git and must never be committed.

## 3. First application deploy

```bash
cd /opt/creativehouse
bash scripts/deploy.sh
```

The deploy script:

1. takes a pre-deploy backup when a live installation already exists;
2. fast-forwards the local checkout from `origin/main`;
3. builds the production image;
4. applies Prisma migrations;
5. enables SQLite WAL journal mode;
6. starts/restarts the app container;
7. waits for `/api/health` to report healthy.

Check locally on the server:

```bash
curl http://127.0.0.1:3000/api/health
docker compose ps
```

The application is deliberately published only as `127.0.0.1:3000:3000`, so it is not directly reachable from the internet.

## 4. Configure Nginx

Once the domain is known:

```bash
bash scripts/configure-nginx.sh ayenehouse.ir
```

The Nginx template is in `deploy/nginx/creativehouse.conf.template`. It proxies requests to the local Next.js container and sets a 15 MB request limit plus basic security headers.

Point the domain's DNS `A` record to the VPS IPv4 address. If IPv6 is used, add the corresponding `AAAA` record as well.

## 5. Enable HTTPS

After DNS resolves to the server and plain HTTP works:

```bash
bash scripts/enable-ssl.sh ayenehouse.ir admin@example.com
```

This obtains a Let's Encrypt certificate through Certbot, enables HTTPS redirection and leaves certificate renewal to the system Certbot timer.

Verify renewal later with:

```bash
sudo certbot renew --dry-run
```

## Backups

Run a manual backup at any time:

```bash
cd /opt/creativehouse
bash scripts/backup.sh
```

Each archive contains a consistent SQLite backup plus the uploaded files. Archives are written to the host `backups/` directory and local archives older than 30 days are removed automatically.

A simple daily cron entry is sufficient for this site:

```cron
15 3 * * * cd /opt/creativehouse && /usr/bin/bash scripts/backup.sh >> /tmp/creativehouse-backup.log 2>&1
```

At least one copy must eventually be stored outside this VPS: another server, provider backup space, object storage, or a periodic workstation copy. A backup that exists only on the same disk is not a disaster-recovery backup.

## Restore

Stop the app first:

```bash
cd /opt/creativehouse
docker compose stop app
```

Extract the selected archive:

```bash
rm -rf restore
mkdir restore
tar -xzf backups/creativehouse-YYYYMMDDTHHMMSSZ.tar.gz -C restore
```

Replace the persistent data volume:

```bash
docker run --rm \
  -v creativehouse_creativehouse_data:/data \
  -v "$PWD/restore:/restore:ro" \
  alpine:3.20 sh -c '
    rm -f /data/creativehouse.db /data/creativehouse.db-wal /data/creativehouse.db-shm
    cp /restore/creativehouse.db /data/creativehouse.db
    rm -rf /data/uploads
    if [ -d /restore/uploads ]; then cp -a /restore/uploads /data/uploads; else mkdir -p /data/uploads; fi
    chown -R 1001:1001 /data
  '
```

Then apply any current migrations and start again:

```bash
docker compose --profile tools run --rm migrate
docker compose up -d app
curl http://127.0.0.1:3000/api/health
```

## Routine releases

For normal updates:

```bash
cd /opt/creativehouse
bash scripts/deploy.sh
```

Do not run `prisma migrate reset` in production. Production schema changes must always be applied with committed migrations and `prisma migrate deploy`.

## Operational notes

- SQLite and uploads live on Docker volume `creativehouse_creativehouse_data` and survive image/container replacement.
- The database is configured for WAL mode during deployment, which suits the site's read-heavy and low-write workload.
- The admin session secret must remain stable between deployments; changing `AUTH_SECRET` logs out all admins.
- The initial admin environment variables are only used when no admin exists in the database.
- Use the CMS to change the admin username/password after first login rather than repeatedly changing the initial credentials.
- Before deleting a VPS, verify an external backup can actually be restored.
