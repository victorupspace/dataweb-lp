import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/CRM.css'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    id: 'whatsapp',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 6L0 24l6.18-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52z" fill="currentColor" opacity="0.2"/>
        <path d="M17.47 14.38c-.28-.14-1.66-.82-1.92-.91-.25-.09-.44-.14-.62.14-.18.28-.71.91-.87 1.1-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.06-.22-.54-.45-.47-.62-.48-.16-.01-.35-.01-.53-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.94 4.67 4.13.65.28 1.16.45 1.56.57.65.21 1.25.18 1.72.11.52-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.25-.18-.53-.32z" fill="currentColor"/>
      </svg>
    ),
    title: 'Mensagens via WhatsApp',
    desc: 'Dispare mensagens automáticas diretamente pelo sistema — sem app externo, sem cópia manual.',
    color: '#00A0B1',
    stat: '3×',
    statLabel: 'mais retorno',
  },
  {
    id: 'birthday',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="9" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M3 14h18" stroke="currentColor" strokeWidth="1.3" opacity="0.35"/>
        <path d="M8 9V7M12 9V7M16 9V7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M10 5c0-1.1 2-2.5 2-4 0 1.5 2 2.9 2 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.55"/>
      </svg>
    ),
    title: 'Aniversariantes do dia',
    desc: 'O sistema identifica e aciona automaticamente clientes no dia do aniversário com mensagem personalizada.',
    color: '#FBB040',
    stat: '+89%',
    statLabel: 'satisfação',
  },
  {
    id: 'inadimplencia',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="8" y1="3.5" x2="16" y2="3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.35"/>
      </svg>
    ),
    title: 'Controle de inadimplência',
    desc: 'Visualize rapidamente quem está em atraso e acione réguas de cobrança com um clique.',
    color: '#F8473A',
    stat: '−70%',
    statLabel: 'inadimplência',
  },
  {
    id: 'campanhas',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M22 7L12 13 2 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7"/>
        <circle cx="18.5" cy="17.5" r="3.5" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M17 17.5l1 1 2-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Campanhas inteligentes',
    desc: 'Segmente sua base e reative clientes inativos com campanhas automáticas de reengajamento.',
    color: '#A6CE39',
    stat: '+120%',
    statLabel: 'reativação',
  },
]

const CRM_ROWS = [
  { name: 'Maria Souza',    tag: 'Aniversário',  tagColor: '#FBB040', action: 'Mensagem enviada', status: 'success', ago: 'agora' },
  { name: 'João Pereira',   tag: 'Inadimplente', tagColor: '#F8473A', action: 'Cobrança gerada',  status: 'warn',    ago: '2min' },
  { name: 'Ana Lima',       tag: 'Inativo 90d',  tagColor: '#A6CE39', action: 'Campanha ativa',   status: 'success', ago: '5min' },
  { name: 'Carlos Mendes',  tag: 'WhatsApp',     tagColor: '#00A0B1', action: 'Entregue',         status: 'success', ago: '8min' },
  { name: 'Fernanda Gomes', tag: 'Aniversário',  tagColor: '#FBB040', action: 'Agendado 14h',     status: 'pending', ago: '12min' },
]

const STATS = [
  { value: 2,     suffix: '×',   label: 'retenção' },
  { value: 67,    suffix: '%',   label: 'conversão', prefix: '+' },
  { value: 100,   suffix: '%',   label: 'automático' },
]

function StatusDot({ type }) {
  const map = { success: '#009680', warn: '#FBB040', pending: '#00A0B1' }
  return <span className="crm__row-dot" style={{ '--dc': map[type] }} />
}

