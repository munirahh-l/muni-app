import { useState, useEffect, useCallback } from 'react'
import { store, INITIAL_TODOS, INITIAL_GOALS, INITIAL_CONTACTS, MILESTONES } from './store/data'
import Home from './components/Home'
import TodoGoals from './components/TodoGoals'
import Business from './components/Business'
import Finance from './components/Finance'
import Social from './components/Social'
import Contacts from './components/Contacts'
import Notes from './components/Notes'
import PlanMilestones from './components/PlanMilestones'

const TABS = [
  { id: 'home',       label: 'Home',        icon: '⌂',  group: 'Overview' },
  { id: 'todo',       label: 'To-Do',       icon: '◻',  group: 'Daily' },
  { id: 'notes',      label: 'Notes',       icon: '◇',  group: 'Daily' },
  { id: 'business',   label: 'MulliWen',    icon: '◈',  group: 'Brand' },
  { id: 'plan',       label: '5-Year Plan', icon: '◎',  group: 'Brand' },
  { id: 'finance',    label: 'Money',       icon: '£',   group: 'Finance' },
  { id: 'social',     label: 'Social',      icon: '⊕',  group: 'Connect' },
  { id: 'contacts',   label: 'Contacts',    icon: '◻',  group: 'Connect' },
]

const css = `
:root {
  --bg: #f8f6f3; --surface: #fff; --border: #e8e2da; --border2: #f0ebe3;
  --ink: #1a1614; --mid: #8a7e74; --muted: #b8afa6;
  --blood: #590707; --rose: #c4785a; --cream: #f2f2ea;
  --sage: #7a9a7e; --gold: #c9a96e; --info: #7a9aaa;
  --blush: #e8c4b0;
  --df: 'Cormorant Garamond', serif;
  --dm: 'DM Mono', monospace;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--bg); color: var(--ink); font-family: var(--dm); font-size: 12px; }
input, select, textarea, button { font-family: var(--dm); font-size: 12px; }

.app { display: grid; grid-template-columns: 192px 1fr; grid-template-rows: 52px 1fr; min-height: 100vh; }

/* TOPBAR */
.topbar { grid-column: 1/-1; display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; background: var(--surface); border-bottom: 1px solid var(--border);
  position: sticky; top: 0; z-index: 100; }
.tb-brand { font-family: var(--df); font-style: italic; font-size: 18px; letter-spacing: .04em; }
.tb-greet { font-family: var(--df); font-style: italic; font-size: 13px; color: var(--mid); }
.tb-date  { font-size: 10px; color: var(--muted); letter-spacing: .16em; }

/* SIDEBAR */
.sidebar { background: var(--surface); border-right: 1px solid var(--border);
  position: sticky; top: 52px; height: calc(100vh - 52px); overflow-y: auto; padding: 12px 0; }
.nav-group { font-size: 8px; letter-spacing: .28em; text-transform: uppercase; color: var(--muted);
  padding: 12px 16px 4px; }
.nav-item { display: flex; align-items: center; gap: 9px; padding: 8px 16px; cursor: pointer;
  font-size: 11px; color: var(--mid); border-left: 2px solid transparent; transition: all .15s; user-select: none; }
.nav-item:hover { background: var(--bg); color: var(--ink); }
.nav-item.active { background: var(--bg); color: var(--ink); border-left-color: var(--blood); }
.nav-icon { width: 16px; text-align: center; font-size: 12px; }

/* MAIN */
.main { padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }

/* CARD */
.card { background: var(--surface); border: 1px solid var(--border); padding: 18px; }
.card-title { font-size: 9px; letter-spacing: .26em; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }

/* GRID UTILS */
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: var(--border); }
.grid4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--border); }
.gcell { background: var(--surface); padding: 16px; }
.gcell-label { font-size: 8px; letter-spacing: .22em; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
.gcell-val { font-family: var(--df); font-size: 26px; color: var(--ink); line-height: 1; }
.gcell-sub { font-size: 9px; color: var(--muted); margin-top: 3px; }

/* INPUTS */
.inp { width: 100%; border: 1px solid var(--border); padding: 8px 10px;
  background: var(--bg); color: var(--ink); outline: none; }
.inp:focus { border-color: var(--blood); }
.inp-bare { border: none; border-bottom: 1px solid var(--border); padding: 5px 0;
  background: transparent; color: var(--ink); outline: none; width: 100%; }
.inp-bare:focus { border-bottom-color: var(--blood); }
.sel { border: 1px solid var(--border); padding: 8px 10px; background: var(--bg); color: var(--mid); outline: none; cursor: pointer; }
.btn { padding: 8px 14px; cursor: pointer; border: none; font-family: var(--dm); font-size: 10px;
  letter-spacing: .14em; transition: opacity .15s; }
.btn-primary { background: var(--blood); color: #fff; }
.btn-primary:hover { opacity: .85; }
.btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--mid); }
.btn-ghost:hover { border-color: var(--blood); color: var(--blood); }
.row { display: flex; gap: 8px; align-items: center; }
.row-wrap { display: flex; gap: 8px; flex-wrap: wrap; }

/* PILL BADGE */
.badge { display: inline-block; padding: 2px 8px; font-size: 8px; letter-spacing: .12em; border-radius: 2px; }
.badge-brand    { background: rgba(89,7,7,.08); color: var(--blood); }
.badge-personal { background: rgba(184,155,170,.15); color: #b89baa; }
.badge-career   { background: rgba(201,169,110,.15); color: var(--gold); }
.badge-finance  { background: rgba(122,154,170,.15); color: var(--info); }
.badge-urgent   { background: rgba(196,120,90,.12); color: var(--rose); }
.badge-supplier { background: rgba(201,169,110,.15); color: var(--gold); }
.badge-press    { background: rgba(122,154,170,.15); color: var(--info); }
.badge-faith    { background: rgba(122,170,138,.12); color: var(--sage); }
.badge-glow     { background: rgba(184,155,170,.15); color: #b89baa; }
.badge-wealth   { background: rgba(201,169,110,.15); color: var(--gold); }

/* LIST ROWS */
.list-row { display: flex; align-items: center; gap: 10px; padding: 8px 10px;
  background: var(--bg); margin-bottom: 2px; transition: background .15s; cursor: pointer; }
.list-row:hover { background: var(--cream); }
.list-row.done > .ltext { text-decoration: line-through; opacity: .4; }
.check { width: 13px; height: 13px; border: 1px solid var(--border); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 8px; transition: all .15s; }
.check.checked { background: var(--sage); border-color: var(--sage); color: #fff; }
.check.blood { background: var(--blood); border-color: var(--blood); color: #fff; }
.ltext { flex: 1; font-size: 11px; color: var(--ink); }
.ldel { font-size: 15px; color: var(--muted); cursor: pointer; padding: 0 4px; opacity: 0; transition: opacity .15s; }
.list-row:hover .ldel { opacity: 1; }

/* PROGRESS BAR */
.prog-wrap { height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }
.prog-fill { height: 100%; background: var(--blood); border-radius: 2px; transition: width .8s ease; }
.prog-fill.gold { background: var(--gold); }
.prog-fill.sage { background: var(--sage); }

/* PILLAR STRIPE */
.pillar-stripe { width: 3px; height: 100%; min-height: 28px; border-radius: 2px; flex-shrink: 0; }

/* MOBILE NAV BAR */
.mobile-nav { display: none; }

/* TEXTAREA */
.textarea { width: 100%; border: none; outline: none; resize: none; background: transparent;
  font-family: var(--df); font-style: italic; font-size: 15px; color: var(--ink); line-height: 1.7; }
.textarea::placeholder { color: var(--muted); }

/* NOTES LAYOUT */
.notes-wrap { display: grid; grid-template-columns: 200px 1fr; background: var(--border); gap: 1px; min-height: 420px; }
.notes-sidebar { background: var(--surface); overflow-y: auto; }
.notes-editor { background: var(--surface); padding: 18px; display: flex; flex-direction: column; gap: 10px; }
.note-item { padding: 10px 14px; border-bottom: 1px solid var(--border2); cursor: pointer; }
.note-item:hover { background: var(--bg); }
.note-item.active { background: var(--bg); border-left: 2px solid var(--blood); }
.note-title { font-size: 11px; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.note-date { font-size: 9px; color: var(--muted); margin-top: 2px; }

/* SOCIAL CARD */
.social-card { background: var(--bg); border: 1px solid var(--border); padding: 14px; }
.social-card:hover { border-color: var(--blood); }
.sc-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.sc-name { font-size: 10px; letter-spacing: .16em; text-transform: uppercase; }
.sc-num-inp { font-family: var(--df); font-size: 20px; color: var(--ink); border: none;
  border-bottom: 1px dashed var(--border); outline: none; background: transparent; width: 80px; }
.sc-stat-label { font-size: 8px; color: var(--muted); letter-spacing: .1em; margin-top: 2px; }
.sc-link { display: inline-block; padding: 6px 14px; border: 1px solid var(--border); font-size: 9px;
  letter-spacing: .16em; text-transform: uppercase; color: var(--mid); text-decoration: none; transition: all .15s; }
.sc-link:hover { border-color: var(--blood); color: var(--blood); }

/* TIMELINE */
.tl-row { display: grid; grid-template-columns: 110px 20px 1fr; align-items: stretch; cursor: pointer; }
.tl-row:hover .tl-content { background: var(--cream); }
.tl-date { padding: 14px 10px 14px 0; font-size: 9px; letter-spacing: .16em; text-transform: uppercase;
  color: var(--muted); text-align: right; display: flex; align-items: flex-start; justify-content: flex-end; padding-top: 16px; }
.tl-spine { display: flex; flex-direction: column; align-items: center; }
.tl-dot { width: 8px; height: 8px; border-radius: 50%; border: 1px solid var(--muted); margin-top: 16px; flex-shrink: 0; transition: all .2s; }
.tl-dot.done { background: var(--blood); border-color: var(--blood); }
.tl-line { width: 1px; flex: 1; background: var(--border2); }
.tl-content { padding: 12px 0 12px 14px; }
.tl-title { font-family: var(--df); font-size: 17px; color: var(--ink); }
.tl-title.done { text-decoration: line-through; opacity: .45; }
.tl-desc { font-size: 10px; color: var(--muted); margin-top: 2px; line-height: 1.5; }

/* CONTACT AVATAR */
.avatar { width: 28px; height: 28px; border-radius: 50%; background: var(--blood); color: #fff;
  display: flex; align-items: center; justify-content: center; font-family: var(--df); font-size: 13px; flex-shrink: 0; }

/* FOCUS INPUT */
.focus-inp { width: 100%; border: none; border-bottom: 1px solid var(--border); outline: none;
  padding: 5px 0; font-family: var(--df); font-style: italic; font-size: 18px;
  background: transparent; color: var(--ink); }
.focus-inp::placeholder { color: var(--muted); }

/* LIFE BAR */
.life-bar { height: 2px; background: var(--border); overflow: hidden; grid-column: 1/-1; }
.life-fill { height: 100%; background: linear-gradient(90deg, var(--blood), var(--rose), var(--gold)); transition: width 1s; }

/* DEBT ROW */
.debt-row { display: flex; align-items: center; gap: 12px; padding: 10px 0;
  border-bottom: 1px solid var(--border2); }
.debt-row:last-child { border-bottom: none; }
.debt-name { flex: 1; font-size: 11px; }
.debt-bar-wrap { width: 80px; height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }
.debt-bar-fill { height: 100%; background: var(--blood); border-radius: 2px; }
.debt-amt { font-family: var(--df); font-size: 16px; color: var(--blood); }
.debt-note { font-size: 9px; color: var(--muted); }

/* RESPONSIVE */
@media (max-width: 768px) {
  .app { grid-template-columns: 1fr; grid-template-rows: 52px 1fr 56px; }
  .sidebar { display: none; }
  .main { padding: 14px; padding-bottom: 70px; }
  .grid4 { grid-template-columns: 1fr 1fr; }
  .grid3 { grid-template-columns: 1fr 1fr; }
  .notes-wrap { grid-template-columns: 1fr; }
  .mobile-nav { display: flex; position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
    background: var(--surface); border-top: 1px solid var(--border); height: 56px;
    padding-bottom: env(safe-area-inset-bottom); }
  .mob-tab { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 2px; cursor: pointer; color: var(--muted); font-size: 9px; letter-spacing: .1em; transition: color .15s; }
  .mob-tab.active { color: var(--blood); }
  .mob-tab-icon { font-size: 16px; }
  .life-bar { display: none; }
}
`

