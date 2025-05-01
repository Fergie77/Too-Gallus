import gsap from 'gsap'

export function OverlappingMCImages() {
  const containers = document.querySelectorAll('[animation="overlapping"]')
  if (!containers.length) return

  containers.forEach((container) => {
    const images = container.querySelectorAll('.mc_carousel_image')
    let mobileDirection = container.getAttribute('df-direction-mobile')
    if (!images.length) return

    const numImages = images.length
    const middleIndex = Math.floor(numImages / 2)

    gsap.set(container, {
      transformPerspective: 2000,
    })

    // Move positions calculation into a separate function
    function calculatePositions() {
      const isMobile = window.matchMedia('(max-width: 479px)').matches
      mobileDirection = isMobile ? 'vertical' : ''

      return Array.from({ length: numImages }, (_, i) => {
        const offset = isMobile ? (i - middleIndex) * 0.3 : i - middleIndex
        return {
          x: mobileDirection === 'vertical' ? 0 : 320 * offset,
          y: mobileDirection === 'vertical' ? 100 * offset : 0,
          z: 100 - 350 * Math.abs(offset),
        }
      })
    }

    let positions = calculatePositions()

    // Add resize handler
    const handleResize = () => {
      positions = calculatePositions()

      // Update positions of all images immediately
      gsap.set(images, {
        x: (index) => positions[index].x,
        y: (index) => positions[index].y,
        z: (index) => positions[index].z,
      })
    }

    window.addEventListener('resize', handleResize)

    // Set initial positions for all images
    gsap.set(images, {
      x: (index) => positions[index].x,
      y: (index) => positions[index].y,
      z: (index) => positions[index].z,
    })

    // Helper to rotate array right
    function rotateRight(arr) {
      return [arr[arr.length - 1]].concat(arr.slice(0, arr.length - 1))
    }
    // Helper to rotate array left
    function rotateLeft(arr) {
      return arr.slice(1).concat(arr[0])
    }

    let imagesArray = Array.from({ length: numImages }, (_, i) => i)
    const duration = 1
    const ease = 'circ.inOut'

    function animateToPositions() {
      imagesArray.forEach((imageIndex, i) => {
        gsap.to(images[imageIndex], {
          x: positions[i].x,
          y: positions[i].y,
          z: positions[i].z,
          duration: duration,
          ease: ease,
        })
      })
    }

    function moveNext() {
      imagesArray = rotateRight(imagesArray)
      animateToPositions()
    }

    function movePrev() {
      imagesArray = rotateLeft(imagesArray)
      animateToPositions()
    }

    // Find the arrow buttons within this container
    const leftArrow = container.parentElement.querySelector(
      '.mc_carousel_arrow.is-left'
    )
    const rightArrow = container.parentElement.querySelector(
      '.mc_carousel_arrow.is-right'
    )

    if (leftArrow) leftArrow.addEventListener('click', movePrev)
    if (rightArrow) rightArrow.addEventListener('click', moveNext)

    // Clean up event listeners when animation is destroyed
    return () => {
      window.removeEventListener('resize', handleResize)
      if (leftArrow) leftArrow.removeEventListener('click', movePrev)
      if (rightArrow) rightArrow.removeEventListener('click', moveNext)
    }
  })
}
