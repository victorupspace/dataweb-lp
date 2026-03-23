import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const stats = [
  { value: '25+',    label: 'Anos no mercado' },
  { value: '100mi+', label: 'Transações/mês' },
  { value: '5.000+', label: 'Clientes implantados' },
]

const logos = ['Essilor.png', 'Zeiss.png', 'Diniz.png']

/* Duplicate enough for a seamless loop */
const tickerItems = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos]

export default function Hero() {
  const statsRef  = useRef([])
  const tickerRef = useRef(null)
  const tween     = useRef(null)

  useEffect(() => {
    /* ── stats counters ── */
    const targets = [25, 100, 5000]
    const formats = [
      (n) => `${n}+`,
      (n) => `${n}mi+`,
      (n) => `${n.toLocaleString('pt-BR')}+`,
    ]
    statsRef.current.forEach((el, i) => {
      if (!el) return
      const obj = { val: 0 }
      gsap.to(obj, {
        val: targets[i],
        duration: 1.8,
        delay: 0.9 + i * 0.1,
        ease: 'power2.out',
        onUpdate() { el.textContent = formats[i](Math.round(obj.val)) },
      })
    })

    /* ── horizontal ticker ── */
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

  return (
    <section className="hero" id="hero">

      <div className="hero__bg">
        <video className="hero__video" autoPlay loop muted playsInline>
          <source src="/assets/testvideo01.mp4" type="video/mp4" />
        </video>
        <div className="hero__overlay" />
      </div>

      <div className="container hero__container">
        <div className="hero__content">

          {/* ── Horizontal logo ticker — before title ── */}
          <div className="hero__ticker" aria-hidden="true">
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

          <h1 className="hero__title">
            Tecnologia que conecta<br />
            todo o universo óptico
          </h1>

          <p className="hero__subtitle">
            Ecossistema ERP + CRM + BI + Apps + gestão completa<br />
            para óticas e laboratórios ópticos.
          </p>

          <div className="hero__features">
            <span className="hero__feature" data-tooltip="Infraestrutura segura em nuvem com alta disponibilidade">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: '#FF9C4B' }}>
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Secure Cloud Infrastructure
            </span>
            <span className="hero__feature" data-tooltip="Acerto no tempo previsto no atendimento ao cliente">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: '#FF9C4B' }}>
                <rect x="1" y="3" width="12" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M4 3V2a1 1 0 011-1h4a1 1 0 011 1v1M7 7.5V8.5M4.5 7.5h5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              Suporte SLA 92%
            </span>
            <span className="hero__feature" data-tooltip="Nosso processo garante que 100% dos seus dados sejam migrados com segurança: clientes, produtos, histórico de vendas, estoque e financeiro. Você valida a gente migra">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: '#FF9C4B' }}>
                <path d="M12 8.5a2.5 2.5 0 00-2.5-2.5H9A3.5 3.5 0 002 8a2 2 0 000 4h10a1.5 1.5 0 000-3z" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
              Migração de dados
            </span>
          </div>

          <div className="hero__actions">
            <a href="#sou-loja" className="btn btn--hero-white">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 6l1-3.5h9L13 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.5 6h12v6.5a1 1 0 01-1 1h-10a1 1 0 01-1-1V6z" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M5.5 13.5v-3.5h4v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sou loja
            </a>
            <a href="#sou-laboratorio" className="btn btn--hero-ghost">
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
      </div>

      <div className="hero__stats">
        <div className="container hero__stats-inner">
          {stats.map((s, i) => (
            <div className="hero__stat" key={i}>
              <span
                className="hero__stat-value"
                ref={(el) => (statsRef.current[i] = el)}
              >
                {s.value}
              </span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
