import gsap from 'gsap'

export const footerScroller = (container) => {
  const text = container.querySelectorAll('.footertextscrolling_marquee')
  text.forEach((element) => {
    gsap.to(element, {
      x: '100%',
      duration: 25,
      ease: 'none',
      repeat: -1,
    })
  })
}
