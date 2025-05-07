import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import { disablePageScroll, enablePageScroll } from '@fluejs/noscroll'

export function NavMenu() {
  let classObserver = null

  const navMenuWrapper = document.querySelector('.mc_nav')
  if (!navMenuWrapper) return
  const backgroundBlur = navMenuWrapper.querySelector('.background-blur')
  const navMenu = navMenuWrapper.querySelector('.mc_nav_links_wrapper')
  const navButton = navMenuWrapper.querySelector('.link_wrapper')
  const navMenuLinks = navMenu.querySelectorAll('.mc_nav_link')
  const dividingLine = navMenu.querySelectorAll('.dividing-line-horizontal')
  const navMenuButton = navMenuWrapper.querySelector('.mc_nav_hamburger')
  const lottieAnimation = navMenuButton.querySelector(
    '.mc_nav_hamburger_lottie'
  )

  const tl = gsap.timeline({ paused: true })

  let splitTextArr = Array.from(navMenuLinks).map((link) =>
    SplitText.create(link, {
      type: 'words',
    })
  )

  function setDesktopNav() {
    gsap.set(navButton, { opacity: 1 })
    gsap.set(navMenu, { opacity: 1 })
    gsap.set(navMenu, { display: 'flex' })
    splitTextArr.forEach((splitText) => {
      gsap.set(splitText.words, { opacity: 1, y: 0 })
    })
  }

  function setMobileNav() {
    gsap.set(navMenu, { display: 'none' })
    gsap.set(navMenu, { opacity: 0 })
    gsap.set(backgroundBlur, { opacity: 0 })
    gsap.set(navButton, { opacity: 0 })
    gsap.set(dividingLine, { width: 0 })
    splitTextArr.forEach((splitText) => {
      gsap.set(splitText.words, { opacity: 0, y: 30 })
    })
  }

  let mobileNavAnimationInitialized = false
  function MobileNavAnimation() {
    if (mobileNavAnimationInitialized) return
    mobileNavAnimationInitialized = true
    tl.set(navMenu, { display: 'flex' })
    tl.to(navMenu, { duration: 0.5, ease: 'power2.inOut', opacity: 1 }, '<')
    tl.to(backgroundBlur, { opacity: 1 }, '<')
    splitTextArr.forEach((splitText) => {
      tl.to(
        splitText.words,
        { y: 0, opacity: 1, stagger: 0.05, ease: 'expo.inOut', duration: 1 },
        '<'
      )
    })
    tl.to(
      dividingLine,
      { width: '100%', stagger: 0.1, ease: 'power2.inOut' },
      '<'
    )
    tl.to(navButton, { opacity: 1 }, '<0.5')
  }

  navMenuButton.addEventListener('click', () => {
    navMenu.classList.toggle('wrapper_open')
  })

  classObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        if (navMenu.classList.contains('wrapper_open')) {
          lottieAnimation.setDirection(1)
          lottieAnimation.play()
          tl.play()
          disablePageScroll()
        } else {
          lottieAnimation.setDirection(-1)
          lottieAnimation.play()
          tl.reverse()
          enablePageScroll()
        }
      }
    }
  })
  classObserver.observe(navMenu, {
    attributes: true,
    attributeFilter: ['class'],
  })

  const mediaQuery = window.matchMedia('(max-width: 990px)')

  function handleBreakpointChange(e) {
    if (e.matches) {
      console.log('Mobile')
      // Your function for tablet and smaller
      setMobileNav()
      MobileNavAnimation()
    } else {
      console.log('Desktop')
      // Your function for desktop
      setDesktopNav()
    }
  }

  // Initial check
  handleBreakpointChange(mediaQuery)

  // Listen for changes
  mediaQuery.addEventListener('change', handleBreakpointChange)

  // Cleanup function
  return () => {
    if (classObserver) classObserver.disconnect()
    mediaQuery.removeEventListener('change', handleBreakpointChange)
  }
}
