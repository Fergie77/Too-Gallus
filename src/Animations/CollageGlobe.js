import gsap from 'gsap'

import { addExtraCards } from './CollageExtras'

// About page hero: the headline sits still in the middle long enough to read,
// then the 24 pieces of work burst out from behind it onto one big invisible
// globe that sweeps slowly round, and the headline fades out as they grow.
// People can grab the globe and spin it: drag (mouse or touch) turns it with
// the hand, a flick keeps it spinning and it slows down naturally, then the
// slow automatic turn carries on. On touch screens only sideways drags spin
// it, so vertical swipes still scroll the page.
//
// Everything runs off one clock (gsap.ticker). Card stacking comes from tiny
// 3D z values inside the collage, never z-index changes. The headline is never
// moved or copied (so it can't jump); it only fades, and stays in the page for
// screen readers and search.

const BURST = 1.5 // the headline holds this long (to be read), then the work bursts out
const TEXT_FADE = 0.7 // the headline fades out over this as the work grows
const OUT_TIME = 1.4 // a card's flight: very fast at first, easing into place
const GLOBE_SPIN = 0.2 // the globe turns this many radians per second
const GLOBE_TILT = -0.28
const START_Z = 5 // cards start in the middle of the depth range (z 0 back .. 20 front)

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const lerp = (a, b, t) => a + (b - a) * t
const outExpo = (p) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p))
const rand = (seed) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function fibSphere(n) {
  const out = []
  const ga = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - ((i + 0.5) / n) * 2
    const r = Math.sqrt(1 - y * y)
    out.push([Math.cos(ga * i) * r, y, Math.sin(ga * i) * r])
  }
  return out
}

