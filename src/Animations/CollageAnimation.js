import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'

export const CollageAnimation = (container) => {
  const collage = container.querySelector('.collage-animation_layout')
  gsap.registerPlugin(CustomEase)
  const hardExpo = CustomEase.create(
    'custom',
    'M0,0 C0.01,0.074 0.03,0.414 0.054,0.502 0.082,0.604 0.154,0.742 0.2,0.8 0.252,0.865 0.374,0.981 1,0.981 '
  )
  //const hardExpo = 'circ.inOut'
  if (!collage) return

  gsap.set(collage.parentElement, {
    transformPerspective: 2000,
  })

  const mainTl = gsap.timeline({
    ease: 'none',
    //delay: 2,
    onComplete: () => {
      // masterTl.play(0)
      mainTl.play(0)
    },
  })

  mainTl.to(collage, {
    rotateY: 200,
    duration: 4,
    ease: hardExpo,
  })

  mainTl.to(
    collage,
    {
      z: 100,
      duration: 1,
      ease: 'expo.inOut',
    },
    '<2.5'
  )

  mainTl.to(collage, {
    rotateY: 360,
    z: 0,
    duration: 1.5,
    ease: 'expo.in',
  })

  const offsetX = [
    -200, //-4
    -120, //-3
    -150, //-2
    -90, //-1
    0, //0
    60, //1
    100, //2
    80, //3
    200, //4
  ]
  const offsetY = [
    -100, //-4
    0, //-3
    150, //-2
    70, //-1
    0, //0
    200, //1
    120, //2
    -80, //3
    150, //4
  ]
  const images = collage.querySelectorAll('.collage-animation_image-wrapper')

  const openingTl = gsap.timeline({
    defaults: {
      ease: 'none',
      //paused: true,
    },
  })
  const closingTl = gsap.timeline({
    defaults: {
      ease: 'none',
      //paused: true,
    },
  })

  const offsets = Array.from(images).map((image, index) => {
    let newIndex = index - images.length / 2 + 0.5
    let xOffset = offsetX[index]
    let yOffset = offsetY[index]
    return { image, newIndex, xOffset, yOffset }
  })

  openingTl.to(images, {
    z: (index) => {
      return offsets[index].newIndex * 40
    },
    x: (index) => {
      return offsets[index].xOffset
    },
    y: (index) => {
      return offsets[index].yOffset
    },
    duration: 4,
    ease: hardExpo,
  })

  closingTl.to(images, {
    z: (index) => {
      return offsets[index].newIndex
    },
    x: 0,
    y: 0,
    scale: 1,
    duration: 1.5,
    ease: 'expo.inOut',
  })

  mainTl.add(openingTl, '0')
  mainTl.add(closingTl, '-=1.8')
}
