export function createFormatter(currency) {
  return new Intl.NumberFormat(currency === 'JPY' ? 'ja-JP' : 'en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  });
}

export function percent(value, digits = 1) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(digits)}%`;
}