export const CollageGlobe = (container) => {
  const collage = container.querySelector('.collage-animation_layout')
  if (!collage) return
  const originals = Array.from(
    collage.querySelectorAll('.collage-animation_image-wrapper')
  )
  if (!originals.length) return
  const headline = container.querySelector('h1')

  const isMobile = window.matchMedia('(max-width: 479px)').matches
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  // ── Cards ──
  // Webflow mirrors each image (rotateY 180°) for the classic spin; face them
  // front (360°, keeping their 3D layer).
  const originalMedia = originals
    .map((w) => w.querySelector('img, video'))
    .filter(Boolean)
  gsap.set(originalMedia, {
    rotationY: 360,
    scaleX: 1.1,
    scaleY: 1.1,
    opacity: 1,
  })
  gsap.set(originals, { opacity: 0 })
  const sharp = [...originals, ...addExtraCards(collage, originals)]
  gsap.set(collage, { transformStyle: 'preserve-3d' })
  gsap.set(sharp, { willChange: 'transform, opacity' })

  // ── The headline ──
  // The real headline stays exactly where it is (no copy, no re-layout, so
  // it never jumps) and simply fades out as the work bursts out.
  const text = headline

  const setters = (el) => ({
    x: gsap.quickSetter(el, 'x', 'px'),
    y: gsap.quickSetter(el, 'y', 'px'),
    z: gsap.quickSetter(el, 'z', 'px'),
    scaleX: gsap.quickSetter(el, 'scaleX'),
    scaleY: gsap.quickSetter(el, 'scaleY'),
    rotation: gsap.quickSetter(el, 'rotation', 'deg'),
    opacity: gsap.quickSetter(el, 'opacity'),
  })

  const globe = fibSphere(sharp.length)
  const cards = sharp.map((el, i) => ({
    el,
    set: setters(el),
    g: globe[i],
    tilt: (rand(i + 5) - 0.5) * 14,
    spinOut: (rand(i + 8) - 0.5) * 70, // tumble as it flies out
    appear: BURST + rand(i + 7) * 0.06,
    warm: false,
  }))

  // Warm-up: drawing 24 images for the first time costs a lot, so it never
  // happens mid-animation. Each image decodes off the main thread, then cards
  // switch on one per frame at an invisible opacity (0.001: the browser draws
  // and keeps them) before the burst.
  const warmQueue = []
  cards.forEach((c) => {
    const img = c.el.querySelector('img')
    const done = () => warmQueue.push(c)
    if (img && img.decode) img.decode().then(done, done)
    else done()
  })
  function warmOne(t) {
    let c = warmQueue.shift()
    if (!c) c = cards.find((k) => !k.warm && t > k.appear - 0.3)
    if (c) c.warm = true
  }

  // ── Measuring (on start and on resize) ──
  let W = 0
  let H = 0
  function measure() {
    W = collage.offsetWidth
    H = collage.offsetHeight
  }
  measure()
  window.addEventListener('resize', measure)

  // ── Grab and spin ──
  const area = collage.closest('section') || collage.parentElement
  const finePointer = window.matchMedia('(pointer: fine)').matches
  area.style.touchAction = 'pan-y' // vertical swipes still scroll the page
  if (finePointer) area.style.cursor = 'grab'
  sharp.forEach((el) =>
    el.querySelectorAll('img').forEach((img) => (img.draggable = false))
  )
  const spinState = {
    yaw: 0, // added by dragging and flicking
    pitch: 0, // tilt from dragging up/down (mouse only), springs back
    vYaw: 0, // radians per second, decays after a flick
    vPitch: 0,
    dragging: false,
    pending: false, // pointer down, not yet moved far enough to count as a drag
    id: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastMove: 0,
    mouse: false,
  }
  const perPx = () => (Math.PI * 1.6) / Math.max(320, W) // drag across = ~0.8 turn
  area.addEventListener('pointerdown', (e) => {
    if (e.button) return
    if (e.target.closest('a, button, input, textarea, select, [role="button"]'))
      return
    Object.assign(spinState, {
      pending: true,
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      lastMove: performance.now(),
      mouse: e.pointerType === 'mouse',
    })
    if (spinState.mouse) e.preventDefault() // no text selection while dragging
  })
  area.addEventListener('pointermove', (e) => {
    const st = spinState
    if (e.pointerId !== st.id || (!st.pending && !st.dragging)) return
    if (st.pending) {
      // only a real drag (a few px) takes over, so clicks still work
      if (Math.hypot(e.clientX - st.startX, e.clientY - st.startY) < 4) return
      st.pending = false
      st.dragging = true
      st.vYaw = 0
      st.vPitch = 0
      if (area.setPointerCapture) area.setPointerCapture(e.pointerId)
      if (st.mouse) area.style.cursor = 'grabbing'
    }
    const now = performance.now()
    const dt = Math.max(8, now - st.lastMove) / 1000
    const k = perPx()
    const dYaw = (e.clientX - st.lastX) * k
    const dPitch = st.mouse ? -(e.clientY - st.lastY) * k * 0.6 : 0
    st.yaw += dYaw
    st.pitch = Math.max(-0.7, Math.min(0.7, st.pitch + dPitch))
    // smoothed hand speed, for the flick
    st.vYaw = lerp(st.vYaw, dYaw / dt, 0.5)
    st.vPitch = lerp(st.vPitch, dPitch / dt, 0.5)
    st.lastX = e.clientX
    st.lastY = e.clientY
    st.lastMove = now
  })
  const release = (e) => {
    const st = spinState
    if (e.pointerId !== st.id) return
    if (st.dragging) {
      // held still before letting go: no flick
      if (performance.now() - st.lastMove > 90) {
        st.vYaw = 0
        st.vPitch = 0
      }
      st.vYaw = Math.max(-14, Math.min(14, st.vYaw))
      st.vPitch = Math.max(-4, Math.min(4, st.vPitch))
      if (st.mouse && finePointer) area.style.cursor = 'grab'
    }
    st.dragging = false
    st.pending = false
    st.id = null
  }
  area.addEventListener('pointerup', release)
  area.addEventListener('pointercancel', release)

  const setTextOpacity = text ? gsap.quickSetter(text, 'opacity') : null
  let textGone = false
  let lastT = 0

  function render(t) {
    warmOne(t)
    if (text && !textGone) {
      const p = clamp01((t - BURST) / TEXT_FADE)
      setTextOpacity(1 - p * p * (3 - 2 * p))
      if (p >= 1) textGone = true
    }
    // after a flick: keep spinning, slowing down; tilt springs back
    const dt = Math.min(0.1, Math.max(0, t - lastT))
    lastT = t
    const st = spinState
    if (!st.dragging) {
      st.yaw += st.vYaw * dt
      st.vYaw *= Math.exp(-1.3 * dt)
      st.pitch += st.vPitch * dt
      st.vPitch *= Math.exp(-4 * dt)
      st.pitch *= Math.exp(-1.5 * dt)
      st.pitch = Math.max(-0.7, Math.min(0.7, st.pitch))
    }
    const yaw = GLOBE_SPIN * Math.max(0, t - BURST) + st.yaw
    const pitch = GLOBE_TILT + st.pitch
    const GX = W * (isMobile ? 0.44 : 0.4)
    const GY = H * (isMobile ? 0.34 : 0.38)
    const base = isMobile ? 0.55 : 0.72

    cards.forEach((c) => {
      if (t < c.appear) {
        c.set.opacity(c.warm ? 0.001 : 0)
        return
      }
      // its place on the turning globe: big at the front, small at the back,
      // pulled in towards the middle at the back
      const g = c.g
      const gx = g[0] * Math.cos(yaw) + g[2] * Math.sin(yaw)
      const gz1 = -g[0] * Math.sin(yaw) + g[2] * Math.cos(yaw)
      const gy = g[1] * Math.cos(pitch) - gz1 * Math.sin(pitch)
      const gz = g[1] * Math.sin(pitch) + gz1 * Math.cos(pitch)
      const depth = (gz + 1) / 2
      const persp = 0.72 + 0.4 * depth
      const ux = gx * GX * persp
      const uy = gy * GY * persp
      const uScale = base * (0.4 + 0.9 * depth)

      // burst out from the middle
      const lp = clamp01((t - c.appear) / OUT_TIME)
      const leave = outExpo(lp)
      c.set.x(ux * leave)
      c.set.y(uy * leave)
      // z only sorts the cards against each other; tiny values so
      // the hero's own 3D perspective doesn't scale them
      c.set.z(lerp(START_Z, depth * 20, leave))
      const sc = lerp(0.04, uScale, leave)
      c.set.scaleX(sc)
      c.set.scaleY(sc)
      c.set.rotation(lerp(c.spinOut, c.tilt, leave))
      c.set.opacity(clamp01((t - c.appear) / 0.08))
    })
  }

  if (reduceMotion) {
    cards.forEach((c) => (c.warm = true))
    render(BURST + OUT_TIME + 6)
    return
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
    if (visible || t < BURST + OUT_TIME) render(t)
  })
}
