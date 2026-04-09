import { useState, useEffect, useRef } from 'react'

export default function ContactBar() {
  const [visible, setVisible] = useState(false)
  const lastY    = useRef(0)
  const ticking  = useRef(false)

  useEffect(() => {
    const heroEl = document.getElementById('hero')

    const update = () => {
      const y         = window.scrollY
      const heroH     = heroEl ? heroEl.offsetHeight : window.innerHeight
      const pastHero  = y > heroH * 0.20       
      const scrollingDown = y > lastY.current

      if (!pastHero) {
        // Dentro da hero — sempre esconde
        setVisible(false)
      } else if (scrollingDown) {
        // Scrollando para baixo fora da hero — mostra
        setVisible(true)
      } else if (y < lastY.current - 8) {
        // Scrollando para cima com threshold de 8px — esconde
        setVisible(false)
      }

      lastY.current = y
      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`cbar ${visible ? 'cbar--visible' : ''}`}>

      <div className="cbar__label">
        fale com a gente!
      </div>

      <div className="cbar__actions">

        <a href="tel:" className="cbar__item">
          <svg className="cbar__icon" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 2C7.5 2 4.5 4.5 4.5 8c0 2.2 1.1 4.1 2.8 5.3l-.8 3.2 3.2-.8C10 15.9 10.5 16 11 16c3.5 0 6.5-2.5 6.5-6S14.5 2 11 2z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 8.5c0 2.2 1.8 4 4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <span className="cbar__item-text">
            <span className="cbar__item-sub">Atendimento</span>
            <span className="cbar__item-main">SUPORTE</span>
          </span>
        </a>

        <div className="cbar__divider" />

        <a href="tel:" className="cbar__item">
          <svg className="cbar__icon" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M6.5 3h3l1.5 4-2 1.2c.9 1.9 2.3 3.3 4.2 4.2L14.4 10l4 1.5v3C18.4 16.5 15 18 11 14 7 10 5.5 6.5 6.5 3z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="cbar__item-text">
            <span className="cbar__item-sub">Adquira por</span>
            <span className="cbar__item-main">LIGAÇÃO</span>
          </span>
        </a>

        <div className="cbar__divider" />

        <a href="https://wa.me/" className="cbar__item cbar__item--whatsapp" target="_blank" rel="noopener noreferrer">
          <svg className="cbar__icon" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M11 2C6.03 2 2 6.03 2 11c0 1.6.41 3.1 1.13 4.4L2 20l4.72-1.12A9 9 0 0011 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-2.5 5.5c-.2-.44-.4-.45-.6-.46l-.5-.01c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.14s.92 2.48 1.05 2.65c.12.17 1.77 2.8 4.35 3.82 2.16.85 2.6.68 3.07.64.46-.04 1.5-.61 1.71-1.2.21-.6.21-1.1.15-1.2-.06-.1-.23-.16-.48-.28-.25-.12-1.5-.74-1.73-.82-.23-.08-.4-.12-.56.12-.16.25-.63.82-.77.99-.14.17-.28.19-.53.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.1-.51.11-.11.25-.28.37-.43.12-.15.16-.25.24-.42.08-.17.04-.31-.02-.44-.06-.12-.54-1.34-.76-1.82z" fill="white"/>
          </svg>
          <span className="cbar__item-text">
            <span className="cbar__item-sub">Adquira por</span>
            <span className="cbar__item-main">WHATSAPP</span>
          </span>
        </a>

      </div>
    </div>
  )
}
