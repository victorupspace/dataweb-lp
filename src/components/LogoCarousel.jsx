import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const logos = [
  'Ótica Diniz',
  'Ótica Grau Certo',
  'Hiper Ótica',
  'Visão Brasil',
  'LabÓptico',
  'Ótica Moderna',
  'Cristal Ótica',
  'Ótica Vip',
]

export default function LogoCarousel() {
  const wrapperRef = useRef(null)
  const trackRef   = useRef(null)
  const tweenRef   = useRef(null)

  const items = [...logos, ...logos]

  useEffect(() => {
    const track   = trackRef.current
    const wrapper = wrapperRef.current
    if (!track || !wrapper) return

    const init = () => {
      const halfWidth = track.scrollWidth / 2

      tweenRef.current = gsap.to(track, {
        x: -halfWidth,
        duration: 28,
        ease: 'none',
        repeat: -1,
        onRepeat() {
          gsap.set(track, { x: 0 })
        },
      })

      wrapper.addEventListener('mouseenter', () => tweenRef.current?.pause())
      wrapper.addEventListener('mouseleave', () => tweenRef.current?.resume())
    }

    requestAnimationFrame(init)

    return () => {
      tweenRef.current?.kill()
    }
  }, [])

  return (
    <div className="logo-carousel" ref={wrapperRef}>
      <div className="logo-carousel__track" ref={trackRef}>
        {items.map((name, i) => (
          <div className="logo-carousel__item" key={i}>
            <span className="logo-carousel__name">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
