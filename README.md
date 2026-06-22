# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
pnpm install
```

## Local Development

```bash
pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Deployment is automated via the **Deploy to IPFS** GitHub Actions workflow
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). It builds the
site and publishes the `dist` output to IPFS through Pinata.

The workflow is triggered manually from the **Actions** tab via
`workflow_dispatch` — it does not deploy automatically on push.
