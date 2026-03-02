import { useState } from 'react'
import { store } from '../store/data'

const PLATFORMS = [
  { id:'ig',   name:'Instagram', icon:'📷', url:'https://instagram.com/mulliwen' },
  { id:'tt',   name:'TikTok',    icon:'🎵', url:'https://tiktok.com/@mulliwen' },
  { id:'pt',   name:'Pinterest', icon:'📌', url:'https://pinterest.com' },
  { id:'fb',   name:'Facebook',  icon:'◈',  url:'https://facebook.com' },
]

const QUICK_LINKS = [
  { label:'MulliWen.com', url:'https://mulliwen.com' },
  { label:'Instagram',    url:'https://instagram.com/mulliwen' },
  { label:'TikTok',       url:'https://tiktok.com/@mulliwen' },
  { label:'Pinterest',    url:'https://pinterest.com' },
  { label:'Facebook',     url:'https://facebook.com' },
  { label:'WhatsApp',     url:'https://wa.me' },
  { label:'Shopify',      url:'https://shopify.com' },
  { label:'Klaviyo',      url:'https://klaviyo.com' },
]

export default function Social() {
  const [vals, setVals] = useState(() => store.get('socialVals', {}))
  const [ideas, setIdeas] = useState(() => store.get('contentIdeas', ''))

  const upd = k => e => {
    const next = {...vals, [k]: e.target.value}
    setVals(next); store.set('socialVals', next)
  }
  const updIdeas = e => { setIdeas(e.target.value); store.set('contentIdeas', e.target.value) }

  return (
    <>
      {/* Quick launch */}
      <div className="card">
        <div className="card-title">Quick Launch</div>
        <div className="row-wrap">
          {QUICK_LINKS.map(l => (
            <a key={l.label} className="sc-link" href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
          ))}
        </div>
      </div>

      {/* Platform stats */}
      <div className="grid2" style={{gap:'1px'}}>
        {PLATFORMS.map(p => (
          <div key={p.id} className="social-card">
            <div className="sc-head">
              <span className="sc-name">{p.name}</span>
              <a href={p.url} target="_blank" rel="noreferrer" style={{fontSize:18,textDecoration:'none'}}>{p.icon}</a>
            </div>
            <div className="row" style={{gap:20,marginBottom:10}}>
              <div>
                <input className="sc-num-inp" value={vals[p.id+'_f']||''} onChange={upd(p.id+'_f')} placeholder="0" />
                <div className="sc-stat-label">Followers</div>
              </div>
              <div>
                <input className="sc-num-inp" style={{width:60}} value={vals[p.id+'_p']||''} onChange={upd(p.id+'_p')} placeholder="0" />
                <div className="sc-stat-label">Posts</div>
              </div>
            </div>
            <input className="inp-bare" style={{fontSize:10,color:'var(--mid)'}}
              value={vals[p.id+'_notes']||''} onChange={upd(p.id+'_notes')}
              placeholder="Notes — last post, ideas, engagement…" />
          </div>
        ))}
      </div>

      {/* Content ideas */}
      <div className="card">
        <div className="card-title">Content Ideas & Upcoming Posts</div>
        <textarea className="textarea" value={ideas} onChange={updIdeas}
          placeholder="Behind the scenes ideas, upcoming drops, campaign concepts…" rows={6} />
      </div>

      {/* Content pillars */}
      <div className="card">
        <div className="card-title">MulliWen Content Pillars</div>
        {[
          ['Lagos × London','Behind-the-scenes of production, fabric sourcing, the cultural duality. Your unfair advantage.'],
          ['The Process','Made-to-order journey — from sketch to finished piece. Stillness over posing.'],
          ['The Woman','Styling, confidence, self-possession. For the woman who moves with intention.'],
          ['The Brand Story','Founder journey, Muni\'s voice, the "why" behind MulliWen. No competitor can copy this.'],
          ['Product Drop','Clean editorial product shots. No hype language. We state. We don\'t convince.'],
        ].map(([title, desc]) => (
          <div key={title} style={{display:'flex',gap:12,padding:'10px 0',borderBottom:'1px solid var(--border2)'}}>
            <div style={{width:3,background:'var(--blood)',borderRadius:2,flexShrink:0}} />
            <div>
              <div style={{fontSize:11,color:'var(--ink)',marginBottom:2}}>{title}</div>
              <div style={{fontSize:10,color:'var(--muted)',lineHeight:1.5}}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
