# Deploying qrdx.org

The site is a static export: `NODE_ENV=production` turns on `output: 'export'` with trailing slashes and unoptimized images (`next.config.mjs`).

```bash
pnpm install
pnpm build:nobun    # writes out/
```

Upload `out/` to any static host. There is no server-side code: live figures are fetched by the browser from the testnet node and the trade API.

- **Redirects.** `next.config.mjs` redirects `/docs/*` to `https://docs.qrdx.org/docs/*`. A static export does not apply redirects, so configure the same rule on the host (on Cloudflare Pages, a `_redirects` line: `/docs/* https://docs.qrdx.org/docs/:splat 301`).
- **Whitepaper PDFs.** `pnpm build` runs `scripts/generate-whitepaper-pdf.sh` first, which needs `pandoc` and `xelatex`; without them the build continues with the PDFs already in `public/`. Run `pnpm generate-pdf` after editing a whitepaper.
- **PWA.** `public/manifest.json` and the icons in `public/` make the site installable; `components/PWANavigationHandler.tsx` handles navigation when it runs as an installed app.

Check a build locally with `npx serve out`.
