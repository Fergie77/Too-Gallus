import KeenSlider from 'keen-slider'

export function ArticleSlider() {
  const slider = new KeenSlider(
    document.querySelector('.mc_blog_recent-posts_layout'),
    {
      selector: '.mc_blog_recent-posts_item',
      slides: {
        perView: 1.2,
        spacing: 20,
        origin: 'center',
      },
      loop: true,
      slideChanged(s) {
        const slides = s.container.querySelectorAll(
          '.mc_blog_recent-posts_item'
        )
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
        const slides = s.container.querySelectorAll(
          '.mc_blog_recent-posts_item'
        )
        slides.forEach((slide, idx) => {
          if (idx === s.track.details.rel) {
            slide.classList.remove('blur')
          } else {
            slide.classList.add('blur')
          }
        })
      },
    }
  )
}
