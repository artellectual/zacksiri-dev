# zacksiri.dev

Zack Siri's engineering blog.

## Tools

- Astro Static Site Generator

## Node.js

Use Node.js **24.22.1**. `.tool-versions` pins the local mise/asdf version,
`.node-version` pins the Cloudflare Workers Builds version, and `package.json`
declares the supported Node.js range. Keep these files in sync when upgrading.

```sh
mise install
npm ci
npm run build
```

## Deployment

### Current hosting

The existing GitHub Actions workflow deploys to [OpsMaru](https://opsmaru.com).
It remains unchanged until the Cloudflare migration is complete.

### Cloudflare Workers

`wrangler.jsonc` configures the `zacksiri-dev` Worker to serve `dist/` as static
assets. There is no Worker script, backend, or Astro server adapter. Unknown
paths return the site's `404.html` with a 404 status, and `public/_redirects`
preserves the old jump-consistent-hashing post URL with an HTTP 301. Astro's
existing redirect is retained as a fallback for the current host.

Wrangler is pinned in `package.json` and installed by `npm ci`. To validate the
built site without deploying:

```sh
mise exec -- npm run build
mise exec -- npm run deploy:dry-run
mise exec -- npm run preview:cloudflare
```

The last command starts a local Cloudflare preview at `http://localhost:8787`.
Rebuild after changing the site; the Wrangler preview serves the existing `dist/`.
`npm run preview` remains available for Astro's own preview server.

For a manual deployment, authenticate locally with `mise exec -- npx wrangler login`,
verify the intended account with `mise exec -- npx wrangler whoami`, then run
`mise exec -- npm run deploy` **after building**. This publishes to the configured
Worker and is not a dry run. Workers Builds handles authentication for Git builds.

Worker logs and sampled traces are enabled in the configuration for any future
Worker code; this assets-only site does not run a custom request handler.

### Cloudflare Workers Builds

Cloudflare [detects `.node-version`](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/#overriding-default-versions)
in the project root and uses Node.js **24.22.1** for builds. No runtime
`NODE_VERSION` binding or Astro server adapter is needed for this static site.

When connecting this repository to Workers Builds, use:

| Setting                 | Value                         |
| ----------------------- | ----------------------------- |
| Worker name             | `zacksiri-dev`                |
| Production branch       | `master`                      |
| Root directory          | Repository root               |
| Build command           | `npm run build`               |
| Deploy command          | `npm run deploy`              |
| Static assets directory | `dist/` (in `wrangler.jsonc`) |

Under **Settings > Build > Build Variables and Secrets**, remove any stale
`NODE_VERSION` override or set it to `24.22.1` so it matches `.node-version`.
Check the next build log to confirm the selected Node.js version.

Merge these changes from `develop` into `master` before connecting production
builds. Connect the repository to the Worker, then verify the deployed
`workers.dev` URL before attaching `zacksiri.dev` under **Settings > Domains &
Routes**. No custom domain or DNS changes are made by the current configuration.
After the Cloudflare site is verified, disable the old OpsMaru deployment workflow
to avoid continuing to deploy to both hosts.
