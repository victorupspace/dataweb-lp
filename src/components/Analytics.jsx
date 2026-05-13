import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Analytics.css'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────
   Cards
───────────────────────────────────────────────────────── */
const CARDS = [
  {
    id: 0,
    pos: 'tl',
    color: '#f5c518',
    icon: 'pie',
    title: 'Análise de vendas por segmento e marca',
    desc: 'Descubra quais categorias de produtos mais vendem e onde concentrar seu estoque.',
    video: '/assets/cosmovideo.mp4',
  },
  {
    id: 1,
    pos: 'tr',
    color: '#6C63FF',
    icon: 'bar',
    title: 'Vendas por vendedor, médico',
    desc: 'Entenda quais marcas geram mais faturamento e margem para o seu negócio.',
    video: '/assets/herovideo.mp4',
  },
  {
    id: 2,
    pos: 'bl',
    color: '#00B4D8',
    icon: 'trending',
    title: 'Análise financeira por forma de pagamento, plano de contas e muito mais',
    desc: 'Tenha visão clara da saúde financeira com contas a pagar e receber em tempo real.',
    video: '/assets/starvideo.mp4',
  },
  {
    id: 3,
    pos: 'br',
    color: '#A6CE39',
    icon: 'target',
    title: 'Metas por empresa, segmento e marca',
    desc: 'Acompanhe metas por empresa, segmento, marca e vendedor com alertas inteligentes.',
    video: '/assets/cosmovideo.mp4',
  },
]

