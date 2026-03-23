import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'Produto',   href: '#produto' },
  { label: 'Soluções',  href: '#solucoes' },
  { label: 'Clientes',  href: '#clientes' },
  { label: 'Blog',      href: '#blog' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const [activeLink, setActiveLink] = useState(null)

  const headerRef     = useRef(null)
  const logoRef       = useRef(null)
  const navRef        = useRef(null)
  const ctaRef        = useRef(null)
  const pillRef       = useRef(null)
  const mobileNavRef  = useRef(null)
  const mobileLinksRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        headerRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
      .fromTo(
        logoRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        '-=0.4'
      )
      .fromTo(
        navRef.current?.querySelectorAll('.header__nav-link'),
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.07 },
        '-=0.3'
      )
      .fromTo(
        ctaRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' },
        '-=0.2'
      )
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 40
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
        gsap.to(headerRef.current, {
          backgroundColor: isScrolled ? 'rgba(8,10,20,0.88)' : 'rgba(8,10,20,0)',
          backdropFilter:  isScrolled ? 'blur(20px)' : 'blur(0px)',
          borderBottomColor: isScrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0)',
          duration: 0.35,
          ease: 'power2.out',
        })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrolled])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''

    if (!mobileNavRef.current) return

    if (mobileOpen) {
      gsap.set(mobileNavRef.current, { display: 'flex' })
      gsap.fromTo(
        mobileNavRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      )
      gsap.fromTo(
        mobileLinksRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out', delay: 0.08 }
      )
    } else {
      gsap.to(mobileNavRef.current, {
        opacity: 0, y: -12, duration: 0.25, ease: 'power2.in',
        onComplete: () => gsap.set(mobileNavRef.current, { display: 'none' }),
      })
    }

    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleLinkEnter = (e) => {
    gsap.to(e.currentTarget, { y: -2, duration: 0.25, ease: 'power2.out' })
  }
  const handleLinkLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: 'elastic.out(1, 0.5)' })
  }

  const handleCtaEnter = () => {
    gsap.to(ctaRef.current, { scale: 1.04, duration: 0.2, ease: 'power2.out' })
  }
  const handleCtaLeave = () => {
    gsap.to(ctaRef.current, { scale: 1, duration: 0.35, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <>
      <header ref={headerRef} className="header">
        <div className="container header__inner">

          <a ref={logoRef} href="#" className="header__logo">
            <img src="/assets/logo.png" alt="Dataweb" className="header__logo-img" />
          </a>

          <nav ref={navRef} className="header__nav">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`header__nav-link ${activeLink === l.label ? 'header__nav-link--active' : ''}`}
                onMouseEnter={handleLinkEnter}
                onMouseLeave={handleLinkLeave}
                onClick={() => setActiveLink(l.label)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="header__right">
            <a
              ref={ctaRef}
              href="#contato"
              className="header__cta"
              onMouseEnter={handleCtaEnter}
              onMouseLeave={handleCtaLeave}
            >
              Fale com especialista
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4.5l2.5 2.5L8 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <button
              className={`header__hamburger ${mobileOpen ? 'header__hamburger--open' : ''}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Abrir menu"
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </header>

      <nav
        ref={mobileNavRef}
        className="header__mobile-nav"
        style={{ display: 'none' }}
      >
        <div className="header__mobile-top">
          <img src="/assets/logo.png" alt="Dataweb" className="header__logo-img" />
          <button
            className="header__mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="header__mobile-links">
          {navLinks.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              ref={(el) => (mobileLinksRef.current[i] = el)}
              className="header__mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              <span className="header__mobile-link-num">0{i + 1}</span>
              {l.label}
              <svg className="header__mobile-link-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4.5l3.5 3.5L9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </div>

        <a
          href="#contato"
          className="btn btn--primary header__mobile-cta"
          onClick={() => setMobileOpen(false)}
        >
          Fale com especialista
        </a>
      </nav>
    </>
  )
}
