import gsap from 'gsap'

export function OverlappingImagesSmooth() {
  const containers = document.querySelectorAll(
    '[animation="overlapping-smooth"]'
  )

  if (!containers.length) return

  containers.forEach((container) => {
    const dataOffset = container.getAttribute('df-x-offset')
    const direction = container.getAttribute('df-direction')
    const images = container.querySelectorAll(
      '.overlapping-images-animation_image-wrapper'
    )
    if (!images.length) return

    const numImages = images.length
    const middleIndex = Math.floor(numImages / 2)

    gsap.set(container, {
      transformPerspective: 2000,
    })

    //Create array of positions for all images
    const positions = Array.from({ length: numImages }, (_, i) => {
      const isMobile = window.matchMedia('(max-width: 479px)').matches
      const offset = isMobile ? (i - middleIndex) * 0.3 : i - middleIndex
      return {
        x: direction === 'vertical' ? 0 : 120 * offset * dataOffset,
        y: direction === 'vertical' ? 120 * offset * dataOffset : 0,
        z: 100 - 50 * Math.abs(offset),
      }
    })

    // Set initial positions for all images
    gsap.set(images, {
      x: (index) => positions[index].x,
      y: (index) => positions[index].y,
      z: (index) => positions[index].z,
    })

    let imagesArray = Array.from({ length: numImages }, (_, i) => i)

    function loop() {
      const duration = 1
      const ease = 'expo.inOut'

      imagesArray.forEach((imageIndex, i) => {
        const targetIndex = (i + 1) % positions.length

        if (i === imagesArray.length - 1) {
          gsap.to(images[imageIndex], {
            x: positions[0].x,
            y: positions[0].y,
            z: positions[0].z,
            ease: ease,
            duration: duration,
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

    function rotateRight(arr) {
      return [arr[arr.length - 1]].concat(arr.slice(0, arr.length - 1))
    }

    loop()
  })
}
