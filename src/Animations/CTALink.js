import gsap from 'gsap'

export const CTALink = () => {
  // Check if the device supports hover
  const supportsHover = window.matchMedia('(hover: hover)').matches

  if (!supportsHover) return // Exit if it's a touch device

  const ctaLinks = document.querySelectorAll('[animation="cta-link"]')

  ctaLinks.forEach((link) => {
    const button = link.querySelector('.cta-button')

    // Create arrow element
    const arrow = document.createElement('span')
    arrow.innerHTML = '→'
    arrow.style.position = 'absolute'
    arrow.style.left = '-20px'
    arrow.style.opacity = '0'
    button.style.position = 'relative'
    button.prepend(arrow)

    // Create underline element
    const underline = document.createElement('span')
    underline.style.position = 'absolute'
    underline.style.bottom = '0'
    underline.style.left = '0'
    underline.style.width = '0'
    underline.style.height = '1px'
    underline.style.backgroundColor = 'currentColor'
    button.appendChild(underline)

    // Set up hover animations
    link.addEventListener('mouseenter', () => {
      gsap.to(arrow, { opacity: 1, duration: 0.3 })
      gsap.to(button, { x: 10, duration: 0.3 })
      gsap.to(underline, { width: '100%', duration: 0.3 })
    })

    link.addEventListener('mouseleave', () => {
      gsap.to(arrow, { opacity: 0, duration: 0.3 })
      gsap.to(button, { x: 0, duration: 0.3 })
      gsap.to(underline, { width: '0', duration: 0.3 })
    })
  })
}
