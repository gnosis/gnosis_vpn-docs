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
site (regenerating and stamping the llms files as part of the build) and
publishes the `build` output to IPFS through Pinata.

The workflow runs automatically on every push to `main` that touches site
content (`docs/`, `static/`, `src/`, config), pins the build to IPFS, and
proposes the ENS contenthash update to the Safe. A Safe signer must still
approve the proposed transaction before the new version goes live. The
workflow can also be run manually from the **Actions** tab via
`workflow_dispatch`, where the ENS proposal step is an optional checkbox.
