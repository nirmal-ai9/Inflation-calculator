export function getModelValues({ amount, rate, base, start, end }) {
  const inflationRate = rate / 100;
  return Array.from({ length: end - start + 1 }, (_, index) => {
    const year = start + index;
    return {
      year,
      val: amount * Math.pow(1 + inflationRate, year - base)
    };
  });
}

export function validateModel({ amount, rate, base, start, end }) {
  if (!(amount > 0) || !Number.isFinite(rate) || !Number.isInteger(base) || !Number.isInteger(start) || !Number.isInteger(end)) {
    return 'Enter valid numbers in every field.';
  }
  if (end < start) return 'End year must be the same as or after start year.';
  if (end - start > 100) return 'Keep the visible range at 100 years or less.';
  if (rate <= -100) return 'Inflation rate must be greater than -100%.';
  return '';
}

export function summarize(data, amount, base) {
  const first = data[0].val;
  const last = data.at(-1).val;
  const change = (last / first - 1) * 100;
  const multiplier = last / amount;
  const purchasingPower = 100 / multiplier;
  const yearsFromBase = data.at(-1).year - base;

  return {
    first,
    last,
    change,
    multiplier,
    purchasingPower,
    yearsFromBase
  };
}
