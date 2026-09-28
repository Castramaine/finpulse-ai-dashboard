const FMP_URL = 'https://financialmodelingprep.com/stable/news/stock';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const key = process.env.FMP_API_KEY;
  if (!key) return res.status(500).json({ error: 'FMP_API_KEY is not configured' });
  try {
    const response = await fetch(`${FMP_URL}?symbols=AAPL,MSFT,TSLA&limit=8&apikey=${encodeURIComponent(key)}`);
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data['Error Message'] || 'FMP request failed' });
    return res.status(200).json(Array.isArray(data) ? data : []);
  } catch (error) { return res.status(500).json({ error: 'Could not connect to FMP' }); }
}
