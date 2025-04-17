import gsap from 'gsap'

export const NavGradientOverlay = () => {
  const navGradient = document.querySelector('.nav_gradient-overlay')
  const navMenu = document.querySelector('.nav_menu') // Assuming .nav_menu is the hover target

  // Ensure elements exist and screen width is over 768px
  if (!navGradient || !navMenu || window.innerWidth <= 768) {
    console.error(
      'Required elements not found for NavGradientOverlay animation or device width <= 768px.'
    )
    return
  }

  // Add resize listener to disable animation when window is resized below 768px
  const resizeHandler = () => {
    if (window.innerWidth <= 768) {
      // Remove event listeners and reset gradient
      navMenu.removeEventListener('mouseenter', mouseEnterHandler)
      navMenu.removeEventListener('mouseleave', mouseLeaveHandler)
      navMenu.removeEventListener('mousemove', moveHandler)
      gsap.set(navGradient, { opacity: 0, x: 0, y: 0 })
    } else if (!navMenu.hasMouseEnterListener) {
      // Re-add event listeners if window is resized above 768px
      navMenu.addEventListener('mouseenter', mouseEnterHandler)
      navMenu.addEventListener('mouseleave', mouseLeaveHandler)
      navMenu.hasMouseEnterListener = true
    }
  }

  // Initialize GSAP quickTo for smooth mouse following
  const xTo = gsap.quickTo(navGradient, 'x', { duration: 0.6, ease: 'power3' })
  const yTo = gsap.quickTo(navGradient, 'y', { duration: 0.6, ease: 'power3' })

  // Initial state: hidden
  gsap.set(navGradient, { opacity: 0 })

  // Mouse move handler
  const moveHandler = (e) => {
    const rect = navMenu.getBoundingClientRect()
    const x = e.clientX - rect.left // x position within the element
    const y = e.clientY - rect.top // y position within the element

    // Adjustable offset factors - modify these values to fine-tune the position
    const xOffset = -1.05 // Negative values move left, positive move right
    const yOffset = -0.1 // Negative values move up, positive move down

    // Position gradient with adjustable offsets
    xTo(x + navGradient.offsetWidth * xOffset)
    yTo(y + navGradient.offsetHeight * yOffset)
  }

  // Mouse enter handler
  const mouseEnterHandler = () => {
    gsap.to(navGradient, { opacity: 1, duration: 0.3 })
    navMenu.addEventListener('mousemove', moveHandler)
  }

  // Mouse leave handler
  const mouseLeaveHandler = () => {
    gsap.to(navGradient, { opacity: 0, duration: 0.3 })
    navMenu.removeEventListener('mousemove', moveHandler)
    // Optionally reset position when leaving
    xTo(0) // Or reset to its initial position if needed
    yTo(0)
  }

  // Add event listeners
  navMenu.addEventListener('mouseenter', mouseEnterHandler)
  navMenu.addEventListener('mouseleave', mouseLeaveHandler)
  navMenu.hasMouseEnterListener = true

  // Add resize listener
  window.addEventListener('resize', resizeHandler)
}
