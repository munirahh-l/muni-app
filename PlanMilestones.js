export default function PlanMilestones({ milestones, setMilestones }) {
  const toggle = id => setMilestones(milestones.map(m => m.id === id ? {...m, done: !m.done} : m))
  const done = milestones.filter(m => m.done).length
  const pct = Math.round((done / milestones.length) * 100)

  const byYear = {}
  milestones.forEach(m => {
    const y = m.date.includes('2026') ? '2026' : m.date.includes('2027') ? '2027' :
              m.date.includes('2028') ? '2028' : m.date.includes('2029') ? '2029' :
              m.date.includes('2030') ? '2030' : '2031'
    if (!byYear[y]) byYear[y] = []
    byYear[y].push(m)
  })

  return (
    <>
      <div className="card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <div className="card-title" style={{margin:0}}>5-Year Plan — MulliWen 2026–2031</div>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:'var(--blood)'}}>{pct}%</span>
        </div>
        <div className="prog-wrap" style={{marginBottom:4}}>
          <div className="prog-fill" style={{width:pct+'%'}} />
        </div>
        <div style={{fontSize:9,color:'var(--muted)',marginBottom:20}}>{done} of {milestones.length} milestones complete</div>

        {Object.entries(byYear).map(([year, items]) => (
          <div key={year} style={{marginBottom:24}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',fontSize:22,
              color:'var(--blood)',marginBottom:10,paddingBottom:6,borderBottom:'1px solid var(--border)'}}>
              {year}
            </div>
            {items.map((m, i) => (
              <div key={m.id} className="tl-row" onClick={()=>toggle(m.id)}>
                <div className="tl-date">{m.date}</div>
                <div className="tl-spine">
                  <div className={`tl-dot${m.done?' done':''}`} />
                  {i < items.length - 1 && <div className="tl-line" />}
                </div>
                <div className="tl-content">
                  <div className={`tl-title${m.done?' done':''}`}>{m.title}</div>
                  <div className="tl-desc">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
