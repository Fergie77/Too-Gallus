import gsap from 'gsap'

export function OverlappingImages() {
  const containers = document.querySelectorAll('[animation="overlapping"]')
  if (!containers.length) return

  containers.forEach((container) => {
    const images = container.querySelectorAll(
      '.overlapping-images-animation_image-wrapper'
    )
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
          x: mobileDirection === 'vertical' ? 0 : 100 * offset,
          y: mobileDirection === 'vertical' ? 100 * offset : 0,
          z: 100 - 50 * Math.abs(offset),
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

    //Rotate the array of positions so that on each loop, the images move to the next position in the array
    function rotateRight(arr) {
      return [arr[arr.length - 1]].concat(arr.slice(0, arr.length - 1))
    }

    let imagesArray = Array.from({ length: numImages }, (_, i) => i)

    function loop() {
      const duration = 1
      const ease = 'circ.inOut'

      imagesArray.forEach((imageIndex, i) => {
        const targetIndex = (i + 1) % positions.length

        if (i === imagesArray.length - 1) {
          gsap.to(images[imageIndex], {
            x: positions[0].x,
            y: positions[0].y,
            z: positions[0].z,
            delay: duration / 2,
            duration: 0,
          })
        } else {
          gsap.to(images[imageIndex], {
            x: positions[targetIndex].x,
            y: positions[targetIndex].y,
            z: positions[targetIndex].z,
            duration: duration,
            ease: ease,
            ...(i === imagesArray.length - 2 && {
              onComplete: () => {
                imagesArray = rotateRight(imagesArray)
                loop()
              },
            }),
          })
        }
      })
    }

    loop()

    // Clean up event listener when animation is destroyed
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
}
