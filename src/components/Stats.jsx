import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { raw: 25,   suffix: '+',    label: 'Anos no mercado',     format: (n) => `${n}+` },
  { raw: 100,  suffix: ' mi',  label: 'Transações/mês',      format: (n) => `${n} mi` },
  { raw: 5000, suffix: '',     label: 'Clientes implementados',  format: (n) => n.toLocaleString('pt-BR') },
]

export default function Stats() {
  const sectionRef = useRef(null)
  const cardsRef   = useRef([])
  const valuesRef  = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 48, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )

      stats.forEach((s, i) => {
        const el = valuesRef.current[i]
        if (!el) return

        const obj = { val: 0 }
        gsap.to(obj, {
          val: s.raw,
          duration: 1.6,
          ease: 'power2.out',
          delay: i * 0.12,
          onUpdate() {
            el.textContent = s.format(Math.round(obj.val))
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const onEnter = (i) => {
    gsap.to(cardsRef.current[i], {
      y: -6,
      boxShadow: '0 16px 48px rgba(0,0,0,0.22)',
      duration: 0.3,
      ease: 'power2.out',
    })
  }
  const onLeave = (i) => {
    gsap.to(cardsRef.current[i], {
      y: 0,
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      duration: 0.4,
      ease: 'elastic.out(1, 0.6)',
    })
  }

  return (
    <section ref={sectionRef} className="stats-section">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="stats-card"
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={() => onLeave(i)}
          >
            <span
              ref={(el) => (valuesRef.current[i] = el)}
              className="stats-card__value"
            >
              0
            </span>
            <span className="stats-card__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
