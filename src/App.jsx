import { useEffect, useState } from 'react';
import { Activity, ArrowDownRight, ArrowUpRight, RefreshCw, TrendingUp } from 'lucide-react';

const spending = [
  { name: 'Mon', value: 420 }, { name: 'Tue', value: 310 }, { name: 'Wed', value: 510 },
  { name: 'Thu', value: 390 }, { name: 'Fri', value: 680 }, { name: 'Sat', value: 540 }, { name: 'Sun', value: 280 }
];

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadNews = async () => {
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to load news');
      setNews(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadNews(); }, []);

  return (
    <main className="shell">
      <header className="topbar">
        <div><div className="brand"><span className="brand-mark">₣</span> FinPulse <span className="ai">AI</span></div><p className="muted">Your smarter view of money</p></div>
        <button className="refresh" onClick={loadNews} disabled={loading}><RefreshCw size={17} className={loading ? 'spin' : ''} /> Refresh news</button>
      </header>
      <section className="welcome"><div><p className="eyebrow">PERSONAL FINANCE</p><h1>Good morning, Castramaine.</h1><p className="muted">Here is your financial pulse for today.</p></div><div className="date">September 28, 2026</div></section>
      <section className="cards">
        <Metric title="Total balance" value="$24,680.50" change="+8.4%" positive icon={<Activity />} />
        <Metric title="Monthly income" value="$8,420.00" change="+12.1%" positive icon={<ArrowUpRight />} />
        <Metric title="Monthly spending" value="$3,184.20" change="-4.6%" positive icon={<ArrowDownRight />} />
      </section>
      <section className="grid">
        <div className="panel chart-panel"><div className="panel-heading"><div><h2>Spending overview</h2><p className="muted">This week</p></div><strong>$3,184.20</strong></div><div className="chart">{spending.map((item) => <div className="bar-wrap" key={item.name}><div className="bar" style={{ height: `${item.value / 7}px` }} title={`$${item.value}`} /><span>{item.name}</span></div>)}</div></div>
        <div className="panel"><div className="panel-heading"><div><h2>Market pulse</h2><p className="muted">Popular watchlist</p></div><TrendingUp className="green" /></div><div className="stocks"><Stock symbol="S&P 500" value="5,738.17" change="+0.40%" /><Stock symbol="NASDAQ" value="17,942.68" change="+0.65%" /><Stock symbol="BTC" value="$65,420" change="+1.82%" /></div></div>
      </section>
      <section className="panel news-panel"><div className="panel-heading"><div><h2>Financial news</h2><p className="muted">Live headlines from Financial Modeling Prep</p></div><span className="live"><i /> LIVE</span></div>{loading ? <p className="muted">Loading the latest headlines…</p> : error ? <div className="notice">{error}. Add your FMP key to <code>.env</code> and restart the server.</div> : news.length ? <div className="news-list">{news.map((item, index) => <a className="news-item" href={item.url || '#'} target="_blank" rel="noreferrer" key={`${item.title}-${index}`}><div><span className="tag">{item.site || 'MARKETS'}</span><h3>{item.title}</h3><p className="muted">{item.publishedDate ? new Date(item.publishedDate).toLocaleString() : 'Latest update'}</p></div><span className="arrow">↗</span></a>)}</div> : <p className="muted">No headlines returned right now.</p>}</section>
      <footer>FinPulse AI · Market data is for informational purposes only.</footer>
    </main>
  );
}

function Metric({ title, value, change, positive, icon }) { return <div className="metric"><div className="metric-icon">{icon}</div><p className="muted">{title}</p><div className="metric-row"><strong>{value}</strong><span className={positive ? 'positive' : 'negative'}>{change}</span></div><div className="line" /></div>; }
function Stock({ symbol, value, change }) { return <div className="stock"><div><strong>{symbol}</strong><p className="muted">Today</p></div><div className="stock-value"><strong>{value}</strong><span className="positive">{change}</span></div></div>; }
export default App;