const pillarColor = { faith:'#7a9a7e', brand:'#590707', career:'#c9a96e', glow:'#b89baa', wealth:'#7a9aaa', finance:'#7a9aaa', urgent:'#c4785a', personal:'#b89baa' }

export { css, pillarColor }

export default function App() {
  const [tab, setTab] = useState('home')

  // Global state — all persisted
  const [todos, setTodosRaw] = useState(() => store.get('todos', INITIAL_TODOS))
  const [goals, setGoalsRaw] = useState(() => store.get('goals', INITIAL_GOALS))
  const [contacts, setContactsRaw] = useState(() => store.get('contacts', INITIAL_CONTACTS))
  const [notes, setNotesRaw] = useState(() => store.get('notes', []))
  const [milestones, setMilestonesRaw] = useState(() => store.get('milestones', MILESTONES))
  const [metrics, setMetricsRaw] = useState(() => store.get('metrics', { revenue:'', email:'', units:'', orders:'', savings:'' }))
  const [focus, setFocusRaw] = useState(() => store.get('focus', ''))
  const [quickNote, setQuickNoteRaw] = useState(() => store.get('quickNote', ''))

  const setTodos = useCallback(v => { setTodosRaw(v); store.set('todos', v) }, [])
  const setGoals = useCallback(v => { setGoalsRaw(v); store.set('goals', v) }, [])
  const setContacts = useCallback(v => { setContactsRaw(v); store.set('contacts', v) }, [])
  const setNotes = useCallback(v => { setNotesRaw(v); store.set('notes', v) }, [])
  const setMilestones = useCallback(v => { setMilestonesRaw(v); store.set('milestones', v) }, [])
  const setMetrics = useCallback(v => { setMetricsRaw(v); store.set('metrics', v) }, [])
  const setFocus = useCallback(v => { setFocusRaw(v); store.set('focus', v) }, [])
  const setQuickNote = useCallback(v => { setQuickNoteRaw(v); store.set('quickNote', v) }, [])

  // Greeting
  const [greeting, setGreeting] = useState('')
  const [dateStr, setDateStr] = useState('')
  useEffect(() => {
    const h = new Date().getHours()
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening')
    setDateStr(new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long' }))
  }, [])

  const shared = { todos, setTodos, goals, setGoals, contacts, setContacts, notes, setNotes,
    milestones, setMilestones, metrics, setMetrics, focus, setFocus, quickNote, setQuickNote }

  const groups = [...new Set(TABS.map(t => t.group))]

  const MOBILE_TABS = [
    { id:'home', label:'Home', icon:'⌂' },
    { id:'todo', label:'Tasks', icon:'◻' },
    { id:'business', label:'Muni', icon:'◈' },
    { id:'finance', label:'£', icon:'£' },
    { id:'social', label:'Social', icon:'⊕' },
  ]

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* TOPBAR */}
        <div className="topbar">
          <span className="tb-brand">Muni</span>
          <span className="tb-greet">{greeting}, Muni ✦</span>
          <span className="tb-date">{dateStr}</span>
        </div>

        {/* SIDEBAR */}
        <div className="sidebar">
          {groups.map(g => (
            <div key={g}>
              <div className="nav-group">{g}</div>
              {TABS.filter(t => t.group === g).map(t => (
                <div key={t.id} className={`nav-item${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
                  <span className="nav-icon">{t.icon}</span> {t.label}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* MAIN */}
        <div className="main">
          {tab === 'home'     && <Home {...shared} />}
          {tab === 'todo'     && <TodoGoals {...shared} />}
          {tab === 'notes'    && <Notes {...shared} />}
          {tab === 'business' && <Business {...shared} />}
          {tab === 'plan'     && <PlanMilestones {...shared} />}
          {tab === 'finance'  && <Finance {...shared} />}
          {tab === 'social'   && <Social {...shared} />}
          {tab === 'contacts' && <Contacts {...shared} />}
        </div>

        {/* MOBILE BOTTOM NAV */}
        <div className="mobile-nav">
          {MOBILE_TABS.map(t => (
            <div key={t.id} className={`mob-tab${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
              <span className="mob-tab-icon">{t.icon}</span>
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
