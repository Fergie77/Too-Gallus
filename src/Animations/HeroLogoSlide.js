import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const heroLogoSlide = (container) => {
  gsap.registerPlugin(ScrollTrigger)
  const text = container.querySelectorAll('[animation="hero-logo-slide"]')

  const isMobile = matchMedia('(max-width: 479px)').matches

  text.forEach((element) => {
    const tl = gsap.timeline({ paused: true })
    ScrollTrigger.create({
      trigger: element.parentNode,
      start: 'top 100%',
      end: 'bottom bottom',
      animation: tl,
    })
    tl.from(element, {
      y: isMobile ? '-100%' : '100%',

      delay: 0.5,
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
    })
  })
}
