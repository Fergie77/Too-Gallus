import gsap from 'gsap'

export const Ticker = (container) => {
  const textElements = container.querySelectorAll('.mc_ticker_wrapper')

  textElements.forEach((textElement) => {
    const duration = textElement.parentElement.getAttribute('duration')
    const tickerTl = gsap.timeline({
      paused: true,
    })
    tickerTl.to(textElement, {
      xPercent: -100,
      duration: duration,
      ease: 'linear',
      repeat: -1,
    })
    tickerTl.play()
  })
}
