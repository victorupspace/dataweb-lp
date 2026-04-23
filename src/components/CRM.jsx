import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/CRM.css'

gsap.registerPlugin(ScrollTrigger)

const FEATURE_NODES = [
  {
    eyebrow: 'Campanhas',
    title: 'Acoes comerciais ja separadas por contexto',
    text: 'Aniversariantes, reativacao e cobranca aparecem em blocos prontos para a equipe atacar sem perder tempo triando.',
    tone: 'amber',
  },
  {
    eyebrow: 'Historico',
    title: 'Cada contato continua de onde a conversa parou',
    text: 'Ultima abordagem, observacoes e proxima acao ficam acessiveis para qualquer vendedor dar continuidade.',
    tone: 'teal',
  },
  {
    eyebrow: 'Cadencia',
    title: 'Rotina de follow-up com prioridade definida',
    text: 'O CRM mostra o que precisa acontecer agora, depois e em qual ordem para manter a carteira ativa.',
    tone: 'green',
  },
  {
    eyebrow: 'Equipe',
    title: 'Operacao comercial mais consistente entre turnos',
    text: 'Mesmo com mais de um atendente, a loja preserva contexto e evita contatos repetidos ou esquecidos.',
    tone: 'teal',
  },
]

const STAT_ITEMS = [
  'Campanhas, cobrancas e pos-venda na mesma leitura.',
  'Tela central pensada para orientar a proxima acao.',
  'Relacionamento conectado ao dia a dia da otica.',
]

function ScreenshotCard({ className, title, description, href }) {
  return (
    <article className={`crm-shot ${className}`}>
      <div className="crm-shot__topbar">
        <div className="crm-shot__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="crm-shot__url">{href}</div>
        <div className="crm-shot__badge">Screenshot web</div>
      </div>

      <div className="crm-shot__empty">
        <div className="crm-shot__icon">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
            <rect x="5" y="6" width="24" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10 14h14M10 18h9M12 28h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
          </svg>
        </div>
        <div className="crm-shot__copy">
          <strong>{title}</strong>
          <p>{description}</p>
        </div>
      </div>
    </article>
  )
}

export default function CRM() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const stageRef = useRef(null)
  const featureRefs = useRef([])
  const statRefs = useRef([])

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
          { autoAlpha: 0, y: 40, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.82, ease: 'power3.out', clearProps: 'transform' },
          '-=0.16'
        )
        .fromTo(
          featureRefs.current,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out', clearProps: 'transform' },
          '-=0.48'
        )
        .fromTo(
          statRefs.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out', clearProps: 'transform' },
          '-=0.24'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="crm" id="crm" ref={sectionRef}>
      <div className="crm__bg" aria-hidden="true">
        <span className="crm__mesh crm__mesh--a" />
        <span className="crm__mesh crm__mesh--b" />
        <span className="crm__beam crm__beam--a" />
        <span className="crm__beam crm__beam--b" />
        <span className="crm__noise" />
      </div>

      <div className="container">
        <header className="crm__header" ref={headerRef}>
          <span className="crm__tag">CRM &amp; relacionamento</span>
          <h2 className="crm__title">Screenshots no centro. Contexto comercial orbitando ao redor.</h2>
          <p className="crm__lead">
            O CRM Dataweb agora entra como uma area mais cenografica: a tela principal fica no foco e
            as capacidades do sistema aparecem em volta com uma leitura mais refinada, direta e premium.
          </p>
        </header>

        <div className="crm__stage" ref={stageRef}>
          <div className="crm__halo" aria-hidden="true" />

          <div className="crm__feature-grid">
            {FEATURE_NODES.map((item, index) => (
              <article
                className={`crm__feature crm__feature--${item.tone} crm__feature--${index + 1}`}
                key={item.title}
                ref={el => (featureRefs.current[index] = el)}
              >
                <span className="crm__feature-eyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="crm__center">
            <div className="crm__center-head">
              <span className="crm__center-label">Tela central do CRM</span>
              <span className="crm__center-meta">Campanhas, historico e follow-up em destaque</span>
            </div>

            <div className="crm__screens">
              <div className="crm__screen crm__screen--back crm__screen--left" aria-hidden="true">
                <ScreenshotCard
                  className="crm-shot--ghost"
                  title="Painel de campanhas"
                  description="Espaco reservado para a screenshot real com listas, filtros e status."
                  href="crm.dataweb.com.br/campanhas"
                />
              </div>

              <div className="crm__screen crm__screen--main">
                <ScreenshotCard
                  className="crm-shot--main"
                  title="Tela principal do relacionamento"
                  description="Insira aqui a screenshot principal do modulo para exibir agenda comercial, historico e prioridades."
                  href="crm.dataweb.com.br/relacionamento"
                />
              </div>

              <div className="crm__screen crm__screen--back crm__screen--right" aria-hidden="true">
                <ScreenshotCard
                  className="crm-shot--ghost"
                  title="Historico e proxima acao"
                  description="Espaco para uma segunda screenshot de apoio mostrando continuidade do atendimento."
                  href="crm.dataweb.com.br/historico"
                />
              </div>
            </div>
          </div>

          <div className="crm__stats" aria-label="Resumo do CRM">
            {STAT_ITEMS.map((item, index) => (
              <div className="crm__stat" key={item} ref={el => (statRefs.current[index] = el)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
