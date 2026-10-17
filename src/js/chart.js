export function drawChart(canvas, items, formatValue) {
  if (!items.length) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  const padding = { left: 8, right: 8, top: 15, bottom: 30 };
  const min = Math.min(...items.map((item) => item.val));
  const max = Math.max(...items.map((item) => item.val));
  const range = max - min || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const styles = getComputedStyle(document.body);
  const muted = styles.getPropertyValue('--muted');
  const line = styles.getPropertyValue('--line');
  const cyan = styles.getPropertyValue('--cyan');

  ctx.font = '10px "Space Mono"';
  ctx.fillStyle = muted;
  ctx.strokeStyle = line;

  for (let index = 0; index < 4; index += 1) {
    const y = padding.top + (height - padding.top - padding.bottom) * index / 3;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    ctx.fillText(formatValue(max - (max - min) * index / 3), padding.left, y - 4);
  }

  const points = items.map((item, index) => [
    padding.left + (width - padding.left - padding.right) * (index / (items.length - 1 || 1)),
    padding.top + (height - padding.top - padding.bottom) * (1 - (item.val - min) / range)
  ]);

  const gradient = ctx.createLinearGradient(0, padding.top, 0, height);
  gradient.addColorStop(0, 'rgba(53,215,255,.22)');
  gradient.addColorStop(1, 'rgba(53,215,255,0)');

  ctx.beginPath();
  points.forEach((point, index) => index ? ctx.lineTo(...point) : ctx.moveTo(...point));
  ctx.lineTo(points.at(-1)[0], height - padding.bottom);
  ctx.lineTo(points[0][0], height - padding.bottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  points.forEach((point, index) => index ? ctx.lineTo(...point) : ctx.moveTo(...point));
  ctx.strokeStyle = cyan;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = muted;
  ctx.fillText(items[0].year, padding.left, height - 8);
  ctx.textAlign = 'right';
  ctx.fillText(items.at(-1).year, width - padding.right, height - 8);
  ctx.textAlign = 'left';
}
