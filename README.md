# Umair Malik — DevOps Portfolio

A fast, data-driven Next.js portfolio designed for client acquisition and credible technical proof.

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

## Edit content

- `data/portfolio.ts` — services, case studies, projects, and technologies. The supplied project cards are deliberate placeholders: replace them only with approved, truthful details.
- `app/page.tsx` — site copy, experience statement, contact form markup, social links, and the architecture illustration.
- `app/layout.tsx` — SEO metadata and canonical URL. Replace `https://your-domain.example` with the final deployed domain.

## Contact form

The form validates in the browser and displays a clear success state, but does not send email yet — this avoids pretending a message was delivered. Connect it to a preferred endpoint (Resend, Formspree, Basin, or a Next.js route) before relying on it for enquiries.

## Continuous deployment

Pushing to `main` deploys the site to `129.80.240.109`. The workflow connects over SSH, updates `/opt/umair-devops-site`, builds the Docker image, then restarts the site service.

Before the first deployment, add the private half of a dedicated server-login key as the repository secret `DEPLOY_SSH_KEY`. Its matching public key must be in `/home/ubuntu/.ssh/authorized_keys` on the server.

The server is expected to have Git, Docker, Nginx, and the `umair-devops-portfolio` systemd service installed.
