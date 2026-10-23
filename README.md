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

### Cloudflare Workers Builds

Cloudflare [detects `.node-version`](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/#overriding-default-versions)
in the project root and uses Node.js **24.22.1** for builds. No runtime
`NODE_VERSION` binding or Astro server adapter is needed for this static site.

When connecting this repository to Workers Builds, use:

| Setting                 | Value                                     |
| ----------------------- | ----------------------------------------- |
| Production branch       | `master`                                  |
| Root directory          | Repository root                           |
| Build command           | `npm run build`                           |
| Static assets directory | `dist/` (in the deployment configuration) |

Under **Settings > Build > Build Variables and Secrets**, remove any stale
`NODE_VERSION` override or set it to `24.22.1` so it matches `.node-version`.
Check the next build log to confirm the selected Node.js version.

This configures the build's Node.js version only. Wrangler deployment configuration,
the Git connection, and custom domain setup still need to be completed before
switching hosting to Cloudflare.
