import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/SmartScanner.css'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────
   Como funciona — 2 etapas
───────────────────────────────────────────────────────── */
const STEPS = [
  {
    id: 'scan',
    num: '01',
    title: 'Escaneie os produtos',
    desc: 'Com o aplicativo aberto, basta passar o leitor nos códigos de barras e registrar os itens.',
    highlight: 'Cada produto é contado com um simples “beep”.',
    tone: 'teal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 7V5a2 2 0 012-2h2M21 7V5a2 2 0 00-2-2h-2M3 17v2a2 2 0 002 2h2M21 17v2a2 2 0 01-2 2h-2"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M6 8v8M9 8v8M12 8v8M15 8v8M18 8v8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'sync',
    num: '02',
    title: 'Sincronização automática',
    desc: 'Quando a contagem termina, todas as informações são enviadas automaticamente para o sistema.',
    bullets: ['Sem planilhas', 'Sem digitação manual'],
    tone: 'green',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21 12a9 9 0 01-15.4 6.4L3 21M3 12a9 9 0 0115.4-6.4L21 3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M21 3v6h-6M3 21v-6h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

/* ─────────────────────────────────────────────────────────
   Diferenciais — 3 cards
───────────────────────────────────────────────────────── */
const DIFFERENTIALS = [
  {
    id: 'segmento',
    eyebrow: 'Auditoria',
    title: 'Contagem por segmento ou marca',
    desc: 'O gerente solicita contagens específicas — por segmento ou por marca — para verificações estratégicas e auditorias rápidas.',
    tone: 'amber',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 5h18l-7 9v6l-4-2v-4L3 5z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'validacao',
    eyebrow: 'Conferência',
    title: 'Validação de contagem',
    desc: 'Antes de importar para o sistema, é possível validar a contagem realizada e, se preciso, solicitar uma nova conferência.',
    tone: 'teal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M8.5 12l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'integracao',
    eyebrow: 'Segurança',
    title: 'Integração total com o ERP',
    desc: 'O aplicativo é totalmente integrado ao ERP Dataweb, garantindo controle e segurança nas informações em todas as etapas.',
    tone: 'green',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="8" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.7" />
        <rect x="13" y="4" width="8" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.7" />
        <rect x="8" y="13" width="8" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.7" />
        <path d="M11 11v2M13 11v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
]

/* ─────────────────────────────────────────────────────────
   Visual placeholders
   - Substitua `src` por uma imagem real para preencher.
   - IDs (`smartscanner-app-screenshot` etc.) são âncoras estáveis.
───────────────────────────────────────────────────────── */
const APP_SCREENSHOT = {
  id: 'smartscanner-app-screenshot',
  title: 'Tela do app SmartScanner',
  description: 'Insira aqui a screenshot real do app durante a leitura.',
  src: null,
}

const SCAN_FLOW_PLACEHOLDER = {
  id: 'smartscanner-scan-flow-placeholder',
  title: 'Leitura de código de barras',
  description: 'Mockup do scanner em ação.',
  src: null,
}

const SYNC_DASHBOARD_PLACEHOLDER = {
  id: 'smartscanner-sync-dashboard-placeholder',
  href: 'erp.dataweb.com.br/estoque',
  badge: 'ERP Dataweb',
  title: 'Sincronização com o ERP',
  description: 'Placeholder para a tela de recebimento da contagem no ERP Dataweb.',
  src: null,
}

/* ─────────────────────────────────────────────────────────
   Phone mockup — reaproveita linguagem do AppShowcase
───────────────────────────────────────────────────────── */
function PhoneMockup({ shot }) {
  return (
    <div className="ssn__phone" data-screenshot-id={shot.id} aria-label={shot.title}>
      <div className="ssn__phone-shell">
        <div className="ssn__phone-notch" aria-hidden="true" />
        <div className="ssn__phone-screen">
          {shot.src ? (
            <img src={shot.src} alt={shot.title} loading="lazy" />
          ) : (
            <div className="ssn__phone-placeholder">
              {/* Header simulado */}
              <div className="ssn__phone-statusbar" aria-hidden="true">
                <span>09:42</span>
                <div className="ssn__phone-status-dots">
                  <span /><span /><span />
                </div>
              </div>

              <div className="ssn__phone-app-head">
                <span className="ssn__phone-app-tag">SmartScanner</span>
                <span className="ssn__phone-app-meta">Contagem ativa</span>
              </div>

              {/* Scanner viewport */}
              <div className="ssn__phone-viewport" aria-hidden="true">
                <div className="ssn__phone-frame">
                  <span className="ssn__phone-corner ssn__phone-corner--tl" />
                  <span className="ssn__phone-corner ssn__phone-corner--tr" />
                  <span className="ssn__phone-corner ssn__phone-corner--bl" />
                  <span className="ssn__phone-corner ssn__phone-corner--br" />
                  <div className="ssn__phone-laser" />
                  <div className="ssn__phone-barcode">
                    {Array.from({ length: 22 }).map((_, i) => (
                      <span key={i} style={{ '--w': `${(i % 4) + 1}px` }} />
                    ))}
                  </div>
                </div>
                <span className="ssn__phone-beep" aria-hidden="true">beep</span>
              </div>

              {/* Counter */}
              <div className="ssn__phone-counter">
                <div>
                  <span className="ssn__phone-counter-label">Lidos</span>
                  <strong className="ssn__phone-counter-value">128</strong>
                </div>
                <div>
                  <span className="ssn__phone-counter-label">Restantes</span>
                  <strong className="ssn__phone-counter-value ssn__phone-counter-value--muted">42</strong>
                </div>
              </div>

              <div className="ssn__phone-cta" aria-hidden="true">
                <span>Sincronizar com ERP</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   ERP browser-style mockup
───────────────────────────────────────────────────────── */
function SyncMockup({ shot }) {
  return (
    <article className="ssn__sync" data-screenshot-id={shot.id} aria-label={shot.title}>
      <div className="ssn__sync-topbar">
        <div className="ssn__sync-dots" aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className="ssn__sync-url">
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
        <div className="ssn__sync-badge">{shot.badge}</div>
      </div>

      <div className="ssn__sync-body">
        {shot.src ? (
          <img src={shot.src} alt={shot.title} loading="lazy" />
        ) : (
          <div className="ssn__sync-placeholder">
            <div className="ssn__sync-rows" aria-hidden="true">
              <div className="ssn__sync-row">
                <span className="ssn__sync-row-pill ssn__sync-row-pill--ok" />
                <span className="ssn__sync-row-bar" style={{ width: '72%' }} />
                <span className="ssn__sync-row-num">128</span>
              </div>
              <div className="ssn__sync-row">
                <span className="ssn__sync-row-pill ssn__sync-row-pill--ok" />
                <span className="ssn__sync-row-bar" style={{ width: '54%' }} />
                <span className="ssn__sync-row-num">96</span>
              </div>
              <div className="ssn__sync-row">
                <span className="ssn__sync-row-pill ssn__sync-row-pill--sync" />
                <span className="ssn__sync-row-bar" style={{ width: '38%' }} />
                <span className="ssn__sync-row-num">62</span>
              </div>
              <div className="ssn__sync-row">
                <span className="ssn__sync-row-pill ssn__sync-row-pill--idle" />
                <span className="ssn__sync-row-bar" style={{ width: '22%' }} />
                <span className="ssn__sync-row-num">28</span>
              </div>
            </div>

            <div className="ssn__sync-status">
              <span className="ssn__sync-status-dot" />
              Recebendo dados do SmartScanner…
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export default function SmartScanner() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const showcaseRef = useRef(null)
  const stepRefs = useRef([])
  const diffRefs = useRef([])
  const closingRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const eyebrow = headerRef.current?.querySelector('.ssn__eyebrow')
      const opener = headerRef.current?.querySelector('.ssn__opener')
      const title = headerRef.current?.querySelector('.ssn__title')
      const sub = headerRef.current?.querySelector('.ssn__sub')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 74%',
          once: true,
        },
      })

      tl.fromTo(eyebrow, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power3.out' })
        .fromTo(
          opener,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform' },
          '-=0.22'
        )
        .fromTo(
          title,
          { autoAlpha: 0, y: 32 },
          { autoAlpha: 1, y: 0, duration: 0.66, ease: 'power4.out', clearProps: 'transform' },
          '-=0.28'
        )
        .fromTo(
          sub,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform' },
          '-=0.36'
        )
        .fromTo(
          showcaseRef.current,
          { autoAlpha: 0, y: 38 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', clearProps: 'transform' },
          '-=0.18'
        )

      gsap.fromTo(
        stepRefs.current,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: stepRefs.current[0], start: 'top 86%', once: true },
        }
      )

      gsap.fromTo(
        diffRefs.current,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: diffRefs.current[0], start: 'top 86%', once: true },
        }
      )

      gsap.fromTo(
        closingRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: closingRef.current, start: 'top 84%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="ssn" id="smartscanner" ref={sectionRef}>
      {/* Background ambience */}
      <div className="ssn__bg" aria-hidden="true">
        <span className="ssn__wash ssn__wash--a" />
        <span className="ssn__wash ssn__wash--b" />
        <span className="ssn__beam ssn__beam--a" />
        <span className="ssn__beam ssn__beam--b" />
        <span className="ssn__noise" />
      </div>

      <div className="container">
        {/* ── Header ── */}
        <header className="ssn__header" ref={headerRef}>
          <span className="ssn__eyebrow">
            <span className="ssn__eyebrow-dot" aria-hidden="true" />
            App SmartScanner
          </span>
          <p className="ssn__opener">Contagem de estoque sem complicação.</p>
          <h2 className="ssn__title">
            Smart<span className="ssn__title-accent">Scanner</span>
          </h2>
          <p className="ssn__sub">
            O aplicativo que transforma a contagem de estoque da sua ótica em um processo
            rápido, simples e seguro.
          </p>
        </header>

        {/* ── Bloco principal: texto + showcase ── */}
        <div className="ssn__main" ref={showcaseRef}>
          <div className="ssn__main-text">
            <p className="ssn__main-lead">
              Contar estoque manualmente pode ser <em>demorado</em>, <em>cansativo</em> e
              sujeito a <em>erros</em>.
            </p>
            <p className="ssn__main-body">
              Com o SmartScanner, basta escanear os produtos e o sistema registra
              automaticamente todas as informações. Ao final da contagem, os dados são
              enviados diretamente para o ERP Dataweb, eliminando retrabalho e reduzindo
              erros de digitação.
            </p>

            <ul className="ssn__chips" aria-label="Benefícios diretos">
              <li className="ssn__chip ssn__chip--teal">
                <span className="ssn__chip-icon" aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Sem planilhas
              </li>
              <li className="ssn__chip ssn__chip--teal">
                <span className="ssn__chip-icon" aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Sem digitação manual
              </li>
              <li className="ssn__chip ssn__chip--green">
                <span className="ssn__chip-icon" aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Integração total com o ERP Dataweb
              </li>
            </ul>
          </div>

          {/* Coluna visual — fluxo Produto → Scanner → Sistema */}
          <div className="ssn__showcase">
            <div className="ssn__flow" aria-label="Fluxo de contagem com SmartScanner">
              {/* Produto */}
              <div className="ssn__flow-node ssn__flow-node--product">
                <div className="ssn__flow-product" aria-hidden="true">
                  <div className="ssn__flow-product-face">
                    <svg width="38" height="38" viewBox="0 0 32 32" fill="none">
                      <path d="M4 10l12-6 12 6v12l-12 6L4 22V10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      <path d="M4 10l12 6 12-6M16 16v12" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" opacity="0.6" />
                    </svg>
                  </div>
                </div>
                <span className="ssn__flow-label">Produto</span>
              </div>

              {/* Conector → */}
              <div className="ssn__flow-connector" aria-hidden="true">
                <span className="ssn__flow-track" />
                <span className="ssn__flow-pulse" />
              </div>

              {/* Phone scanner — peça central */}
              <div className="ssn__flow-node ssn__flow-node--phone">
                <PhoneMockup shot={APP_SCREENSHOT} />
                <span className="ssn__flow-label ssn__flow-label--center">Scanner</span>
              </div>

              {/* Conector → */}
              <div className="ssn__flow-connector" aria-hidden="true">
                <span className="ssn__flow-track" />
                <span className="ssn__flow-pulse ssn__flow-pulse--reverse" />
              </div>

              {/* ERP */}
              <div className="ssn__flow-node ssn__flow-node--erp">
                <SyncMockup shot={SYNC_DASHBOARD_PLACEHOLDER} />
                <span className="ssn__flow-label">ERP Dataweb</span>
              </div>
            </div>

            {/* Placeholder secundário — escondido visualmente para não poluir,
                mas presente no DOM como âncora estável de futura screenshot. */}
            <div
              className="ssn__placeholder-anchor"
              data-screenshot-id={SCAN_FLOW_PLACEHOLDER.id}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ── Como funciona ── */}
        <div className="ssn__block">
          <div className="ssn__block-head">
            <span className="ssn__block-eyebrow">Como funciona</span>
            <h3 className="ssn__block-title">Dois passos. Sem complicação.</h3>
          </div>

          <div className="ssn__steps">
            {STEPS.map((step, index) => (
              <article
                key={step.id}
                className={`ssn__step ssn__step--${step.tone}`}
                ref={(el) => (stepRefs.current[index] = el)}
              >
                <span className="ssn__step-num" aria-hidden="true">{step.num}</span>
                <div className="ssn__step-icon" aria-hidden="true">{step.icon}</div>
                <h4 className="ssn__step-title">{step.title}</h4>
                <p className="ssn__step-desc">{step.desc}</p>

                {step.highlight && (
                  <p className="ssn__step-highlight">{step.highlight}</p>
                )}

                {step.bullets && (
                  <ul className="ssn__step-bullets">
                    {step.bullets.map((b) => (
                      <li key={b}>
                        <span className="ssn__step-bullet-icon" aria-hidden="true">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* ── Diferenciais ── */}
        <div className="ssn__block">
          <div className="ssn__block-head">
            <span className="ssn__block-eyebrow">Diferenciais</span>
            <h3 className="ssn__block-title">Construído para a operação real da ótica.</h3>
          </div>

          <div className="ssn__diffs">
            {DIFFERENTIALS.map((item, index) => (
              <article
                key={item.id}
                className={`ssn__diff ssn__diff--${item.tone}`}
                ref={(el) => (diffRefs.current[index] = el)}
              >
                <div className="ssn__diff-icon" aria-hidden="true">{item.icon}</div>
                <span className="ssn__diff-eyebrow">{item.eyebrow}</span>
                <h4 className="ssn__diff-title">{item.title}</h4>
                <p className="ssn__diff-desc">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* ── Closing ── */}
        <div className="ssn__closing" ref={closingRef}>
          <div className="ssn__closing-frame">
            <span className="ssn__closing-eyebrow">Resultado</span>
            <p className="ssn__closing-quote">
              Estoque organizado começa com uma{' '}
              <span className="ssn__closing-accent">contagem inteligente.</span>
            </p>
            <p className="ssn__closing-text">
              Com o SmartScanner, a contagem de estoque deixa de ser um problema e passa
              a ser um processo rápido, seguro e confiável.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
