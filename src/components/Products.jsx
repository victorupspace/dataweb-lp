import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Products.css'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────
   Products data
───────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'analytics',
    name: 'Analytics',
    label: 'BI & Inteligência',
    color: '#f5c518',
    colorDark: '#b38600',
    desc: 'Transforme dados da sua ótica em insights estratégicos. Dashboards em tempo real com KPIs de vendas, estoque e performance por marca e vendedor.',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="14" width="4" height="7" rx="1.5" stroke={c} strokeWidth="1.7"/>
        <rect x="10" y="9"  width="4" height="12" rx="1.5" stroke={c} strokeWidth="1.7"/>
        <rect x="17" y="3"  width="4" height="18" rx="1.5" stroke={c} strokeWidth="1.7"/>
        <path d="M3 6l5-3 4 4 5-4 4 2" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      </svg>
    ),
    badge: 'Novo',
    stat: '+340%',
    statLabel: 'visibilidade',
  },
  {
    id: 'crm',
    name: 'CRM',
    label: 'Relacionamento',
    color: '#6C63FF',
    colorDark: '#4a42d4',
    desc: 'Gerencie toda a jornada do cliente — do primeiro contato ao pós-venda. Automações, histórico completo e fidelização integrada à operação.',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="4" stroke={c} strokeWidth="1.7"/>
        <path d="M2 21c0-4.418 3.134-7 7-7s7 2.582 7 7" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M16 3.5a4 4 0 010 7" stroke={c} strokeWidth="1.7" strokeLinecap="round" opacity="0.6"/>
        <path d="M19.5 14c1.8.9 3 2.6 3 5.5" stroke={c} strokeWidth="1.7" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
    stat: '2×',
    statLabel: 'retenção',
  },
  {
    id: 'dilab',
    name: 'Dilab',
    label: 'Laboratório Digital',
    color: '#00B4D8',
    colorDark: '#0090ae',
    desc: 'Conexão direta com laboratórios parceiros. Envie pedidos digitalmente, acompanhe o status de produção e receba laudos sem sair do sistema.',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 3v8L4.5 18A2 2 0 006.4 21h11.2a2 2 0 001.9-3L15 11V3" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 3h6" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
        <circle cx="10" cy="16" r="1.2" fill={c} opacity="0.7"/>
        <circle cx="14" cy="14" r="1" fill={c} opacity="0.5"/>
        <circle cx="13" cy="17.5" r="0.8" fill={c} opacity="0.4"/>
      </svg>
    ),
    stat: '−80%',
    statLabel: 'redigitação',
  },
  {
    id: 'optfacil',
    name: 'Optfácil',
    label: 'Gestão de O.S',
    color: '#A6CE39',
    colorDark: '#729018',
    desc: 'Controle total do fluxo de ordens de serviço. Da receita ao laboratório, com status em tempo real, alertas automáticos e histórico do cliente.',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2.5" stroke={c} strokeWidth="1.7"/>
        <path d="M8 8h8M8 12h8M8 16h5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="18" cy="17" r="3.5" fill={c} opacity="0.15" stroke={c} strokeWidth="1.4"/>
        <path d="M16.5 17l1 1 2-2" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    badge: 'Popular',
    stat: '−60%',
    statLabel: 'tempo/O.S',
  },
  {
    id: 'pdv',
    name: 'PDV',
    label: 'Ponto de Venda',
    color: '#FF6B6B',
    colorDark: '#d94444',
    desc: 'Frente de caixa completa e integrada ao ERP. Vendas, trocas, orçamentos e fechamento de caixa em uma interface rápida e intuitiva.',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2.5" stroke={c} strokeWidth="1.7"/>
        <path d="M7 7V5a5 5 0 0110 0v2" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M2 11h20" stroke={c} strokeWidth="1.4" opacity="0.5"/>
        <circle cx="12" cy="15.5" r="1.8" stroke={c} strokeWidth="1.4"/>
      </svg>
    ),
    stat: '+55%',
    statLabel: 'agilidade',
  },
  {
    id: 'ecosystem',
    name: 'Ecossistema',
    label: 'Plataforma Completa',
    color: '#FF9F43',
    colorDark: '#c97400',
    desc: 'Todos os módulos integrados em uma única plataforma. Dados fluem entre Analytics, CRM, Dilab, Optfácil e PDV sem esforço manual.',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.7"/>
        <circle cx="12" cy="4"  r="2" stroke={c} strokeWidth="1.4"/>
        <circle cx="20" cy="9"  r="2" stroke={c} strokeWidth="1.4"/>
        <circle cx="20" cy="17" r="2" stroke={c} strokeWidth="1.4"/>
        <circle cx="12" cy="20" r="2" stroke={c} strokeWidth="1.4"/>
        <circle cx="4"  cy="17" r="2" stroke={c} strokeWidth="1.4"/>
        <circle cx="4"  cy="9"  r="2" stroke={c} strokeWidth="1.4"/>
        <line x1="12" y1="6"  x2="12" y2="9"  stroke={c} strokeWidth="1.2" opacity="0.45"/>
        <line x1="18" y1="10.5" x2="15" y2="11" stroke={c} strokeWidth="1.2" opacity="0.45"/>
        <line x1="18" y1="15.5" x2="15" y2="13" stroke={c} strokeWidth="1.2" opacity="0.45"/>
        <line x1="12" y1="15" x2="12" y2="18" stroke={c} strokeWidth="1.2" opacity="0.45"/>
        <line x1="6"  y1="15.5" x2="9"  y2="13" stroke={c} strokeWidth="1.2" opacity="0.45"/>
        <line x1="6"  y1="10.5" x2="9"  y2="11" stroke={c} strokeWidth="1.2" opacity="0.45"/>
      </svg>
    ),
    stat: '1×',
    statLabel: 'plataforma',
  },
]

