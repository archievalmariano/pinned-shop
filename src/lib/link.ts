// Prefix internal links/assets with the configured base path so the site works
// when served from a subpath (e.g. GitHub Pages at /pinned-shop/). Astro does
// not rewrite hand-written absolute hrefs, so route them through this helper.
//
// Usage (server or client): link('/shop') -> '/pinned-shop/shop'
//   import.meta.env.BASE_URL is '/pinned-shop/' in production and '/' in dev-at-root.

const BASE = import.meta.env.BASE_URL; // e.g. '/pinned/' or '/'

export function link(path = '/'): string {
  // Leave external links, anchors, mailto/tel, and protocol URLs untouched.
  if (!path.startsWith('/')) return path;
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const joined = `${base}${path}`;
  return joined === '' ? '/' : joined;
}
