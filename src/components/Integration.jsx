import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Integration.css'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  {
    label: 'Operação integrada',
    title: 'Atendimento, metas e indicadores no mesmo painel',
    value: 'Único',
    suffix: 'ambiente',
    caption: 'A equipe acompanha a rotina da loja sem alternar entre telas e controles paralelos.',
    tone: 'amber',
  },
  {
    label: 'Visão gerencial',
    title: 'Resumo rápido para decisões do dia',
    value: 'Tempo',
    suffix: 'real',
    caption: 'Orçamentos, O.S., avisos, receitas vencidas e alertas aparecem em uma leitura direta.',
    tone: 'teal',
  },
  {
    label: 'Fluxo comercial',
    title: 'Do primeiro atendimento ao pós-venda',
    value: 'Ponta',
    suffix: 'a ponta',
    caption: 'O Optfácil conecta tarefas operacionais com indicadores que ajudam a loja a evoluir.',
    tone: 'green',
  },
]

const FEATURES = [
  'Receitas, medidas e histórico do cliente no mesmo ambiente',
  'Orçamentos conectados ao guia de lentes e regras da loja',
  'Ordens de serviço com rastreabilidade do balcão ao laboratório',
  'Integração preparada para reduzir retrabalho entre equipes',
]

function ScreenshotPlaceholder() {
  return (
    <div className="itg-shot">
      <div className="itg-shot__topbar">
        <div className="itg-shot__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="itg-shot__url">optfacil.dataweb.com.br/dashboard</div>
        <div className="itg-shot__badge">Screenshot web</div>
      </div>
      <div className="itg-shot__empty">
        <div className="itg-shot__icon">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
            <rect x="4" y="7" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 28h10M15 25v3M19 25v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M9 12h8M9 16h14M9 20h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />
          </svg>
        </div>
        <p>Ver com o fábio quais screenshots vamos colocar aqui</p>
      </div>
    </div>
  )
}

export default function Integration() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const visualRef = useRef(null)
  const metricRefs = useRef([])
  const featureRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = headerRef.current?.querySelectorAll('.itg__word')
      const lead = headerRef.current?.querySelector('.itg__lead')
      const tag = headerRef.current?.querySelector('.itg__tag')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      })

      tl.fromTo(tag,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' }
      )
        .fromTo(words,
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: 0.68, stagger: 0.055, ease: 'power4.out', clearProps: 'transform' },
          '-=0.18'
        )
        .fromTo(lead,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.52, ease: 'power3.out', clearProps: 'transform' },
          '-=0.32'
        )
        .fromTo(visualRef.current,
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out', clearProps: 'transform' },
          '-=0.18'
        )
        .fromTo(metricRefs.current,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.08, ease: 'power3.out', clearProps: 'transform' },
          '-=0.45'
        )
        .fromTo(featureRefs.current,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out', clearProps: 'transform' },
          '-=0.35'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section section--dark itg" id="plataforma" ref={sectionRef}>
      <div className="itg__bg" aria-hidden="true">
        <span className="itg__wash itg__wash--a" />
        <span className="itg__wash itg__wash--b" />
        <span className="itg__grid" />
      </div>

      <div className="container">
        <header className="itg__header" ref={headerRef}>
          <span className="section__tag itg__tag">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="1" y="2" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 9v2M8 9v2M3 11h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Plataforma web
          </span>

          <h2 className="itg__title">
            {['A', 'operação', 'da', 'ótica,'].map((word) => (
              <span className="itg__word-wrap" key={word}>
                <span className="itg__word">{word}&nbsp;</span>
              </span>
            ))}
            <br />
            {['organizada', 'em', 'um', 'só', 'fluxo.'].map((word) => (
              <span className="itg__word-wrap" key={word}>
                <span className="itg__word">{word}&nbsp;</span>
              </span>
            ))}
          </h2>

          <p className="itg__lead">
            O Optfácil conecta atendimento, orçamento, medições e ordens de serviço em uma rotina web
            mais clara para loja, laboratório e gestão.
          </p>
        </header>

        <div className="itg__layout">
          <div className="itg__visual" ref={visualRef}>
            <ScreenshotPlaceholder />
          </div>

          <aside className="itg__metrics" aria-label="Destaques do Optfácil">
            <div className="itg__metrics-head">
              <span>Leitura do painel</span>
              <p>O que esse dashboard evidencia na rotina da ótica.</p>
            </div>

            <div className="itg__metric-list">
              {METRICS.map((metric, index) => (
                <article
                  className={`itg__metric itg__metric--${metric.tone}`}
                  key={metric.label}
                  ref={el => (metricRefs.current[index] = el)}
                >
                  <div className="itg__metric-head">
                    <span className="itg__metric-mark" aria-hidden="true" />
                    <span className="itg__metric-label">{metric.label}</span>
                  </div>
                  <div className="itg__metric-body">
                    <h3>{metric.title}</h3>
                    <p>{metric.caption}</p>
                  </div>
                  <div className="itg__metric-proof">
                    <strong>{metric.value}</strong>
                    <span>{metric.suffix}</span>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>

        <div className="itg__feature-grid">
          {FEATURES.map((feature, index) => (
            <div
              className="itg__feature"
              key={feature}
              ref={el => (featureRefs.current[index] = el)}
            >
              <span className="itg__feature-index">{String(index + 1).padStart(2, '0')}</span>
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
