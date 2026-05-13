import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/CRM.css'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────
   CRM features — 4 pilares
───────────────────────────────────────────────────────── */
const FEATURES = [
  {
    id: 'automacao',
    eyebrow: 'Automação',
    title: 'Automação de relacionamento',
    desc: 'Envie mensagens automáticas para seus clientes diretamente pelo sistema.',
    highlight: 'Mensagens via WhatsApp',
    tone: 'teal',
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20.5 11.5a8.5 8.5 0 11-15.7 4.4L3 21l5.2-1.7a8.5 8.5 0 0012.3-7.8z"
          stroke={c}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 10.2c.2-.6.7-1 1.3-1h.3c.4 0 .8.2.9.6l.5 1.2c.1.3.1.6-.1.9l-.4.5c.7 1.1 1.6 2 2.7 2.7l.5-.4c.3-.2.6-.2.9-.1l1.2.5c.4.1.6.5.6.9v.3c0 .6-.4 1.1-1 1.3-2.6.6-6.4-3.2-6.4-5.4z"
          fill={c}
          opacity="0.45"
        />
      </svg>
    ),
  },
  {
    id: 'aniversariantes',
    eyebrow: 'Relacionamento',
    title: 'Aniversariantes do dia',
    desc: 'Fortaleça o relacionamento enviando mensagens personalizadas para clientes aniversariantes.',
    tone: 'amber',
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3v3" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="12" cy="2.4" r="1" fill={c} />
        <rect x="4" y="11" width="16" height="9" rx="2" stroke={c} strokeWidth="1.7" />
        <path
          d="M4 14c1.3 1 2.6 1 4 0s2.6-1 4 0 2.6 1 4 0 2.6-1 4 0"
          stroke={c}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path d="M9 11V8.5M15 11V8.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: 'inadimplencia',
    eyebrow: 'Cobrança',
    title: 'Controle de inadimplência',
    desc: 'Identifique rapidamente clientes com pendências e organize o processo de cobrança.',
    tone: 'green',
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="18" height="13" rx="2.4" stroke={c} strokeWidth="1.7" />
        <path d="M3 10h18" stroke={c} strokeWidth="1.7" />
        <path d="M7 15h3" stroke={c} strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
        <circle cx="17" cy="15" r="2" fill={c} opacity="0.7" />
      </svg>
    ),
  },
  {
    id: 'campanhas',
    eyebrow: 'Reativação',
    title: 'Campanhas inteligentes',
    desc: 'Reative clientes antigos e gere novas oportunidades de venda.',
    tone: 'teal',
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 10v4l13 5V5L3 10z"
          stroke={c}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M16 8.5c1.7.5 2.7 1.6 2.7 3.5s-1 3-2.7 3.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
        <path d="M6 14v3a2 2 0 002 2h1l-1-5" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      </svg>
    ),
  },
]

const CRM_IMAGE_BASE = '/assets/crm%20images'

const CRM_SCREENSHOTS = [
  {
    id: 'crm-whatsapp-automation-screenshot',
    featureId: 'automacao',
    href: 'crm.dataweb.com.br/whatsapp',
    badge: 'WhatsApp',
    title: 'Automação WhatsApp',
    description: 'Tela reservada para automações, templates e disparos programados.',
    tone: 'teal',
    src: `${CRM_IMAGE_BASE}/automacaocrm.png`,
  },
  {
    id: 'crm-birthdays-screenshot',
    featureId: 'aniversariantes',
    href: 'crm.dataweb.com.br/aniversariantes',
    badge: 'Aniversários',
    title: 'Aniversariantes do dia',
    description: 'Tela reservada para aniversariantes e mensagens personalizadas.',
    tone: 'amber',
    src: `${CRM_IMAGE_BASE}/aniversariantes.png`,
  },
  {
    id: 'crm-overdue-screenshot',
    featureId: 'inadimplencia',
    href: 'crm.dataweb.com.br/inadimplencia',
    badge: 'Cobrança',
    title: 'Controle de inadimplência',
    description: 'Tela reservada para clientes com pendências e organização de cobrança.',
    tone: 'green',
    src: `${CRM_IMAGE_BASE}/inadimplentes.png`,
  },
  {
    id: 'crm-campaigns-screenshot',
    featureId: 'campanhas',
    href: 'crm.dataweb.com.br/campanhas',
    badge: 'Campanhas',
    title: 'Campanhas inteligentes',
    description: 'Tela reservada para campanhas de reativação e novas oportunidades.',
    tone: 'teal',
    src: `${CRM_IMAGE_BASE}/campanhasinteligentes.png`,
  },
]

