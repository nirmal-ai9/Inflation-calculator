import { SYMBOLS } from './config.js';
import { percent } from './format.js';

export function setError(element, message) {
  element.textContent = message;
  element.style.display = message ? 'block' : 'none';
}

export function renderCurrencyPrefix(element, currency) {
  element.textContent = SYMBOLS[currency] || currency;
}

export function renderResults(els, data, model, summary, format) {
  const { amount, rate, base, start, end } = model;
  const { last, change, multiplier, purchasingPower, yearsFromBase } = summary;

  els.headlineLabel.textContent = `${format(amount)} in ${base} becomes`;
  els.headlineValue.textContent = format(last);
  els.headlineYear.textContent = `by ${data.at(-1).year}`;
  els.headlinePill.textContent = `${percent(change)} across visible range`;
  els.increase.textContent = percent(change);
  els.power.textContent = `${purchasingPower.toFixed(1)}%`;
  els.multiplier.textContent = `${multiplier.toFixed(2)}×`;
  els.chartMeta.textContent = `${start} → ${end} · ${rate}% annual`;

  els.rows.innerHTML = '';
  const max = Math.max(...data.map((item) => item.val), amount);

  data.forEach((item, index) => {
    const previous = index ? data[index - 1].val : item.val;
    const previousChange = index ? (item.val / previous - 1) * 100 : 0;
    const barWidth = Math.max(2, item.val / max * 100);
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.year}</td>
      <td class="mono">${format(item.val)}</td>
      <td class="mono">${(item.val / amount).toFixed(2)}×</td>
      <td class="mono">${index ? percent(previousChange) : '—'}</td>
      <td><div class="bar"><i style="width:${barWidth}%"></i></div></td>
    `;
    els.rows.appendChild(row);
  });

  const basketMultiplier = Math.pow(1 + rate / 100, yearsFromBase);
  els.insight.innerHTML = `
    <strong>Quick read:</strong> At ${rate}% annual inflation, prices multiply by about
    <strong>${basketMultiplier.toFixed(2)}×</strong> over ${Math.abs(yearsFromBase)} years from ${base}.
    That means something costing ${format(amount)} in ${base} would need about
    <strong>${format(last)}</strong> to buy the same basket by ${data.at(-1).year}.
  `;
}
