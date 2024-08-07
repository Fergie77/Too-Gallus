import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const slideUp = (container) => {
  gsap.registerPlugin(ScrollTrigger)
  const text = container.querySelectorAll('[animation="slide-up"]')
  text.forEach((element) => {
    const tl = gsap.timeline({ paused: true })
    ScrollTrigger.create({
      trigger: element.parentNode,
      start: 'top 100%',
      end: 'bottom bottom',
      animation: tl,
    })
    tl.from(element, {
      y: '100%',

      delay: 0.5,
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
    })
  })
}
