# Greenway Athletic Field Services — Website Rebuild

Modern Next.js website for Greenway Athletic Field Services, designed around the supplied Greenway brand guide and current-site project content.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy on Render

Create a **Web Service** connected to this GitHub repository.

- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Node: 20+

Environment variables are optional; see `.env.example`.

## Content / photos

Project and service data lives in `lib/content.ts`. The current project images initially point to the real Greenway Wix-hosted images. Replace these URLs with Greenway's preferred photo repository assets as they become available.

The site intentionally uses a data-driven structure so additional projects/services can be added without rebuilding page layouts.

## Contact form

The assessment form is currently a front-end form. Connect it to Formspree, Resend, HubSpot, a server action, or another approved destination before launch. Do not publish the site with an unconfigured production form.
