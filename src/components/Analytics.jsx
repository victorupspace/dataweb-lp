import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Analytics.css'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────
   Tab data
───────────────────────────────────────────────────────── */
const TABS = [
  { id: 0, color: '#f5c518', label: 'Segmentos',  title: 'Vendas por segmento',       desc: 'Descubra quais categorias de produtos mais vendem.',                                         icon: 'pie'      },
  { id: 1, color: '#6C63FF', label: 'Marcas',     title: 'Vendas por marca',           desc: 'Entenda quais marcas geram mais faturamento e margem.',                                      icon: 'bar'      },
  { id: 2, color: '#00B4D8', label: 'Vendedores', title: 'Desempenho por vendedor',    desc: 'Acompanhe quem está vendendo mais e identifique oportunidades de melhoria na equipe.',      icon: 'users'    },
  { id: 3, color: '#A6CE39', label: 'Financeiro', title: 'Contas a pagar e receber',   desc: 'Tenha uma visão clara da saúde financeira da empresa.',                                      icon: 'trending' },
  { id: 4, color: '#FF9F43', label: 'Médicos',    title: 'Valores por filial/franquia',        desc: 'Analise os valores que cada filial fatura diariamente.',                                    icon: 'star'     },
  { id: 5, color: '#FF6B6B', label: 'Metas',      title: 'Metas e desempenho',         desc: 'Acompanhe metas por: empresa, segmento, marca, vendedor.',                                  icon: 'target'   },
  { id: 6, color: '#A78BFA', label: 'Preços',     title: 'Análise por faixa de preço', desc: 'Entenda como seus produtos performam em diferentes níveis de preço.',                        icon: 'scatter'  },
]

/* ─────────────────────────────────────────────────────────
   Icons
───────────────────────────────────────────────────────── */
function TabIcon({ name, color }) {
  const s = { width: 16, height: 16, fill: 'none', viewBox: '0 0 16 16' }
  switch (name) {
    case 'pie':
      return <svg {...s}><path d="M8 2a6 6 0 100 12A6 6 0 008 2z" stroke={color} strokeWidth="1.5"/><path d="M8 2v6l4.24 2.45" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>
    case 'bar':
      return <svg {...s}><rect x="1" y="4.5"  width="5"  height="2" rx="0.8" fill={color} opacity="0.85"/><rect x="1" y="7.5"  width="10" height="2" rx="0.8" fill={color} opacity="0.85"/><rect x="1" y="10.5" width="7"  height="2" rx="0.8" fill={color} opacity="0.85"/></svg>
    case 'users':
      return <svg {...s}><circle cx="6" cy="5.5" r="2.5" stroke={color} strokeWidth="1.4"/><path d="M1 14c0-2.76 2.24-4.5 5-4.5s5 1.74 5 4.5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/><path d="M11 3.5a2.5 2.5 0 010 5M14 10.5c1.2.7 2 1.9 2 3.5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/></svg>
    case 'trending':
      return <svg {...s}><polyline points="1,13 5,8 8,10 12,4 15,4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="12,4 15,4 15,7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    case 'star':
      return <svg {...s}><path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.27l-3.52 1.08.67-3.93L2.3 5.64l3.94-.57z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/></svg>
    case 'target':
      return <svg {...s}><circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.4"/><circle cx="8" cy="8" r="3.5" stroke={color} strokeWidth="1.4"/><circle cx="8" cy="8" r="1" fill={color}/></svg>
    case 'scatter':
      return <svg {...s}><circle cx="4"    cy="11"  r="1.5" fill={color}/><circle cx="8.5" cy="6"    r="2"   fill={color} opacity="0.8"/><circle cx="12.5" cy="9.5" r="1.3" fill={color} opacity="0.9"/><circle cx="6" cy="4" r="1" fill={color} opacity="0.7"/><circle cx="13" cy="5" r="1.5" fill={color} opacity="0.75"/></svg>
    default:
      return null
  }
}

