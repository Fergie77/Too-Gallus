import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const LazyLoadVideo = (container) => {
  gsap.registerPlugin(ScrollTrigger)
  const video = container.querySelectorAll('.lazy')
  console.log(video)
  video.forEach((element) => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      markers: 'true',
      onEnter: () => {
        element.play()
      },
      onEnterBack: () => {
        element.play()
      },
      onLeave: () => {
        element.pause()
      },
      onLeaveBack: () => {
        element.pause()
      },
    })
  })
}
