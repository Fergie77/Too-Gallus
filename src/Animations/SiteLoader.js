import { CountUp } from 'countup.js'
import gsap from 'gsap'
import Flip from 'gsap/Flip'
import { Odometer } from 'odometer_countup'

export const siteLoader = () => {
  return new Promise((resolve) => {
    const lastVisit = localStorage.getItem('lastVisit')
    const today = new Date().toDateString()
    const wrapper = document.querySelector('.loader_wrapper')

    if (lastVisit === today) {
      // User has visited today, skip animation
      const blocks = document.querySelectorAll('.loader_block')
      const background = document.querySelector('.loader_background')
      const nav = document.querySelector('.loader-transition-stage_wrapper')

      gsap.set([blocks, background, nav], { opacity: 0 })
      wrapper.style.display = 'none'
      resolve()
      return
    }

    // Store today's date as the last visit
    localStorage.setItem('lastVisit', today)

    const countUp = new CountUp('initial-odometer', 100, {
      startVal: 0,
      duration: 3, // Duration in seconds
      useGrouping: false,
      decimalPlaces: 0, // No decimal places
      formattingFn: (n) => {
        return n.toString().padStart(3, '0')
      },
      plugin: new Odometer({ duration: 1, lastDigitDelay: 0 }),
      onComplete: () => {},
    })

    countUp.start()

    const tl = gsap.timeline()
    gsap.registerPlugin(Flip)
    const blocks = document.querySelectorAll('.loader_block')
    const background = document.querySelector('.loader_background')
    const mainAxis = blocks[0].parentElement
    const nav = document.querySelector('.loader-transition-stage_wrapper')
    const navHeight = document.querySelector('.nav_menu').offsetHeight
    const navWidth = document.querySelector('.nav_menu').offsetWidth

    nav.style.height = `${navHeight}px`
    nav.style.width = `${navWidth}px`
    gsap.set(mainAxis, {
      transformPerspective: 20000,
    })

    let state

    tl.to(blocks, {
      z: (index) => {
        return (index - mainAxis.children.length / 2) * 10
      },
      duration: 0.5,
      ease: 'expo.inOut',
    })
    tl.to(
      blocks,
      {
        opacity: 1,
        duration: 0.25,
        stagger: 0.1,
        ease: 'expo.inOut',
      },
      '<0.5'
    )

    tl.to(
      countUp.el,
      {
        opacity: 1,
        duration: 0.25,
        ease: 'expo.inOut',
      },
      '<'
    )
    tl.to(
      mainAxis,
      {
        rotateY: 360,
        duration: 1.5,
        ease: 'none',
        onComplete: () => {
          state = Flip.getState(blocks, {
            props: 'opacity, borderRadius',
          })
        },
      },
      '<0.25'
    )

    tl.to(
      blocks,
      {
        z: 0,
        duration: 1,
        ease: 'expo.inOut',
        onComplete: () => {
          blocks.forEach((block) => {
            nav.appendChild(block)
            block.style.width = '100%'
            block.style.height = '100%'
          })

          Flip.from(state, {
            duration: 1,
            ease: 'expo.inOut',
            onStart: () => {
              gsap.to(countUp.el, {
                opacity: 0,
                duration: 1,
                ease: 'expo.inOut',
              })
              gsap.to(background, {
                delay: 0.5,
                opacity: 0,
                duration: 1,
                ease: 'expo.inOut',
              })
              gsap.to(blocks, {
                delay: 0.5,
                opacity: 0,
                duration: 1,
                ease: 'expo.inOut',
                onStart: resolve,
                onComplete: () => {
                  wrapper.style.display = 'none'
                },
              })
            },
          })
        },
      },
      '>-1'
    )
  })
}
