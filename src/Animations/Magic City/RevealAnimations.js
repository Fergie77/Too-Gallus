import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function RevealAnimations(container) {
  const elements = container.querySelectorAll('[animation="zoom-out"]')

  elements.forEach((element) => {
    element.style.transform = 'perspective(500px)'

    gsap.from(element, {
      y: 100,
      z: -100,
      filter: 'blur(50px)',
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom 100%',
        toggleActions: 'play none none none',
        markers: true,
      },
    })
  })
}
