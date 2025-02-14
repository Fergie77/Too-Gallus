import gsap from 'gsap'
import SplitType from 'split-type'

let splittedTextArray = []

export const registerNavLinkObservers = () => {
  const navLinks = document.querySelectorAll('.navbar_link')

  navLinks.forEach((element) => {
    const splittedText = SplitType.create(element)
    splittedTextArray.push(splittedText)
  })
}

export const navLinkColourLeave = (data) => {
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
    },
    onComplete: () => {
      nextPageSplittedText.elements[0].classList.add('w--current')
    },
  })
}
