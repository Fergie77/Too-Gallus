import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

export function NavMenu() {
  const navMenuWrapper = document.querySelector('.mc_nav')
  const navMenu = navMenuWrapper.querySelector('.mc_nav_links_wrapper')
  const navMenuLinks = navMenu.querySelectorAll('.mc_nav_link')
  const dividingLine = navMenu.querySelectorAll('.dividing-line-horizontal')
  const navMenuButton = navMenuWrapper.querySelector('.mc_nav_hamburger')
  const lottieAnimation = navMenuButton.querySelector(
    '.mc_nav_hamburger_lottie'
  )

  const splitText = new SplitText(navMenuLinks, {
    type: 'words, chars',
    mask: 'words',
  })

  console.log(splitText)

  const tl = gsap.timeline({ paused: true })

  tl.set(navMenu, {
    display: 'flex',
  })
  tl.fromTo(
    navMenu,
    {
      duration: 0.5,
      ease: 'power2.inOut',
      opacity: 0,
    },
    {
      opacity: 1,
    },
    '<'
  )

  tl.fromTo(
    splitText.words,
    {
      opacity: 0,
      y: 30,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      ease: 'expo.inOut',
      duration: 1,
    },
    '<'
  )
  tl.fromTo(
    splitText.chars,
    {
      opacity: 0,
      y: 5,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.01,
      ease: 'expo.inOut',
      duration: 1,
    },
    '<'
  )
  tl.fromTo(
    dividingLine,
    {
      width: 0,
    },
    {
      width: '100%',
      stagger: 0.1,
      ease: 'power2.inOut',
    },
    '<'
  )
  navMenuButton.addEventListener('click', () => {
    navMenu.classList.toggle('wrapper_open')
  })

  // Observer to watch for class changes
  const classObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        if (navMenu.classList.contains('wrapper_open')) {
          // Play the lottie animation
          lottieAnimation.setDirection(1)
          lottieAnimation.play()
          tl.play()
        } else {
          // Reverse the lottie animation
          lottieAnimation.setDirection(-1)
          lottieAnimation.play()
          tl.reverse()
        }
      }
    }
  })

  classObserver.observe(navMenu, {
    attributes: true,
    attributeFilter: ['class'],
  })
}
