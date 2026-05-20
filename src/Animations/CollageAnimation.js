import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'

export const CollageAnimation = (container) => {
  const collage = container.querySelector('.collage-animation_layout')
  if (!collage) return

  gsap.registerPlugin(CustomEase)
  const hardExpo = CustomEase.create(
    'custom',
    'M0,0 C0.01,0.074 0.03,0.414 0.054,0.502 0.082,0.604 0.154,0.742 0.2,0.8 0.252,0.865 0.374,0.981 1,0.981 '
  )

  const isMobile = window.matchMedia('(max-width: 479px)').matches

  gsap.set(collage.parentElement, {
    transformPerspective: 2000,
  })

  const mainTl = gsap.timeline({
    ease: 'none',
  })

  mainTl.to(
    collage,
    {
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
    },
    '0'
  )

  mainTl.to(
    collage,
    {
      rotateY: 200,
      duration: 4,
      ease: hardExpo,
    },
    '<'
  )

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
    -200 * (isMobile ? 0.5 : 1), //-4
    -120 * (isMobile ? 0.5 : 1), //-3
    -150 * (isMobile ? 0.5 : 1), //-2
    -90 * (isMobile ? 0.5 : 1), //-1
    0, //0
    60 * (isMobile ? 0.5 : 1), //1
    100 * (isMobile ? 0.5 : 1), //2
    80 * (isMobile ? 0.5 : 1), //3
    200 * (isMobile ? 0.5 : 1), //4
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

  // Scale the inner media, NOT the wrapper. The wrapper is being x/y/z'd
  // by the next tween — running a parallel scale on the same element causes
  // GSAP to recompose the transform matrix each frame, which visibly shifts
  // position and z-order. Scoping scale to the child <img>/<video> keeps
  // the two transforms on separate elements (matches main's pageEnter
  // selector, which targeted img/video directly).
  const innerMedia = collage.querySelectorAll(
    '.collage-animation_image-wrapper img, .collage-animation_image-wrapper video'
  )

  openingTl.from(
    innerMedia,
    {
      scale: 0.8,
      duration: 1,
      ease: 'power2.inOut',
    },
    '0'
  )

  openingTl.to(
    images,
    {
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
    },
    '<'
  )

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
  closingTl.to(
    images,
    {
      opacity: 0,
      duration: 1.5,
      ease: 'expo.inOut',
    },
    '<0.7'
  )

  mainTl.add(openingTl, '0')
  mainTl.add(closingTl, '-=1.8')

  // ───── DIAGNOSTIC LOGGING ─────
  // Append ?debug-collage to the URL to enable. Logs each image's bounding
  // rect, opacity, and GSAP-tracked transform at key timeline checkpoints
  // so we can see exactly when/how positions shift.
  if (window.location.search.includes('debug-collage')) {
    console.log(
      '[collage] images count:',
      images.length,
      '| offsets array length:',
      offsetX.length,
      images.length > offsetX.length
        ? '⚠ MORE IMAGES THAN OFFSETS — extras get undefined positions'
        : '✓'
    )
    console.log('[collage] innerMedia count:', innerMedia.length)

    const snap = (label) => {
      const rows = [...images].map((img, i) => ({
        i,
        x: Number(gsap.getProperty(img, 'x')).toFixed(0),
        y: Number(gsap.getProperty(img, 'y')).toFixed(0),
        z: Number(gsap.getProperty(img, 'z')).toFixed(0),
        scale: Number(gsap.getProperty(img, 'scale')).toFixed(2),
        opacity: Number(gsap.getProperty(img, 'opacity')).toFixed(2),
        rectL: Math.round(img.getBoundingClientRect().left),
        rectT: Math.round(img.getBoundingClientRect().top),
      }))
      console.log(`[collage] ${label}`)
      console.table(rows)
    }

    const checkpoints = [0, 1, 2, 2.3, 2.5, 2.7, 3, 3.5, 4, 4.5]
    checkpoints.forEach((t) => {
      mainTl.call(() => snap(`t=${t.toFixed(1)}`), null, t)
    })
  }
}
