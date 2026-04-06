import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function SplashScreen({ onComplete }) {
  const splashRef = useRef(null)
  const logoRef   = useRef(null)
  const ringARef  = useRef(null)
  const ringBRef  = useRef(null)
  const ringCRef  = useRef(null)
  const dotsRef   = useRef([])
  const lineHRef  = useRef(null)
  const lineVRef  = useRef(null)
  const glowRef   = useRef(null)
  const wipeRef   = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const logo  = logoRef.current
    const ringA = ringARef.current
    const ringB = ringBRef.current
    const ringC = ringCRef.current
    const dots  = dotsRef.current.filter(Boolean)
    const lineH = lineHRef.current
    const lineV = lineVRef.current
    const glow  = glowRef.current
    const wipe  = wipeRef.current

    // wipe starts fully below — never covers the splash content
    gsap.set(wipe,  { yPercent: 100 })

    // all content starts invisible
    gsap.set([logo, ringA, ringB, ringC, glow, lineH, lineV, ...dots], { opacity: 0 })
    gsap.set(logo,  { scale: 0.8, y: 16 })
    gsap.set([ringA, ringB, ringC], { scale: 0.6 })
    gsap.set(dots,  { scale: 0 })
    gsap.set(lineH, { scaleX: 0 })
    gsap.set(lineV, { scaleY: 0 })
    gsap.set(glow,  { scale: 0.7 })

    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
    })

    // glow + logo entrance
    tl.to(glow, { opacity: 1, scale: 1, duration: 0.5 }, 0)
    tl.to(logo, { opacity: 1, scale: 1, y: 0, duration: 0.45 }, 0.08)

    // crosshair lines
    tl.to(lineH, { opacity: 1, scaleX: 1, duration: 0.35 }, 0.22)
    tl.to(lineV, { opacity: 1, scaleY: 1, duration: 0.35 }, 0.22)

    // rings cascade
    tl.to(ringA, { opacity: 1, scale: 1, duration: 0.4 }, 0.32)
    tl.to(ringB, { opacity: 1, scale: 1, duration: 0.42 }, 0.4)
    tl.to(ringC, { opacity: 1, scale: 1, duration: 0.44 }, 0.48)

    // dots pop in
    tl.to(dots, {
      opacity: 1, scale: 1, duration: 0.22,
      ease: 'back.out(2.5)',
      stagger: { each: 0.04, from: 'random' },
    }, 0.56)

    // no hold — exit immediately after entrance (~1.0s mark)
    tl.to(dots, {
      opacity: 0, scale: 0, duration: 0.15,
      ease: 'power2.in',
      stagger: { each: 0.02, from: 'random' },
    }, '+=0.15')

    tl.to([ringA, ringB, ringC], {
      opacity: 0, scale: 1.5, duration: 0.28,
      ease: 'power2.in', stagger: 0.04,
    }, '-=0.08')

    tl.to([lineH, lineV, glow], {
      opacity: 0, duration: 0.2, ease: 'power2.in',
    }, '-=0.18')

    tl.to(logo, {
      opacity: 0, y: -16, scale: 1.05, duration: 0.22, ease: 'power2.in',
    }, '-=0.14')

    // wipe — total ~2s
    tl.to(wipe, {
      yPercent: 0,
      duration: 0.4,
      ease: 'expo.inOut',
    }, '-=0.05')

    tl.call(() => {
      document.body.style.overflow = ''
      onComplete?.()
    })

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, []) // eslint-disable-line

  const DOTS = [
    { top: '14%', left: '50%' },
    { top: '23%', left: '78%' },
    { top: '50%', left: '88%' },
    { top: '77%', left: '78%' },
    { top: '86%', left: '50%' },
    { top: '77%', left: '22%' },
    { top: '50%', left: '12%' },
    { top: '23%', left: '22%' },
  ]

  return (
    <div className="splash" ref={splashRef}>
      <div className="splash__glow"            ref={glowRef}  />
      <div className="splash__line splash__line--h" ref={lineHRef} />
      <div className="splash__line splash__line--v" ref={lineVRef} />
      <div className="splash__ring splash__ring--a" ref={ringARef} />
      <div className="splash__ring splash__ring--b" ref={ringBRef} />
      <div className="splash__ring splash__ring--c" ref={ringCRef} />

      {DOTS.map((pos, i) => (
        <span
          key={i}
          className={`splash__dot${i % 2 === 0 ? ' splash__dot--alt' : ''}`}
          ref={el => { dotsRef.current[i] = el }}
          style={{ top: pos.top, left: pos.left }}
        />
      ))}

      <div className="splash__logo-wrap" ref={logoRef}>
        <svg viewBox="0 0 841.89 214.92" xmlns="http://www.w3.org/2000/svg" className="splash__svg">
          <path fill="#1d6076" d="M251.18,84.69a49.27,49.27,0,0,0-34.9-14.46H213.5a49.36,49.36,0,0,0,0,98.72h52.13V119.59A49.2,49.2,0,0,0,251.18,84.69Zm-.1,69.7H213.5a34.81,34.81,0,0,1,0-69.61h2.78a34.81,34.81,0,0,1,34.8,34.81v34.8Z"/>
          <path fill="#1d6076" d="M326.68,73.31V86.54H306.27v83.15H291.53V86.54H271.31V73.31h20.22V46.1h14.74V73.31Z"/>
          <path fill="#00a0b1" d="M660.83,139.27h14.74q-4.73,15.87-17.76,24.56a48.89,48.89,0,0,1-28.34,8.69q-21.56,0-36.1-14.55Q579,143.42,579,120.75q0-21,14.74-35.53,15.12-14.55,35.34-14.55,21.35,0,34.77,15.31,13.6,15.12,13.6,37.6H593.75q.94,15.87,10.77,25.42t25,9.54a35.76,35.76,0,0,0,18.7-5.2A30.64,30.64,0,0,0,660.83,139.27Zm-66-28.54h65.77q-2.46-12.47-10.59-19.27t-21-6.81q-12.86,0-22,7A33.41,33.41,0,0,0,594.88,110.73Z"/>
          <circle fill="#fbb040" cx="140.18" cy="161.67" r="10.34"/>
          <circle fill="#fbb040" cx="448.9"  cy="81.17"  r="10.34"/>
          <path fill="#1d6076" d="M123.24,154.39H95.33a34.81,34.81,0,0,1,0-69.61H98.1a34.82,34.82,0,0,1,34.81,34.81v25.14h14.55v-4.92h0V46H132.91V84.6A49.24,49.24,0,0,0,98.1,70.23H95.33a49.36,49.36,0,0,0,0,98.72h27.91Z"/>
          <path fill="#00a0b1" d="M796.08,119.59a49.37,49.37,0,0,0-49.36-49.36h-3.1c-.74,0-1.47,0-2.2.05l-1.31.1-1.19.09c-.56.06-1.12.14-1.68.22l-.78.1c-.57.08-1.14.19-1.71.3l-.71.13c-.61.12-1.2.27-1.8.41l-.58.14c-.68.17-1.35.37-2,.57l-.32.09c-.7.22-1.39.45-2.08.7l-.21.07c-.73.27-1.46.55-2.18.86l-.05,0A49.21,49.21,0,0,0,709.15,84.6V46H694.59v98.76h0V169h52.13a49.35,49.35,0,0,0,49.36-49.36ZM746.72,84.78a34.81,34.81,0,1,1,0,69.61H709.15v-34.8c0-1,.06-2.06.15-3.08,0-.16,0-.33,0-.49.1-1,.26-1.94.44-2.9,0-.18.05-.37.08-.55.21-1,.47-2,.76-2.94,0-.13.06-.27.1-.4.26-.84.58-1.65.9-2.46.1-.24.17-.49.27-.73.34-.81.74-1.59,1.14-2.36.11-.23.2-.46.32-.68a35.16,35.16,0,0,1,6-8A35.53,35.53,0,0,1,744,84.78Z"/>
          <polygon fill="#00a0b1" points="557.78 73.31 536.05 157.03 529.06 157.03 514.13 99.2 514.13 84.46 499.39 84.46 499.39 99.2 484.27 157.03 477.28 157.03 462.14 98.2 447.1 98.2 465.19 169.69 495.8 169.69 506.76 122.45 517.53 169.69 548.33 169.69 572.71 73.31 557.78 73.31"/>
          <path fill="#1d6076" d="M417.2,84.69a49.25,49.25,0,0,0-34.9-14.46h-2.77a49.36,49.36,0,0,0,0,98.72h52.13V119.59A49.25,49.25,0,0,0,417.2,84.69Zm-.09,69.7H379.53a34.81,34.81,0,0,1,0-69.61h2.77a34.82,34.82,0,0,1,34.81,34.81v34.8Z"/>
        </svg>
      </div>

      {/* Slides up from below to cover splash at exit */}
      <div className="splash__wipe" ref={wipeRef} />
    </div>
  )
}
