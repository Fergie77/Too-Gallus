import gsap from 'gsap'

export const buttermilkImages = (container) => {
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
}
