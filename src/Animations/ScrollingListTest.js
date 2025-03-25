import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const ScrollingListTest = (container) => {
  gsap.registerPlugin(ScrollTrigger)

  const list = container.querySelector('.scrolling-list')
  const items = list.querySelectorAll('.scrolling-list_item_wrapper')

  CreateTrigger()

  function CreateTrigger() {
    ScrollTrigger.create({
      trigger: list,
      start: 'top 0%',
      end: 'bottom 0%',
      pin: true,
      markers: true,
      onUpdate: (self) => {
        const totalItems = items.length
        const currentIndex = Math.floor(self.progress * totalItems)

        console.log('Current item index:', currentIndex)

        if (currentIndex == 0) {
          gsap.set(
            items[currentIndex].querySelector('.scrolling-list_item_image'),
            {
              display: 'block',
            }
          )
          items[currentIndex].classList.add('is-selected')

          gsap.set(
            items[currentIndex + 1].querySelector('.scrolling-list_item_image'),
            {
              display: 'none',
            }
          )
          items[currentIndex + 1].classList.remove('is-selected')
          return
        }

        gsap.set(
          items[currentIndex - 1].querySelector('.scrolling-list_item_image'),
          {
            display: 'none',
          }
        )
        items[currentIndex - 1].classList.remove('is-selected')
        items[currentIndex].classList.add('is-selected')
        items[currentIndex + 1].classList.remove('is-selected')
        gsap.set(
          items[currentIndex].querySelector('.scrolling-list_item_image'),
          {
            display: 'block',
          }
        )
        gsap.set(
          items[currentIndex + 1].querySelector('.scrolling-list_item_image'),
          {
            display: 'none',
          }
        )
      },
    })
  }
}
