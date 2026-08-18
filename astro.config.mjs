// @ts-check
import { defineConfig } from 'astro/config';

// Deployed as a GitHub Pages project site at:
//   https://archievalmariano.com/pinned-shop/
// The user site (archievalmariano.github.io) uses the custom domain
// archievalmariano.com, so GitHub serves this project repo under that domain
// too. `site` is that origin; `base` is the repository subpath (the repo is
// named `pinned-shop`, so the path is /pinned-shop/). This repo must NOT carry
// its own CNAME — the account-level custom domain applies.
const SITE = 'https://archievalmariano.com';
const BASE = '/pinned-shop';

export default defineConfig({
  site: SITE,
  base: BASE,
  // Static output — this is a front-end/demo shop with no server runtime yet.
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
