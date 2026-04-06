import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const metrics = [
  { value: '25+',    label: 'Anos no mercado' },
  { value: '100mi+', label: 'Transações/mês'   },
  { value: '5.000+', label: 'Clientes ativos'  },
  { value: '92%',    label: 'SLA de suporte'   },
]

const logos = ['Essilor.png', 'Zeiss.png', 'Diniz.png']
const tickerItems = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos]

/* Partículas geradas uma vez */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size:  2 + Math.random() * 3,
  x:     Math.random() * 100,
  y:     Math.random() * 100,
  dur:   8 + Math.random() * 16,
  delay: Math.random() * 12,
  drift: (Math.random() - 0.5) * 120,
}))

export default function Hero() {
  const metricRefs  = useRef([])
  const tickerRef   = useRef(null)
  const tween       = useRef(null)
  const heroRef     = useRef(null)
  const panelRef    = useRef(null)
  const titleRef    = useRef(null)
  const subtitleRef = useRef(null)
  const trustRef    = useRef(null)
  const actionsRef  = useRef(null)
  const eyebrowRef  = useRef(null)
  const hlValueRef  = useRef(null)
  const chartPathRef = useRef(null)

  const [panelHovered, setPanelHovered] = useState(false)

  /* ── Master entrance timeline ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      /* eyebrow pop */
      tl.fromTo(eyebrowRef.current,
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(2)' }
      )
      /* title lines stagger */
      .fromTo(titleRef.current?.querySelectorAll('.hero__title-line'),
        { y: 48, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out' },
        '-=0.25'
      )
      /* subtitle */
      .fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
      /* trust pills */
      .fromTo(trustRef.current?.querySelectorAll('.hero__trust-item, .hero__trust-sep'),
        { y: 12, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: 'back.out(1.7)' },
        '-=0.25'
      )
      /* CTA buttons */
      .fromTo(actionsRef.current?.querySelectorAll('a'),
        { y: 16, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.1, ease: 'back.out(2)' },
        '-=0.2'
      )
      /* panel slides in from right */
      .fromTo(panelRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.6'
      )

      /* chart path draw-on */
      setTimeout(() => {
        const path = chartPathRef.current
        if (!path) return
        const len = path.getTotalLength?.() || 180
        gsap.fromTo(path,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1.4, ease: 'power2.out', delay: 0.3 }
        )
      }, 800)

    }, heroRef)

    return () => ctx.revert()
  }, [])

  /* ── Metric counters ── */
  useEffect(() => {
    const targets = [25, 100, 5000, 92]
    const formats = [
      (n) => `${n}+`,
      (n) => `${n}mi+`,
      (n) => `${n.toLocaleString('pt-BR')}+`,
      (n) => `${n}%`,
    ]
    metricRefs.current.forEach((el, i) => {
      if (!el) return
      const obj = { val: 0 }
      gsap.to(obj, {
        val: targets[i],
        duration: 1.8,
        delay: 0.9 + i * 0.12,
        ease: 'power2.out',
        onUpdate() { el.textContent = formats[i](Math.round(obj.val)) },
      })
    })

    /* highlight +40% count-up */
    if (hlValueRef.current) {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: 40,
        duration: 1.6,
        delay: 1.0,
        ease: 'power2.out',
        onUpdate() {
          if (hlValueRef.current)
            hlValueRef.current.textContent = `+${Math.round(obj.val)}%`
        },
      })
    }
  }, [])

  /* ── Logo ticker ── */
  useEffect(() => {
    requestAnimationFrame(() => {
      const track = tickerRef.current
      if (!track) return
      const halfW = track.scrollWidth / 2
      tween.current = gsap.to(track, {
        x: -halfW,
        duration: 24,
        ease: 'none',
        repeat: -1,
        onRepeat() { gsap.set(track, { x: 0 }) },
      })
    })
    return () => { tween.current?.kill() }
  }, [])

  /* ── Panel tilt on mouse move ── */
  const handlePanelMove = (e) => {
    if (!panelRef.current) return
    const rect = panelRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top  + rect.height / 2
    const rx = ((e.clientY - cy) / rect.height) * 6
    const ry = ((e.clientX - cx) / rect.width)  * -6
    gsap.to(panelRef.current, {
      rotateX: rx, rotateY: ry,
      transformPerspective: 900,
      duration: 0.5, ease: 'power2.out',
    })
  }
  const handlePanelLeave = () => {
    gsap.to(panelRef.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.7, ease: 'elastic.out(1, 0.4)',
    })
    setPanelHovered(false)
  }

  /* ── Button ripple ── */
  const handleBtnClick = (e) => {
    const btn = e.currentTarget
    const ripple = document.createElement('span')
    const rect = btn.getBoundingClientRect()
    ripple.className = 'btn-ripple'
    ripple.style.left = `${e.clientX - rect.left}px`
    ripple.style.top  = `${e.clientY - rect.top}px`
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  }

  return (
    <section className="hero" id="hero" ref={heroRef}>

      {/* ── Background video ── */}
      <div className="hero__bg">
        <video className="hero__video" autoPlay loop muted playsInline>
          <source src="/assets/rocket04.mov" type="video/mp4" />
        </video>
        <div className="hero__overlay" />
      </div>

      {/* ── Floating particles ── */}
      <div className="hero__particles" aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="hero__particle"
            style={{
              width:  p.size,
              height: p.size,
              left:   `${p.x}%`,
              top:    `${p.y}%`,
              animationDuration:  `${p.dur}s`,
              animationDelay:     `-${p.delay}s`,
              '--drift': `${p.drift}px`,
            }}
          />
        ))}
      </div>

      {/* ── Main two-column layout ── */}
      <div className="container hero__container">

        {/* Left — copy */}
        <div className="hero__left">

          <div className="hero__eyebrow" ref={eyebrowRef}>
            <span className="hero__eyebrow-dot" />
            Plataforma líder para o setor óptico
          </div>

          <h1 className="hero__title" ref={titleRef}>
            <span className="hero__title-line">Tecnologia que</span>
            <span className="hero__title-line">conecta todo o</span>
            <span className="hero__title-line">
              <span className="hero__title-accent">universo óptico</span>
            </span>
          </h1>

          <p className="hero__subtitle" ref={subtitleRef}>
            Ecossistema ERP + CRM + BI + Apps + gestão completa
            para óticas e laboratórios ópticos.
          </p>

          <div className="hero__trust" ref={trustRef}>
            <span className="hero__trust-item">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="6.5" stroke="#4ade80" strokeWidth="1.2"/>
                <path d="M4.5 7.5l2 2 4-4" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Secure Cloud
            </span>
            <span className="hero__trust-sep" />
            <span className="hero__trust-item">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="6.5" stroke="#4ade80" strokeWidth="1.2"/>
                <path d="M4.5 7.5l2 2 4-4" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Suporte SLA 92%
            </span>
            <span className="hero__trust-sep" />
            <span className="hero__trust-item">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="6.5" stroke="#4ade80" strokeWidth="1.2"/>
                <path d="M4.5 7.5l2 2 4-4" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Migração garantida
            </span>
          </div>

          <div className="hero__actions" ref={actionsRef}>
            <a
              href="#sou-loja"
              className="btn btn--hero-white"
              onClick={handleBtnClick}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 6l1-3.5h9L13 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.5 6h12v6.5a1 1 0 01-1 1h-10a1 1 0 01-1-1V6z" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M5.5 13.5v-3.5h4v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sou loja
            </a>
            <a
              href="#sou-laboratorio"
              className="btn btn--hero-ghost"
              onClick={handleBtnClick}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M1 13.5V7l3.5-2.5V7L8 4.5V7l3.5-2.5v9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 13.5h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <rect x="5.5" y="10" width="2" height="3.5" rx="0.4" stroke="currentColor" strokeWidth="1.1"/>
                <rect x="9" y="9" width="2.5" height="1.5" rx="0.4" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M12 2v2.5M13.5 3.5H10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Sou laboratório
            </a>
          </div>
        </div>

        {/* Right — metrics panel */}
        <div
          className={`hero__panel${panelHovered ? ' hero__panel--hovered' : ''}`}
          ref={panelRef}
          onMouseMove={handlePanelMove}
          onMouseEnter={() => setPanelHovered(true)}
          onMouseLeave={handlePanelLeave}
          aria-hidden="true"
        >
          {/* Panel header */}
          <div className="hero__panel-header">
            <div className="hero__panel-badge">
              <span className="hero__panel-badge-dot" />
              Resultados em tempo real
            </div>
            <div className="hero__panel-dots">
              <span /><span /><span />
            </div>
          </div>

          {/* KPI highlight */}
          <div className="hero__panel-highlight">
            <div className="hero__panel-hl-left">
              <span className="hero__panel-hl-label">Crescimento médio pós-implantação</span>
              <span className="hero__panel-hl-value" ref={hlValueRef}>+0%</span>
              <span className="hero__panel-hl-sub">no faturamento dos clientes</span>
            </div>
            <div className="hero__panel-hl-chart" aria-hidden="true">
              <svg viewBox="0 0 90 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="90" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF9C4B"/>
                    <stop offset="100%" stopColor="#f5c518"/>
                  </linearGradient>
                  <linearGradient id="ag" x1="0" y1="0" x2="0" y2="50" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF9C4B" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#FF9C4B" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* area fill */}
                <polygon
                  points="0,46 18,36 36,38 54,22 72,12 90,4 90,50 0,50"
                  fill="url(#ag)"
                />
                {/* line */}
                <polyline
                  ref={chartPathRef}
                  points="0,46 18,36 36,38 54,22 72,12 90,4"
                  stroke="url(#cg)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* endpoint glow dot */}
                <circle cx="90" cy="4" r="3.5" fill="#f5c518">
                  <animate attributeName="r" values="3.5;5;3.5" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
          </div>

          {/* 2×2 metrics */}
          <div className="hero__panel-grid">
            {metrics.map((m, i) => (
              <div className="hero__panel-metric" key={i}>
                <span
                  className="hero__panel-metric-value"
                  ref={(el) => (metricRefs.current[i] = el)}
                >
                  {m.value}
                </span>
                <span className="hero__panel-metric-label">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="hero__panel-footer">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#4ade80" strokeWidth="1.1"/>
              <path d="M4 7l2 2 4-4" stroke="#4ade80" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Migração de dados 100% segura e garantida
          </div>
        </div>

      </div>

      {/* ── Logo ticker ── */}
      <div className="hero__ticker-bar" aria-hidden="true">
        <span className="hero__ticker-label">Parceiros de referência</span>
        <div className="hero__ticker-viewport">
          <div className="hero__ticker-track" ref={tickerRef}>
            {tickerItems.map((file, i) => (
              <div className="hero__ticker-item" key={i}>
                <img
                  src={`/assets/logos/${file}`}
                  alt={file.replace('.png', '')}
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