/* ─────────────────────────────────────────────────────────
   Corner glint SVG
───────────────────────────────────────────────────────── */
function CornerGlint({ color }) {
  return (
    <svg className="prd__card-glint" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <circle cx="80" cy="0" r="60" fill={color} opacity="0.07"/>
      <circle cx="80" cy="0" r="36" fill={color} opacity="0.06"/>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────── */
export default function Products() {
  const sectionRef  = useRef(null)
  const headerRef   = useRef(null)
  const lineRef     = useRef(null)
  const pillsRef    = useRef(null)
  const titleRef    = useRef(null)
  const subRef      = useRef(null)
  const cardRefs    = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Linha divisória cresce da esquerda */
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.1, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      )

      /* Pills caem em cascata */
      gsap.fromTo(
        pillsRef.current?.children ?? [],
        { y: -22, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'back.out(1.4)',
          clearProps: 'transform',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        }
      )

      /* Título revela com clip */
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, ease: 'power4.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true },
        }
      )

      /* Subtítulo */
      gsap.fromTo(subRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 66%', once: true },
        }
      )

      /* Cards cascade */
      gsap.fromTo(
        cardRefs.current,
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 62%', once: true },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section prd" id="produtos" ref={sectionRef}>

      {/* Subtle background texture */}
      <div className="prd__bg" aria-hidden="true">
        <div className="prd__bg-blob prd__bg-blob--1" />
        <div className="prd__bg-blob prd__bg-blob--2" />
        <div className="prd__grid" />
      </div>

      <div className="container">

        {/* ── Header: pills row + big title + divider line ── */}
        <div className="prd__header" ref={headerRef}>

          {/* Product pills — horizontal ticker */}
          <div className="prd__hpills" ref={pillsRef}>
            {['Analytics', 'CRM', 'Dilab', 'Optfácil', 'PDV'].map((name, i) => (
              <span key={name} className="prd__hpill" style={{ '--pi': i }}>
                <span className="prd__hpill-dot" />
                {name}
              </span>
            ))}
          </div>

          {/* Divider line */}
          <div className="prd__hline" ref={lineRef} />

          {/* Title */}
          <div className="prd__htitle-row">
            <h2 className="prd__htitle" ref={titleRef}>
              Uma plataforma,{' '}
              <span className="prd__htitle-accent">cinco superpoderes.</span>
            </h2>
            <p className="prd__hsub" ref={subRef}>
              Cada módulo foi pensado para resolver um desafio real da sua ótica —
              e todos se conectam em um único ecossistema integrado.
            </p>
          </div>

        </div>

        {/* Grid */}
        <div className="prd__grid-cards">
          {PRODUCTS.map((p, i) => (
            <article
              key={p.id}
              className="prd__card"
              style={{ '--pc': p.color, '--pcd': p.colorDark }}
              ref={el => (cardRefs.current[i] = el)}
            >
              <CornerGlint color={p.color} />

              {/* Top row: icon + badge */}
              <div className="prd__card-top">
                <div className="prd__card-icon">
                  {p.icon(p.color)}
                </div>
                {p.badge && (
                  <span className="prd__card-badge">{p.badge}</span>
                )}
              </div>

              {/* Label */}
              <span className="prd__card-label">{p.label}</span>

              {/* Name */}
              <h3 className="prd__card-name">{p.name}</h3>

              {/* Description */}
              <p className="prd__card-desc">{p.desc}</p>

              {/* Divider */}
              <div className="prd__card-divider" />

              {/* Stat + CTA */}
              <div className="prd__card-footer">
                <div className="prd__card-stat">
                  <span className="prd__card-stat-value">{p.stat}</span>
                  <span className="prd__card-stat-label">{p.statLabel}</span>
                </div>
                <button className="prd__card-cta" aria-label={`Saiba mais sobre ${p.name}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Hover shimmer bar */}
              <div className="prd__card-shimmer" />
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
