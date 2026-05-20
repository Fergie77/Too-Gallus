// Patch for Brave browser: prevent ga.update error if ga is stubbed
if (window.ga && typeof window.ga.update !== 'function') {
  window.ga.update = function () {}
}

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { buttermilkImages } from './Animations/ButtermilkImages'
import {
  FreddiesCaseStudySlider,
  ButtermilkCaseStudySlider,
} from './Animations/CaseStudySlider'
import { CollageAnimation } from './Animations/CollageAnimation'
import { CTALink } from './Animations/CTALink'
import { fadeInImage } from './Animations/FadeInImage'
import { fadeInProjectBlock } from './Animations/FadeInProjectBlock'
import { FooterLink } from './Animations/FooterLink'
import { footerScroller } from './Animations/FooterScroller'
import { heroLogoSlide } from './Animations/HeroLogoSlide'
import { ArchivedActsHeadings } from './Animations/MagicCity/ArchivedActsHeadings'
import {
  ArticleHoverBlur,
  ArticleHoverScale,
} from './Animations/MagicCity/ArticleHover.js'
import { ArticleSlider } from './Animations/MagicCity/ArticleSlider.js'
import { MCButtonHover } from './Animations/MagicCity/MCButtonHover.js'
import { NavMenu } from './Animations/MagicCity/NavMenu.js'
import { OverlappingMCImages } from './Animations/MagicCity/OverlappingMCImages'
import { RevealAnimations } from './Animations/MagicCity/RevealAnimations.js'
import { SplineReveal } from './Animations/MagicCity/SplineReveal.js'
import { Ticker } from './Animations/MagicCity/Ticker.js'
import { NavGradientOverlay } from './Animations/NavGradientOverlay'
import { initNavLinks } from './Animations/NavLinkColourShift'
import { OverlappingImages } from './Animations/OverlappingImages'
import { OverlappingImagesSmooth } from './Animations/OverlappingImagesSmooth'
import { projectSliderAnimation } from './Animations/ProjectSlider'
import { ScrollingList } from './Animations/ScrollingList'
import { ScrollingListTest } from './Animations/ScrollingListTest'
import { siteLoader } from './Animations/SiteLoader'
import { slideDown } from './Animations/SlideDown'
import { slideUp } from './Animations/SlideUp'
import { splitText } from './Animations/SplitText'
import { LazyLoadVideo } from './Features/LazyLoadVideo'
import {
  renderPastEventsForPromoter,
  renderUpcomingEventsForPromoter,
} from './Features/RAEvents'

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual'
}

const PAGE_INITS = {
  home: (s) => {
    projectSliderAnimation(s)
    slideDown(s)
    slideUp(s)
    heroLogoSlide(s)
    splitText(s)
    fadeInProjectBlock(s)
    requestAnimationFrame(() => {
      ScrollingList(s)
      LazyLoadVideo(s)
    })
  },
  studio: (s) => {
    slideUp(s)
    fadeInImage(s)
    CollageAnimation(s)
    splitText(s)
    setTimeout(() => ScrollTrigger.refresh(), 500)
  },
  contact: (s) => {
    splitText(s)
  },
  projects: (s) => {
    projectSliderAnimation(s)
    LazyLoadVideo(s)
  },
  project: (s) => {
    LazyLoadVideo(s)
  },
  freddys: (s) => {
    LazyLoadVideo(s)
    FreddiesCaseStudySlider()
  },
  chanel: (s) => {
    LazyLoadVideo(s)
  },
  buttermilk: (s) => {
    LazyLoadVideo(s)
    ButtermilkCaseStudySlider()
    buttermilkImages(s)
  },
  'animation-test': () => {
    OverlappingImages()
  },
  'animation-test-2': () => {
    OverlappingImagesSmooth()
  },
  'blue-star': (s) => {
    OverlappingImages()
    OverlappingImagesSmooth()
    LazyLoadVideo(s)
  },
  'scrolling-list-test': (s) => {
    ScrollingListTest(s)
  },
  'mc-home': (s) => {
    Ticker(s)
    OverlappingMCImages(s)
    ArticleHoverBlur(s)
    ArticleHoverScale(s)
    MCButtonHover(s)
    RevealAnimations(s)
    ArticleSlider(
      s,
      '.mc_blog_recent-posts_layout',
      '.mc_blog_recent-posts_item'
    )
    NavMenu()
    SplineReveal()
    ArchivedActsHeadings()
    renderUpcomingEventsForPromoter('69759')
  },
  'mc-events': (s) => {
    Ticker(s)
    ArticleSlider(
      s,
      '.mc_featured-blogs_layout',
      '.mc_blog_recent-posts_item'
    )
    NavMenu()
    renderUpcomingEventsForPromoter('69759')
    renderPastEventsForPromoter('69759').then(() => {
      ArticleSlider(s, '.mc_events_slider_wrapper', '.mc_events_item')
    })
  },
  archive: () => {
    NavMenu()
  },
}

function initPage() {
  const scope =
    document.querySelector('[data-barba="container"]') || document.body
  const ns = document.body.dataset.barbaNamespace

  NavGradientOverlay()
  initNavLinks()
  CTALink(scope)
  footerScroller(scope)
  setTimeout(() => FooterLink(), 2000)

  PAGE_INITS[ns]?.(scope)

  requestAnimationFrame(() => ScrollTrigger.refresh())
}

function boot() {
  siteLoader().then(initPage)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true })
} else {
  boot()
}

window.addEventListener('pageshow', (e) => {
  if (e.persisted) initPage()
})
