import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import '../styles/Integration.css'

/* ─────────────────────────────────────────────────────────
   Mock data — substitua imageSrc por caminhos reais
───────────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 1,
    title: 'Dashboard Centralizado',
    subtitle: 'Acompanhe vendas, ticket médio e metas da equipe em painéis interativos atualizados em tempo real.',
    color: '#6C63FF',
    label: 'Dashboard',
  },
  {
    id: 2,
    title: 'Gestão de Pedidos',
    subtitle: 'Controle todos os pedidos de laboratório com rastreamento automático e status em tempo real.',
    color: '#00B4D8',
    label: 'Pedidos',
  },
  {
    id: 3,
    title: 'CRM de Clientes',
    subtitle: 'Histórico completo de compras, exames e agendamentos de cada cliente, acessível com um clique.',
    color: '#FBB040',
    label: 'CRM',
  },
  {
    id: 4,
    title: 'Controle de Estoque',
    subtitle: 'Gerencie armações, lentes e acessórios com alertas de ruptura e sugestão automática de reposição.',
    color: '#A6CE39',
    label: 'Estoque',
  },
  {
    id: 5,
    title: 'Relatórios e BI',
    subtitle: 'Gere relatórios gerenciais com filtros avançados e exporte para Excel ou PDF com um clique.',
    color: '#FF6B6B',
    label: 'Relatórios',
  },
  {
    id: 6,
    title: 'Agenda e Consultas',
    subtitle: 'Organize agendamentos de optometria, envie lembretes automáticos e reduza faltas em até 40%.',
    color: '#FF9F43',
    label: 'Agenda',
  },
]

const N = SLIDES.length

/* ─────────────────────────────────────────────────────────
   Posições do stack — GSAP vai interpolar entre elas
───────────────────────────────────────────────────────── */
const STACK = {
  front:  { x: 0,  y: 0,  scale: 1,     opacity: 1,    zIndex: 10, rotateZ: 0 },
  mid:    { x: 18, y: 15, scale: 0.957, opacity: 1,    zIndex: 5,  rotateZ: 0 },
  back:   { x: 36, y: 30, scale: 0.913, opacity: 0.82, zIndex: 1,  rotateZ: 0 },
  hidden: { x: 0,  y: 0,  scale: 0.87,  opacity: 0,    zIndex: 0,  rotateZ: 0 },
}

function getRole(i, activeIdx) {
  const dist = ((i - activeIdx) % N + N) % N
  if (dist === 0) return 'front'
  if (dist === 1) return 'mid'
  if (dist === 2) return 'back'
  return 'hidden'
}

