export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__inner">

          <div className="footer__brand">
            <div className="footer__logo-placeholder">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#f5c518"/>
                <path d="M7 8h10M7 12h7M7 16h10" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Dataweb
            </div>
            <p className="footer__tagline">
              Tecnologia que conecta todo o universo óptico.
            </p>
          </div>

          <div>
            <h4 className="footer__col-title">Pages</h4>
            {['Home', 'About', 'Blog', 'Contact'].map((p) => (
              <a key={p} href={`#${p.toLowerCase()}`} className="footer__link">{p}</a>
            ))}
          </div>

          <div>
            <h4 className="footer__col-title">Entre em contato</h4>
            <a href="mailto:contato@dataweb.com.br" className="footer__link">contato@dataweb.com.br</a>
            <a href="tel:+555130000000" className="footer__link">(51) 3000-0000</a>
          </div>

          <div>
            <h4 className="footer__col-title">Socials</h4>
            {[
              { label: 'LinkedIn', href: 'https://linkedin.com' },
              { label: 'Youtube', href: 'https://youtube.com' },
              { label: 'Twitter', href: 'https://x.com' },
              { label: 'Facebook', href: 'https://facebook.com' },
            ].map((s) => (
              <a key={s.label} href={s.href} className="footer__link" target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <span>Dataweb Tecnologia</span>
          <a href="/privacy-policy">Privacy policy</a>
        </div>
      </div>
    </footer>
  )
}
