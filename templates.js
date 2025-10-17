// templates.js - simple helper to call backend APIs for live calculations
async function postJSON(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}

// Example usage: wire up compute buttons if present
document.addEventListener('DOMContentLoaded', () => {
  const pythagButtons = document.querySelectorAll('[data-pythag-btn]');
  pythagButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const type = btn.dataset.pythagBtn;
      const a = Number(document.getElementById(btn.dataset.aId).value);
      const b = Number(document.getElementById(btn.dataset.bId).value);
      const out = document.getElementById(btn.dataset.outId);
      out.textContent = 'Calculating...';
      try {
        const json = await postJSON('/api/pythag', { type, a, b });
        out.textContent = json.result;
      } catch (err) {
        out.textContent = 'Error';
      }
    });
  });

  const ciButtons = document.querySelectorAll('[data-ci-btn]');
  ciButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const principal = Number(document.getElementById(btn.dataset.pId).value);
      const rate = Number(document.getElementById(btn.dataset.rId).value);
      const years = Number(document.getElementById(btn.dataset.tId).value);
      const out = document.getElementById(btn.dataset.outId);
      out.textContent = 'Calculating...';
      try {
        const json = await postJSON('/api/compound', { principal, ratePercent: rate, years });
        out.textContent = json.amount;
      } catch (err) {
        out.textContent = 'Error';
      }
    });
  });
});
