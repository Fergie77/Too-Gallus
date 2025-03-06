// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const LazyLoadVideo = (container) => {
  // gsap.registerPlugin(ScrollTrigger)
  // const video = container.querySelectorAll('.lazy')
  // console.log(video)
  // video.forEach((element) => {
  //   ScrollTrigger.create({
  //     trigger: element,
  //     start: 'top bottom',
  //     end: 'bottom top',
  //     markers: 'true',
  //     onEnter: () => {
  //       element.play()
  //     },
  //     onEnterBack: () => {
  //       element.play()
  //     },
  //     onLeave: () => {
  //       element.pause()
  //     },
  //     onLeaveBack: () => {
  //       element.pause()
  //     },
  //   })
  // })

  let videos = container.querySelectorAll('.lazy')
  if (videos.length > 0) {
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let video = entry.target
            let source = video.getAttribute('data-src')
            if (source) {
              video.src = source
              video.removeAttribute('data-src')
            }
            observer.unobserve(video)
          }
        })
      },
      { threshold: 0 }
    )

    videos.forEach((video) => observer.observe(video))
  } else return
}
