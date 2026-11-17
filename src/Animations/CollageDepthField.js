import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'

import { addExtraCards } from './CollageExtras'

// About page hero: the classic opening, then a burst into a floating "universe".
//
// 1. Opening  – the 9 Webflow cards fan out while the collage turns on Y, as in
//               the classic animation (CollageAnimation.js, which is unchanged).
// 2. Shrink   – the turn speeds up and every card collapses into a point at
//               the centre. 15 extra images (public/about-hero) join here.
// 3. Burst    – all cards fly out of the point into three depth layers:
//               near (big, soft), mid (sharp), far (small, faded).
// 4. Universe – the cards keep orbiting slowly around the headline (each layer
//               at its own speed and direction) and drift; on desktop each
//               layer also follows the mouse.
//
// Everything is driven by one clock (gsap.ticker) and each phase blends into
// the next, so the motion never comes to a stop and restarts:
// - the shrink starts while the fan is still settling,
// - the turn keeps speeding up into the point (it never eases to a halt) and
//   its spin carries on as a swirl in the burst,
// - the burst eases into targets that are already orbiting.
// Anything costly (image decoding, blur, layout reads) is done up front or
// once, never in the frame where the burst starts.

// Timings (seconds)
const SHRINK_START = 1.6
const POINT = 4.0 // all cards at the centre point; the burst starts here
const BURST_TIME = 2.2
const EXTRAS_IN = 3.0 // extra cards fade in at the point from here to POINT
const SWIRL = 1.4 // radians the burst trajectories curve through (carries the spin)

// Classic opening offsets (px, desktop)
const OFFSET_X = [-200, -120, -150, -90, 0, 60, 100, 80, 200]
const OFFSET_Y = [-100, 0, 150, 70, 0, 200, 120, -80, 150]

// Depth layers. Orbits are sized from the headline on screen (see measure()),
// so cards stay clear of it on any screen. reach: 0 = the tightest orbit that
// clears the headline, 1 = out to the edge of the hero.
// spin: orbit speed in degrees per second (signs differ so layers counter-rotate).
const LAYERS = {
  near: {
    scale: 1.25,
    blur: 8,
    opacity: 0.9,
    z: 3,
    drift: 16,
    parallax: 7,
    spin: 0.8,
    reach: [0, 0.2],
  },
  mid: {
    scale: 0.55,
    blur: 0,
    opacity: 1,
    z: 2,
    drift: 10,
    parallax: 3,
    spin: 2.2,
    reach: [0, 1],
  },
  far: {
    scale: 0.3,
    blur: 3,
    opacity: 0.45,
    z: 1,
    drift: 6,
    parallax: 1,
    spin: -1.4,
    reach: [0.1, 1],
  },
}
// Which layer each card goes to (the 9 originals first, then the extras).
const LAYER_ORDER = [
  'mid', 'far', 'near', 'mid', 'far', 'mid', 'far', 'mid', 'far',
  'near', 'mid', 'far', 'mid', 'far', 'mid', 'near', 'far', 'mid',
  'far', 'mid', 'near', 'far', 'mid', 'far',
] // prettier-ignore

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const lerp = (a, b, t) => a + (b - a) * t
const easeIn = (p) => Math.pow(p, 2.2)
const easeOutQuart = (p) => 1 - Math.pow(1 - p, 4)
const smooth = (p) => p * p * (3 - 2 * p)
// Small seeded random so the layout is the same on every visit.
const rand = (seed) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