/* ─────────────────────────────────────────────────────────
   Browser-style mockup card
───────────────────────────────────────────────────────── */
function CrmScreenPlaceholder({ shot }) {
  const rows = ['Cliente ativo', 'Retorno pendente', 'Mensagem enviada', 'Nova oportunidade']

  return (
    <div className="crm-screen" aria-hidden="true">
      <aside className="crm-screen__rail">
        <span className="crm-screen__brand" />
        <span className="crm-screen__rail-item is-active" />
        <span className="crm-screen__rail-item" />
        <span className="crm-screen__rail-item" />
        <span className="crm-screen__rail-item" />
      </aside>

      <div className="crm-screen__content">
        <div className="crm-screen__toolbar">
          <div>
            <span>{shot.badge}</span>
            <strong>{shot.title}</strong>
          </div>
          <div className="crm-screen__search" />
        </div>

        <div className="crm-screen__metrics">
          <div>
            <span>Contatos hoje</span>
            <strong>128</strong>
          </div>
          <div>
            <span>Oportunidades</span>
            <strong>34</strong>
          </div>
          <div>
            <span>Retornos</span>
            <strong>18</strong>
          </div>
        </div>

        <div className="crm-screen__workspace">
          <section className="crm-screen__table">
            <div className="crm-screen__section-head">
              <strong>Fila de relacionamento</strong>
              <span />
            </div>
            {rows.map((row, index) => (
              <div className="crm-screen__row" key={row}>
                <span className="crm-screen__avatar" />
                <div>
                  <strong>{row}</strong>
                  <span>{index + 1} ação programada</span>
                </div>
                <i />
              </div>
            ))}
          </section>

          <aside className="crm-screen__message">
            <span className="crm-screen__message-dot" />
            <strong>{shot.description}</strong>
            <p>{shot.id}</p>
            <div className="crm-screen__message-lines">
              <span />
              <span />
              <span />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function BrowserMockup({ shot }) {
  return (
    <article
      className={`crm-mock crm-mock--${shot.tone}`}
      id="crm-screenshot-preview"
      data-screenshot-id={shot.id}
      aria-label={shot.title}
    >
      <div className="crm-mock__topbar">
        <div className="crm-mock__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="crm-mock__url">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"
              fill="currentColor"
              opacity="0.6"
            />
            <path d="M2 12h20M12 2a14 14 0 010 20M12 2a14 14 0 000 20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          </svg>
          <span>{shot.href}</span>
        </div>
        {shot.badge && <div className="crm-mock__badge">{shot.badge}</div>}
      </div>

      <div className="crm-mock__viewport">
        {shot.src ? (
          <img src={shot.src} alt={shot.title} loading="lazy" decoding="async" />
        ) : (
          <CrmScreenPlaceholder shot={shot} />
        )}
      </div>
    </article>
  )
}

export default function CRM() {
  const [activeShotIndex, setActiveShotIndex] = useState(0)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const stageRef = useRef(null)
  const featureRefs = useRef([])
  const activeShot = CRM_SCREENSHOTS[activeShotIndex]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveShotIndex((current) => (current + 1) % CRM_SCREENSHOTS.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [activeShotIndex])

  const handleFeatureClick = (featureId) => {
    const nextIndex = CRM_SCREENSHOTS.findIndex((shot) => shot.featureId === featureId)
    if (nextIndex >= 0) setActiveShotIndex(nextIndex)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tag = headerRef.current?.querySelector('.crm__tag')
      const title = headerRef.current?.querySelector('.crm__title')
      const lead = headerRef.current?.querySelector('.crm__lead')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 74%',
          once: true,
        },
      })

      tl.fromTo(
        tag,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power3.out' }
      )
        .fromTo(
          title,
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 0.68, ease: 'power4.out', clearProps: 'transform' },
          '-=0.16'
        )
        .fromTo(
          lead,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.52, ease: 'power3.out', clearProps: 'transform' },
          '-=0.34'
        )
        .fromTo(
          stageRef.current,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.72, ease: 'power3.out', clearProps: 'transform' },
          '-=0.2'
        )
        .fromTo(
          featureRefs.current,
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', clearProps: 'transform' },
          '-=0.42'
        )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="crm" id="crm" ref={sectionRef}>
      {/* Background ambience — mesmo padrão das demais seções dark */}
      <div className="crm__bg" aria-hidden="true">
        <span className="crm__wash crm__wash--a" />
        <span className="crm__wash crm__wash--b" />
        <span className="crm__beam crm__beam--a" />
        <span className="crm__beam crm__beam--b" />
        <span className="crm__noise" />
      </div>

      <div className="container">
        {/* ── Bloco superior ── */}
        <header className="crm__header" ref={headerRef}>
          <div className="crm__header-main">
            <span className="crm__tag">
              <span className="crm__tag-dot" aria-hidden="true" />
              CRM
            </span>
            <h2 className="crm__title">
              Seu cliente <br className="crm__title-br" />não pode ser esquecido.
            </h2>
          </div>
          <p className="crm__lead">
            Com o CRM Dataweb, sua ótica mantém relacionamento constante com os clientes
            e transforma contatos em novas vendas.
          </p>
        </header>

        {/* ── Bloco principal: composição texto + screenshots ── */}
        <div className="crm__stage" ref={stageRef}>
          <div className="crm__layout">
            {/* Coluna esquerda — features grid */}
            <aside className="crm__col crm__col--features">
              <div className="crm__col-head">
                <span className="crm__col-eyebrow">Funcionalidades</span>
                <h3 className="crm__col-title">
                  Quatro frentes integradas à rotina comercial da ótica.
                </h3>
              </div>

              <div className="crm__features" aria-label="Funcionalidades do CRM">
                {FEATURES.map((item, index) => (
                  <button
                    type="button"
                    key={item.id}
                    className={`crm__feature crm__feature--${item.tone}${activeShot.featureId === item.id ? ' is-active' : ''}`}
                    ref={(el) => (featureRefs.current[index] = el)}
                    onClick={() => handleFeatureClick(item.id)}
                    aria-controls="crm-screenshot-preview"
                    aria-pressed={activeShot.featureId === item.id}
                  >
                    <div className="crm__feature-top">
                      <div className="crm__feature-icon" aria-hidden="true">
                        {item.icon('currentColor')}
                      </div>
                      <span className="crm__feature-index">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <span className="crm__feature-eyebrow">{item.eyebrow}</span>
                    <h4 className="crm__feature-title">{item.title}</h4>
                    <p className="crm__feature-desc">{item.desc}</p>
                    {item.highlight && (
                      <span className="crm__feature-highlight">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M5 12l5 5 9-11"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item.highlight}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </aside>

            {/* Coluna direita — vitrine de screenshots */}
            <aside className="crm__col crm__col--vitrine" aria-label="Pré-visualização do sistema">
              <div className="crm__vitrine">
                <div className="crm__vitrine-head">
                  <span className="crm__vitrine-label">
                    <span className="crm__vitrine-pulse" aria-hidden="true" />
                    Preview do CRM
                  </span>
                  <span className="crm__vitrine-note">Rotação automática a cada 3s</span>
                </div>

                <div className="crm__vitrine-main">
                  <BrowserMockup key={activeShot.id} shot={activeShot} />
                </div>

                <div className="crm__carousel-nav" aria-label="Screenshots do CRM">
                  {CRM_SCREENSHOTS.map((shot, index) => (
                    <button
                      type="button"
                      key={shot.id}
                      className={`crm__carousel-dot${index === activeShotIndex ? ' is-active' : ''}`}
                      onClick={() => setActiveShotIndex(index)}
                      aria-label={`Mostrar ${shot.title}`}
                      aria-pressed={index === activeShotIndex}
                    />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>

      </div>
    </section>
  )
}
