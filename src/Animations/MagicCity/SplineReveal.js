import { gsap } from 'gsap'

export function SplineReveal() {
  const tl = gsap.timeline()
  const spline = document.querySelector('.mc_hero_spline')

  tl.fromTo(
    spline,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: 'ease.inOut',
    }
  )
}
