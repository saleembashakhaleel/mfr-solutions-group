# Deploying to Vercel

This project was generated from Lovable. The default build targets
**Cloudflare Workers** (via `@lovable.dev/vite-tanstack-config`, which
bundles the Cloudflare plugin and reads `wrangler.jsonc`). That is why
a stock Vercel deploy succeeds but every route returns **404: NOT_FOUND**:
Vercel has no handler for the Worker output.

You have two options.

## Option A — Deploy to Cloudflare Workers (recommended, zero config)

```bash
npm install
npm run build
npx wrangler deploy
```

`wrangler.jsonc` is already configured. This is the path the export is
wired for.

## Option B — Deploy to Vercel

You must switch the TanStack Start build target away from Cloudflare.

1. Replace `vite.config.ts` with:

```ts
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({ target: "vercel", server: { entry: "server" } }),
    viteReact(),
  ],
  server: { port: 8080, host: "::" },
});
```

2. Delete `wrangler.jsonc` (no longer needed).

3. Add `vercel.json` at the project root:

```json
{
  "framework": null,
  "buildCommand": "npm run build",
  "outputDirectory": ".vercel/output"
}
```

4. Install the Vercel-compatible plugins (the Lovable wrapper bundled
   Cloudflare, not Vercel):

```bash
npm install --save-dev @tanstack/react-start @vitejs/plugin-react \
  @tailwindcss/vite vite-tsconfig-paths
npm remove @lovable.dev/vite-tanstack-config @cloudflare/vite-plugin wrangler
```

5. In the Vercel dashboard, set **Framework Preset = Other** (NOT
   "TanStack Start" — that preset assumes a different output layout and
   is what's returning 404 for you). Build command and output dir are
   read from `vercel.json` above.

6. Push and redeploy.

### Required Node version

Node **20.x** (LTS). Set `"engines": { "node": "20.x" }` in `package.json`
if Vercel picks a different default.

### Environment variables

None required — the site has no backend keys.

## ISO Certificate PDFs

The three ISO certificates ship as static files at:

```
public/certificates/iso-9001-mfr.pdf
public/certificates/iso-14001-mfr.pdf
public/certificates/iso-45001-mfr.pdf
```

They are referenced from `src/routes/certifications.tsx` as
`/certificates/<file>.pdf` and rendered inside an `<iframe>` with the
PDF.js toolbar parameters `#toolbar=0&navpanes=0&scrollbar=0` and
`onContextMenu` disabled on the modal — this hides the download button
and right-click "Save as" in the in-browser viewer. Note that no
web-based viewer can fully prevent a determined user from saving a file
that the browser has already fetched; this is best-effort discouragement,
not DRM.