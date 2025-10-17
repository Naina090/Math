const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve frontend static
app.use('/', express.static(path.join(__dirname, '..', 'frontend')));

// API: Pythagoras — compute missing side
// POST { type: "hypotenuse"|"leg", a: number, b: number }
// if type == "hypotenuse", a and b are legs -> c = sqrt(a^2 + b^2)
// if type == "leg", a is hypotenuse, b is one leg -> other = sqrt(a^2 - b^2)
app.post('/api/pythag', (req, res) => {
  const { type, a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'a and b must be numbers' });
  }
  if (type === 'hypotenuse') {
    const c = Math.sqrt(a*a + b*b);
    return res.json({ result: +c.toFixed(6) });
  } else if (type === 'leg') {
    if (a <= b) return res.status(400).json({ error: 'hypotenuse must be larger than leg' });
    const other = Math.sqrt(a*a - b*b);
    return res.json({ result: +other.toFixed(6) });
  } else {
    return res.status(400).json({ error: 'type must be hypotenuse or leg' });
  }
});

// API: Compound interest
// POST { principal: number, ratePercent: number, years: number, compoundingsPerYear?: number (default 1) }
app.post('/api/compound', (req, res) => {
  const { principal, ratePercent, years, compoundingsPerYear } = req.body;
  const P = Number(principal);
  const r = Number(ratePercent) / 100;
  const n = Number(compoundingsPerYear || 1);
  const t = Number(years);
  if ([P,r,t,n].some(v => Number.isNaN(v))) {
    return res.status(400).json({ error: 'invalid numbers' });
  }
  // A = P (1 + r/n)^(n t)
  const A = P * Math.pow(1 + r/n, n * t);
  return res.json({ amount: +A.toFixed(6) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
