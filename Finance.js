import { store } from '../store/data'
import { useState } from 'react'

const DEBTS = [
  { name: 'SURU',           total: 7000, note: '£600/mo → cleared Nov 2026', pct: 0 },
  { name: 'Watch (0% PayPal)', total: 6000, note: 'Ends May 2027',           pct: 0 },
  { name: 'MacBook',        total: 2000, note: 'Cleared Apr 2026',           pct: 90 },
  { name: 'Mum',            total: 2000, note: '£200/mo → cleared Oct 2026', pct: 0 },
]

export default function Finance({ metrics, setMetrics }) {
  const [debtVals, setDebtVals] = useState(() => store.get('debtVals', {}))

  const updDebt = (k, v) => {
    const next = {...debtVals, [k]: v}
    setDebtVals(next); store.set('debtVals', next)
  }

  const totalDebt = DEBTS.reduce((sum, d) => {
    const paid = parseFloat(debtVals[d.name+'_paid'] || 0)
    return sum + Math.max(0, d.total - paid)
  }, 0)

  return (
    <>
      <div className="grid4">
        <div className="gcell">
          <div className="gcell-label">Gross Salary</div>
          <div className="gcell-val">~£37k</div>
          <div className="gcell-sub">Target £55k+</div>
        </div>
        <div className="gcell">
          <div className="gcell-label">Net Monthly</div>
          <div className="gcell-val">~£2,450</div>
          <div className="gcell-sub">After tax & NI</div>
        </div>
        <div className="gcell">
          <div className="gcell-label">MulliWen Revenue</div>
          <div className="gcell-val" style={{color:'var(--sage)'}}>{metrics.revenue||'£0'}</div>
          <div className="gcell-sub">This month</div>
        </div>
        <div className="gcell">
          <div className="gcell-label">Savings</div>
          <input className="inp-bare" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24}}
            value={metrics.savings||''} onChange={e=>setMetrics({...metrics,savings:e.target.value})}
            placeholder="£0" />
          <div className="gcell-sub">Update monthly</div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Debt Tracker — Clear in Order</div>
        <div style={{marginBottom:8,fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:'var(--blood)'}}>
          ~£{totalDebt.toLocaleString()} remaining
        </div>
        {DEBTS.map(d => {
          const paid = parseFloat(debtVals[d.name+'_paid'] || 0)
          const remaining = Math.max(0, d.total - paid)
          const pct = Math.min(100, Math.round((paid / d.total) * 100))
          return (
            <div key={d.name} className="debt-row">
              <span className="debt-name">{d.name}</span>
              <div className="debt-bar-wrap">
                <div className="debt-bar-fill" style={{width:pct+'%',background: pct>80?'var(--sage)':'var(--blood)'}} />
              </div>
              <span className="debt-amt">£{remaining.toLocaleString()}</span>
              <input className="inp-bare" style={{width:70,fontSize:11}}
                value={debtVals[d.name+'_paid']||''}
                onChange={e=>updDebt(d.name+'_paid', e.target.value)}
                placeholder="paid £" />
              <span className="debt-note">{d.note}</span>
            </div>
          )
        })}
      </div>

      <div className="card">
        <div className="card-title">Surgery Fund — Target £11,500</div>
        {(() => {
          const saved = parseFloat(debtVals['surgery_saved'] || 0)
          const pct = Math.min(100, Math.round((saved / 11500) * 100))
          return (
            <div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <span style={{fontSize:11,color:'var(--ink)'}}>May 2026 target</span>
                <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:'var(--rose)'}}>
                  £{saved.toLocaleString()} / £11,500
                </span>
              </div>
              <div className="prog-wrap">
                <div className="prog-fill" style={{width:pct+'%',background:'var(--rose)'}} />
              </div>
              <input className="inp-bare" style={{marginTop:8,fontSize:11}}
                value={debtVals['surgery_saved']||''}
                onChange={e=>updDebt('surgery_saved',e.target.value)}
                placeholder="Amount saved so far…" />
            </div>
          )
        })()}
      </div>

      <div className="card">
        <div className="card-title">Income Streams</div>
        {[
          ['Salary (net est.)','~£2,450/mo'],
          ['MulliWen DTC', metrics.revenue || '£0 — not launched'],
          ['Target by Dec 2026','£3,500/mo net'],
          ['MulliWen target 2029','£8,000/mo'],
        ].map(([src,amt]) => (
          <div key={src} style={{display:'flex',justifyContent:'space-between',alignItems:'center',
            padding:'8px 0',borderBottom:'1px solid var(--border2)'}}>
            <span style={{fontSize:11,color:'var(--ink)'}}>{src}</span>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:'var(--sage)'}}>{amt}</span>
          </div>
        ))}
      </div>
    </>
  )
}
