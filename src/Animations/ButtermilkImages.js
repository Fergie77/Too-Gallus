import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const buttermilkImages = (container) => {
  gsap.registerPlugin(ScrollTrigger)
  const images = container.querySelectorAll(
    '.secondary-hero_case-study_animated-image'
  )

  // Function to determine the scale based on viewport width
  const getScale = () => {
    const width = window.innerWidth
    if (width < 478) {
      return 0.5
    } else if (width < 767) {
      return 0.8
    } else {
      return 1
    }
  }

  images.forEach((element) => {
    const tl = gsap.timeline({ repeat: -1 })

    tl.to(element, {
      scale: getScale,
      duration: 1.5,
      ease: 'power2.inOut',
      delay: () => {
        return Math.random()
      },
    })
    tl.to(element, {
      scale: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    })

    // Optional: Update the scale on window resize
    window.addEventListener('resize', () => {
      tl.vars.defaults.scale = getScale()
      gsap.to(images, { scale: getScale(), overwrite: 'auto' })
    })
  })

  // Slide up and fade in for captions, headings, and images
  const slideUpSelectors = [
    '.hero-casestudy-caption',
    '.hero-casestudy-heading',
    '.secondary-hero_case-study_image',
  ]
  const slideUpElements = container.querySelectorAll(slideUpSelectors.join(','))
  slideUpElements.forEach((element, i) => {
    const tl = gsap.timeline({ paused: true })
    ScrollTrigger.create({
      trigger: element,
      start: 'top 90%',
      animation: tl,
    })
    tl.from(element, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      delay: i * 0.12, // slight stagger
    })
  })
  // Refresh ScrollTrigger after all animations are set up
  ScrollTrigger.refresh()
}
