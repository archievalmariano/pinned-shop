// Formatting helpers. Safe to import on the server or client.

const peso = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Format a whole-peso amount, e.g. 280 -> "₱280". */
export function formatPeso(amount: number): string {
  return peso.format(amount);
}

const dateFmt = new Intl.DateTimeFormat('en-PH', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso));
}
