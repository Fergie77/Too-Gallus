import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const fadeInProjectBlock = (container) => {
  gsap.registerPlugin(ScrollTrigger)
  const component = container.querySelectorAll('.projectcard_component')
  component.forEach((element) => {
    const tl = gsap.timeline({ paused: true })
    ScrollTrigger.create({
      trigger: element,
      start: 'top 100%',
      end: 'bottom bottom',
      animation: tl,
    })
    tl.from(element, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
    })
  })
}
