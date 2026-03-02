const PHASE1 = [
  'Define hero silhouette (1–2 pieces)',
  'Contact 3 manufacturers (1 UK + 2 Lagos)',
  'Request first samples — budget £600–900',
  'Upgrade mulliwen.com to Shopify store',
  'Brand photography shoot booked',
  'Grow email list to 500 subscribers',
  'Register as sole trader with HMRC',
  'Open business bank account (Monzo/Tide)',
  'Set up Klaviyo welcome email flow',
  'Packaging sourced & costed',
  'Tech packs finalised with specs',
  'Pre-order campaign planned',
]

import { useState } from 'react'
import { store } from '../store/data'

export default function Business({ metrics, setMetrics }) {
  const [checks, setChecks] = useState(() => store.get('brandChecks', {}))

  const toggle = i => {
    const next = {...checks, [i]: !checks[i]}
    setChecks(next); store.set('brandChecks', next)
  }

  const done = PHASE1.filter((_,i) => checks[i]).length
  const pct = Math.round((done / PHASE1.length) * 100)

  const upd = k => e => setMetrics({...metrics, [k]: e.target.value})

  return (
    <>
      <div className="grid4">
        {[
          { k:'revenue', label:'Monthly Revenue', sub:'Enter gross' },
          { k:'email',   label:'Email List',      sub:'Subscribers' },
          { k:'units',   label:'Units Sold (MTD)',sub:'Month to date' },
          { k:'orders',  label:'Orders Pending',  sub:'To fulfil' },
        ].map(({k,label,sub}) => (
          <div key={k} className="gcell">
            <div className="gcell-label">{label}</div>
            <input className="inp-bare" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24}}
              value={metrics[k]||''} onChange={upd(k)} placeholder="—" />
            <div className="gcell-sub">{sub}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <div className="card-title" style={{margin:0}}>Phase 1 — Define & Prepare</div>
          <span style={{fontSize:11,color:'var(--blood)',fontFamily:"'Cormorant Garamond',serif"}}>{pct}%</span>
        </div>
        <div className="prog-wrap" style={{marginBottom:14}}>
          <div className="prog-fill" style={{width:pct+'%'}} />
        </div>
        {PHASE1.map((t,i) => (
          <div key={i} className={`list-row${checks[i]?' done':''}`} onClick={()=>toggle(i)}>
            <div className={`check${checks[i]?' blood':''}`}>{checks[i]&&'✓'}</div>
            <span className="ltext">{t}</span>
            <span style={{fontSize:8,color:'var(--muted)',letterSpacing:'.1em'}}>Phase 1</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">Revenue Targets</div>
        {[
          ['2026','£5–10k','Soft launch. Pre-orders. Prove demand.'],
          ['2027','£20–35k','Second year. Two drops. VA hired.'],
          ['2028','£50–70k','Wholesale begins. First press feature.'],
          ['2029','£80–120k','Scale. Salary becomes optional.'],
          ['2030','£150–200k','Full-time MulliWen.'],
          ['2031','£300–500k','The original dream.'],
        ].map(([year,target,note]) => (
          <div key={year} style={{display:'flex',gap:14,padding:'9px 0',borderBottom:'1px solid var(--border2)',alignItems:'center'}}>
            <span style={{fontSize:9,color:'var(--muted)',width:32,letterSpacing:'.12em'}}>{year}</span>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:'var(--blood)',width:90}}>{target}</span>
            <span style={{fontSize:10,color:'var(--muted)',flex:1}}>{note}</span>
          </div>
        ))}
      </div>
    </>
  )
}
