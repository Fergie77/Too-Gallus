// Local imports first
import { LazyLoadVideo } from './Features/LazyLoadVideo'

// ... other local imports ...
import barba from '@barba/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { CollageAnimation } from './Animations/CollageAnimation'
import { CTALink } from './Animations/CTALink'
import { fadeInImage } from './Animations/FadeInImage'
import { fadeInProjectBlock } from './Animations/FadeInProjectBlock'
import { FooterLink } from './Animations/FooterLink'
import { footerScroller } from './Animations/FooterScroller'
import { heroLogoSlide } from './Animations/HeroLogoSlide'
import { NavGradientOverlay } from './Animations/NavGradientOverlay'
import {
  navLinkColourEnter,
  navLinkColourLeave,
  registerNavLinkObservers,
} from './Animations/NavLinkColourShift'
import { OverlappingImages } from './Animations/OverlappingImages'
import { OverlappingImagesSmooth } from './Animations/OverlappingImagesSmooth'
import { projectSliderAnimation } from './Animations/ProjectSlider'
import { ScrollingList } from './Animations/ScrollingList'
import { ScrollingListTest } from './Animations/ScrollingListTest'
import { siteLoader } from './Animations/SiteLoader'
import { slideDown } from './Animations/SlideDown'
import { slideUp } from './Animations/SlideUp'
import { splitText } from './Animations/SplitText'
import { Ticker } from './Animations/MagicCity/Ticker.js'
import { OverlappingMCImages } from './Animations/MagicCity/OverlappingMCImages'
import {
  ArticleHoverBlur,
  ArticleHoverScale,
} from './Animations/MagicCity/ArticleHover.js'
import { MCButtonHover } from './Animations/MagicCity/MCButtonHover.js'
import { RevealAnimations } from './Animations/MagicCity/RevealAnimations.js'
import { ArticleSlider } from './Animations/MagicCity/ArticleSlider.js'
import { NavMenu } from './Animations/MagicCity/NavMenu.js'
import { SplineReveal } from './Animations/MagicCity/SplineReveal.js'
import { ArchivedActsHeadings } from './Animations/MagicCity/ArchivedActsHeadings.js'
import { fetchRAEvents, logRAEvents } from './Features/RAEvents'
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

NavGradientOverlay()

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
  gsap.to(
    '[animation="scale-down"], .background-image, .projecthero-image, video, img',
    {
      opacity: 0,
      filter: 'blur(50px)',
      duration: 1,
      scale: 0.8,
      ease: 'power2.inOut',
    }
  )
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
  gsap.from(container.querySelectorAll('img, video'), {
    opacity: 0,
    duration: 1,
    scale: 0.8,
    ease: 'power2.inOut',
  })
  gsap.from('.section_footer, [animation="scale"]', {
    opacity: 0,
    filter: 'blur(20px)',
    duration: 1,
    scale: 0.8,
    ease: 'power2.inOut',
  })
  gsap.from('img', {
    filter: 'blur(50px)',
    duration: 1,
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

siteLoader().then(() => {
  barba.init({
    preventRunning: true,
    prevent: ({ el }) => el.classList && el.classList.contains('no-barba'),
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
          heroLogoSlide(data.next.container)
        },
        afterEnter(data) {
          splitText(data.next.container)
          fadeInProjectBlock(data.next.container)
          requestAnimationFrame(() => {
            ScrollingList(data.next.container)
            LazyLoadVideo(data.next.container)
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
        namespace: 'contact',
        beforeEnter(data) {
          splitText(data.next.container)
        },
      },
      {
        namespace: 'projects',
        beforeEnter(data) {
          projectSliderAnimation(data.next.container)
          LazyLoadVideo(data.next.container)
        },
      },
      {
        namespace: 'project',
        beforeEnter(data) {
          LazyLoadVideo(data.next.container)
        },
      },
      {
        namespace: 'animation-test',
        beforeEnter() {
          OverlappingImages()
        },
      },
      {
        namespace: 'animation-test-2',
        beforeEnter() {
          OverlappingImagesSmooth()
        },
      },
      {
        namespace: 'blue-star',
        beforeEnter(data) {
          OverlappingImages()
          OverlappingImagesSmooth()
          LazyLoadVideo(data.next.container)
        },
      },
      {
        namespace: 'scrolling-list-test',
        beforeEnter(data) {
          ScrollingListTest(data.next.container)
        },
      },
      {
        namespace: 'mc-home',
        beforeEnter(data) {
          Ticker(data.next.container)
          OverlappingMCImages(data.next.container)
          ArticleHoverBlur(data.next.container)
          ArticleHoverScale(data.next.container)
          MCButtonHover(data.next.container)
          RevealAnimations(data.next.container)
          ArticleSlider(
            data.next.container,
            '.mc_blog_recent-posts_layout',
            '.mc_blog_recent-posts_item'
          )
          NavMenu()
          SplineReveal()
          ArchivedActsHeadings()
        },
      },
      {
        namespace: 'mc-events',
        beforeEnter(data) {
          Ticker(data.next.container)
          ArticleSlider(
            data.next.container,
            '.mc_featured-blogs_layout',
            '.mc_blog_recent-posts_item'
          )
          ArticleSlider(
            data.next.container,
            '.mc_upcoming-events_slider_wrapper',
            '.mc_upcoming-events_item'
          )
          fetchRAEvents().then((events) => logRAEvents(events))
        },
      },
    ],
  })
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
  CTALink(data.next.container)
  FooterLink()
  footerScroller(data.next.container)
  navLinkColourEnter(data)
})
