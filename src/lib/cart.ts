// Client-side cart. Persists to localStorage and broadcasts changes on a
// window event so any island (header badge, drawer, cart page) can stay in sync
// without a framework. Server code must not import this directly.

import { products } from '../data/products';
import type { Product } from '../data/types';
import { track } from './analytics';

const STORAGE_KEY = 'pinned:cart:v1';
const CHANGE_EVENT = 'pinned:cart:change';

export interface CartLine {
  /** Stable composite id: slug plus the chosen variants. */
  id: string;
  slug: string;
  qty: number;
  variants: Record<string, string>;
}

export interface DetailedLine extends CartLine {
  product: Product;
  unitPrice: number;
  lineTotal: number;
  variantLabel: string;
}

export interface CartSummary {
  lines: DetailedLine[];
  count: number;
  subtotal: number;
}

const productMap: Record<string, Product> = Object.fromEntries(
  products.map((p) => [p.slug, p]),
);

function makeLineId(slug: string, variants: Record<string, string>): string {
  const suffix = Object.keys(variants)
    .sort()
    .map((k) => `${k}:${variants[k]}`)
    .join('|');
  return suffix ? `${slug}__${suffix}` : slug;
}

function read(): CartLine[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l) => l && typeof l.slug === 'string' && productMap[l.slug],
    );
  } catch {
    return [];
  }
}

function write(lines: CartLine[]): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

function unitPrice(product: Product, variants: Record<string, string>): number {
  let price = product.price;
  for (const group of product.variants ?? []) {
    const chosen = variants[group.id];
    const choice = group.choices.find((c) => c.id === chosen);
    if (choice?.priceDelta) price += choice.priceDelta;
  }
  return price;
}

function variantLabel(product: Product, variants: Record<string, string>): string {
  const labels: string[] = [];
  for (const group of product.variants ?? []) {
    const chosen = variants[group.id];
    const choice = group.choices.find((c) => c.id === chosen);
    if (choice) labels.push(choice.label);
  }
  return labels.join(' · ');
}

export function getCart(): CartSummary {
  const lines = read();
  const detailed: DetailedLine[] = lines.map((line) => {
    const product = productMap[line.slug];
    const up = unitPrice(product, line.variants);
    return {
      ...line,
      product,
      unitPrice: up,
      lineTotal: up * line.qty,
      variantLabel: variantLabel(product, line.variants),
    };
  });
  return {
    lines: detailed,
    count: detailed.reduce((n, l) => n + l.qty, 0),
    subtotal: detailed.reduce((n, l) => n + l.lineTotal, 0),
  };
}

export function addToCart(
  slug: string,
  variants: Record<string, string> = {},
  qty = 1,
): void {
  const product = productMap[slug];
  if (!product || product.status === 'sold-out') return;
  const id = makeLineId(slug, variants);
  const lines = read();
  const existing = lines.find((l) => l.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    lines.push({ id, slug, qty, variants });
  }
  write(lines);
  track({
    name: 'add_to_cart',
    slug,
    qty,
    price: unitPrice(product, variants),
    variant: variantLabel(product, variants) || undefined,
  });
}

export function setQty(id: string, qty: number): void {
  let lines = read();
  if (qty <= 0) {
    lines = lines.filter((l) => l.id !== id);
  } else {
    const line = lines.find((l) => l.id === id);
    if (line) line.qty = Math.min(qty, 99);
  }
  write(lines);
}

export function removeLine(id: string): void {
  const lines = read();
  const line = lines.find((l) => l.id === id);
  write(lines.filter((l) => l.id !== id));
  if (line) track({ name: 'remove_from_cart', slug: line.slug });
}

export function clearCart(): void {
  write([]);
}

export function onCartChange(cb: () => void): () => void {
  const handler = () => cb();
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener('storage', handler); // cross-tab
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

export { CHANGE_EVENT };
