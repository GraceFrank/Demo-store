const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const shortDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatPrice(amount: number): string {
  return currency.format(amount);
}

export function formatDate(iso: string): string {
  return shortDate.format(new Date(iso));
}
