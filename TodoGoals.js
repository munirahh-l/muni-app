import { useState } from 'react'
import { pillarColor } from '../App'

const CATS = ['personal','brand','career','finance','urgent']
const PILLARS = ['faith','brand','career','glow','wealth']
const YEARS = ['2026','2027','2028','2029','2030','2031']

export default function TodoGoals({ todos, setTodos, goals, setGoals }) {
  const [todoText, setTodoText] = useState('')
  const [todoCat, setTodoCat] = useState('personal')
  const [todoFilter, setTodoFilter] = useState('all')
  const [goalText, setGoalText] = useState('')
  const [goalYear, setGoalYear] = useState('2026')
  const [goalPillar, setGoalPillar] = useState('brand')
  const [yearFilter, setYearFilter] = useState('all')

  const addTodo = () => {
    if (!todoText.trim()) return
    setTodos([{ id: Date.now(), text: todoText.trim(), cat: todoCat, done: false }, ...todos])
    setTodoText('')
  }

  const toggleTodo = id => setTodos(todos.map(t => t.id === id ? {...t, done: !t.done} : t))
  const delTodo = id => setTodos(todos.filter(t => t.id !== id))

  const addGoal = () => {
    if (!goalText.trim()) return
    setGoals([...goals, { id: Date.now(), text: goalText.trim(), year: goalYear, pillar: goalPillar, done: false }])
    setGoalText('')
  }

  const toggleGoal = id => setGoals(goals.map(g => g.id === id ? {...g, done: !g.done} : g))
  const delGoal = id => setGoals(goals.filter(g => g.id !== id))

  const filteredTodos = todoFilter === 'all' ? todos : todos.filter(t => t.cat === todoFilter)
  const filteredGoals = yearFilter === 'all' ? goals : goals.filter(g => g.year === yearFilter)

  return (
    <>
      {/* TO-DO */}
      <div className="card">
        <div className="card-title">To-Do List</div>
        <div className="row" style={{marginBottom:10}}>
          <input className="inp" style={{flex:2}} value={todoText} onChange={e=>setTodoText(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&addTodo()} placeholder="Add a task…" />
          <select className="sel" value={todoCat} onChange={e=>setTodoCat(e.target.value)}>
            {CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button className="btn btn-primary" onClick={addTodo}>Add</button>
        </div>

        {/* filters */}
        <div className="row-wrap" style={{marginBottom:10}}>
          {['all',...CATS].map(f => (
            <span key={f} onClick={()=>setTodoFilter(f)}
              style={{padding:'3px 10px',fontSize:8,letterSpacing:'.14em',textTransform:'uppercase',
                cursor:'pointer',border:'1px solid',borderColor: todoFilter===f ? 'var(--blood)' : 'var(--border)',
                color: todoFilter===f ? 'var(--blood)' : 'var(--muted)'}}>
              {f}
            </span>
          ))}
        </div>

        {filteredTodos.length === 0 && <p style={{fontSize:11,color:'var(--muted)'}}>No tasks here.</p>}
        {filteredTodos.map(t => (
          <div key={t.id} className={`list-row${t.done?' done':''}`} onClick={()=>toggleTodo(t.id)}>
            <div className={`check${t.done?' blood':''}`}>{t.done&&'✓'}</div>
            <span className="ltext">{t.text}</span>
            <span className={`badge badge-${t.cat}`}>{t.cat}</span>
            <span className="ldel" onClick={e=>{e.stopPropagation();delTodo(t.id)}}>×</span>
          </div>
        ))}
      </div>

      {/* GOALS */}
      <div className="card">
        <div className="card-title">Life Goals — 2026–2031</div>
        <div className="row" style={{marginBottom:10}}>
          <input className="inp" style={{flex:2}} value={goalText} onChange={e=>setGoalText(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&addGoal()} placeholder="Add a goal…" />
          <select className="sel" value={goalYear} onChange={e=>setGoalYear(e.target.value)}>
            {YEARS.map(y=><option key={y}>{y}</option>)}
          </select>
          <select className="sel" value={goalPillar} onChange={e=>setGoalPillar(e.target.value)}>
            {PILLARS.map(p=><option key={p}>{p}</option>)}
          </select>
          <button className="btn btn-primary" onClick={addGoal}>Add</button>
        </div>

        {/* year filter */}
        <div className="row-wrap" style={{marginBottom:10}}>
          {['all',...YEARS].map(y=>(
            <span key={y} onClick={()=>setYearFilter(y)}
              style={{padding:'3px 10px',fontSize:8,letterSpacing:'.14em',textTransform:'uppercase',
                cursor:'pointer',border:'1px solid',borderColor:yearFilter===y?'var(--blood)':'var(--border)',
                color:yearFilter===y?'var(--blood)':'var(--muted)'}}>
              {y}
            </span>
          ))}
        </div>

        {filteredGoals.map(g => (
          <div key={g.id} className={`list-row${g.done?' done':''}`} onClick={()=>toggleGoal(g.id)}
            style={{borderLeft:`3px solid ${pillarColor[g.pillar]||'#999'}`}}>
            <div className={`check${g.done?' blood':''}`}>{g.done&&'✓'}</div>
            <div style={{flex:1}}>
              <div className="ltext">{g.text}</div>
              <div style={{fontSize:9,color:'var(--muted)',marginTop:2}}>{g.year} · {g.pillar}</div>
            </div>
            <span className="ldel" onClick={e=>{e.stopPropagation();delGoal(g.id)}}>×</span>
          </div>
        ))}
      </div>
    </>
  )
}
