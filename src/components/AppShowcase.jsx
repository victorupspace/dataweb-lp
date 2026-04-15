import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SLIDES = [
  {
    tag: 'Caixa & Vendas',
    title: 'Acompanhe os caixas das lojas',
    description: 'Monitore em tempo real o movimento de caixa de todas as suas lojas, com alertas automáticos direto no seu smartphone.',
    accent: '#FBB040',
    num: '01',
  },
  {
    tag: 'Estoque',
    title: 'Gestão de estoque na palma da mão',
    description: 'Visualize níveis de estoque, receba alertas de ruptura e aprove transferências entre lojas de onde estiver.',
    accent: '#A6CE39',
    num: '02',
  },
  {
    tag: 'Analytics',
    title: 'BI e relatórios em tempo real',
    description: 'Dashboards com métricas de vendas, ticket médio e performance da equipe, atualizados ao vivo.',
    accent: '#00A0B1',
    num: '03',
  },
  {
    tag: 'CRM',
    title: 'CRM integrado ao ERP',
    description: 'Histórico completo de clientes, agendamentos, pedidos e acompanhamento pós-venda em um só lugar.',
    accent: '#FBB040',
    num: '04',
  },
]

const N = SLIDES.length

function getRole(i, activeIdx) {
  const dist = ((i - activeIdx) % N + N) % N
  if (dist === 0) return 'active'
  if (dist === 1) return 'next'
  if (dist === N - 1) return 'prev'
  return 'hidden'
}

function getRoleProps(role, dir = 1) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const offset = isMobile ? 145 : 220
  switch (role) {
    case 'active': return { x: 0,        scale: 1,    opacity: 1,   zIndex: 10 }
    case 'next':   return { x: offset,   scale: 0.77, opacity: 0.5, zIndex: 5  }
    case 'prev':   return { x: -offset,  scale: 0.77, opacity: 0.5, zIndex: 5  }
    default:       return { x: dir > 0 ? -700 : 700, scale: 0.65, opacity: 0, zIndex: 0 }
  }
}

function PhoneScreen({ slide }) {
  return (
    <div className="acs__placeholder" style={{ '--accent': slide.accent }}>
      <div className="acs__placeholder-icon">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="2" y="2" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
          <circle cx="14" cy="11" r="3.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
          <path d="M7 22c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      </div>
      <p className="acs__placeholder-text">Adicionar screenshot<br />dos App da Dataweb</p>
      <span className="acs__placeholder-num">{slide.num}</span>
    </div>
  )
}

