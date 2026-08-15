import type { Collection } from './types';

// Collections are the top-level way to browse the shop.
export const collections: Collection[] = [
  {
    slug: 'places',
    name: 'Places',
    blurb: 'Transit, terminals, and the places you only half-arrive at.',
    intro:
      'Pins for commutes, checkouts, terminals, and window seats. For getting there, and getting back.',
    accent: '#2450C8',
  },
  {
    slug: 'things',
    name: 'Things',
    blurb: 'Cameras, cassettes, cups gone cold. Objects that outlast their use.',
    intro:
      'The everyday artifacts that end up in drawers. Analog holdouts and mundane objects we keep well past the point of function.',
    accent: '#E4472B',
  },
  {
    slug: 'feelings',
    name: 'Feelings',
    blurb: 'Missed timing, awkward affection, and unsent messages.',
    intro:
      'The hardest collection to keep in stock. Emotional states rendered small enough to wear on a bag and pretend you are fine.',
    accent: '#6B4E9E',
  },
  {
    slug: 'clubs',
    name: 'Clubs',
    blurb: 'Memberships to societies that do not meet and never will.',
    intro:
      'Badges for organisations with no dues, no minutes, and no agenda. You are already a member. There is nothing to attend.',
    accent: '#2E7D5B',
  },
  {
    slug: 'limited',
    name: 'Limited',
    blurb: 'Short runs. When they are gone, they stay gone.',
    intro:
      'Seasonal and one-off releases, pressed in small numbers. We do not restock these. That is the whole point of them.',
    accent: '#C9862B',
  },
];

export const collectionBySlug = Object.fromEntries(
  collections.map((c) => [c.slug, c]),
) as Record<string, Collection>;
