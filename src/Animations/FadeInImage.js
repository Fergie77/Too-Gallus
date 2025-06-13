import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const fadeInImage = (container) => {
  gsap.registerPlugin(ScrollTrigger)
  const image = container.querySelectorAll(
    '.storydetail-image, .team-member_image'
  )
  image.forEach((element) => {
    const tl = gsap.timeline({ paused: true })
    ScrollTrigger.create({
      trigger: element.parentNode,
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