/* ─────────────────────────────────────────────────────────
   Placeholder — imita um dashboard real em light mode
───────────────────────────────────────────────────────── */
function ScreenPlaceholder({ slide }) {
  return (
    <div className="itg-ph" style={{ '--sc': slide.color }}>

      {/* Sidebar */}
      <aside className="itg-ph__sidebar">
        <div className="itg-ph__logo">
          <div className="itg-ph__logo-icon" />
          <div className="itg-ph__logo-text" />
        </div>
        <nav className="itg-ph__nav">
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`itg-ph__nav-item${i === 0 ? ' itg-ph__nav-item--active' : ''}`}
            >
              <div className="itg-ph__nav-icon" />
              <div className="itg-ph__nav-label" />
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="itg-ph__main">

        {/* Top bar */}
        <div className="itg-ph__topbar">
          <div className="itg-ph__topbar-title" />
          <div className="itg-ph__topbar-right">
            <div className="itg-ph__search-bar" />
            <div className="itg-ph__icon-btn" />
            <div className="itg-ph__icon-btn itg-ph__icon-btn--bell" />
            <div className="itg-ph__avatar" />
          </div>
        </div>

        {/* KPI cards */}
        <div className="itg-ph__kpis">
          {[
            { w: '48%' },
            { w: '62%' },
            { w: '38%' },
            { w: '55%' },
          ].map((card, i) => (
            <div key={i} className="itg-ph__kpi">
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

        {/* Chart area + tracking */}
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
            <div className="itg-ph__map" />
            <div className="itg-ph__track-info">
              <div className="itg-ph__track-label" />
              <div className="itg-ph__track-val" />
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Componente principal
───────────────────────────────────────────────────────── */
export default function Integration() {
  const [active, setActive]         = useState(0)
  const [displayIdx, setDisplayIdx] = useState(0)

  const cardRefs      = useRef([])
  const textRef       = useRef(null)
  const progressRef   = useRef(null)
  const blob1Ref      = useRef(null)
  const blob2Ref      = useRef(null)
  const blob3Ref      = useRef(null)
  const activeRef     = useRef(0)
  const animating     = useRef(false)
  const progressTween = useRef(null)
  const fns           = useRef({ goTo: null, startProgress: null })

  /* ── Blobs etéreos ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(blob1Ref.current, {
        x: 110, y: 70, scale: 1.25,
        duration: 22, ease: 'sine.inOut',
        repeat: -1, yoyo: true,
      })
      gsap.to(blob2Ref.current, {
        x: -90, y: -70, scale: 0.85,
        duration: 28, ease: 'sine.inOut',
        repeat: -1, yoyo: true,
      })
      gsap.to(blob3Ref.current, {
        x: 50, y: -100, scale: 1.15,
        duration: 19, ease: 'sine.inOut',
        repeat: -1, yoyo: true,
      })
    })
    return () => ctx.revert()
  }, [])

  /* ── Carrossel ── */
  useEffect(() => {
    function startProgress() {
      if (!progressRef.current) return
      progressTween.current?.kill()
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' })
      progressTween.current = gsap.to(progressRef.current, {
        scaleX: 1,
        duration: 3,
        ease: 'none',
        onComplete: () => fns.current.goTo?.((activeRef.current + 1) % N, 1),
      })
    }

    function goTo(newIdx, dir = 1) {
      if (animating.current) return
      const oldIdx = activeRef.current
      if (newIdx === oldIdx) return
      animating.current = true
      progressTween.current?.kill()

      const tl = gsap.timeline({
        onComplete() {
          animating.current = false
          activeRef.current = newIdx
          setActive(newIdx)
          startProgress()
        },
      })

      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const oldRole = getRole(i, oldIdx)
        const newRole = getRole(i, newIdx)

        /* Posiciona cards que entram na cena a partir do "escondido" */
        if (oldRole === 'hidden' && newRole !== 'hidden') {
          gsap.set(el, dir > 0
            ? { ...STACK.hidden, x: 52, y: 44, zIndex: 0 }
            : { ...STACK.hidden, x: -24, y: -24, zIndex: 0 }
          )
        }

        /* Card da frente sai com flair ao avançar */
        if (dir > 0 && oldRole === 'front' && newRole === 'hidden') {
          tl.to(el, {
            x: -170, y: -50, scale: 0.85,
            opacity: 0, rotateZ: -9,
            duration: 0.55, ease: 'power3.inOut', zIndex: 0,
          }, 0)
          return
        }

        /* Card da frente vai para o meio ao voltar */
        tl.to(el, {
          ...STACK[newRole],
          duration: 0.68,
          ease: 'power3.inOut',
        }, 0)
      })

      /* Transição de texto */
      const textEl = textRef.current
      if (textEl) {
        tl.to(textEl, { opacity: 0, y: -12, duration: 0.22, ease: 'power2.in' }, 0)
        tl.call(() => setDisplayIdx(newIdx), null, 0.28)
        tl.fromTo(textEl,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.36, ease: 'power2.out' },
          0.32
        )
      }
    }

    fns.current = { goTo, startProgress }

    /* Posições iniciais */
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, STACK[getRole(i, 0)])
    })

    startProgress()
    return () => progressTween.current?.kill()
  }, [])

  function handleNav(dir) {
    const newIdx = (activeRef.current + dir + N) % N
    fns.current.goTo?.(newIdx, dir)
  }

  function handleDot(i) {
    const dir = i > activeRef.current ? 1 : -1
    fns.current.goTo?.(i, dir)
  }

  const slide = SLIDES[displayIdx]

  return (
    <section className="section section--light itg" id="plataforma">

      {/* Blobs de fundo */}
      <div className="itg__blobs" aria-hidden="true">
        <div ref={blob1Ref} className="itg__blob itg__blob--1" />
        <div ref={blob2Ref} className="itg__blob itg__blob--2" />
        <div ref={blob3Ref} className="itg__blob itg__blob--3" />
      </div>

      <div className="container">

        <div className="section__header">
          <span className="section__tag">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="2" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 9v2M8 9v2M3 11h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Plataforma Web
          </span>
          <h2 className="section__title">Uma solução completa para sua ótica</h2>
          <p className="section__subtitle">
            Tudo que você precisa para gerenciar sua ótica em um único sistema, acessível de qualquer dispositivo.
          </p>
        </div>

        {/* ── Showcase ── */}
        <div className="itg__showcase">

          <div className="itg__stack">
            {/*
              Spacer invisível — define a altura do container do stack.
              Todos os cards reais são position:absolute em cima dele.
            */}
            <div className="itg__spacer" aria-hidden="true">
              <div className="itg__chrome" />
              <div className="itg__screen" />
            </div>

            {/* Os 6 cards — GSAP gerencia suas posições */}
            {SLIDES.map((s, i) => (
              <div
                key={s.id}
                className="itg__card"
                ref={el => (cardRefs.current[i] = el)}
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
                      <path d="M1 5h8M5 1c-1 1.5-1.5 2.8-1.5 4s.5 2.5 1.5 4" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
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

          {/* Barra de progresso do auto-play */}
          <div className="itg__progress-track">
            <div
              className="itg__progress-fill"
              ref={progressRef}
              style={{ background: slide.color }}
            />
          </div>

          {/* Texto + controles */}
          <div className="itg__info" ref={textRef}>
            <div className="itg__info-text">
              <h3 className="itg__title">{slide.title}</h3>
              <p className="itg__subtitle">{slide.subtitle}</p>
            </div>

            <div className="itg__controls">
              <button
                className="itg__nav-btn"
                onClick={() => handleNav(-1)}
                aria-label="Anterior"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M9.5 3L5 7.5l4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="itg__dots">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    className={`itg__dot${i === active ? ' is-active' : ''}`}
                    onClick={() => handleDot(i)}
                    aria-label={`Slide ${i + 1}`}
                    style={i === active ? { background: SLIDES[active].color } : undefined}
                  />
                ))}
              </div>

              <button
                className="itg__nav-btn"
                onClick={() => handleNav(1)}
                aria-label="Próximo"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M5.5 3L10 7.5 5.5 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
