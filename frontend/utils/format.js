export const fmtInt = (n) => new Intl.NumberFormat().format(n || 0);
export const fmtCurrency = (n, currency = "USD") =>
  new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 0 }).format(n || 0);
