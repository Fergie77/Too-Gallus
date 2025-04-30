import gsap from 'gsap'
import SplitType from 'split-type'

let splittedTextArray = []
let isTransitioning = false

export const registerNavLinkObservers = () => {
  const navLinks = document.querySelectorAll('.navbar_link')
  const nav = document.querySelector('.nav_container')

  navLinks.forEach((element) => {
    const splittedText = SplitType.create(element)
    splittedTextArray.push(splittedText)

    const linkUnderline = document.createElement('div')
    linkUnderline.classList.add('link_underline')
    element.appendChild(linkUnderline)

    element.addEventListener('mouseenter', () => {
      linkUnderline.classList.add('is-hovered')
    })

    element.addEventListener('mouseleave', () => {
      linkUnderline.classList.remove('is-hovered')
    })

    element.addEventListener('click', () => {
      linkUnderline.classList.remove('is-hovered')
    })
    element.addEventListener('mousedown', () => {
      if (!isTransitioning) {
        gsap.to(nav, {
          scale: 0.95,
          duration: 0.2,
          ease: 'power2.inOut',
        })
      }
    })

    element.addEventListener('mouseup', () => {
      if (!isTransitioning) {
        gsap.to(nav, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.inOut',
        })
      }
    })
  })
}

export const navLinkColourLeave = (data) => {
  isTransitioning = true
  const previousPageSplittedText = Array.from(splittedTextArray).find(
    (item) =>
      item.elements[0]?.getAttribute('namespace') == data.current.namespace
  )

  gsap.to(previousPageSplittedText.chars, {
    color: '#a1a4a7', // Change the color or any other property
    stagger: 0.1,
    duration: 0.5,
    ease: 'power2.inOut',
    onStart: () => {
      previousPageSplittedText.elements[0].classList.remove('skew')
    },
    onComplete: () => {
      previousPageSplittedText.elements[0].classList.remove('w--current')
    },
  })
}

export const navLinkColourEnter = (data) => {
  let nextPageSplittedText = []

  nextPageSplittedText = Array.from(splittedTextArray).find(
    (item) => item.elements[0]?.getAttribute('namespace') == data.next.namespace
  )

  gsap.to(nextPageSplittedText.chars, {
    color: '#ffffff', // Change the color or any other property
    stagger: 0.1,
    duration: 0.5,
    ease: 'power2.inOut',
    onStart: () => {
      nextPageSplittedText.elements[0].classList.add('skew')
      isTransitioning = false
    },
    onComplete: () => {
      nextPageSplittedText.elements[0].classList.add('w--current')
    },
  })
}
