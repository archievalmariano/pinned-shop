// Global brand strings and navigation. Single source of truth for chrome.

export const site = {
  name: 'Pinned',
  domain: 'pinned.com.ph',
  url: 'https://pinned.com.ph',
  // Brand thought. Used sparingly — not stamped on every page.
  thought: 'Small things worth keeping.',
  line: 'Pinned is for things worth keeping. Pining is for everything else.',
  description:
    'Pinned makes enamel pins and small collectibles about places, things, feelings, and clubs that never meet. Made in Manila.',
  location: 'Manila, Philippines',
  email: 'hello@pinned.com.ph',
  instagram: 'pinned.ph',
  currency: 'PHP',
  disclosure:
    'Pinned is a fictional brand built as a web-development demonstration. Nothing here is for sale, no orders are fulfilled, and checkout is a mock flow.',
};

export const mainNav = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/shop#collections' },
  { label: 'Pinboard', href: '/pinboard' },
  { label: 'About', href: '/about' },
  { label: 'Stockists', href: '/stockists' },
];

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'All pins', href: '/shop' },
      { label: 'Places', href: '/collections/places' },
      { label: 'Things', href: '/collections/things' },
      { label: 'Feelings', href: '/collections/feelings' },
      { label: 'Clubs', href: '/collections/clubs' },
      { label: 'Limited', href: '/collections/limited' },
    ],
  },
  {
    title: 'The brand',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Pinboard', href: '/pinboard' },
      { label: 'The Board', href: '/board' },
      { label: 'Stockists', href: '/stockists' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
      { label: 'Cart', href: '/cart' },
    ],
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const faq: { group: string; items: FaqItem[] }[] = [
  {
    group: 'Ordering',
    items: [
      {
        q: 'Is this a real shop?',
        a: 'No. Pinned is a fictional brand made to demonstrate a small e-commerce build. You can add pins to a cart and walk through checkout, but no order is placed and nothing ships.',
      },
      {
        q: 'How does the cart work then?',
        a: 'Everything lives in your browser. Your cart and your saved pins persist locally until you clear them. Nothing is sent anywhere.',
      },
      {
        q: 'What does a pin cost?',
        a: 'Between ₱260 and ₱420, depending on size and finish. Limited runs sit at the top of that range because there are fewer of them.',
      },
    ],
  },
  {
    group: 'The pins',
    items: [
      {
        q: 'What are they made of?',
        a: 'Hard enamel with gold or silver plating, most between 28mm and 40mm, with rubber clutches as standard. Locking pin backs are a small upgrade at checkout.',
      },
      {
        q: 'What does "Limited" mean?',
        a: 'A short numbered run we do not reprint. When the board says gone, it stays gone. This is on purpose.',
      },
      {
        q: 'Do you restock?',
        a: 'Core pins, sometimes. Limited pins, never. If a pin says "Back soon," it is being re-pressed and will return in the same form.',
      },
    ],
  },
  {
    group: 'Everything else',
    items: [
      {
        q: 'Do you have a newsletter?',
        a: 'Yes. Occasional and quiet, mostly new drops and the odd Pinboard piece. Leave any time.',
      },
      {
        q: 'Where are you?',
        a: 'Manila. We sell here directly and through Shopee, Lazada, and TikTok Shop, plus a few shelves around the metro.',
      },
    ],
  },
];
