import gsap from 'gsap'
import SplitType from 'split-type'

import { addExtraCards } from './CollageExtras'

// About page hero: the headline becomes a dot orb, the orb becomes the work.
//
// 1. Text      – the headline shows as it does now, then holds.
// 2. Into orb  – from the centre out, each letter flies to its place in a
//                turning orb, shrinking slowly on the way so it arrives as a
//                dot. Each letter becomes one of the orb's flowing particles.
// 3. Orb       – faint dotted loops (orbit paths) inside a round outline, with
//                bright particles flowing along them, bigger and brighter at
//                the front, so the orb churns (after the Thinking Orbs
//                component on 21st.dev; drawn from scratch here).
// 4. Burst     – the orb winds up (pulls in, spins faster), then fires out:
//                the 24 biggest particles become the work and fly out at once,
//                fast at first and slowing smoothly into place; the rest of
//                the dust blasts out and fades away.
// 5. Globe     – the work sits on one big invisible globe that sweeps slowly
//                round: each card travels from the front (big) round to the
//                back (small) and forward again. Cards are always opaque. On desktop the
//                globe leans a little towards the mouse.
//
// Everything runs off one clock (gsap.ticker) and each phase blends into the
// next, so nothing stops and restarts. Dots are drawn on one canvas, and
// stacking follows depth through 3D z, never z-index changes.

// Timings (seconds)
const FLY = 1.5 // headline holds this long (to be read), then letters fly in
const LETTER_SPREAD = 0.9 // the outermost letters leave this much later
const FLY_TIME = 1.3 // a letter's flight; it becomes a dot as it arrives
const TRAILS_IN = [2.0, 3.9] // the faint orbit loops fade in over this window
const EXTRA_IN = [2.7, 4.1] // particles that aren't letters fade in
const WIND = 4.4 // wind-up: the orb pulls in, its spin and flow speed up…
const WIND_TIME = 1.1
const WIND_SPIN = 3.5 // extra turn (radians) the orb gains over the wind-up
const WIND_FLOW = 2.2 // extra flow along the loops over the wind-up
const BURST = WIND + WIND_TIME // …then everything fires out at once
const OUT_TIME = 1.3 // cards: very fast at first, easing hard into place
const DUST_TIME = 0.9 // the leftover dust blasts out and fades
const GLOBE_SPIN = 0.2 // the globe of work turns this many radians per second
const GLOBE_TILT = -0.28

const CURVES = 9 // orbit loops
const TRAIL_DOTS = 140 // faint dots drawn along each loop (they read as a line)
const MIN_PARTICLES = 48
const TILT = -0.35 // the orb is seen slightly from above
const SPIN = 0.22 // slow turn of the whole orb, radians per second

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const lerp = (a, b, t) => a + (b - a) * t
const smooth = (p) => p * p * (3 - 2 * p)
const inOutCubic = (p) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
const outExpo = (p) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p))
const rand = (seed) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

// A closed, loopy orbit inside the unit sphere: longitude, latitude and radius
// each oscillate with small whole-number frequencies, then the loop is turned
// to its own orientation.
function makeCurve(k) {
  const a = 1 + (k % 3)
  const b = 2 + ((k * 2) % 3)
  const c = 1 + ((k + 1) % 3)
  const ph = [rand(k + 31), rand(k + 32), rand(k + 33)].map((v) => v * 6.283)
  const ry = rand(k + 34) * 6.283
  const rx = (rand(k + 35) - 0.5) * 2.4
  const cy = Math.cos(ry)
  const sy = Math.sin(ry)
  const cx = Math.cos(rx)
  const sx = Math.sin(rx)
  return (u) => {
    const th = a * u + ph[0]
    const pol = Math.PI / 2 + 1.15 * Math.sin(b * u + ph[1])
    const r = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(c * u + ph[2]))
    let x = r * Math.cos(th) * Math.sin(pol)
    let y = r * Math.cos(pol)
    let z = r * Math.sin(th) * Math.sin(pol)
    const y2 = y * cx - z * sx
    z = y * sx + z * cx
    y = y2
    const x2 = x * cy + z * sy
    z = -x * sy + z * cy
    x = x2
    return [x, y, z]
  }
}