export default function CRM() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [visibleRows,   setVisibleRows]   = useState(0)
  const rowTimer = useRef(null)

  const sectionRef   = useRef(null)
  const blobRef      = useRef(null)   // parallax blob
  const tagRef       = useRef(null)
  const eyebrowRef   = useRef(null)
  const titleLineRefs = useRef([])    // per-word spans
  const dividerRef   = useRef(null)
  const subRef       = useRef(null)
  const statEls      = useRef([])     // stat number spans
  const mockWrapRef  = useRef(null)
  const featureRefs  = useRef([])
  const impactRef    = useRef(null)

  function playRows() {
    setVisibleRows(0)
    clearTimeout(rowTimer.current)
    let i = 0
    function next() {
      i += 1
      setVisibleRows(i)
      if (i < CRM_ROWS.length) rowTimer.current = setTimeout(next, 380)
    }
    rowTimer.current = setTimeout(next, 240)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Parallax blob — move suave enquanto a seção rola ── */
      gsap.to(blobRef.current, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      })

      /* ── 2. Entrada do header — palavra a palavra ── */
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      headerTl
        .fromTo(tagRef.current,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' })

        .fromTo(eyebrowRef.current,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.2')

        /* palavras do título entram em stagger */
        .fromTo(titleLineRefs.current,
          { autoAlpha: 0, y: 52, skewY: 3 },
          {
            autoAlpha: 1, y: 0, skewY: 0,
            duration: 0.7, stagger: 0.08,
            ease: 'power4.out',
            clearProps: 'transform',
          }, '-=0.15')

        .fromTo(dividerRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.9, ease: 'expo.out', clearProps: 'transform' }, '-=0.3')

        .fromTo(subRef.current,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out', clearProps: 'transform' }, '-=0.5')

      /* ── 3. Counters nos stats ── */
      STATS.forEach((s, i) => {
        const el = statEls.current[i]
        if (!el) return
        const obj = { n: 0 }
        gsap.fromTo(obj,
          { n: 0 },
          {
            n: s.value,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate() {
              el.textContent = (s.prefix || '') + Math.round(obj.n) + s.suffix
            },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
              once: true,
            },
            delay: 0.3 + i * 0.12,
          })
      })

      /* ── 4. Mock: entrada com perspectiva + sticky parallax ── */
      gsap.fromTo(mockWrapRef.current,
        { autoAlpha: 0, y: 72, rotateX: 8, transformOrigin: 'top center' },
        {
          autoAlpha: 1, y: 0, rotateX: 0,
          duration: 1, ease: 'power4.out',
          clearProps: 'transform',
          onComplete: playRows,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            once: true,
          },
        })

      /* parallax vertical no mock enquanto rola */
      gsap.to(mockWrapRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })

      /* ── 5. Feature cards — entrada em cascata da direita ── */
      gsap.fromTo(featureRefs.current,
        { autoAlpha: 0, x: 48 },
        {
          autoAlpha: 1, x: 0,
          duration: 0.65, stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          },
        })

      /* ── 6. Impact banner — scrub revela enquanto chega à viewport ── */
      gsap.fromTo(impactRef.current,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1, y: 0,
          duration: 0.8, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: impactRef.current,
            start: 'top 85%',
            once: true,
          },
        })

    }, sectionRef)

    return () => {
      ctx.revert()
      clearTimeout(rowTimer.current)
    }
  }, [])

  function handleFeature(i) {
    if (i === activeFeature) return
    setActiveFeature(i)
    const el = featureRefs.current[i]
    if (el) gsap.fromTo(el,
      { scale: 0.97 },
      { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.45)', clearProps: 'transform' })
  }

  const active = FEATURES[activeFeature]

  /* título partido em spans para animação por palavra */
  const titleWords = ['Cada', 'cliente,', 'no', 'momento', 'certo.']

  return (
    <section className="crm" id="crm" ref={sectionRef}>

      {/* ── Background ── */}
      <div className="crm__bg" aria-hidden="true">
        <div className="crm__blob crm__blob--main" ref={blobRef} />
        <div className="crm__blob crm__blob--accent" />
        <div className="crm__noise" />
        <div className="crm__grid" />
      </div>
      <div className="crm__vignette"   aria-hidden="true" />
      <div className="crm__top-line"   aria-hidden="true" />
      <div className="crm__bottom-line" aria-hidden="true" />

      <div className="container">

        {/* ════ HEADER ════ */}
        <div className="crm__header">

          <span className="crm__tag" ref={tagRef}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2.2"/>
              <path d="M2 21c0-4 3-7 7-7s7 3 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M16 3.5a4 4 0 010 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.55"/>
              <path d="M19.5 14c1.8.9 3 2.6 3 5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.55"/>
            </svg>
            CRM &amp; Relacionamento
          </span>

          <p className="crm__eyebrow" ref={eyebrowRef}>
            Automação de relacionamento
          </p>

          <h2 className="crm__title">
            {titleWords.map((w, i) => (
              <span
                key={i}
                className="crm__title-word"
                ref={el => (titleLineRefs.current[i] = el)}
              >
                {w}{' '}
              </span>
            ))}
          </h2>

          <div className="crm__hdivider" ref={dividerRef} />

          <div className="crm__htitle-row">
            <p className="crm__sub" ref={subRef}>
              O CRM Dataweb é uma plataforma&nbsp;<strong>100% web</strong> que automatiza o relacionamento
              da sua ótica — do aniversário do cliente à régua de cobrança — sem nenhum esforço manual.
            </p>

            <div className="crm__hstats">
              {STATS.map((s, i) => (
                <div key={i} className="crm__hstat">
                  <span
                    className="crm__hstat-value"
                    ref={el => (statEls.current[i] = el)}
                  >
                    {s.prefix || ''}{s.value}{s.suffix}
                  </span>
                  <span className="crm__hstat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ════ BODY ════ */}
        <div className="crm__body">

          {/* ── CRM dashboard mock ── */}
          <div className="crm__mock-wrap" ref={mockWrapRef}>
            <div className="crm__mock">

              <div className="crm__mock-chrome">
                <div className="crm__mock-dots">
                  <span className="crm__dot crm__dot--r"/>
                  <span className="crm__dot crm__dot--y"/>
                  <span className="crm__dot crm__dot--g"/>
                </div>
                <div className="crm__mock-url">
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                    <path d="M1 5h8M5 1c-1 1.5-1.5 2.8-1.5 4s.5 2.5 1.5 4" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
                  </svg>
                  crm.dataweb.com.br
                </div>
                <div className="crm__mock-actions"><span/><span/><span/></div>
              </div>

              <div className="crm__mock-inner">
                <nav className="crm__sidebar">
                  <div className="crm__sidebar-logo">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="9" cy="7" r="4" stroke="#0891A8" strokeWidth="1.8"/>
                      <path d="M2 21c0-4 3-7 7-7s7 3 7 7" stroke="#0891A8" strokeWidth="1.8" strokeLinecap="round"/>
                      <path d="M16 3.5a4 4 0 010 7" stroke="#0891A8" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
                    </svg>
                  </div>
                  {['Painel','Clientes','Campanhas','Cobranças','Config'].map((item, i) => (
                    <span key={item} className={`crm__sidebar-item${i === 0 ? ' is-active' : ''}`}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        {i === 0 && <><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/></>}
                        {i === 1 && <><circle cx="8" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M2 14c0-3.3 2.7-5 6-5s6 1.7 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></>}
                        {i === 2 && <><path d="M14 4L8 9 2 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/></>}
                        {i === 3 && <><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 4.5v3.8l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></>}
                        {i === 4 && <><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4"/><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2.5"/></>}
                      </svg>
                      {item}
                    </span>
                  ))}
                </nav>

                <div className="crm__panel">
                  <div className="crm__panel-top">
                    <div>
                      <p className="crm__panel-title">Painel de Clientes</p>
                      <p className="crm__panel-subtitle">Automações ativas hoje</p>
                    </div>
                    <div className="crm__panel-badge">
                      <span className="crm__panel-badge-dot"/>
                      {CRM_ROWS.length} ações
                    </div>
                  </div>

                  <div className="crm__table-head">
                    <span>Cliente</span>
                    <span>Tipo</span>
                    <span>Ação</span>
                    <span>Status</span>
                  </div>

                  <div className="crm__table-body">
                    {CRM_ROWS.map((row, i) => (
                      <div
                        key={i}
                        className={`crm__row${i < visibleRows ? ' is-visible' : ''}`}
                        style={{ transitionDelay: `${i * 0.05}s` }}
                      >
                        <span className="crm__row-name">{row.name}</span>
                        <span className="crm__row-tag" style={{ '--tc': row.tagColor }}>{row.tag}</span>
                        <span className="crm__row-action">{row.action}</span>
                        <span className="crm__row-status">
                          <StatusDot type={row.status}/>
                          {row.ago}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="crm__panel-footer">
                    <span className="crm__footer-live">
                      <span className="crm__footer-dot"/>
                      Automação rodando
                    </span>
                    <span className="crm__footer-next">Próxima ação: 2min</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="crm__mock-glow" aria-hidden="true"
              style={{ '--gc': active.color }} />
          </div>

          {/* ── Feature list ── */}
          <div className="crm__features">
            {FEATURES.map((f, i) => (
              <button
                key={f.id}
                ref={el => (featureRefs.current[i] = el)}
                className={`crm__feature${activeFeature === i ? ' is-active' : ''}`}
                style={{ '--fc': f.color }}
                onClick={() => handleFeature(i)}
                aria-pressed={activeFeature === i}
              >
                <div className="crm__feature-strip" />
                <div className="crm__feature-icon">{f.icon}</div>
                <div className="crm__feature-body">
                  <p className="crm__feature-title">{f.title}</p>
                  <p className="crm__feature-desc">{f.desc}</p>
                </div>
                <div className="crm__feature-stat">
                  <span className="crm__feature-stat-value">{f.stat}</span>
                  <span className="crm__feature-stat-label">{f.statLabel}</span>
                </div>
                <div className="crm__feature-arrow">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>

        </div>

        {/* ════ IMPACT ════ */}
        <div className="crm__impact" ref={impactRef}>
          <div className="crm__impact-inner">
            <svg className="crm__impact-icon" width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
            <div className="crm__impact-text">
              <p className="crm__impact-quote">Relacionamento gera vendas.</p>
              <p className="crm__impact-sub">
                Com o CRM Dataweb, sua ótica mantém contato com os clientes no momento certo —
                e transforma cada interação em uma oportunidade real.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
