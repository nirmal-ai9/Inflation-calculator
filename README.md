# Inflation Lab

A polished, dependency-free inflation calculator for exploring how purchasing power changes over time.

## Project structure

```text
Inflation-calculator-main/
├── index.html
├── assets/
│   └── preview.jpg
├── src/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── app.js          # application wiring + events
│       ├── calculator.js   # validation + inflation calculations
│       ├── chart.js        # canvas chart rendering
│       ├── config.js       # defaults, symbols, storage keys
│       ├── dom.js          # DOM element references
│       ├── export.js       # CSV export
│       ├── format.js       # currency/percentage formatting
│       ├── storage.js      # localStorage persistence
│       └── ui.js           # results/table rendering
├── LICENSE
└── README.md
```

## Features

- Compound inflation calculations
- INR, USD, EUR, GBP and JPY display options
- Interactive year range and quick presets
- Canvas inflation curve
- Year-by-year comparison table
- Purchasing-power and multiplier metrics
- CSV export
- Dark/light theme with persistence
- Saved calculator settings
- Responsive mobile layout
- No framework, backend or build step

## Run locally

Because the app uses JavaScript modules, serve the folder with a small local HTTP server instead of opening `index.html` directly.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.
