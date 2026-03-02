import { useState } from 'react'

export default function Notes({ notes, setNotes }) {
  const [activeIdx, setActiveIdx] = useState(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const newNote = () => {
    const note = { id: Date.now(), title: '', body: '', date: new Date().toLocaleDateString('en-GB') }
    const next = [note, ...notes]
    setNotes(next)
    setActiveIdx(0)
    setTitle(''); setBody('')
  }

  const select = i => {
    setActiveIdx(i)
    setTitle(notes[i].title)
    setBody(notes[i].body)
  }

  const save = () => {
    if (activeIdx === null) return
    const next = notes.map((n, i) => i === activeIdx
      ? { ...n, title, body, date: new Date().toLocaleDateString('en-GB') } : n)
    setNotes(next)
  }

  const del = () => {
    if (activeIdx === null) return
    const next = notes.filter((_, i) => i !== activeIdx)
    setNotes(next)
    setActiveIdx(null)
    setTitle(''); setBody('')
  }

  return (
    <div className="card" style={{padding:0,overflow:'hidden'}}>
      <div className="notes-wrap">
        <div className="notes-sidebar">
          <button className="btn btn-primary" onClick={newNote}
            style={{margin:12,width:'calc(100% - 24px)'}}>+ New Note</button>
          {notes.map((n, i) => (
            <div key={n.id} className={`note-item${activeIdx===i?' active':''}`} onClick={()=>select(i)}>
              <div className="note-title">{n.title || 'Untitled'}</div>
              <div className="note-date">{n.date}</div>
            </div>
          ))}
        </div>
        <div className="notes-editor">
          {activeIdx !== null ? (
            <>
              <input className="inp-bare" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22}}
                value={title} onChange={e=>setTitle(e.target.value)} placeholder="Note title…" />
              <textarea className="textarea" value={body} onChange={e=>setBody(e.target.value)}
                placeholder="Start writing…" style={{flex:1,minHeight:300}} />
              <div className="row">
                <button className="btn btn-primary" onClick={save}>Save</button>
                <button className="btn btn-ghost" onClick={del}>Delete</button>
              </div>
            </>
          ) : (
            <p style={{fontSize:12,color:'var(--muted)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>
              Select a note or create a new one.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
