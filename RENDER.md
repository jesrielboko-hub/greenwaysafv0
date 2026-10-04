# Render deployment

## Web Service

Use a **Web Service**, not a Background Worker.

Build command:

```bash
npm install && npm run build
```

Start command:

```bash
npm start
```

The `start` script explicitly binds Next.js to `0.0.0.0` and Render's `$PORT`, with port 3000 as a local fallback.

Recommended environment variables:

```text
NEXT_PUBLIC_SITE_URL=https://www.greenwayafs.com
NEXT_PUBLIC_PHONE=203.569.2942
NEXT_PUBLIC_EMAIL=your-current-greenway-email
ADMIN_PASSWORD=use-a-strong-random-password
SESSION_SECRET=use-a-long-random-secret
```

## If Render reports "no open ports detected"

1. Confirm the service type is **Web Service**.
2. Confirm the start command is exactly `npm start`.
3. Do not use `npm run dev` as the production start command.
4. If Render asks for a port, use the value provided by the `PORT` environment variable; the application binds to it automatically.

## Admin portal

The admin console is available at:

`/admin`

It supports:
- projects
- services
- leadership
- testimonials
- resource/guide content
- industry partner image
- site settings
- lead submissions
- image uploads

### Important Render Free limitation

The admin API currently stores content, uploads and leads on the service filesystem. Render Free web services have an ephemeral filesystem: changes to local files are lost when the service redeploys, restarts or spins down. Free web services also cannot use persistent disks.

For the revision/testing phase, this is intentional. Later, the same admin UI/API can be moved to Render persistent storage/database when the site is ready for production.
