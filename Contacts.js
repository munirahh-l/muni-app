import { useState } from 'react'

const TYPES = ['brand','personal','supplier','press']

export default function Contacts({ contacts, setContacts }) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [type, setType] = useState('brand')
  const [wa, setWa] = useState('')
  const [search, setSearch] = useState('')

  const add = () => {
    if (!name.trim()) return
    setContacts([{ id: Date.now(), name: name.trim(), role: role.trim(), type, wa: wa.trim() }, ...contacts])
    setName(''); setRole(''); setWa('')
  }

  const del = id => setContacts(contacts.filter(c => c.id !== id))

  const filtered = search
    ? contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase()))
    : contacts

  return (
    <div className="card">
      <div className="card-title">Contacts & CRM</div>

      {/* Add form */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr auto',gap:6,marginBottom:10}}>
        <input className="inp" value={name} onChange={e=>setName(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&add()} placeholder="Name" />
        <input className="inp" value={role} onChange={e=>setRole(e.target.value)} placeholder="Role / Company" />
        <select className="sel" value={type} onChange={e=>setType(e.target.value)}>
          {TYPES.map(t=><option key={t}>{t}</option>)}
        </select>
        <input className="inp" value={wa} onChange={e=>setWa(e.target.value)} placeholder="WhatsApp number" />
        <button className="btn btn-primary" onClick={add}>Add</button>
      </div>

      <input className="inp" value={search} onChange={e=>setSearch(e.target.value)}
        placeholder="Search contacts…" style={{marginBottom:10}} />

      {filtered.length === 0 && <p style={{fontSize:11,color:'var(--muted)'}}>No contacts yet.</p>}
      {filtered.map(c => (
        <div key={c.id} className="list-row" style={{cursor:'default'}}>
          <div className="avatar">{c.name[0].toUpperCase()}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:11,color:'var(--ink)'}}>{c.name}</div>
            <div style={{fontSize:9,color:'var(--muted)',marginTop:1}}>{c.role}</div>
          </div>
          <span className={`badge badge-${c.type}`}>{c.type}</span>
          {c.wa && (
            <a href={`https://wa.me/${c.wa.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
              style={{fontSize:16,textDecoration:'none',marginLeft:4}}>💬</a>
          )}
          <span className="ldel" style={{opacity:1}} onClick={()=>del(c.id)}>×</span>
        </div>
      ))}
    </div>
  )
}
