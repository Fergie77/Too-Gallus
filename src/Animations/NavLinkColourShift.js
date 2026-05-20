import gsap from 'gsap'
import SplitType from 'split-type'

export const initNavLinks = () => {
  const nav = document.querySelector('.nav_container')
  const navLinks = document.querySelectorAll('.navbar_link')
  if (!navLinks.length) return

  const currentNamespace = document.body.dataset.barbaNamespace

  navLinks.forEach((link) => {
    const split = SplitType.create(link)

    const underline = document.createElement('div')
    underline.classList.add('link_underline')
    link.appendChild(underline)

    const linkNamespace = link.getAttribute('namespace')
    const isCurrent = linkNamespace === currentNamespace

    if (isCurrent) {
      gsap.set(split.chars, { color: '#ffffff' })
      link.classList.add('skew', 'w--current')
    } else {
      gsap.set(split.chars, { color: '#a1a4a7' })
      link.classList.remove('skew', 'w--current')
    }

    link.addEventListener('mouseenter', () => {
      underline.classList.add('is-hovered')
    })

    link.addEventListener('mouseleave', () => {
      underline.classList.remove('is-hovered')
    })

    link.addEventListener('click', () => {
      underline.classList.remove('is-hovered')
    })

    if (nav) {
      link.addEventListener('mousedown', () => {
        gsap.to(nav, {
          scale: 0.95,
          duration: 0.2,
          ease: 'power2.inOut',
        })
      })

      link.addEventListener('mouseup', () => {
        gsap.to(nav, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.inOut',
        })
      })
    }
  })
}
