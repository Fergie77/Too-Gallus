export const LazyLoadVideo = (container) => {
  const videos = container.querySelectorAll('.lazy')
  if (videos.length === 0) return

  const loadVideo = (video) => {
    const source = video.getAttribute('data-src')
    if (source) {
      video.src = source
      video.removeAttribute('data-src')
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadVideo(entry.target)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0, rootMargin: '200% 200% 200% 200%' }
  )

  videos.forEach((video) => observer.observe(video))

  // GPU-only transform animations (e.g. KeenSlider renderMode 'performance')
  // don't reliably trigger intersection callbacks. Eager-load anything still
  // pending after 5s so videos always end up with src set.
  setTimeout(() => {
    videos.forEach((video) => {
      if (video.hasAttribute('data-src')) {
        loadVideo(video)
        observer.unobserve(video)
      }
    })
  }, 5000)
}
