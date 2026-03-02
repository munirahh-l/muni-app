// Simple localStorage-backed store
export const store = {
  get: (key, fallback = null) => {
    try {
      const v = localStorage.getItem(key)
      return v ? JSON.parse(v) : fallback
    } catch { return fallback }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  }
}

export const INITIAL_TODOS = [
  { id: 1, text: 'Define MulliWen hero silhouette', cat: 'brand', done: false },
  { id: 2, text: 'Contact 3 manufacturers (UK + Lagos)', cat: 'brand', done: false },
  { id: 3, text: 'Upgrade mulliwen.com to Shopify', cat: 'brand', done: false },
  { id: 4, text: 'Register as sole trader with HMRC', cat: 'brand', done: false },
  { id: 5, text: 'Apply for £55k+ role', cat: 'career', done: false },
  { id: 6, text: 'Clear SURU debt (£600/mo)', cat: 'finance', done: false },
]

export const INITIAL_GOALS = [
  { id: 1, text: 'Daily Quran & Salah on time', year: '2026', pillar: 'faith', done: false },
  { id: 2, text: 'MulliWen first sale', year: '2026', pillar: 'brand', done: false },
  { id: 3, text: 'New role — £55k+', year: '2026', pillar: 'career', done: false },
  { id: 4, text: 'Surgery completed & recovered', year: '2026', pillar: 'glow', done: false },
  { id: 5, text: 'All personal debts cleared', year: '2026', pillar: 'wealth', done: false },
  { id: 6, text: 'Email list hits 500', year: '2026', pillar: 'brand', done: false },
  { id: 7, text: 'Umrah with family', year: '2027', pillar: 'faith', done: false },
  { id: 8, text: 'MulliWen £20k revenue', year: '2027', pillar: 'brand', done: false },
  { id: 9, text: '£10k savings milestone', year: '2027', pillar: 'wealth', done: false },
  { id: 10, text: 'MulliWen £80–120k gross', year: '2029', pillar: 'brand', done: false },
  { id: 11, text: 'Full-time MulliWen', year: '2030', pillar: 'brand', done: false },
  { id: 12, text: '£500k MulliWen gross', year: '2031', pillar: 'brand', done: false },
]

export const INITIAL_CONTACTS = [
  { id: 1, name: 'Lagos Manufacturer', role: 'Production partner', type: 'supplier', wa: '' },
  { id: 2, name: 'Fashion Bomb Daily', role: 'Press / Media', type: 'press', wa: '' },
  { id: 3, name: 'Fresh Face Clinic', role: 'Skin', type: 'personal', wa: '' },
]

export const MILESTONES = [
  { id: 1, date: 'Q1 2026', title: 'Hero silhouette locked', desc: 'One or two pieces defined. Everything built around them.', done: false },
  { id: 2, date: 'Q2 2026', title: 'First sample received', desc: 'Quality approved. COGS confirmed at target margin.', done: false },
  { id: 3, date: 'Q2 2026', title: 'Email list hits 500', desc: 'Warm audience ready for launch.', done: false },
  { id: 4, date: 'Q3 2026', title: 'mulliwen.com launches', desc: 'From landing page to full Shopify store.', done: false },
  { id: 5, date: 'Q3 2026', title: 'First pre-order opens', desc: '15+ pre-orders = green light. Under 10 = pause.', done: false },
  { id: 6, date: 'Q3 2026', title: 'First sale ✓', desc: 'Real money. Real customer. Everything changes here.', done: false },
  { id: 7, date: 'Q4 2026', title: 'First £1,000 month', desc: 'Not glamorous. Completely real. Brand works.', done: false },
  { id: 8, date: 'Q4 2026', title: 'Personal debts cleared', desc: 'SURU, MacBook, Mum loan — all gone.', done: false },
  { id: 9, date: 'Q1 2027', title: 'SS27 drop launches', desc: 'Second collection. You are a brand with rhythm.', done: false },
  { id: 10, date: 'Q2 2027', title: 'Email list hits 1,000', desc: 'Most valuable business asset.', done: false },
  { id: 11, date: 'Q4 2027', title: 'First £3,000 month', desc: 'Real business. Reinvest 70%.', done: false },
  { id: 12, date: '2028', title: 'First press feature', desc: 'Fashion Bomb Daily, Raydar, or Brick The Mag.', done: false },
  { id: 13, date: '2028', title: 'First wholesale order', desc: 'A boutique buys at cost. Massive validation.', done: false },
  { id: 14, date: '2029', title: 'MulliWen £80–120k gross', desc: 'Scaling decisions begin.', done: false },
  { id: 15, date: '2030', title: 'Full-time MulliWen', desc: 'The brand funds your life.', done: false },
  { id: 16, date: '2031', title: '£500k gross ✓', desc: 'Built correctly. No shortcuts.', done: false },
]
