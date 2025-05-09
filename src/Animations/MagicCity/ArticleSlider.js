import KeenSlider from 'keen-slider'

export function ArticleSlider(container, layoutSelector, itemSelector) {
  let slider = null
  const layout = container.querySelector(layoutSelector)
  if (!layout) return

  const mediaQuery = window.matchMedia('(max-width: 990px)')

  function createSlider() {
    if (slider) return
    slider = new KeenSlider(layout, {
      selector: itemSelector,
      slides: {
        perView: 1.2,
        spacing: 20,
        origin: 'center',
      },
      loop: true,
      slideChanged(s) {
        const slides = s.container.querySelectorAll(itemSelector)
        slides.forEach((slide, idx) => {
          if (idx === s.track.details.rel) {
            slide.classList.remove('blur')
          } else {
            slide.classList.add('blur')
          }
        })
      },
      created(s) {
        // Set initial blur state
        const slides = s.container.querySelectorAll(itemSelector)
        slides.forEach((slide, idx) => {
          if (idx === s.track.details.rel) {
            slide.classList.remove('blur')
          } else {
            slide.classList.add('blur')
          }
        })
      },
    })
  }

  function destroySlider() {
    if (slider) {
      slider.destroy()
      slider = null
      // Remove blur class from all slides
      layout.querySelectorAll(itemSelector).forEach((slide) => {
        slide.classList.remove('blur')
      })
    }
  }

  function handleMediaChange(e) {
    if (e.matches) {
      createSlider()
    } else {
      destroySlider()
    }
  }

  // Initial check
  if (mediaQuery.matches) {
    createSlider()
  }

  // Listen for changes
  mediaQuery.addEventListener('change', handleMediaChange)

  // Cleanup function for barba or manual use
  return () => {
    destroySlider()
    mediaQuery.removeEventListener('change', handleMediaChange)
  }
}
