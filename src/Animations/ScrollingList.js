import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const ScrollingList = (container) => {
  gsap.registerPlugin(ScrollTrigger)
  const scrollingList = container.querySelector('.case-studies_collection-list')

  if (!scrollingList) return
  const listItems = scrollingList.querySelectorAll(
    '.case-studies_collection-item'
  )

  const listImages = container.querySelectorAll(
    '.case-studies_collection-item_content-wrapper'
  )

  listItems.forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,

        start: 'top 50%',
        end: 'bottom 50%',
        scrub: true,
        onEnter: () => {
          item.classList.add('is-visible')
          listImages[index].classList.add('is-visible')
        },
        onLeave: () => {
          item.classList.remove('is-visible')
          listImages[index].classList.remove('is-visible')
        },
        onEnterBack: () => {
          item.classList.add('is-visible')
          listImages[index].classList.add('is-visible')
        },
        onLeaveBack: () => {
          item.classList.remove('is-visible')
          listImages[index].classList.remove('is-visible')
        },
      },
    })
  })
}
