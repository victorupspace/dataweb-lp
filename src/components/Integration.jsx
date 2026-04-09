import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Integration.css'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────
   Slides
───────────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 1,
    title: 'Eficiência que Transforma o Atendimento',
    subtitle: 'Eleve o padrão da sua ótica unindo tecnologia de ponta com uma jornada de compra mais rápida e segura para seu cliente.',
    color: '#6C63FF',
    label: 'Atendimento personalizado',
    icon: 'grid',
  },
  {
    id: 2,
    title: 'Inteligência Artificial na Leitura de Receitas',
    subtitle: 'Automatize a interpretação de dados com IA, eliminando erros de digitação e acelerando o atendimento inicial',
    color: '#00B4D8',
    label: 'IA',
    icon: 'box',
  },
  {
    id: 3,
    title: 'Orçamentos Ágeis e Assertivos',
    subtitle: 'Crie propostas personalizadas em segundos com acesso direto ao guia de lentes e configurações da sua loja.',
    color: '#FBB040',
    label: 'Orçamentos',
    icon: 'users',
  },
  {
    id: 4,
    title: 'Gestão Estratégica de O.S',
    subtitle: 'Mantenha o controle total do fluxo de trabalho com organização impecável e acompanhamento de status em tempo real.',
    color: '#A6CE39',
    label: 'Ordens de Serviço',
    icon: 'layers',
  },
  {
    id: 5,
    title: 'Conexão Direta com Laboratórios',
    subtitle: 'Otimize a logística enviando pedidos digitalmente para os principais laboratórios, sem necessidade de redigitação.',
    color: '#FF6B6B',
    label: 'Laboratórios',
    icon: 'chart',
  },
  {
    id: 6,
    title: 'Precisão com Pupilômetro Integrado',
    subtitle: 'Centralize medições técnicas diretamente no sistema, garantindo que todas as informações do cliente fiquem em um só lugar.',
    color: '#FF9F43',
    label: 'Pupilômetro',
    icon: 'calendar',
  },
]

const N = SLIDES.length

/* ─────────────────────────────────────────────────────────
   Stack positions
───────────────────────────────────────────────────────── */
const STACK = {
  front:  { x: 0,  y: 0,  scale: 1,     opacity: 1,    zIndex: 10, rotateZ: 0 },
  mid:    { x: 22, y: 18, scale: 0.953, opacity: 0.92,  zIndex: 5,  rotateZ: 0.5 },
  back:   { x: 44, y: 36, scale: 0.905, opacity: 0.72,  zIndex: 1,  rotateZ: 1 },
  hidden: { x: 0,  y: 0,  scale: 0.87,  opacity: 0,     zIndex: 0,  rotateZ: 0 },
}

function getRole(i, activeIdx) {
  const dist = ((i - activeIdx) % N + N) % N
  if (dist === 0) return 'front'
  if (dist === 1) return 'mid'
  if (dist === 2) return 'back'
  return 'hidden'
}

