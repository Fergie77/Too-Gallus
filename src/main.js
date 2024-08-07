import barba from '@barba/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { navLinkColourShift } from './Animations/NavLinkColourShift'
import { projectSliderAnimation } from './Animations/ProjectSlider'
import { slideUp } from './Animations/SlideUp'
import { splitText } from './Animations/SplitText'

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual'
}

function delay(n) {
  n = n || 0
  return new Promise((done) => {
    setTimeout(() => {
      done()
    }, n)
  })
}

const pageExit = (container) => {
  gsap.to(container.querySelectorAll('img'), {
    opacity: 0,
    duration: 1,
    scale: 0.8,
    ease: 'power2.inOut',
  })
  gsap.to('.section_footer, [animation="scale"]', {
    opacity: 0,
    duration: 1,
    scale: 1.2,
    ease: 'power2.inOut',
  })
  gsap.to(container.querySelectorAll('[animation="blur"]'), {
    opacity: 0,
    filter: 'blur(50px)',
    duration: 1.5,
    scale: 1.2,
    ease: 'power2.inOut',
    y: -100,
  })
}
const pageEnter = (container) => {
  gsap.from(container.querySelectorAll('img'), {
    opacity: 0,
    duration: 1,
    scale: 0.8,
    ease: 'power2.inOut',
  })
  gsap.from('.section_footer, [animation="scale"]', {
    opacity: 0,
    duration: 1,
    scale: 0.8,
    ease: 'power2.inOut',
  })
  gsap.from(container.querySelectorAll('[animation="blur"]'), {
    opacity: 0,
    filter: 'blur(20px)',
    duration: 1,
    scale: 1.2,
    ease: 'power2.inOut',
  })
}

barba.init({
  transitions: [
    {
      name: 'default-transition',
      async leave(data) {
        const done = this.async()
        pageExit(data.current.container)

        await delay(1000)

        done()
      },
      enter(data) {
        pageEnter(data.next.container)
      },
      once(data) {
        navLinkColourShift(data)
      },
    },
  ],
  views: [
    {
      namespace: 'home',
      beforeEnter(data) {
        projectSliderAnimation(data.next.container)
        splitText(data.next.container)
        slideUp(data.next.container)
      },
    },
    {
      namespace: 'studio',
      beforeEnter(data) {
        splitText(data.next.container)
        slideUp(data.next.container)
      },
    },
    {
      namespace: 'contact',
      beforeEnter(data) {
        splitText(data.next.container)
      },
    },
  ],
})

barba.hooks.beforeLeave(() => {
  ScrollTrigger.killAll()
})

barba.hooks.afterEnter(() => {
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 100)
  setTimeout(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.clearScrollMemory('manual')
  }, 100)
})
