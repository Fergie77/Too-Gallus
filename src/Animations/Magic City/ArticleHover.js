import gsap from 'gsap'

export function ArticleHoverBlur(container) {
  // Only run on devices that support hover
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const items = container.querySelectorAll('.masonry-grid_item')
    items.forEach((item) => {
      const image = item.querySelector('.masonry-grid_item_image')
      const info = item.querySelector('.masonry-grid_item_info')
      let infoTween = null

      item.addEventListener('mouseenter', () => {
        if (image) image.classList.add('blur')
        if (info) {
          infoTween = gsap.to(info, {
            y: '0%',
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.out',
          })
        }
      })

      item.addEventListener('mouseleave', () => {
        if (image) image.classList.remove('blur')
        if (info) {
          infoTween = gsap.to(info, {
            y: '100%',
            autoAlpha: 0,
            duration: 0.5,
            ease: 'power2.in',
          })
        }
      })

      // Set initial state for info
      if (info) {
        gsap.set(info, { y: '100%', autoAlpha: 0 })
      }
    })
  }
}

export function ArticleHoverScale(container) {
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const items = container.querySelectorAll('.mc_blog_recent-posts_item')
    items.forEach((item) => {
      const image = item.querySelector('.mc_blog_recent-posts_image')
      if (!image) return
      item.addEventListener('mouseenter', () => {
        image.classList.add('scale')
      })
      item.addEventListener('mouseleave', () => {
        image.classList.remove('scale')
      })
    })
  }
}
