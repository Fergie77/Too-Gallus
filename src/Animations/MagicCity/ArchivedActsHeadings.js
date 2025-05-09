import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export function ArchivedActsHeadings() {
  const headingsParent = document.querySelector('.mc_archives_acts-layout')
  const headings = headingsParent.querySelectorAll(
    '.mc_archives_act-text_layout'
  )

  gsap.registerPlugin(ScrollTrigger)

  gsap.set(headings, {
    opacity: 0,
    y: (e) => {
      return -100 * e
    },
  })

  ScrollTrigger.create({
    trigger: headingsParent,
    start: 'top bottom',
    onEnter: () => {
      console.log('onEnter')
      gsap.to(headings, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 2,
        ease: 'expo.inOut',
      })
    },
  })
}
