# Math Templates Project

## Prereqs
- Node.js (v14+)
- npm

## Install & run backend + serve frontend
1. Open terminal.
2. cd backend
3. npm install
4. npm start

Server will run at http://localhost:3000 and serve the frontend HTML pages:
- http://localhost:3000/template1-pythag-1.html
- http://localhost:3000/template1-pythag-2.html
- http://localhost:3000/template2-ci-1.html
- http://localhost:3000/template2-ci-2.html

The backend API endpoints:
- POST /api/pythag  { type: "hypotenuse"|"leg", a: number, b: number }
- POST /api/compound { principal, ratePercent, years, compoundingsPerYear? }

These are used by `frontend/js/templates.js` for interactive calculation examples.
