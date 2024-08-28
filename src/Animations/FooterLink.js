import gsap from 'gsap'

export const FooterLink = () => {
  // Check if the device supports hover
  const supportsHover = window.matchMedia('(hover: hover)').matches

  if (!supportsHover) return // Exit if it's a touch device

  const footerLinks = document.querySelectorAll('.footer_link')

  footerLinks.forEach((link) => {
    // Create arrow element
    const arrow = document.createElement('span')
    arrow.innerHTML = '→'
    arrow.style.position = 'absolute'
    arrow.style.left = '-20px'
    arrow.style.opacity = '0'
    link.style.position = 'relative'
    link.prepend(arrow)

    // Create underline element
    const underline = document.createElement('span')
    underline.style.position = 'absolute'
    underline.style.bottom = '0'
    underline.style.left = '0'
    underline.style.width = '0'
    underline.style.height = '1px'
    underline.style.backgroundColor = 'currentColor'
    link.appendChild(underline)

    // Set up hover animations
    link.addEventListener('mouseenter', () => {
      gsap.to(arrow, { opacity: 1, duration: 0.3 })
      gsap.to(link, { x: 10, duration: 0.3 })
      gsap.to(underline, { width: '100%', duration: 0.3 })
    })

    link.addEventListener('mouseleave', () => {
      gsap.to(arrow, { opacity: 0, duration: 0.3 })
      gsap.to(link, { x: 0, duration: 0.3 })
      gsap.to(underline, { width: '0', duration: 0.3 })
    })
  })
}
