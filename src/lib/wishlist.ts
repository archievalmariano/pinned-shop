// "Pinned for later" — a lightweight local wishlist. Same event pattern as the
// cart so headers and badges can subscribe. Client-only.

import { track } from './analytics';

const STORAGE_KEY = 'pinned:saved:v1';
const CHANGE_EVENT = 'pinned:saved:change';

function read(): string[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function getSaved(): string[] {
  return read();
}

export function isSaved(slug: string): boolean {
  return read().includes(slug);
}

export function toggleSaved(slug: string): boolean {
  const slugs = read();
  const idx = slugs.indexOf(slug);
  let nowSaved: boolean;
  if (idx >= 0) {
    slugs.splice(idx, 1);
    nowSaved = false;
    track({ name: 'wishlist_remove', slug });
  } else {
    slugs.push(slug);
    nowSaved = true;
    track({ name: 'wishlist_add', slug });
  }
  write(slugs);
  return nowSaved;
}

export function onSavedChange(cb: () => void): () => void {
  const handler = () => cb();
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

export { CHANGE_EVENT as SAVED_CHANGE_EVENT };
