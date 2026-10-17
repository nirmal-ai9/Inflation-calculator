export function exportCsv(data, amount) {
  const header = ['Year', 'Equivalent value', 'Multiplier', 'Change vs previous'];
  const lines = [header.join(',')];

  data.forEach((item, index) => {
    const multiplier = item.val / amount;
    const change = index ? ((item.val / data[index - 1].val - 1) * 100).toFixed(2) : '0';
    lines.push([item.year, item.val.toFixed(2), multiplier.toFixed(4), change].join(','));
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'inflation-lab.csv';
  anchor.click();
  URL.revokeObjectURL(url);
}
