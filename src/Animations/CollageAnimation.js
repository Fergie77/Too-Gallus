import gsap from 'gsap'

export const CollageAnimation = (container) => {
  const collage = container.querySelector('.collage-animation_layout')

  if (!collage) return

  gsap.set(collage.parentElement, {
    transformPerspective: 2000,
  })

  const mainTl = gsap.timeline({
    ease: 'none',
    onComplete: () => {
      masterTl.play(0)
      mainTl.play(0)
    },
  })

  mainTl.to(collage, {
    rotateY: 180,
    duration: 3,
    ease: 'expo.inOut',
  })

  mainTl.to(
    collage,
    {
      rotateY: 200,
      z: 200,
      duration: 2,
      ease: 'ease',
    },
    '<2'
  )

  mainTl.to(
    collage,
    {
      rotateY: 360,
      duration: 3,
      ease: 'expo.out',
    },
    '<1'
  )

  const offsetX = [
    -200, //-4
    -120, //-3
    -150, //-2
    -90, //-1
    0, //0
    60, //1
    100, //2
    80, //3
    150, //4
  ]
  const offsetY = [
    -100, //-4
    0, //-3
    150, //-2
    70, //-1
    0, //0
    100, //1
    120, //2
    -80, //3
    100, //4
  ]
  const images = collage.querySelectorAll('.collage-animation_image-wrapper')

  const masterTl = gsap.timeline({
    defaults: {
      ease: 'none',
    },
  })

  images.forEach((image, index) => {
    let newIndex = index - images.length / 2 + 0.5
    image.querySelector('.collage-animation_text').textContent = newIndex
    // Calculate x and y offsets based on index
    let xOffset = offsetX[index]
    let yOffset = offsetY[index]

    image.querySelector('.offset-number').textContent = offsetX[index]
    masterTl.to(
      image,
      {
        z: newIndex * 40,
        x: xOffset,
        y: yOffset,
        scale: 1 + Math.abs(newIndex) * 0.1,
        duration: 2,
        ease: 'expo.inOut',
      },
      0
    )

    masterTl.to(
      image,
      {
        z: newIndex,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'expo.inOut',
      },
      2.5
    )
  })
}