export default function AppShowcase() {
  const [active, setActive]       = useState(0)
  const [displayIdx, setDisplayIdx] = useState(0)

  const phoneRefs    = useRef([])
  const textRef      = useRef(null)
  const progressRef  = useRef(null)
  const activeRef    = useRef(0)
  const animating    = useRef(false)
  const progressTween = useRef(null)
  const fns          = useRef({ goTo: null, startProgress: null })
  const headerRef    = useRef(null)
  const sectionRef   = useRef(null)

  useEffect(() => {
    function startProgress() {
      if (!progressRef.current) return
      progressTween.current?.kill()
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' })
      progressTween.current = gsap.to(progressRef.current, {
        scaleX: 1,
        duration: 3,
        ease: 'none',
        onComplete: () => fns.current.goTo((activeRef.current + 1) % N, 1),
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

      phoneRefs.current.forEach((el, i) => {
        if (!el) return
        const oldRole = getRole(i, oldIdx)
        const newRole = getRole(i, newIdx)

        if (oldRole === 'hidden' && newRole !== 'hidden') {
          gsap.set(el, { x: dir > 0 ? 700 : -700, opacity: 0, scale: 0.65, zIndex: 0 })
        }

        const target = getRoleProps(newRole, dir)
        tl.to(el, { ...target, duration: 0.6, ease: 'power3.inOut' }, 0)
      })

      const textEl = textRef.current
      if (textEl) {
        tl.to(textEl,    { opacity: 0, y: -16, duration: 0.22, ease: 'power2.in'  }, 0)
        tl.call(() => setDisplayIdx(newIdx), null, 0.25)
        tl.fromTo(textEl, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' }, 0.27)
      }
    }

    fns.current = { goTo, startProgress }

    /* ── Header split-word entrance ── */
    if (headerRef.current) {
      const words = headerRef.current.querySelectorAll('.acs__hword')
      const sub   = headerRef.current.querySelector('.acs__hsub')
      const tag   = headerRef.current.querySelector('.acs__htag')
      const line  = headerRef.current.querySelector('.acs__hline')

      gsap.set(tag,   { autoAlpha: 0, y: 10 })
      gsap.set(words, { autoAlpha: 0 })
      gsap.set(sub,   { autoAlpha: 0, y: 16 })
      gsap.set(line,  { autoAlpha: 1, scaleX: 0, transformOrigin: 'left center' })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter() {
          const tl = gsap.timeline()
          tl.to(tag, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0)
          tl.fromTo(words,
            { y: '105%', autoAlpha: 0 },
            { y: '0%', autoAlpha: 1, duration: 0.7, stagger: 0.06, ease: 'power4.out', clearProps: 'transform' },
            0.1
          )
          tl.to(line, { scaleX: 1, duration: 0.85, ease: 'power3.out', clearProps: 'transform' }, 0.35)
          tl.to(sub,  { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out', clearProps: 'transform' }, 0.45)
        },
      })
    }

    /* ── Phone setup ── */
    phoneRefs.current.forEach((el, i) => {
      if (!el) return
      const role = getRole(i, 0)
      if (role === 'hidden') {
        gsap.set(el, { x: i < 2 ? -700 : 700, scale: 0.65, opacity: 0, zIndex: 0 })
      } else {
        gsap.set(el, getRoleProps(role, 1))
      }
    })

    startProgress()
    return () => { progressTween.current?.kill() }
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
    <section className="section app-showcase section--light" id="about" ref={sectionRef}>
      <div className="container">

        {/* ── Header: left-aligned split-word with accent line ── */}
        <div className="acs__header" ref={headerRef}>
          <span className="section__tag acs__htag">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1" width="4" height="4" rx="1" fill="currentColor"/>
              <rect x="7" y="1" width="4" height="4" rx="1" fill="currentColor" opacity="0.5"/>
              <rect x="1" y="7" width="4" height="4" rx="1" fill="currentColor" opacity="0.5"/>
              <rect x="7" y="7" width="4" height="4" rx="1" fill="currentColor"/>
            </svg>
            Aplicativo
          </span>
          <h2 className="acs__htitle">
            {'Sua ótica na'.split(' ').map((w, i) => (
              <span key={i} className="acs__hword-wrap">
                <span className="acs__hword">{w}&nbsp;</span>
              </span>
            ))}
            <br/>
            {'palma da mão.'.split(' ').map((w, i) => (
              <span key={i} className="acs__hword-wrap">
                <span className="acs__hword">{w}&nbsp;</span>
              </span>
            ))}
          </h2>
          <div className="acs__hline" />
          <p className="acs__hsub">
            Monitore métricas de vendas, clientes e estoque em tempo real, direto do seu smartphone.
          </p>
        </div>

        <div className="acs__body">

          <div className="acs__visual">
            <div className="acs__deck">
              {SLIDES.map((s, i) => (
                <div
                  key={i}
                  className="acs__phone"
                  ref={el => (phoneRefs.current[i] = el)}
                >
                  <div className="acs__shell">
                    <div className="acs__notch" />
                    <div className="acs__screen">
                      <PhoneScreen slide={s} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="acs__progress-track">
              <div
                className="acs__progress-fill"
                ref={progressRef}
                style={{ background: SLIDES[active].accent }}
              />
            </div>
          </div>

          <div className="acs__info">
            <div className="acs__text" ref={textRef}>
              <span
                className="acs__tag"
                style={{ color: slide.accent }}
              >
                {slide.tag}
              </span>
              <h2 className="acs__title">{slide.title}</h2>
              <p className="acs__desc">{slide.description}</p>
            </div>

            <div className="acs__footer">
              <a href="#contato" className="btn btn--primary acs__cta">
                Fale com a gente
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <div className="acs__controls">
                <button className="acs__btn" onClick={() => handleNav(-1)} aria-label="Anterior">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className="acs__dots">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      className={`acs__dot${i === active ? ' is-active' : ''}`}
                      onClick={() => handleDot(i)}
                      aria-label={`Slide ${i + 1}`}
                      style={i === active ? { background: SLIDES[active].accent } : undefined}
                    />
                  ))}
                </div>

                <button className="acs__btn" onClick={() => handleNav(1)} aria-label="Próximo">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
