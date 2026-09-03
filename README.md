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

The form validates in the browser and displays a clear success state, but does not send email yet — this avoids pretending a message was delivered. Connect the form to your preferred endpoint (Resend, Formspree, Basin, or a Next.js route) before publishing. Update the GitHub, email, and resume placeholders in the footer when their real URLs are available.

## Deploy

The app is deployable on Vercel with the standard Next.js settings: import the repository, set no special build command (default `npm run build`), and deploy. For another host, run `npm run build` and serve with `npm start`.
