import type { Stockist } from './types';

// Marketplace names are plain text for now. The `url` fields point at the
// brand's own placeholder storefront paths so official marks can be swapped
// in later without touching layout. Every entry below is fictional.
export const stockists: Stockist[] = [
  {
    name: 'Shopee',
    kind: 'marketplace',
    location: 'Nationwide shipping',
    note: 'The full catalogue, plus the occasional sale-day voucher.',
    url: '#',
  },
  {
    name: 'Lazada',
    kind: 'marketplace',
    location: 'Nationwide shipping',
    note: 'Same pins, LazMall storefront.',
    url: '#',
  },
  {
    name: 'TikTok Shop',
    kind: 'marketplace',
    location: 'Nationwide shipping',
    note: 'New drops usually go live here first.',
    url: '#',
  },
  {
    name: 'Independent bookshops',
    kind: 'retail',
    location: 'Selected shops, Metro Manila',
    note: 'On the pin card by the register, near the zines.',
  },
  {
    name: 'Design & stationery shops',
    kind: 'retail',
    location: 'Makati & Quezon City',
    note: 'A rotating shelf near the notebooks and pens.',
  },
  {
    name: 'Lifestyle stores',
    kind: 'retail',
    location: 'Metro Manila',
    note: 'Tucked in with the everyday small goods.',
  },
  {
    name: 'Museum & gallery gift shops',
    kind: 'retail',
    location: 'Manila',
    note: 'By the postcards, which feels about right.',
  },
  {
    name: 'Weekend design markets',
    kind: 'popup',
    location: 'Escolta & Makati, occasional weekends',
    note: 'Our own table, with singles you cannot get online.',
  },
  {
    name: 'Art & print fairs',
    kind: 'popup',
    location: 'Around Metro Manila',
    note: 'Test presses and one-offs. Cash preferred.',
  },
];
