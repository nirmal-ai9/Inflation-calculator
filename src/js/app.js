import { DEFAULTS, STORAGE_KEYS } from './config.js';
import { els } from './dom.js';
import { getModelValues, summarize, validateModel } from './calculator.js';
import { createFormatter } from './format.js';
import { loadModel, loadTheme, saveModel, saveTheme } from './storage.js';
import { drawChart } from './chart.js';
import { exportCsv } from './export.js';
import { renderCurrencyPrefix, renderResults, setError } from './ui.js';

let data = [];

function readModel() {
  return {
    amount: Number(els.amount.value),
    rate: Number(els.rate.value),
    currency: els.currency.value,
    base: Number(els.base.value),
    start: Number(els.start.value),
    end: Number(els.end.value)
  };
}

function writeModel(model) {
  Object.entries(model).forEach(([key, value]) => {
    if (els[key]) els[key].value = value;
  });
}

function calculate() {
  const model = readModel();
  const validationError = validateModel(model);

  renderCurrencyPrefix(els.currencyPrefix, model.currency);

  if (validationError) {
    setError(els.error, validationError);
    return;
  }

  setError(els.error, '');
  data = getModelValues(model);
  const summary = summarize(data, model.amount, model.base);
  const formatter = createFormatter(model.currency);

  renderResults(els, data, model, summary, formatter.format.bind(formatter));
  drawChart(els.chart, data, formatter.format.bind(formatter));
  saveModel(model);
}

function reset() {
  writeModel(DEFAULTS);
  calculate();
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  els.theme.textContent = isLight ? '☾' : '☼';
  saveTheme(isLight ? 'light' : 'dark');
  if (data.length) {
    const formatter = createFormatter(els.currency.value);
    drawChart(els.chart, data, formatter.format.bind(formatter));
  }
}

function init() {
  const saved = loadModel();
  if (saved) writeModel(saved);

  if (loadTheme() === 'light') {
    document.body.classList.add('light');
    els.theme.textContent = '☾';
  }

  els.form.addEventListener('submit', (event) => {
    event.preventDefault();
    calculate();
  });

  document.querySelectorAll('.preset').forEach((button) => {
    button.addEventListener('click', () => {
      els.end.value = Number(els.start.value) + Number(button.dataset.preset);
      calculate();
    });
  });

  els.reset.addEventListener('click', reset);
  els.export.addEventListener('click', () => exportCsv(data, Number(els.amount.value)));
  els.theme.addEventListener('click', toggleTheme);

  ['amount', 'rate', 'currency', 'base', 'start', 'end'].forEach((key) => {
    els[key].addEventListener('input', calculate);
  });

  window.addEventListener('resize', () => {
    if (!data.length) return;
    const formatter = createFormatter(els.currency.value);
    drawChart(els.chart, data, formatter.format.bind(formatter));
  });

  calculate();
}

init();
