// Shared content types for the Pinned catalog.
// Kept deliberately plain so a headless CMS could map onto these later.

export type CollectionSlug =
  | 'places'
  | 'things'
  | 'feelings'
  | 'clubs'
  | 'limited';

export type ProductStatus = 'available' | 'low' | 'sold-out';

export type ProductBadge = 'New' | 'Limited' | 'Restocked' | 'Last few' | 'Back soon';

export interface VariantChoice {
  id: string;
  label: string;
  /** Added to the base price, in PHP. Omit or 0 for no change. */
  priceDelta?: number;
  soldOut?: boolean;
}

export interface VariantGroup {
  id: string;
  label: string;
  choices: VariantChoice[];
}

export interface Product {
  slug: string;
  name: string;
  /** One short, specific line. Shows under the name on cards. */
  tagline: string;
  collection: CollectionSlug;
  /** Base price in Philippine pesos. */
  price: number;
  /** Illustration key, resolved by the PinArt component. */
  art: string;
  /** Primary enamel colour for the pin artwork. */
  colorway: string;
  /** Secondary enamel colour. */
  colorwayAlt: string;
  description: string[];
  specs: string[];
  badge?: ProductBadge;
  status: ProductStatus;
  variants?: VariantGroup[];
  featured?: boolean;
  /** Eligible for the "currently stuck on" rotation. */
  stuckOn?: boolean;
  releasedAt: string;
  relatedSlugs?: string[];
}

export interface Collection {
  slug: CollectionSlug;
  name: string;
  /** One line shown in navigation and headers. */
  blurb: string;
  /** Longer intro for the collection page. */
  intro: string;
  accent: string;
}

export interface Stockist {
  name: string;
  kind: 'marketplace' | 'retail' | 'popup';
  location: string;
  note: string;
  /** Demo link target. Marketplace names are plain text for now. */
  url?: string;
}
