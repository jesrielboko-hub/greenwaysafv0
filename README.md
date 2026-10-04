# Greenway Athletic Field Services

Modern, conversion-focused Greenway AFS website built with Next.js and designed around the supplied Greenway brand guide.

## Routes

- `/` — homepage
- `/services` — full services page
- `/services/[slug]` — reusable service pages
- `/projects` — filterable project library
- `/projects/[slug]` — case studies
- `/industries/[slug]` — audience pages
- `/about` — leadership and industry partners
- `/resources` — Built Beneath the Surface guide request
- `/contact` — field assessment
- `/admin` — admin console

## Admin

Set `ADMIN_PASSWORD` and `SESSION_SECRET` in Render. The admin portal is intentionally included in the same web service so it can be deployed alongside the public site.

The current Free Render version uses the local filesystem as a temporary datastore. See `RENDER.md` for persistence limitations and the upgrade path.


## Admin quick start

Open `/admin` and sign in with the `ADMIN_PASSWORD` environment variable. The dashboard includes a quick-start guide, lead overview, and lightweight website page-view counts.

## Analytics

The built-in analytics records anonymous page-view events (page path and timestamp only; no IP address) so the admin dashboard can show total visits, last-7-day visits, and top pages. This is intentionally lightweight for the revision/testing phase and is not a replacement for GA4 or a full analytics platform.
