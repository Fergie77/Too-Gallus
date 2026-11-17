import gsap from 'gsap'

// The 15 extra About-page images (public/about-hero), served from the Netlify
// build next to main.js. Shared by the About hero animations.
export const EXTRA_IMAGES = Array.from(
  { length: 15 },
  (_, i) => `about-hero/hero-${String(i + 1).padStart(2, '0')}.webp`
)
// Next to whichever main.js is running (the live build or a preview build).
export const ASSET_BASE = import.meta.env.DEV
  ? 'http://localhost:5173/'
  : new URL('./', import.meta.url).href

// Adds one card per extra image to the collage, cloned from a portrait card of
// the Webflow collage. The clones start hidden (opacity 0 on the card, the image
// itself visible) and are decorative (aria-hidden).
export function addExtraCards(collage, originals) {
  const template =
    originals.find((w) => w.offsetHeight > w.offsetWidth * 1.2) || originals[0]
  return EXTRA_IMAGES.map((src) => {
    const clone = template.cloneNode(true)
    clone.querySelectorAll('video, source').forEach((el) => el.remove())
    const img = clone.querySelector('img')
    if (img) {
      img.removeAttribute('srcset')
      img.removeAttribute('sizes')
      img.loading = 'eager'
      img.alt = ''
      img.src = ASSET_BASE + src
      img.style.opacity = '1'
    }
    clone.setAttribute('aria-hidden', 'true')
    gsap.set(clone, { opacity: 0 })
    collage.appendChild(clone)
    return clone
  })
}
