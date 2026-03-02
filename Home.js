import { useState } from 'react'
import { pillarColor } from '../App'

export default function Home({ todos, goals, milestones, metrics, focus, setFocus, quickNote, setQuickNote }) {
  const totalGoals = goals.length
  const doneGoals = goals.filter(g => g.done).length
  const pct = totalGoals ? Math.round((doneGoals / totalGoals) * 100) : 0
  const todayTodos = todos.filter(t => !t.done).slice(0, 5)
  const doneTodos = todos.filter(t => t.done).length

  return (
    <>
      {/* life bar */}
      <div className="life-bar"><div className="life-fill" style={{width: pct+'%'}} /></div>

      {/* Stats strip */}
      <div className="grid3" style={{gap:'1px'}}>
        <div className="gcell">
          <div className="gcell-label">MulliWen Revenue</div>
          <div className="gcell-val">{metrics.revenue || '£0'}</div>
          <div className="gcell-sub">Target £500k — 2031</div>
        </div>
        <div className="gcell">
          <div className="gcell-label">Goals Progress</div>
          <div className="gcell-val">{pct}%</div>
          <div className="gcell-sub">{doneGoals} of {totalGoals} done</div>
        </div>
        <div className="gcell">
          <div className="gcell-label">Open Tasks</div>
          <div className="gcell-val">{todos.length - doneTodos}</div>
          <div className="gcell-sub">{doneTodos} completed</div>
        </div>
      </div>

      {/* Focus */}
      <div className="card">
        <div className="card-title">Today's Focus</div>
        <input className="focus-inp" value={focus} onChange={e => setFocus(e.target.value)}
          placeholder="What's the one thing that matters today?" />
      </div>

      {/* Quick Note */}
      <div className="card">
        <div className="card-title">Quick Note</div>
        <textarea className="textarea" value={quickNote} onChange={e => setQuickNote(e.target.value)}
          placeholder="Capture a thought…" rows={4} />
      </div>

      {/* Today tasks preview */}
      <div className="card">
        <div className="card-title">Open Tasks</div>
        {todayTodos.length === 0 && <p style={{fontSize:11,color:'var(--muted)'}}>All tasks done ✓</p>}
        {todayTodos.map(t => (
          <div key={t.id} className="list-row" style={{cursor:'default'}}>
            <div className="check" />
            <span className="ltext">{t.text}</span>
            <span className={`badge badge-${t.cat}`}>{t.cat}</span>
          </div>
        ))}
      </div>

      {/* Milestones next up */}
      <div className="card">
        <div className="card-title">Next Milestones</div>
        {milestones.filter(m => !m.done).slice(0,4).map(m => (
          <div key={m.id} className="list-row" style={{cursor:'default'}}>
            <div className="tl-dot" />
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:'var(--ink)'}}>{m.title}</div>
              <div style={{fontSize:9,color:'var(--muted)',marginTop:2}}>{m.date}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