/* ─────────────────────────────────────────────────────────
   Chart 0 — Donut (Vendas por segmento)
───────────────────────────────────────────────────────── */
const DONUT_SEGS = [
  { pct: 0.38, color: '#f5c518', label: 'Armações',    val: '38%' },
  { pct: 0.28, color: '#6C63FF', label: 'Lentes',      val: '28%' },
  { pct: 0.19, color: '#00B4D8', label: 'Solar',       val: '19%' },
  { pct: 0.15, color: '#A6CE39', label: 'Acessórios',  val: '15%' },
]

function DonutChart() {
  const r = 48, cx = 56, cy = 56
  const circ = parseFloat((2 * Math.PI * r).toFixed(2))
  let cum = 0
  return (
    <div className="ana-chart ana-chart--donut">
      <div className="ana-donut-wrap">
        <svg viewBox="0 0 112 112" className="ana-donut-svg">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16"/>
          {DONUT_SEGS.map((seg, i) => {
            const dash = parseFloat((circ * seg.pct).toFixed(2))
            const off  = parseFloat((-circ * cum).toFixed(2))
            cum += seg.pct
            return (
              <circle key={i} className="ana-donut-arc"
                cx={cx} cy={cy} r={r} fill="none"
                stroke={seg.color} strokeWidth="16"
                strokeDasharray={`0 ${circ}`}
                strokeDashoffset={off}
                transform={`rotate(-90 ${cx} ${cy})`}
                data-dash={dash}
                data-circ={circ}
              />
            )
          })}
        </svg>
        <div className="ana-donut-center">
          <span className="ana-donut-pct">38%</span>
          <span className="ana-donut-sub">Armações</span>
        </div>
      </div>
      <ul className="ana-donut-legend">
        {DONUT_SEGS.map((s, i) => (
          <li key={i} className="ana-legend-item">
            <span className="ana-legend-dot"  style={{ background: s.color }}/>
            <span className="ana-legend-name">{s.label}</span>
            <span className="ana-legend-val"> {s.val}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Chart 1 — Horizontal Bars (Vendas por marca)
───────────────────────────────────────────────────────── */
const HBAR_ITEMS = [
  { label: 'Ray-Ban', val: 92 },
  { label: 'Oakley',  val: 74 },
  { label: 'Grazi',   val: 61 },
  { label: 'Speedo',  val: 48 },
  { label: 'Outras',  val: 33 },
]

function HBarChart() {
  return (
    <div className="ana-chart ana-chart--hbar">
      <p className="ana-chart__title">Faturamento por marca</p>
      <div className="ana-hbar-list">
        {HBAR_ITEMS.map((item, i) => (
          <div key={i} className="ana-hbar-row">
            <span className="ana-hbar-label">{item.label}</span>
            <div className="ana-hbar-track">
              <div className="ana-hbar-fill" style={{ background: '#6C63FF', width: `${item.val}%` }}/>
            </div>
            <span className="ana-hbar-pct">{item.val}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Chart 2 — Ranking (Desempenho por vendedor)
───────────────────────────────────────────────────────── */
const RANK_ITEMS = [
  { name: 'Ana Souza',       val: 'R$ 48.200' },
  { name: 'Carlos Lima',     val: 'R$ 41.700' },
  { name: 'Fernanda Costa',  val: 'R$ 37.900' },
  { name: 'João Oliveira',   val: 'R$ 31.450' },
  { name: 'Patricia Melo',   val: 'R$ 27.200' },
]
const AVATAR_COLORS = ['#6C63FF', '#00B4D8', '#f5c518', '#A6CE39', '#FF9F43']

function RankingList() {
  return (
    <div className="ana-chart ana-chart--ranking">
      <p className="ana-chart__title">Ranking de vendedores</p>
      <div className="ana-rank-list">
        {RANK_ITEMS.map((item, i) => (
          <div key={i} className="ana-rank-row">
            <span className="ana-rank-num" style={{ color: i < 3 ? '#f5c518' : 'rgba(255,255,255,0.22)' }}>
              #{i + 1}
            </span>
            <div className="ana-rank-avatar" style={{ background: AVATAR_COLORS[i] }}/>
            <span className="ana-rank-name">{item.name}</span>
            <span className="ana-rank-val">{item.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Chart 3 — Line Chart (Contas a pagar e receber)
───────────────────────────────────────────────────────── */
const REC_PTS = '0,52 40,40 90,50 135,28 175,42 220,18 260,32'
const PAY_PTS = '0,70 40,80 90,62 135,82 175,68 220,84 260,72'

function LineChart() {
  return (
    <div className="ana-chart ana-chart--line">
      <div className="ana-line-header">
        <p className="ana-chart__title">Fluxo de caixa</p>
        <div className="ana-line-legend">
          <span className="ana-line-leg">
            <span className="ana-line-leg-dot" style={{ background: '#A6CE39' }}/>
            Receitas
          </span>
          <span className="ana-line-leg">
            <span className="ana-line-leg-dot" style={{ background: '#FF6B6B' }}/>
            Despesas
          </span>
        </div>
      </div>
      <div className="ana-line-svg-wrap">
        <svg viewBox="0 0 260 90" preserveAspectRatio="none" className="ana-line-svg">
          <defs>
            <linearGradient id="anaGradRec" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%"   stopColor="#A6CE39" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#A6CE39" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="anaGradPay" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%"   stopColor="#FF6B6B" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0"/>
            </linearGradient>
            <clipPath id="anaLineClip">
              <rect className="ana-line-clip-rect" x="0" y="-5" width="0" height="100"/>
            </clipPath>
          </defs>
          {[22, 44, 66].map(y => (
            <line key={y} x1="0" y1={y} x2="260" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          ))}
          <polygon points={`${REC_PTS} 260,90 0,90`} fill="url(#anaGradRec)" clipPath="url(#anaLineClip)"/>
          <polygon points={`${PAY_PTS} 260,90 0,90`} fill="url(#anaGradPay)" clipPath="url(#anaLineClip)"/>
          <polyline points={REC_PTS} fill="none" stroke="#A6CE39" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#anaLineClip)"/>
          <polyline points={PAY_PTS} fill="none" stroke="#FF6B6B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#anaLineClip)"/>
        </svg>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Chart 4 — Stat Cards (Receitas por médico)
───────────────────────────────────────────────────────── */
const STAT_DATA = [
  { label: 'Dr. Paulo Salave',  num: 31200, delta: '+12%' },
  { label: 'Dra. Maria Lins',   num: 27850, delta: '+8%'  },
  { label: 'Dr. Roberto Sá',    num: 24100, delta: '+5%'  },
  { label: 'Dra. Carla Neves',  num: 18300, delta: '+3%'  },
]

function StatCards() {
  return (
    <div className="ana-chart ana-chart--stats">
      <p className="ana-chart__title">Valores por filial/franquia</p>
      <div className="ana-stats-grid">
        {STAT_DATA.map((s, i) => (
          <div key={i} className="ana-stat-card">
            <span className="ana-stat-label">{s.label}</span>
            <span className="ana-stat-val">R$ 0</span>
            <span className="ana-stat-trend">▲ {s.delta} mês</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Chart 5 — Progress Bars (Metas e desempenho)
───────────────────────────────────────────────────────── */
const PROG_DATA = [
  { label: 'Empresa geral',  target: 78, color: '#FF6B6B' },
  { label: 'Armações',       target: 92, color: '#f5c518' },
  { label: 'Lentes',         target: 65, color: '#6C63FF' },
  { label: 'Solar',          target: 48, color: '#00B4D8' },
  { label: 'Equipe norte',   target: 83, color: '#A6CE39' },
]

function ProgressBars() {
  return (
    <div className="ana-chart ana-chart--progress">
      <p className="ana-chart__title">Atingimento de metas</p>
      <div className="ana-prog-list">
        {PROG_DATA.map((item, i) => (
          <div key={i} className="ana-prog-row">
            <div className="ana-prog-header">
              <span className="ana-prog-label">{item.label}</span>
              <span className="ana-prog-pct" style={{ color: item.color }}>{item.target}%</span>
            </div>
            <div className="ana-prog-track">
              <div
                className="ana-prog-fill"
                style={{ background: item.color, width: `${item.target}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Chart 6 — Bubble Chart (Análise por faixa de preço)
───────────────────────────────────────────────────────── */
const BUBBLE_DATA = [
  { x: 12, y: 62, r: 28, color: '#f5c518', label: '< R$200'   },
  { x: 38, y: 28, r: 42, color: '#6C63FF', label: 'R$200-500' },
  { x: 64, y: 54, r: 34, color: '#00B4D8', label: 'R$500-1k'  },
  { x: 82, y: 24, r: 22, color: '#A6CE39', label: '> R$1k'    },
  { x: 50, y: 80, r: 18, color: '#FF9F43', label: 'Premium'   },
]

function BubbleChart() {
  return (
    <div className="ana-chart ana-chart--bubble">
      <p className="ana-chart__title">Performance por faixa de preço</p>
      <div className="ana-bubble-area">
        <svg className="ana-bubble-grid-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[25, 50, 75].map(v => <line key={`h${v}`} x1="0" y1={v} x2="100" y2={v} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>)}
          {[25, 50, 75].map(v => <line key={`v${v}`} x1={v} y1="0" x2={v} y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>)}
        </svg>
        {BUBBLE_DATA.map((b, i) => (
          <div
            key={i}
            className="ana-bubble"
            style={{
              left:       `${b.x}%`,
              top:        `${b.y}%`,
              width:       b.r * 2,
              height:      b.r * 2,
              background: `${b.color}1e`,
              border:     `1.5px solid ${b.color}66`,
            }}
          >
            <span className="ana-bubble-label" style={{ color: b.color }}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Ordered to match TABS indices */
const CHARTS = [DonutChart, HBarChart, RankingList, LineChart, StatCards, ProgressBars, BubbleChart]

/* ─────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────── */
export default function Analytics() {
  const [activeTab, setActiveTab] = useState(0)
  const activeTabRef = useRef(0)
  const isAnimating  = useRef(false)

  const sectionRef  = useRef(null)
  const headerRef   = useRef(null)
  const panelRef    = useRef(null)
  const mockupRef   = useRef(null)
  const chartRefs   = useRef([])
  const tabRefs     = useRef([])

  /* ── Init: hide all charts except first ── */
  useEffect(() => {
    chartRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, { opacity: i === 0 ? 1 : 0, display: i === 0 ? 'flex' : 'none' })
    })
  }, [])

  /* ── ScrollTrigger entry + first chart trigger ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerEls = headerRef.current
        ? headerRef.current.querySelectorAll('.ana__tag, .ana__title, .ana__subtitle, .ana__texts')
        : []

      gsap.from(headerEls, {
        y: 38, opacity: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true },
      })

      gsap.from(panelRef.current, {
        x: -44, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 66%', once: true },
      })

      gsap.from(mockupRef.current, {
        x: 52, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 66%',
          once: true,
          onEnter: () => setTimeout(() => triggerChart(0), 480),
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Chart-specific animations ── */
  function triggerChart(idx) {
    const el = chartRefs.current[idx]
    if (!el) return

    switch (idx) {

      case 0: { // Donut — arcs draw in staggered
        const arcs = el.querySelectorAll('.ana-donut-arc')
        arcs.forEach((arc, i) => {
          const dash = parseFloat(arc.dataset.dash)
          const circ = parseFloat(arc.dataset.circ)
          gsap.fromTo(arc,
            { attr: { strokeDasharray: `0 ${circ}` } },
            { attr: { strokeDasharray: `${dash} ${circ}` }, duration: 1.1, delay: i * 0.15, ease: 'power2.out' },
          )
        })
        break
      }

      case 1: { // H-Bars — scaleX left → right
        const fills = el.querySelectorAll('.ana-hbar-fill')
        gsap.fromTo(fills,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.75, stagger: 0.1, ease: 'power2.out' },
        )
        break
      }

      case 2: { // Ranking — rows slide up staggered
        const rows = el.querySelectorAll('.ana-rank-row')
        gsap.fromTo(rows,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.46, stagger: 0.08, ease: 'power2.out' },
        )
        break
      }

      case 3: { // Line — clipPath rect expands left→right
        const rect = el.querySelector('.ana-line-clip-rect')
        if (rect) {
          gsap.fromTo(rect,
            { attr: { width: 0 } },
            { attr: { width: 260 }, duration: 1.4, ease: 'power2.inOut' },
          )
        }
        break
      }

      case 4: { // Stats — cards pop in, numbers count up
        const cards = el.querySelectorAll('.ana-stat-card')
        gsap.fromTo(cards,
          { y: 18, opacity: 0, scale: 0.93 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.09, ease: 'back.out(1.4)' },
        )
        cards.forEach((card, i) => {
          const valEl = card.querySelector('.ana-stat-val')
          if (!valEl) return
          valEl.textContent = 'R$ 0'
          const proxy = { n: 0 }
          gsap.to(proxy, {
            n: STAT_DATA[i].num, duration: 1.2, delay: i * 0.09, ease: 'power2.out',
            onUpdate() {
              valEl.textContent = `R$ ${Math.round(proxy.n).toLocaleString('pt-BR')}`
            },
          })
        })
        break
      }

      case 5: { // Progress — bars fill left→right
        const fills = el.querySelectorAll('.ana-prog-fill')
        gsap.fromTo(fills,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.88, stagger: 0.1, ease: 'power2.out' },
        )
        break
      }

      case 6: { // Bubbles — scale + fade with spring
        const bubbles = el.querySelectorAll('.ana-bubble')
        gsap.fromTo(bubbles,
          { scale: 0, opacity: 0, transformOrigin: 'center center' },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
        )
        break
      }

      default: break
    }
  }

  /* ── Tab change handler ── */
  function handleTabChange(newIdx) {
    if (isAnimating.current || newIdx === activeTabRef.current) return
    isAnimating.current = true

    const oldEl = chartRefs.current[activeTabRef.current]
    const newEl = chartRefs.current[newIdx]
    if (!oldEl || !newEl) { isAnimating.current = false; return }

    gsap.timeline({ onComplete: () => { isAnimating.current = false } })
      .to(oldEl, { opacity: 0, y: -14, duration: 0.24, ease: 'power2.in' })
      .call(() => {
        gsap.set(oldEl, { display: 'none' })
        gsap.set(newEl, { display: 'flex', opacity: 0, y: 14 })
        activeTabRef.current = newIdx
        setActiveTab(newIdx)
      })
      .to(newEl, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
      .call(() => triggerChart(newIdx))
  }

  const active = TABS[activeTab]

  return (
    <section className="section section--dark ana" id="analytics" ref={sectionRef}>

      <div className="ana__glow ana__glow--1" aria-hidden="true"/>
      <div className="ana__glow ana__glow--2" aria-hidden="true"/>
      <div className="ana__grid-overlay"       aria-hidden="true"/>

      <div className="container">

        {/* ── Section header ── */}
        <div className="ana__header" ref={headerRef}>
          <span className="section__tag ana__tag">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1"    y="6"   width="2.5" height="5"   rx="0.8" fill="currentColor" opacity="0.6"/>
              <rect x="4.75" y="3.5" width="2.5" height="7.5" rx="0.8" fill="currentColor" opacity="0.8"/>
              <rect x="8.5"  y="1"   width="2.5" height="10"  rx="0.8" fill="currentColor"/>
            </svg>
            BI & Analytics
          </span>
          <h2 className="section__title ana__title">
            Enxergue o universo<br className="ana__br"/> do seu negócio.
          </h2>
          <p className="section__subtitle ana__subtitle">
            Transforme dados da sua ótica em informações estratégicas para decisões mais inteligentes.
          </p>
          <div className="ana__texts">
            <p className="ana__body-text">
              O Analytics Dataweb reúne os principais indicadores do negócio em dashboards claros e organizados.
            </p>
            <p className="ana__body-text">
              Toda ótica gera uma enorme quantidade de dados todos os dias. O desafio não é apenas registrar essas informações, mas transformá-las em conhecimento para melhorar a gestão. Com o Analytics Dataweb, você tem uma visão completa da operação e consegue identificar oportunidades, corrigir problemas e tomar decisões com mais segurança.
            </p>
          </div>
        </div>

        {/* ── Interactive body ── */}
        <div className="ana__body">

          {/* Left — tab list */}
          <div className="ana__panel" ref={panelRef}>
            <p className="ana__panel-heading">O que você pode analisar</p>
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                className={`ana__tab${i === activeTab ? ' is-active' : ''}`}
                style={{ '--tc': tab.color }}
                onClick={() => handleTabChange(i)}
                ref={el => (tabRefs.current[i] = el)}
              >
                <div
                  className="ana__tab-icon"
                  style={{ background: i === activeTab ? `${tab.color}22` : 'rgba(255,255,255,0.05)' }}
                >
                  <TabIcon name={tab.icon} color={i === activeTab ? tab.color : 'rgba(255,255,255,0.28)'}/>
                </div>
                <div className="ana__tab-body">
                  <p className="ana__tab-title">{tab.title}</p>
                  <p className="ana__tab-desc">{tab.desc}</p>
                </div>
                <svg className="ana__tab-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>

          {/* Right — dashboard mockup */}
          <div className="ana__mockup-wrap" ref={mockupRef}>
            <div className="ana__mockup">

              {/* Browser chrome bar */}
              <div className="ana__chrome">
                <div className="ana__chrome-dots">
                  <span className="ana__dot ana__dot--red"/>
                  <span className="ana__dot ana__dot--yellow"/>
                  <span className="ana__dot ana__dot--green"/>
                </div>
                <div className="ana__chrome-bar">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                    <path d="M1 5h8M5 1c-1 1.5-1.5 2.8-1.5 4s.5 2.5 1.5 4" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
                  </svg>
                  analytics.dataweb.com.br
                </div>
                <div className="ana__chrome-actions"><span/><span/><span/></div>
              </div>

              {/* Dashboard layout */}
              <div className="ana__dash">

                {/* Sidebar */}
                <aside className="ana__dash-sb">
                  <div className="ana__dash-sb-logo">
                    <div className="ana__dash-sb-logo-dot" style={{ background: active.color }}/>
                  </div>
                  <nav className="ana__dash-sb-nav">
                    {[0, 1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className={`ana__dash-sb-item${i === 0 ? ' is-active' : ''}`}
                        style={i === 0 ? { background: `${active.color}1a` } : {}}
                      >
                        <div
                          className="ana__dash-sb-icon"
                          style={i === 0 ? { background: active.color } : {}}
                        />
                      </div>
                    ))}
                  </nav>
                </aside>

                {/* Main panel */}
                <div className="ana__dash-main">

                  {/* Topbar */}
                  <div className="ana__dash-topbar">
                    <div className="ana__dash-topbar-left">
                      <div className="ana__dash-topbar-title"/>
                      <div className="ana__dash-topbar-sub"/>
                    </div>
                    <div className="ana__dash-topbar-right">
                      <div className="ana__dash-search"/>
                      <div className="ana__dash-avatar" style={{ background: `${active.color}55` }}/>
                    </div>
                  </div>

                  {/* KPI mini-row */}
                  <div className="ana__kpi-row">
                    {[{ w: '55%', accent: true }, { w: '48%' }, { w: '64%' }].map((k, i) => (
                      <div
                        key={i}
                        className={`ana__kpi-card${k.accent ? ' is-accent' : ''}`}
                        style={k.accent ? { background: `${active.color}18`, borderColor: `${active.color}38` } : {}}
                      >
                        <div className="ana__kpi-lbl" style={{ width: k.w }}/>
                        <div
                          className="ana__kpi-val"
                          style={k.accent ? { background: `${active.color}40` } : {}}
                        />
                        <div className="ana__kpi-pct"/>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic chart area */}
                  <div className="ana__chart-area">
                    {TABS.map((tab, i) => {
                      const ChartComp = CHARTS[i]
                      return (
                        <div
                          key={tab.id}
                          className="ana__chart-slot"
                          ref={el => (chartRefs.current[i] = el)}
                          style={{ '--tc': tab.color }}
                        >
                          <ChartComp/>
                        </div>
                      )
                    })}
                  </div>

                </div>
              </div>
            </div>

            {/* Caption below mockup */}
            <div className="ana__mockup-footer">
              <span className="ana__mockup-dot"   style={{ background: active.color }}/>
              <span className="ana__mockup-label" style={{ color: active.color }}>
                {active.title}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