// Wind-up progress: speeds up (cubic) to the burst, then its speed dies away
// smoothly instead of stopping, so the spin carries into the burst.
function windAt(t) {
  const x = clamp01((t - WIND) / WIND_TIME)
  let a = x * x * x
  if (t > BURST) {
    const vEnd = 3 / WIND_TIME
    a += vEnd * 0.35 * (1 - Math.exp(-(t - BURST) / 0.35))
  }
  return a
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

// Rotate about Y by a, then tilt about X; returns [x, y, depth 0 back..1 front].
function turn(p, a) {
  const x = p[0] * Math.cos(a) + p[2] * Math.sin(a)
  const z1 = -p[0] * Math.sin(a) + p[2] * Math.cos(a)
  const y = p[1] * Math.cos(TILT) - z1 * Math.sin(TILT)
  const z = p[1] * Math.sin(TILT) + z1 * Math.cos(TILT)
  return [x, y, (z + 1) / 2]
}

export const CollageOrb = (container) => {
  const collage = container.querySelector('.collage-animation_layout')
  const stage = collage && collage.parentElement
  if (!collage || !stage) return
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
  // Webflow mirrors each image (rotateY 180°) for the classic spin; this
  // animation doesn't spin, so face them front (360°, keeping their 3D layer).
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
  const extras = addExtraCards(collage, originals)
  const sharp = [...originals, ...extras]

  gsap.set(collage, { transformStyle: 'preserve-3d' })
  gsap.set(sharp, { willChange: 'transform, opacity' })

  const setters = (el) => ({
    x: gsap.quickSetter(el, 'x', 'px'),
    y: gsap.quickSetter(el, 'y', 'px'),
    z: gsap.quickSetter(el, 'z', 'px'),
    scaleX: gsap.quickSetter(el, 'scaleX'),
    scaleY: gsap.quickSetter(el, 'scaleY'),
    rotation: gsap.quickSetter(el, 'rotation', 'deg'),
    opacity: gsap.quickSetter(el, 'opacity'),
  })

  // Each card's place on the globe of work: spread evenly over a sphere.
  const globe = fibSphere(sharp.length)
  const cards = sharp.map((el, i) => {
    return {
      el,
      a: setters(el),
      g: globe[i],
      tilt: (rand(i + 5) - 0.5) * 14,
      appear: BURST + rand(i + 7) * 0.06,
      spinOut: (rand(i + 8) - 0.5) * 70, // tumble as it flies out
      particle: null, // the orb particle this card grows from
      w: 180,
      warm: false, // drawn once at an invisible opacity (see warm-up below)
    }
  })

  // Warm-up: drawing 24 images for the first time
  // costs a lot, so it never happens mid-animation. Each card's image decodes
  // off the main thread, then cards are switched on one per frame at an
  // invisible opacity (0.001: the browser draws and keeps them), early on while
  // nothing is moving yet.
  const warmQueue = []
  cards.forEach((c) => {
    const img = c.el.querySelector('img')
    const done = () => warmQueue.push(c)
    if (img && img.decode) img.decode().then(done, done)
    else done()
  })
  function warmOne(t) {
    let c = warmQueue.shift()
    // anything still not decoded when its card is due is used anyway
    if (!c) c = cards.find((k) => !k.warm && t > k.appear - 0.3)
    if (c) c.warm = true
  }

  // ── Canvas for every dot ──
  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  Object.assign(canvas.style, {
    position: 'absolute',
    pointerEvents: 'none',
  })
  stage.insertBefore(canvas, stage.firstChild)
  const ctx = canvas.getContext('2d')

  // A soft white dot (solid core, soft edge), drawn once and stamped for
  // every particle: softer than a flat circle and cheaper than shadows.
  const sprite = document.createElement('canvas')
  sprite.width = sprite.height = 64
  {
    const g = sprite.getContext('2d')
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32)
    grd.addColorStop(0, 'rgba(255,255,255,1)')
    grd.addColorStop(0.5, 'rgba(255,255,255,1)')
    grd.addColorStop(0.62, 'rgba(255,255,255,0.35)')
    grd.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = grd
    g.fillRect(0, 0, 64, 64)
  }

  // ── The orb: loops and particles ──
  const curves = Array.from({ length: CURVES }, (_, k) => makeCurve(k))
  // Faint dots along every loop.
  const trail = []
  curves.forEach((curve, k) => {
    for (let n = 0; n < TRAIL_DOTS; n++) {
      trail.push({
        p: curve((n / TRAIL_DOTS) * Math.PI * 2),
        fadeIn: lerp(TRAILS_IN[0], TRAILS_IN[1], rand(k * 97 + n)),
      })
    }
  })

  // ── Letters ──
  let letters = []
  if (headline) {
    headline.setAttribute('aria-label', headline.textContent.trim())
    const split = SplitType.create(headline, { types: 'words, chars' })
    letters = (split.chars || []).map((el, i) => ({
      el,
      i,
      x: 0,
      y: 0,
      h: 30,
      delay: 0,
      set: {
        x: gsap.quickSetter(el, 'x', 'px'),
        y: gsap.quickSetter(el, 'y', 'px'),
        scaleX: gsap.quickSetter(el, 'scaleX'),
        scaleY: gsap.quickSetter(el, 'scaleY'),
        opacity: gsap.quickSetter(el, 'opacity'),
      },
    }))
    gsap.set(
      letters.map((l) => l.el),
      { display: 'inline-block' }
    )
  }

  // Particles flowing along the loops: one per letter, plus extras so the
  // orb is never thin. The 24 biggest become the work.
  const count = Math.max(MIN_PARTICLES, letters.length, cards.length)
  const cardEvery = count / cards.length
  const particles = Array.from({ length: count }, (_, j) => {
    const k = j % CURVES
    const sizeClass = rand(j + 41) < 0.3 ? 'mid' : 'small'
    return {
      curve: curves[k],
      u0: rand(j + 42) * Math.PI * 2,
      speed: lerp(0.45, 0.85, rand(j + 43)) * (k % 2 ? 1 : -1),
      size:
        sizeClass === 'mid'
          ? lerp(2.0, 2.6, rand(j + 44))
          : lerp(1.1, 1.7, rand(j + 44)),
      bright: sizeClass === 'small' ? lerp(0.45, 0.7, rand(j + 45)) : 0.95,
      letter: letters[j] || null,
      fadeIn: lerp(EXTRA_IN[0], EXTRA_IN[1], rand(j + 46)),
      card: null,
      // where the particle is this frame (filled in by place())
      x: 0,
      y: 0,
      d: 0,
      r: 0,
    }
  })
  cards.forEach((c, i) => {
    const p = particles[Math.min(count - 1, Math.floor(i * cardEvery))]
    c.particle = p
    p.card = c
    // the particles that become the work are the biggest, brightest ones
    p.size = lerp(3.0, 4.2, rand(i + 47))
    p.bright = 0.95
  })

  // ── Measuring (on start and on resize) ──
  let W = 0
  let H = 0
  let dpr = 1
  let R0 = 0
  function measure() {
    const sr = stage.getBoundingClientRect()
    const cr = collage.getBoundingClientRect()
    W = cr.width
    H = cr.height
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    Object.assign(canvas.style, {
      left: `${cr.left - sr.left}px`,
      top: `${cr.top - sr.top}px`,
      width: `${W}px`,
      height: `${H}px`,
    })
    canvas.width = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)
    R0 = Math.min(W, H) * (isMobile ? 0.09 : 0.07)
    // Card sizes are read here, never in the frame loop (no layout reads there).
    cards.forEach((c) => {
      c.w = c.el.offsetWidth || 180
    })
    // Letter centres relative to the hero centre (letters at rest).
    const cx = cr.left + W / 2
    const cy = cr.top + H / 2
    let maxD = 1
    letters.forEach((l) => {
      const r = l.el.getBoundingClientRect()
      // scaling is about the centre, so the centre is right at any scale
      // (letters are measured before they move: transforms are reset first)
      l.x = r.left + r.width / 2 - cx - (gsap.getProperty(l.el, 'x') || 0)
      l.y = r.top + r.height / 2 - cy - (gsap.getProperty(l.el, 'y') || 0)
      l.h = l.el.offsetHeight || 30
      maxD = Math.max(maxD, Math.hypot(l.x, l.y * 2))
    })
    letters.forEach((l) => {
      l.delay =
        (Math.hypot(l.x, l.y * 2) / maxD) * LETTER_SPREAD +
        rand(l.i + 808) * 0.15
    })
  }
  measure()
  window.addEventListener('resize', measure)

  let mouseX = 0
  let mouseY = 0
  const par = { x: 0, y: 0 }
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('pointermove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = (e.clientY / window.innerHeight) * 2 - 1
    })
  }

  let lettersDone = false

  // A particle's brightness: by depth; letter particles appear as their letter
  // lands, the others fade in on their own.
  function particleAlpha(p, t) {
    let on
    if (p.letter) {
      const f = clamp01((t - FLY - p.letter.delay) / FLY_TIME)
      on = smooth(clamp01((f - 0.8) / 0.2))
    } else {
      on = smooth(clamp01((t - p.fadeIn) / 0.7))
    }
    return (0.4 + 0.6 * p.d) * p.bright * on
  }

  function render(t) {
    warmOne(t)
    const wind = Math.pow(clamp01((t - WIND) / WIND_TIME), 3)
    const windA = windAt(t)
    const spin = SPIN * t + WIND_SPIN * windA
    const R = R0 * (1 - 0.22 * wind)
    // dot sizes: readable however small the globe is
    const sizeK = Math.min(1.2, Math.max(0.5, R0 / 110))
    const dust = outExpo(clamp01((t - BURST) / DUST_TIME))
    par.x += (mouseX - par.x) * 0.05
    par.y += (mouseY - par.y) * 0.05

    // ── particles: where each one is this frame ──
    particles.forEach((p) => {
      const q = turn(p.curve(p.u0 + p.speed * (t + WIND_FLOW * windA)), spin)
      p.x = q[0] * R
      p.y = q[1] * R
      p.d = q[2]
      p.r = p.size * (0.6 + 0.6 * p.d) * sizeK
    })

    // ── letters: fly to their particle, shrinking slowly into a dot ──
    if (!lettersDone) {
      let allGone = true
      letters.forEach((l, j) => {
        const p = particles[j]
        const f = clamp01((t - FLY - l.delay) / FLY_TIME)
        const m = inOutCubic(f)
        l.set.x((p.x - l.x) * m)
        l.set.y((p.y - l.y) * m)
        const end = (p.r * 2) / (l.h * 0.6)
        // shrinks as it moves in (same curve as its flight), so it arrives as
        // a dot
        const sc = lerp(1, end, m)
        l.set.scaleX(sc)
        l.set.scaleY(sc)
        l.set.opacity(1 - smooth(clamp01((f - 0.8) / 0.2)))
        if (f < 1) allGone = false
      })
      lettersDone = allGone && t > FLY + LETTER_SPREAD + FLY_TIME + 0.3
      if (lettersDone) {
        gsap.set(
          letters.map((l) => l.el),
          { opacity: 0 }
        )
      }
    }

    // ── dots ──
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#fff'
    // tiny dots as squares, bigger ones as the soft sprite (core radius = r)
    const drawDot = (x, y, r, a) => {
      if (a <= 0.003 || r <= 0) return
      ctx.globalAlpha = Math.min(1, a)
      if (r < 1.1) {
        ctx.fillRect(W / 2 + x - r, H / 2 + y - r, r * 2, r * 2)
      } else {
        ctx.drawImage(
          sprite,
          W / 2 + x - r * 2,
          H / 2 + y - r * 2,
          r * 4,
          r * 4
        )
      }
    }
    // at the burst every dot that isn't a card blasts outwards and fades
    const toStar = (s, x, y, r, a) =>
      drawDot(x * (1 + 3 * dust), y * (1 + 3 * dust), r, a * (1 - dust))
    const dustGone = dust >= 0.999

    // faint orbit loops
    if (!dustGone)
      trail.forEach((s) => {
        const q = turn(s.p, spin)
        const a = (0.06 + 0.15 * q[2]) * smooth(clamp01((t - s.fadeIn) / 0.8))
        toStar(
          s,
          q[0] * R,
          q[1] * R,
          Math.max(0.5, (0.4 + 0.3 * q[2]) * sizeK),
          a
        )
      })

    // particles that aren't cards (cards draw their own below)
    if (!dustGone) {
      particles.forEach((p) => {
        if (p.card) return
        toStar(p, p.x, p.y, p.r, particleAlpha(p, t))
      })
    }
    // the globe of work: its turn, leaning a little towards the mouse
    const yaw = GLOBE_SPIN * Math.max(0, t - BURST) + par.x * 0.35
    const pitch = GLOBE_TILT + par.y * 0.2
    const GX = W * (isMobile ? 0.44 : 0.4)
    const GY = H * (isMobile ? 0.34 : 0.38)

    // ── cards, each growing out of its particle ──
    cards.forEach((c) => {
      const p = c.particle
      const bx = p.x
      const by = p.y
      const bd = p.d
      const dotR = p.r
      const appear = clamp01((t - c.appear) / 0.08)
      const lp = clamp01((t - c.appear) / OUT_TIME)
      const leave = outExpo(lp)

      // the particle, until its card takes over
      const dotA = particleAlpha(p, t) * (1 - appear)
      if (dotA > 0.003) drawDot(bx, by, dotR, dotA)

      const floor = c.warm ? 0.001 : 0
      if (t < c.appear) {
        c.a.opacity(floor)
        return
      }

      // its place on the turning globe: big and bright at the front,
      // small and dim at the back, pulled in towards the middle at the back
      const g = c.g
      const gx = g[0] * Math.cos(yaw) + g[2] * Math.sin(yaw)
      const gz1 = -g[0] * Math.sin(yaw) + g[2] * Math.cos(yaw)
      const gy = g[1] * Math.cos(pitch) - gz1 * Math.sin(pitch)
      const gz = g[1] * Math.sin(pitch) + gz1 * Math.cos(pitch)
      const depth = (gz + 1) / 2
      const persp = 0.72 + 0.4 * depth
      const ux = gx * GX * persp
      const uy = gy * GY * persp
      const base = isMobile ? 0.88 : 0.72
      const uScale = base * (0.4 + 0.9 * depth)
      const uRot = c.tilt

      const startScale = (dotR * 2.2) / c.w
      const x = lerp(bx, ux, leave)
      const y = lerp(by, uy, leave)
      // grows straight to its size, slowing down smoothly (no overshoot)
      const sc = lerp(startScale, uScale, leave)
      const rot = lerp(c.spinOut, uRot, leave)
      // z only sorts the cards by depth; keep it tiny so the hero's own 3D
      // perspective doesn't scale them.
      const z = lerp(bd * 4, depth * 20, leave)
      const op = appear

      c.a.x(x)
      c.a.y(y)
      c.a.z(z)
      c.a.scaleX(sc)
      c.a.scaleY(sc)
      c.a.rotation(rot)
      c.a.opacity(Math.max(floor, op))
    })
    ctx.globalAlpha = 1
  }

  if (reduceMotion) {
    letters.forEach((l) => l.set.opacity(0))
    lettersDone = true
    render(BURST + 12)
    return
  }

  // Skip work while the hero is off screen (the clock keeps running).
  let visible = true
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    }).observe(stage)
  }

  const start = gsap.ticker.time
  gsap.ticker.add(() => {
    const t = gsap.ticker.time - start
    if (visible || t < BURST + OUT_TIME) render(t)
  })
}
