# Umair Malik — DevOps Portfolio

A production portfolio focused on Umair Malik's hands-on DevOps, infrastructure, networking, observability and troubleshooting work.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Build for production with `npm run build`, then run it with `npm start`.

## Run with Docker

The included multi-stage `Dockerfile` builds a minimal standalone production image.

```bash
docker build -t umair-devops-portfolio .
docker run --rm -p 3000:3000 --name umair-portfolio umair-devops-portfolio
```

Then open `http://localhost:3000`. Stop the container with `docker stop umair-portfolio`.

## Content management

- `/admin` provides authenticated project management and the contact inbox.
- `data/portfolio.ts` contains the initial project set used when the persistent data file does not yet exist.
- Set `DATA_DIR` to a persistent, writable directory outside the container image.

## Contact form

The contact form stores enquiries in the persistent data directory. Authenticated administrators can read and remove them from `/admin`.

## Required environment

`APP_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, and `DATA_DIR` are required in production. `ADMIN_PASSWORD_HASH` uses the format `salt:scryptHash`.

## Continuous deployment

Pushing to `main` deploys the site to `129.80.240.109`. The workflow connects over SSH, updates `/opt/umair-devops-site`, builds the Docker image, then restarts the site service.

Before the first deployment, add the private half of a dedicated server-login key as the repository secret `DEPLOY_SSH_KEY`. Its matching public key must be in `/home/ubuntu/.ssh/authorized_keys` on the server.

The server is expected to have Git, Docker, Nginx, and the `umair-devops-portfolio` systemd service installed.