/* ─────────────────────────────────────────────────────────
   Icons
───────────────────────────────────────────────────────── */
function Icon({ name, color }) {
  const p = { width: 18, height: 18, fill: 'none', viewBox: '0 0 18 18' }
  if (name === 'grid') return (
    <svg {...p}>
      <rect x="2" y="2" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.6" />
      <rect x="10" y="2" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.6" />
      <rect x="2" y="10" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.6" />
      <rect x="10" y="10" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.6" />
    </svg>
  )
  if (name === 'box') return (
    <svg {...p}>
      <path d="M3 5.5L9 2l6 3.5v7L9 16 3 12.5V5.5z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 2v14M3 5.5l6 3.5 6-3.5" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
  if (name === 'users') return (
    <svg {...p}>
      <circle cx="7" cy="6" r="3" stroke={color} strokeWidth="1.6" />
      <path d="M1 16c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 3a3 3 0 010 6M14.5 11.5c1.5.8 2.5 2.2 2.5 4.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
  if (name === 'layers') return (
    <svg {...p}>
      <path d="M9 2L16 6 9 10 2 6 9 2z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M2 10l7 4 7-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M2 14l7 4 7-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
  if (name === 'chart') return (
    <svg {...p}>
      <rect x="2" y="10" width="3.5" height="6" rx="1" stroke={color} strokeWidth="1.6" />
      <rect x="7.25" y="6" width="3.5" height="10" rx="1" stroke={color} strokeWidth="1.6" />
      <rect x="12.5" y="2" width="3.5" height="14" rx="1" stroke={color} strokeWidth="1.6" />
    </svg>
  )
  if (name === 'calendar') return (
    <svg {...p}>
      <rect x="2" y="4" width="14" height="12" rx="2" stroke={color} strokeWidth="1.6" />
      <path d="M6 2v4M12 2v4M2 8h14" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="6" cy="12" r="1.2" fill={color} />
      <circle cx="9" cy="12" r="1.2" fill={color} />
      <circle cx="12" cy="12" r="1.2" fill={color} />
    </svg>
  )
  return null
}

/* ─────────────────────────────────────────────────────────
   Dashboard Placeholder
───────────────────────────────────────────────────────── */
function ScreenPlaceholder({ slide }) {
  return (
    <div className="itg-ph" style={{ '--sc': slide.color }}>
      <aside className="itg-ph__sidebar">
        <div className="itg-ph__logo">
          <div className="itg-ph__logo-icon" />
          <div className="itg-ph__logo-text" />
        </div>
        <nav className="itg-ph__nav">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={`itg-ph__nav-item${i === 0 ? ' itg-ph__nav-item--active' : ''}`}>
              <div className="itg-ph__nav-icon" />
              <div className="itg-ph__nav-label" />
            </div>
          ))}
        </nav>
        <div className="itg-ph__sidebar-footer">
          <div className="itg-ph__avatar-sm" />
          <div className="itg-ph__sidebar-user">
            <div className="itg-ph__sidebar-name" />
            <div className="itg-ph__sidebar-role" />
          </div>
        </div>
      </aside>

      <main className="itg-ph__main">
        <div className="itg-ph__topbar">
          <div className="itg-ph__topbar-left">
            <div className="itg-ph__topbar-title" />
            <div className="itg-ph__breadcrumb" />
          </div>
          <div className="itg-ph__topbar-right">
            <div className="itg-ph__search-bar" />
            <div className="itg-ph__icon-btn itg-ph__icon-btn--bell" />
            <div className="itg-ph__avatar" />
          </div>
        </div>

        <div className="itg-ph__kpis">
          {[
            { w: '52%', accent: true },
            { w: '64%', accent: false },
            { w: '40%', accent: false },
            { w: '58%', accent: false },
          ].map((card, i) => (
            <div key={i} className={`itg-ph__kpi${card.accent ? ' itg-ph__kpi--accent' : ''}`}>
              <div className="itg-ph__kpi-top">
                <div className="itg-ph__kpi-label" style={{ width: card.w }} />
                <div className="itg-ph__kpi-badge" />
              </div>
              <div className="itg-ph__kpi-val" />
              <div className="itg-ph__kpi-trend">
                <div className="itg-ph__kpi-arrow" />
                <div className="itg-ph__kpi-pct" />
              </div>
            </div>
          ))}
        </div>

        <div className="itg-ph__mid">
          <div className="itg-ph__chart-card">
            <div className="itg-ph__chart-header">
              <div className="itg-ph__chart-title" />
              <div className="itg-ph__chart-tabs">
                <div className="itg-ph__tab itg-ph__tab--active" />
                <div className="itg-ph__tab" />
                <div className="itg-ph__tab" />
              </div>
            </div>
            <div className="itg-ph__chart">
              <div className="itg-ph__chart-grid">
                {[0, 1, 2, 3].map(i => <div key={i} className="itg-ph__grid-line" />)}
              </div>
              <div className="itg-ph__bars">
                {[38, 62, 47, 80, 55, 91, 69, 43, 75, 58, 84, 66].map((h, i) => (
                  <div key={i} className="itg-ph__bar" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>

          <div className="itg-ph__track-card">
            <div className="itg-ph__track-header">
              <div className="itg-ph__track-title" />
              <div className="itg-ph__track-menu" />
            </div>
            <div className="itg-ph__list">
              {[70, 45, 85, 55].map((w, i) => (
                <div key={i} className="itg-ph__list-row">
                  <div className="itg-ph__list-dot" />
                  <div className="itg-ph__list-bar" style={{ width: `${w}%` }} />
                  <div className="itg-ph__list-val" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────── */
export default function Integration() {
  const [active, setActive] = useState(0)

  const cardRefs      = useRef([])
  const tabRefs       = useRef([])
  const tabFillRefs   = useRef([])
  const blob1Ref      = useRef(null)
  const blob2Ref      = useRef(null)
  const blob3Ref      = useRef(null)
  const activeRef     = useRef(0)
  const animating     = useRef(false)
  const progressTween = useRef(null)
  const floatTween    = useRef(null)
  const fns           = useRef({ goTo: null, startProgress: null })
  const sectionRef    = useRef(null)
  const panelRef      = useRef(null)
  const stackWrapRef  = useRef(null)

  /* ── Blobs ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(blob1Ref.current, { x: 120, y: 80, scale: 1.3, duration: 24, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to(blob2Ref.current, { x: -100, y: -80, scale: 0.8, duration: 30, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to(blob3Ref.current, { x: 60, y: -110, scale: 1.2, duration: 20, ease: 'sine.inOut', repeat: -1, yoyo: true })
    })
    return () => ctx.revert()
  }, [])

  /* ── ScrollTrigger entry ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tabRefs.current, {
        x: -50, opacity: 0, duration: 0.7,
        stagger: 0.09, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 68%',
          once: true,
        },
      })
      gsap.from(stackWrapRef.current, {
        x: 70, opacity: 0, duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 68%',
          once: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  /* ── Carousel ── */
  useEffect(() => {
    function killFloat() {
      floatTween.current?.kill()
    }

    function startFloat(idx) {
      killFloat()
      const card = cardRefs.current[idx]
      if (!card) return
      const currentY = Number(gsap.getProperty(card, 'y'))
      floatTween.current = gsap.to(card, {
        y: currentY - 6,
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }

    function animateBars(idx) {
      const card = cardRefs.current[idx]
      if (!card) return
      const bars = card.querySelectorAll('.itg-ph__bar')
      gsap.fromTo(bars,
        { scaleY: 0, transformOrigin: 'bottom center' },
        { scaleY: 1, duration: 0.55, stagger: 0.03, ease: 'power3.out' }
      )
    }

    function startProgress() {
      tabFillRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.killTweensOf(el)
        if (i !== activeRef.current) gsap.set(el, { scaleY: 0 })
      })

      const fill = tabFillRefs.current[activeRef.current]
      if (!fill) return

      progressTween.current?.kill()
      gsap.set(fill, { scaleY: 0, transformOrigin: 'top center' })
      progressTween.current = gsap.to(fill, {
        scaleY: 1,
        duration: 4.5,
        ease: 'none',
        onComplete: () => fns.current.goTo?.((activeRef.current + 1) % N, 1),
      })
    }

    function goTo(newIdx, dir = 1) {
      const oldIdx = activeRef.current
      if (newIdx === oldIdx) return

      // Interrompe animação atual imediatamente — não bloqueia clique
      if (animating.current) {
        cardRefs.current.forEach(el => el && gsap.killTweensOf(el))
      }

      animating.current = true
      progressTween.current?.kill()
      killFloat()

      // Atualiza estado imediatamente para o tab responder sem delay
      activeRef.current = newIdx
      setActive(newIdx)

      const tl = gsap.timeline({
        onComplete() {
          animating.current = false
          startProgress()
          startFloat(newIdx)
          animateBars(newIdx)
        },
      })

      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const oldRole = getRole(i, oldIdx)
        const newRole = getRole(i, newIdx)

        if (oldRole === 'hidden' && newRole !== 'hidden') {
          gsap.set(el, dir > 0
            ? { ...STACK.hidden, x: 66, y: 54, zIndex: 0 }
            : { ...STACK.hidden, x: -28, y: -28, zIndex: 0 }
          )
        }

        if (dir > 0 && oldRole === 'front' && newRole === 'hidden') {
          tl.to(el, {
            x: -160, y: -55, scale: 0.85,
            opacity: 0, rotateZ: -8,
            duration: 0.38, ease: 'power2.in', zIndex: 0,
          }, 0)
          return
        }

        tl.to(el, {
          ...STACK[newRole],
          duration: 0.42,
          ease: 'power3.out',
        }, 0)
      })
    }

    fns.current = { goTo, startProgress }

    cardRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, STACK[getRole(i, 0)])
    })

    startProgress()
    startFloat(0)
    animateBars(0)

    return () => {
      progressTween.current?.kill()
      floatTween.current?.kill()
    }
  }, [])

  function handleTab(i) {
    const dir = i > activeRef.current ? 1 : -1
    fns.current.goTo?.(i, dir)
  }

  return (
    <section className="section section--dark itg" id="plataforma" ref={sectionRef}>

      <div className="itg__blobs" aria-hidden="true">
        <div ref={blob1Ref} className="itg__blob itg__blob--1" />
        <div ref={blob2Ref} className="itg__blob itg__blob--2" />
        <div ref={blob3Ref} className="itg__blob itg__blob--3" />
      </div>

      <div className="itg__grid-overlay" aria-hidden="true" />

      <div className="container">
        <div className="section__header">
          <span className="section__tag">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="2" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 9v2M8 9v2M3 11h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Plataforma Web
          </span>
          <h2 className="section__title">Conheça o Optfacil</h2>
          <p className="section__subtitle">
            A solução definitiva para a gestão avançada de ordens de serviço em óticas
          </p>
        </div>

        <div className="itg__body">

          {/* ── Left: feature tabs ── */}
          <div className="itg__panel" ref={panelRef}>
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                className={`itg__tab${i === active ? ' is-active' : ''}`}
                style={{ '--tc': s.color }}
                onClick={() => handleTab(i)}
                ref={el => (tabRefs.current[i] = el)}
              >
                {/* Vertical progress fill */}
                <div
                  className="itg__tab-fill"
                  ref={el => (tabFillRefs.current[i] = el)}
                />

                <div
                  className="itg__tab-icon"
                  style={{ background: i === active ? `${s.color}22` : 'rgba(255,255,255,0.06)' }}
                >
                  <Icon
                    name={s.icon}
                    color={i === active ? s.color : 'rgba(255,255,255,0.28)'}
                  />
                </div>

                <div className="itg__tab-body">
                  <span className="itg__tab-label">{s.label}</span>
                  <p className="itg__tab-title">{s.title}</p>
                  <p className="itg__tab-desc">{s.subtitle}</p>
                </div>
              </button>
            ))}
          </div>

          {/* ── Right: card stack ── */}
          <div className="itg__stack-wrap" ref={stackWrapRef}>
            <div className="itg__stack">
              <div className="itg__spacer" aria-hidden="true">
                <div className="itg__chrome" />
                <div className="itg__screen" />
              </div>

              {SLIDES.map((s, i) => (
                <div
                  key={s.id}
                  className="itg__card"
                  ref={el => (cardRefs.current[i] = el)}
                  style={{ '--cc': s.color }}
                >
                  <div className="itg__chrome">
                    <div className="itg__chrome-dots">
                      <span className="itg__dot--red" />
                      <span className="itg__dot--yellow" />
                      <span className="itg__dot--green" />
                    </div>
                    <div className="itg__chrome-bar">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                        <path d="M1 5h8M5 1c-1 1.5-1.5 2.8-1.5 4s.5 2.5 1.5 4"
                          stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
                      </svg>
                      dataweb.com.br/{s.label.toLowerCase()}
                    </div>
                    <div className="itg__chrome-actions">
                      <span /><span /><span />
                    </div>
                  </div>
                  <div className="itg__screen">
                    <ScreenPlaceholder slide={s} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
