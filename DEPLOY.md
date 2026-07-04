# Deploy (Vercel preview)

This is a guide for a **preview deploy** — a shareable demo link, not the production launch. Preview deployments automatically send `X-Robots-Tag: noindex` and a `Disallow: /` robots.txt (see `next.config.ts` / `src/app/robots.ts`, keyed on Vercel's `VERCEL_ENV`), so nothing leaks into search before the real launch.

## Path A — GitHub + Vercel dashboard (recommended, no CLI)

1. Create an empty repository on [github.com/new](https://github.com/new) (private is fine).
2. In this project folder, push the existing local repo:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub, and import the repository you just pushed.
4. Vercel auto-detects Next.js — leave the build settings as default.
5. Before clicking Deploy, open **Environment Variables** and add the ones listed below.
6. Click **Deploy**. You'll get a URL like `https://<project>-<hash>.vercel.app` — that's the link to share.
7. Every future `git push` to `main` auto-redeploys; pushing to any other branch or opening a PR creates its own **preview** URL (also noindexed).

## Path B — Vercel CLI (faster if you're comfortable with a terminal)

```bash
npm i -g vercel
vercel login
vercel
```

`vercel` will ask a few questions (link to existing project? no → create new), then build and print a preview URL directly. Run `vercel --prod` only when you're ready for the real production domain — not needed for a demo.

## Environment variables for the demo

For a friend to just **see the site working**, you don't need real lead-routing credentials — the app runs safely with these unset (forms submit, but Resend/Telegram/webhook dispatch silently no-op). Minimum for a clean demo:

| Variable | Needed for demo? | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Set to the Vercel URL once you have it, so canonical/OG tags match (can also skip — the site still works, just prod-domain placeholders will show) |
| `RESEND_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `LEAD_WEBHOOK_URL`, `LEAD_NOTIFY_EMAIL` | No | Leave empty — lead form still works and shows the success state, it just doesn't dispatch anywhere yet |
| `NEXT_PUBLIC_TELEGRAM_HANDLE` etc. (contact channels) | No | Leave empty — ContactDock shows "coming soon" for unset channels instead of dead links |
| `NEXT_PUBLIC_CAL_COM_LINK` | No | Leave empty — booking section shows a placeholder card |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Leave empty — analytics stays disabled |

Fill in the real values later, per channel, whenever each account (Resend, Telegram bot, Cal.com) is ready — no code changes needed, just add the env var in Vercel's dashboard and redeploy.

## Verifying the preview is not indexable

After deploy, confirm:
```bash
curl -sI https://<your-preview-url>.vercel.app | grep -i x-robots-tag
curl -s https://<your-preview-url>.vercel.app/robots.txt
```
Expect `X-Robots-Tag: noindex, nofollow` on the header check, and `Disallow: /` in `robots.txt`.
