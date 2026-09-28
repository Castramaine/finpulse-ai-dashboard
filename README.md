# FinPulse AI Dashboard

A React/Vite personal finance dashboard with live financial headlines from Financial Modeling Prep (FMP).

## Run locally

1. Install Node.js 18 or newer.
2. Copy `.env.example` to `.env`.
3. Put your FMP key in `.env`:

```env
FMP_API_KEY=your_key_here
```

4. Install and start the app:

```bash
npm install
npm run dev
```

The FMP key is used only by `api/news.js`; it is not exposed in the browser. Never commit `.env` or share your API key.

## Deploying

This project uses a Vercel-style serverless function at `/api/news`. Import the repository into Vercel, add `FMP_API_KEY` under Project Settings → Environment Variables, and redeploy.

The dashboard is for informational purposes only and is not financial advice.
