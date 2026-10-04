# Render deployment

## Web Service

Build command:

```bash
npm install && npm run build
```

Start command:

```bash
npm start
```

Recommended environment variables:

```text
NEXT_PUBLIC_SITE_URL=https://www.greenwayafs.com
NEXT_PUBLIC_PHONE=203.569.2942
NEXT_PUBLIC_EMAIL=your-current-greenway-email
ADMIN_PASSWORD=use-a-strong-random-password
SESSION_SECRET=use-a-long-random-secret
```

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

The admin API currently stores content, uploads and leads on the service filesystem. Render Free web services have an ephemeral filesystem: changes to local files are lost when the service redeploys, restarts or spins down. Free web services also cannot use persistent disks. Render currently offers Free Postgres, but Free Postgres expires after 30 days, so it should only be treated as temporary/test storage.

For production CMS persistence, keep the same admin UI/API but connect the store to a persistent database and object storage, or move the Render web service to a paid plan with a persistent disk.

Do not treat the Free admin storage as the permanent production CMS.