/* ─────────────────────────────────────────────────────────
   Icons
───────────────────────────────────────────────────────── */
function CardIcon({ name, color }) {
  const s = { width: 20, height: 20, fill: 'none', viewBox: '0 0 16 16' }
  switch (name) {
    case 'pie':
      return (
        <svg {...s}>
          <path d="M8 2a6 6 0 100 12A6 6 0 008 2z" stroke={color} strokeWidth="1.4"/>
          <path d="M8 2v6l4.24 2.45" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      )
    case 'bar':
      return (
        <svg {...s}>
          <rect x="1" y="4.5"  width="5"  height="2" rx="0.8" fill={color} opacity="0.9"/>
          <rect x="1" y="7.5"  width="10" height="2" rx="0.8" fill={color} opacity="0.9"/>
          <rect x="1" y="10.5" width="7"  height="2" rx="0.8" fill={color} opacity="0.9"/>
        </svg>
      )
    case 'trending':
      return (
        <svg {...s}>
          <polyline points="1,13 5,8 8,10 12,4 15,4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="12,4 15,4 15,7"          stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'target':
      return (
        <svg {...s}>
          <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.4"/>
          <circle cx="8" cy="8" r="3.5" stroke={color} strokeWidth="1.4"/>
          <circle cx="8" cy="8" r="1"   fill={color}/>
        </svg>
      )
    default: return null
  }
}

/* ─────────────────────────────────────────────────────────
   Main
───────────────────────────────────────────────────────── */
export default function Analytics() {
  const [activeCard, setActiveCard] = useState(0)
  const isAnimating = useRef(false)

  const sectionRef  = useRef(null)
  const headerRef   = useRef(null)
  const stageRef    = useRef(null)
  const videoRef    = useRef(null)
  const captionRef  = useRef(null)
  const cardRefs    = useRef([])
  const ring1Ref    = useRef(null)
  const ring2Ref    = useRef(null)
  const ring3Ref    = useRef(null)

  const active = CARDS[activeCard]


  /* ── ScrollTrigger entry ── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Header: tag fade + title split + stats counter ── */
      if (headerRef.current) {
        const tag    = headerRef.current.querySelector('.ana__htag')
        const titleL = headerRef.current.querySelector('.ana__htitle-left')
        const titleR = headerRef.current.querySelector('.ana__htitle-right')
        const sub    = headerRef.current.querySelector('.ana__hsub')
        const stats  = headerRef.current.querySelectorAll('.ana__hstat')
        const divider = headerRef.current.querySelector('.ana__hdivider')

        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        })

        tl.fromTo(tag,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' },
          0
        )
        tl.fromTo(titleL,
          { autoAlpha: 0, x: -50 },
          { autoAlpha: 1, x: 0, duration: 0.75, ease: 'power4.out', clearProps: 'transform' },
          0.1
        )
        tl.fromTo(titleR,
          { autoAlpha: 0, x: 50 },
          { autoAlpha: 1, x: 0, duration: 0.75, ease: 'power4.out', clearProps: 'transform' },
          0.1
        )
        tl.fromTo(divider,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'power3.out', clearProps: 'transform' },
          0.35
        )
        tl.fromTo(sub,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out', clearProps: 'transform' },
          0.45
        )

        /* Stats: number count-up */
        stats.forEach((el, i) => {
          const target = parseFloat(el.dataset.target ?? '0')
          const isInt  = Number.isInteger(target)
          const proxy  = { val: 0 }
          tl.fromTo(el,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform' },
            0.5 + i * 0.1
          )
          tl.to(proxy,
            {
              val: target,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate() {
                const num = el.querySelector('.ana__hstat-num')
                if (num) num.textContent = isInt
                  ? Math.round(proxy.val).toLocaleString('pt-BR')
                  : proxy.val.toFixed(1)
              },
            },
            0.55 + i * 0.1
          )
        })
      }

      /* Rings expand */
      gsap.from([ring1Ref.current, ring2Ref.current, ring3Ref.current], {
        scale: 0.5, opacity: 0, duration: 1.4, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true },
      })

      /* Center video */
      gsap.fromTo(videoRef.current?.closest('.ana__center'),
        { scale: 0.9, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.75, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 66%', once: true },
        }
      )

      /* Cards stagger */
      gsap.fromTo(cardRefs.current,
        { scale: 0.88, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 64%', once: true },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, []) // eslint-disable-line

  /* ── Handle card click ── */
  function handleCardClick(idx) {
    if (isAnimating.current || idx === activeCard) return
    isAnimating.current = true

    setActiveCard(idx)
    setTimeout(() => { isAnimating.current = false }, 400)

    const cardEl = cardRefs.current[idx]
    if (cardEl) {
      gsap.fromTo(cardEl,
        { scale: 0.97 },
        { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.4)', clearProps: 'transform' },
      )
    }

    if (captionRef.current) {
      gsap.fromTo(captionRef.current,
        { y: 5, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', delay: 0.1 },
      )
    }
  }


  return (
    <section className="section section--light ana" id="analytics" ref={sectionRef}>

      {/* ── Background blobs ── */}
      <div className="ana__blobs" aria-hidden="true">
        <div className="ana__blob ana__blob--1"/>
        <div className="ana__blob ana__blob--2"/>
        <div className="ana__blob ana__blob--3"/>
      </div>
      <div className="ana__grid-overlay" aria-hidden="true"/>

      {/* Decorative corner gradients */}
      <div className="ana__corner ana__corner--tl" aria-hidden="true"/>
      <div className="ana__corner ana__corner--br" aria-hidden="true"/>

      {/* Brand stripes */}
      <div className="ana__stripe ana__stripe--1" aria-hidden="true"/>
      <div className="ana__stripe ana__stripe--2" aria-hidden="true"/>
      <div className="ana__stripe ana__stripe--3" aria-hidden="true"/>
      <div className="ana__stripe ana__stripe--4" aria-hidden="true"/>

      <div className="container">

        {/* ── Header: split title + stats counter ── */}
        <div className="ana__header" ref={headerRef}>

          {/* Tag */}
          <span className="section__tag ana__tag ana__htag">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1"    y="6"   width="2.5" height="5"   rx="0.8" fill="currentColor" opacity="0.6"/>
              <rect x="4.75" y="3.5" width="2.5" height="7.5" rx="0.8" fill="currentColor" opacity="0.8"/>
              <rect x="8.5"  y="1"   width="2.5" height="10"  rx="0.8" fill="currentColor"/>
            </svg>
            BI & Analytics
          </span>

          {/* Split title */}
          <div className="ana__htitle-row">
            <h2 className="ana__htitle-left">
              Enxergue o universo<br/>
              do seu <span className="ana__title-accent">negócio.</span>
            </h2>
            <div className="ana__htitle-right">
              <p className="ana__hsub">
                Transforme dados da sua ótica em informações estratégicas.
                Interaja com cada módulo e veja a plataforma em ação.
              </p>
              <a href="#plataforma" className="ana__hsub-cta">
                Ver plataforma completa
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="ana__hdivider" />

          {/* Stats row */}
          <div className="ana__hstats">
            {[
              { target: 340, suffix: '%', label: 'mais visibilidade' },
              { target: 2.5, suffix: '×',  label: 'mais conversão' },
              { target: 98,  suffix: '%', label: 'satisfação dos clientes' },
            ].map((s, i) => (
              <div key={i} className="ana__hstat" data-target={s.target}>
                <div className="ana__hstat-value-row">
                  <span className="ana__hstat-num">0</span>
                  <span className="ana__hstat-suffix">{s.suffix}</span>
                </div>
                <span className="ana__hstat-label">{s.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* ── Orbital stage ── */}
        <div className="ana__stage" ref={stageRef}>

          {/* Decorative rings */}
          <div className="ana__rings" aria-hidden="true">
            <div className="ana__ring ana__ring--1" ref={ring1Ref}/>
            <div className="ana__ring ana__ring--2" ref={ring2Ref}/>
            <div className="ana__ring ana__ring--3" ref={ring3Ref}/>
          </div>

          {/* Connector lines SVG */}
          <svg className="ana__connectors" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            {/* tl → center */}
            <line x1="240" y1="160" x2="500" y2="320"
              className="ana__connector-line"
              stroke={CARDS[0].color} strokeWidth="1.5"
              style={{ animationDelay: '0s' }}
            />
            {/* tr → center */}
            <line x1="760" y1="160" x2="500" y2="320"
              className="ana__connector-line"
              stroke={CARDS[1].color} strokeWidth="1.5"
              style={{ animationDelay: '-1s' }}
            />
            {/* bl → center */}
            <line x1="240" y1="480" x2="500" y2="320"
              className="ana__connector-line"
              stroke={CARDS[2].color} strokeWidth="1.5"
              style={{ animationDelay: '-2s' }}
            />
            {/* br → center */}
            <line x1="760" y1="480" x2="500" y2="320"
              className="ana__connector-line"
              stroke={CARDS[3].color} strokeWidth="1.5"
              style={{ animationDelay: '-3s' }}
            />
          </svg>

          {/* Feature cards */}
          <div className="ana__cards">
            {CARDS.map((card, i) => (
              <div
                key={card.id}
                ref={el => (cardRefs.current[i] = el)}
                className={`ana__card ana__card--${card.pos}${activeCard === i ? ' is-active' : ''}`}
                style={{ '--cc': card.color }}
                onClick={() => handleCardClick(i)}
              >
                <div className="ana__card-strip"/>
                <div className="ana__card-connector"/>
                <div
                  className="ana__card-icon"
                  style={{ background: `${card.color}18` }}
                >
                  <CardIcon name={card.icon} color={card.color}/>
                </div>
                <p className="ana__card-title">{card.title}</p>
                <p className="ana__card-desc">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Center: video */}
          <div className="ana__center">
            <div className="ana__video-frame">
              {/* Browser chrome */}
              <div className="ana__video-chrome">
                <div className="ana__video-chrome-dots">
                  <span className="ana__vdot ana__vdot--r"/>
                  <span className="ana__vdot ana__vdot--y"/>
                  <span className="ana__vdot ana__vdot--g"/>
                </div>
                <div className="ana__video-chrome-bar">
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                    <path d="M1 5h8M5 1c-1 1.5-1.5 2.8-1.5 4s.5 2.5 1.5 4" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
                  </svg>
                  analytics.dataweb.com.br
                </div>
                <div className="ana__video-chrome-actions">
                  <span/><span/><span/>
                </div>
              </div>

              {/* Videos empilhados — crossfade por opacity, sem trocar src */}
              <div className="ana__video-stack">
                {CARDS.map((card, i) => (
                  <video
                    key={card.id}
                    ref={i === 0 ? videoRef : null}
                    className="ana__video"
                    src={card.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      opacity: activeCard === i ? 1 : 0,
                      transition: 'opacity 0.35s ease',
                      position: i === 0 ? 'relative' : 'absolute',
                      inset: 0,
                    }}
                  />
                ))}
              </div>

              {/* Play overlay */}
              <div className="ana__video-overlay">
                <div className="ana__video-play">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M5 3.5l11 5.5-11 5.5V3.5z" fill="#0a0a0a"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="ana__video-caption" ref={captionRef}>
              <span className="ana__video-caption-dot"/>
              {active.title}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
