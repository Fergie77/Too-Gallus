import barba from '@barba/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { CollageAnimation } from './Animations/CollageAnimation'
import { CTALink } from './Animations/CTALink'
import { fadeInImage } from './Animations/FadeInImage'
import { fadeInProjectBlock } from './Animations/FadeInProjectBlock'
import { FooterLink } from './Animations/FooterLink'
import { footerScroller } from './Animations/FooterScroller'
import {
  navLinkColourEnter,
  navLinkColourLeave,
  registerNavLinkObservers,
} from './Animations/NavLinkColourShift'
import { projectSliderAnimation } from './Animations/ProjectSlider'
import { ScrollingList } from './Animations/ScrollingList'
import initShaderAnimation from './Animations/ShaderAnimation'
import { slideDown } from './Animations/SlideDown'
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
  gsap.to('[animation="scale-down"], .background-image', {
    opacity: 0,
    duration: 1,
    scale: 0.8,
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
  gsap.from('.section_footer, [animation="scale"], .background-image', {
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
      name: 'default',
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
        registerNavLinkObservers(data.next.container)
      },
    },
  ],
  views: [
    {
      namespace: 'home',
      beforeEnter(data) {
        projectSliderAnimation(data.next.container)
        slideDown(data.next.container)
        slideUp(data.next.container)
      },
      afterEnter(data) {
        splitText(data.next.container)
        fadeInProjectBlock(data.next.container)
        requestAnimationFrame(() => {
          ScrollingList(data.next.container)
        })
      },
    },
    {
      namespace: 'studio',
      beforeEnter(data) {
        slideUp(data.next.container)
        fadeInImage(data.next.container)
        CollageAnimation(data.next.container)
      },
      afterEnter(data) {
        splitText(data.next.container)
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 500)
      },
    },
    {
      namespace: 'test',

      afterEnter() {
        initShaderAnimation()
      },
    },
    {
      namespace: 'contact',
      beforeEnter(data) {
        splitText(data.next.container)
      },
    },
    {
      namespace: 'projects',
      beforeEnter(data) {
        projectSliderAnimation(data.next.container)
      },
    },
    {
      namespace: 'animation-test',
      beforeEnter(data) {
        CollageAnimation(data.next.container)
      },
    },
  ],
})

barba.hooks.beforeLeave((data) => {
  ScrollTrigger.killAll()
  navLinkColourLeave(data)
})

barba.hooks.enter(() => {
  window.scrollTo(0, 0)
  ScrollTrigger.clearScrollMemory('manual')
})

barba.hooks.afterEnter((data) => {
  footerScroller(data.next.container)
  var vids = data.next.container.querySelectorAll('video')
  vids.forEach((vid) => {
    var playPromise = vid.play()
    if (playPromise !== undefined) {
      playPromise.then(() => {}).catch(() => {})
    }
  })
  navLinkColourEnter(data)
  FooterLink()
  CTALink()
})