export const CollageDepthField = (container) => {
  const collage = container.querySelector('.collage-animation_layout')
  if (!collage) return
  const originals = Array.from(
    collage.querySelectorAll('.collage-animation_image-wrapper')
  )
  if (!originals.length) return

  gsap.registerPlugin(CustomEase)
  const isMobile = window.matchMedia('(max-width: 479px)').matches
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  // ── Extra cards: clones of a portrait card with the new images ──
  const extras = addExtraCards(collage, originals)

  const cards = [...originals, ...extras].map((el, i) => {
    const isExtra = i >= originals.length
    const layerName = LAYER_ORDER[i % LAYER_ORDER.length]
    const layer = LAYERS[layerName]
    return {
      el,
      inner: el.querySelector('img, video'),
      isExtra,
      layer,
      // classic fan-out target
      fx: isExtra ? 0 : OFFSET_X[i % 9] * (isMobile ? 0.5 : 1),
      fy: isExtra ? 0 : OFFSET_Y[i % 9],
      fz: isExtra ? 0 : (i - originals.length / 2 + 0.5) * 40,
      // the point
      px: (rand(i + 1) - 0.5) * 16,
      py: (rand(i + 7) - 0.5) * 16,
      pr: (rand(i + 3) - 0.5) * 60,
      // universe
      reach: lerp(layer.reach[0], layer.reach[1], rand(i + 11)),
      rx: 0,
      ry: 0,
      scale:
        layer.scale *
        lerp(0.85, 1.15, rand(i + 13)) *
        (isMobile && layerName === 'near' ? 0.8 : 1),
      tilt: (rand(i + 17) - 0.5) * 16,
      phase: rand(i + 19) * Math.PI * 2,
      freq: lerp(0.22, 0.42, rand(i + 23)),
      set: {
        x: gsap.quickSetter(el, 'x', 'px'),
        y: gsap.quickSetter(el, 'y', 'px'),
        z: gsap.quickSetter(el, 'z', 'px'),
        scaleX: gsap.quickSetter(el, 'scaleX'),
        scaleY: gsap.quickSetter(el, 'scaleY'),
        rotation: gsap.quickSetter(el, 'rotation', 'deg'),
        opacity: gsap.quickSetter(el, 'opacity'),
      },
      angle: 0,
      blurred: false,
      blurAt: 0,
      ready: !isExtra, // extras: decoded and drawn once (see below)
    }
  })

  // Getting the extra images ready is the costly part (download, decode,
  // first draw, blur), so it never happens in a busy frame: each image is
  // decoded off the main thread, then the cards are switched on one per frame
  // at an invisible opacity (0.001, so the browser draws and keeps them) with
  // their blur. If one isn't ready by the time it should show, it is used
  // anyway.
  const readyQueue = []
  cards.forEach((c) => {
    if (!c.isExtra) return
    const img = c.inner
    const done = () => readyQueue.push(c)
    if (img && img.decode) img.decode().then(done, done)
    else done()
  })
  function prepareOne(t) {
    let c = readyQueue.shift()
    if (!c && t >= EXTRAS_IN) c = cards.find((k) => k.isExtra && !k.ready)
    if (!c || c.ready) return
    if (c.layer.blur) {
      c.el.style.filter = `blur(${c.layer.blur}px)`
      c.blurred = true
    }
    c.ready = true
  }

  // Blur on the original cards: switched on one at a time during the shrink,
  // while they are small (never all in one frame).
  let nth = 0
  cards.forEach((c) => {
    if (c.isExtra || !c.layer.blur) return
    c.blurAt = 3.2 + nth * 0.12
    nth += 1
  })

  // Spread each layer's cards evenly round its orbit, with a little jitter.
  Object.keys(LAYERS).forEach((name, n) => {
    const members = cards.filter((c) => c.layer === LAYERS[name])
    members.forEach((c, k) => {
      c.angle =
        ((k / members.length) * 360 + n * 23 + (rand(k + n * 31) - 0.5) * 18) *
        (Math.PI / 180)
    })
  })

  // Collage turn: a fast start like the classic opening (an exponential ease
  // to 150°) plus a part that keeps speeding up into the point (to 360°).
  // Its speed never drops below ~35°/s and is highest at the point.
  const turnAt = (t) =>
    150 * (1 - Math.exp(-t / 0.45)) + 210 * Math.pow(clamp01(t / POINT), 3)
  // The classic fan-out curve (same as CollageAnimation's hardExpo).
  const fanEase = CustomEase.create(
    'aboutFan',
    'M0,0 C0.01,0.074 0.03,0.414 0.054,0.502 0.082,0.604 0.154,0.742 0.2,0.8 0.252,0.865 0.374,0.981 1,0.981 '
  )
  gsap.set(collage.parentElement, { transformPerspective: 2000 })
  gsap.set(collage, { transformStyle: 'preserve-3d' })
  gsap.set(
    cards.map((c) => c.el),
    { willChange: 'transform, opacity' }
  )

  // Orbit sizes from the headline: each card's ellipse (rx, ry) is chosen so
  // (hw/rx)² + (hh/ry)² < 1, where hw/hh are the headline's half size plus the
  // card's half size. Such an ellipse never enters the headline's box. On a
  // phone that means cards pass off screen at the sides.
  let W = 0
  let H = 0
  function measure() {
    W = collage.offsetWidth
    H = collage.offsetHeight
    const cr = collage.getBoundingClientRect()
    const cx = cr.left + cr.width / 2
    const cy = cr.top + cr.height / 2
    const head = Array.from(container.querySelectorAll('h1, h2')).find((h) => {
      const r = h.getBoundingClientRect()
      return r.left < cx && r.right > cx && r.top < cy && r.bottom > cy
    })
    const hr = head && head.getBoundingClientRect()
    const hw0 = hr ? hr.width / 2 : W * 0.37
    const hh0 = hr ? hr.height / 2 : H * 0.09
    cards.forEach((c) => {
      const hw = hw0 + (c.el.offsetWidth * c.scale * 1.1) / 2 + 8
      const hh = hh0 + (c.el.offsetHeight * c.scale * 1.1) / 2 + 8
      const ryMin = hh * 1.5
      const ryMax = Math.max(ryMin, H * 0.46)
      c.ry = lerp(ryMin, ryMax, c.reach)
      c.rx = hw / Math.sqrt(1 - Math.pow(hh / c.ry, 2))
    })
  }
  measure()
  window.addEventListener('resize', measure)
  const setTurn = gsap.quickSetter(collage, 'rotationY', 'deg')
  const setLift = gsap.quickSetter(collage, 'z', 'px')

  // The classic fade-in of the Webflow images.
  const originalMedia = originals
    .map((w) => w.querySelector('img, video'))
    .filter(Boolean)
  gsap.to(originalMedia, { opacity: 1, duration: 1, ease: 'power2.inOut' })
  gsap.from(originalMedia, { scale: 0.8, duration: 1, ease: 'power2.inOut' })

  let faced = false
  const faceFront = () => {
    // Webflow mirrors each image (rotateY 180°) for the classic turn; once the
    // collage is back to 0° turn them to face front. 360°, not 0°, so the
    // image keeps its 3D layer and this is a cheap transform change.
    gsap.set(cards.map((c) => c.inner).filter(Boolean), {
      rotationY: 360,
      rotationX: 0,
      scaleX: 1.1,
      scaleY: 1.1,
    })
    faced = true
  }

  let mouseX = 0
  let mouseY = 0
  const parallax = { x: 0, y: 0 }

  function render(t) {
    prepareOne(t)
    const fan = fanEase(clamp01(t / 4))
    const shrink = easeIn(clamp01((t - SHRINK_START) / (POINT - SHRINK_START)))
    const burst = easeOutQuart(clamp01((t - POINT) / BURST_TIME))
    const s = Math.max(0, t - POINT) // time since the burst

    if (t < POINT) {
      setTurn(turnAt(t))
      setLift(100 * Math.sin(Math.PI * clamp01((t - 1.5) / (POINT - 1.5))))
    } else {
      if (!faced) {
        setTurn(0)
        setLift(0)
        faceFront()
      }
    }

    // Parallax eases toward the mouse every frame.
    parallax.x += (mouseX - parallax.x) * 0.05
    parallax.y += (mouseY - parallax.y) * 0.05

    cards.forEach((c, i) => {
      // Before the burst: classic fan, pulled into the point.
      const preX = lerp(c.fx * fan, c.px, shrink)
      const preY = lerp(c.fy * fan, c.py, shrink)
      const preZ = lerp(c.fz * fan, i * 0.5, shrink)
      const preScale = c.isExtra ? 0.28 : lerp(1, 0.28, shrink)
      const preRot = lerp(0, c.pr, shrink)

      // Universe target: already orbiting and drifting, so the burst lands on
      // something that is moving. During the burst the target also sweeps
      // round its orbit (swirl), so the spin of the shrink carries on.
      const swirl = -SWIRL * Math.pow(1 - burst, 2)
      const ang = c.angle + swirl + (c.layer.spin * s * Math.PI) / 180
      const d = c.layer.drift
      const ux =
        Math.cos(ang) * c.rx +
        Math.sin(s * c.freq + c.phase) * d -
        parallax.x * c.layer.parallax * 6
      const uy =
        Math.sin(ang) * c.ry +
        Math.cos(s * c.freq * 0.8 + c.phase) * d * 0.8 -
        parallax.y * c.layer.parallax * 6
      const uRot = c.tilt + Math.sin(s * c.freq * 0.7 + c.phase) * 2.5

      // A tumble that starts and ends at 0, so the card lands at its tilt.
      const tumble = (i % 2 ? 1 : -1) * 40 * Math.sin(Math.PI * burst)
      c.set.x(lerp(preX, ux, burst))
      c.set.y(lerp(preY, uy, burst))
      // Layer order comes from a tiny depth offset (no z-index changes).
      c.set.z(lerp(preZ, (c.layer.z - 2) * 4, burst))
      const sc = lerp(preScale, c.scale, burst)
      c.set.scaleX(sc)
      c.set.scaleY(sc)
      c.set.rotation(lerp(preRot, uRot, burst) + tumble)

      // Opacity: extras fade in at the point; everyone eases to their layer.
      const pre = c.isExtra
        ? smooth(clamp01((t - EXTRAS_IN) / (POINT - EXTRAS_IN)))
        : 1
      if (c.ready)
        c.set.opacity(lerp(Math.max(0.001, pre), c.layer.opacity, burst))
      if (!c.blurred && c.blurAt && t >= c.blurAt) {
        c.el.style.filter = `blur(${c.layer.blur}px)`
        c.blurred = true
      }
    })
  }

  if (reduceMotion) {
    gsap.set(originalMedia, { opacity: 1 })
    cards.forEach((c) => {
      if (c.isExtra && c.layer.blur)
        c.el.style.filter = `blur(${c.layer.blur}px)`
      c.ready = true
    })
    render(POINT + BURST_TIME)
    return
  }

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('pointermove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = (e.clientY / window.innerHeight) * 2 - 1
    })
  }

  // Skip work while the hero is off screen (the clock keeps running).
  let visible = true
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    }).observe(collage)
  }

  const start = gsap.ticker.time
  gsap.ticker.add(() => {
    const t = gsap.ticker.time - start
    if (visible || t < POINT + BURST_TIME) render(t)
  })
}
