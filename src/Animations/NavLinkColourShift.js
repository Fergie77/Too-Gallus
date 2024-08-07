import gsap from 'gsap'
import Observer from 'gsap/Observer'
import SplitType from 'split-type'

export const navLinkColourShift = () => {
  gsap.registerPlugin(Observer)

  const links = document.querySelectorAll('.navbar_link')

  let splittedTextArray = []

  links.forEach((element) => {
    const splittedText = SplitType.create(element)
    splittedTextArray.push(splittedText)
  })

  links.forEach((element, index) => {
    Observer.create({
      target: element,
      onClick: () => {
        gsap.to(splittedTextArray[index].chars, {
          color: 'white',
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.inOut',
          onStart: () => {
            splittedTextArray[index].elements[0].classList.add('skew')
          },
          onComplete: () => {
            splittedTextArray[index].elements[0].classList.add('w--current')
          },
        })
        // Animate all other elements
        splittedTextArray.forEach((text, i) => {
          if (i !== index) {
            gsap.to(text.chars, {
              color: '#717070', // Change the color or any other property
              stagger: 0.1,
              duration: 0.5,
              ease: 'power2.inOut',
              onStart: () => {
                text.elements[0].classList.remove('skew')
              },
              onComplete: () => {
                text.elements[0].classList.remove('w--current')
              },
            })
          }
        })
      },
    })
  })
}
