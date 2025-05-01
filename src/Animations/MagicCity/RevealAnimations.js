import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

export function RevealAnimations(container) {
  // Handle zoom-out animations
  const zoomElements = container.querySelectorAll('[animation="zoom-out"]')
  zoomElements.forEach((element) => {
    element.style.transform = 'perspective(500px)'

    gsap.from(element, {
      y: 100,
      z: -100,
      filter: 'blur(50px)',
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom 100%',
        toggleActions: 'play none none none',
      },
    })
  })

  //Handle smoke reveal animations
  const smokeElements = container.querySelectorAll('[animation="smoke-reveal"]')
  smokeElements.forEach((element) => {
    // Create wrapper container
    const wrapper = document.createElement('div')
    wrapper.className = 'shader-container'
    wrapper.style.position = 'relative'
    wrapper.style.width = '100%'
    wrapper.style.height = '100%'
    element.parentNode.insertBefore(wrapper, element)
    wrapper.appendChild(element)

    // Create canvas
    const canvas = document.createElement('canvas')
    canvas.id = 'shaderCanvas-' + Math.random().toString(36).substr(2, 9) // Unique ID
    canvas.style.position = 'absolute'
    canvas.style.opacity = '0'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '1'
    wrapper.insertBefore(canvas, element)

    // Ensure the text is above the canvas
    element.style.position = 'relative'
    element.style.zIndex = '2'

    // --- Performance improvements ---
    let scene, camera, renderer, uniforms, material, geometry, mesh
    let startTime = null
    let animationFrameId = null
    let isAnimating = false
    let lastFrameTime = 0
    const TARGET_FPS = 60
    const CANVAS_SCALE = 0.4 // Lower resolution for performance
    let lastDataUrl = ''
    let lastMaskUpdate = 0
    const MASK_UPDATE_INTERVAL = 2 // Only update mask every N frames
    let frameCount = 0

    function isSafari() {
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    }

    function initThree() {
      scene = new THREE.Scene()
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        preserveDrawingBuffer: true,
        premultipliedAlpha: false,
      })
      uniforms = {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(1.0, 1.0) },
        u_seed: { value: Math.random() * 1000 },
      }
      material = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        fragmentShader: `
          precision highp float;
          uniform float u_time;
          uniform vec2 u_resolution;
          uniform float u_seed;

          float rand(vec2 p) {
            return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = rand(i);
            float b = rand(i + vec2(1.0, 0.0));
            float c = rand(i + vec2(0.0, 1.0));
            float d = rand(i + vec2(1.0, 1.0));
            vec2 u = f*f*(3.0 - 2.0*f);
            return mix(a, b, u.x) +
                   (c - a) * u.y * (1.0 - u.x) +
                   (d - b) * u.x * u.y;
          }

          float fbm(vec2 p) {
            float total = 0.0;
            float amplitude = 0.5;
            for (int i = 0; i < 3; i++) {
              total += noise(p) * amplitude;
              p *= 2.0;
              amplitude *= 0.5;
            }
            return total;
          }

          void main() {
            vec2 uv = gl_FragCoord.xy / u_resolution.xy;
            uv -= 0.5;
            uv.x *= u_resolution.x / u_resolution.y;
            uv += 0.5;

            vec2 motion = vec2(u_time * 0.1);

            uv = uv * 3.0 + motion + vec2(u_seed * 0.1);

            float n = fbm(uv);

            float revealFactor = clamp(u_time * 0.6, 0.0, 1.0);

            float edgeStart = mix(0.05, 0.8, revealFactor);
            float edgeEnd   = mix(0.1, 1.0, revealFactor);

            float alpha = 1.0 - smoothstep(edgeStart, edgeEnd, n);

            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
          }
        `,
      })
      geometry = new THREE.PlaneGeometry(2, 2)
      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
    }

    function resize() {
      if (!renderer || !uniforms) return
      const rect = element.getBoundingClientRect()
      const pixelRatio = window.devicePixelRatio || 1
      const width = rect.width * pixelRatio * CANVAS_SCALE
      const height = rect.height * pixelRatio * CANVAS_SCALE
      renderer.setSize(width, height, false)
      renderer.setPixelRatio(pixelRatio)
      uniforms.u_resolution.value.set(width, height)
      canvas.width = width
      canvas.height = height
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
    }

    function cleanup() {
      window.removeEventListener('resize', resize)
      if (renderer) renderer.dispose()
      if (geometry) geometry.dispose()
      if (material) material.dispose()
      if (scene && mesh) scene.remove(mesh)
      if (canvas && canvas.parentNode) canvas.remove()
      scene = camera = renderer = uniforms = material = geometry = mesh = null
      isAnimating = false
      startTime = null
      animationFrameId = null
      lastFrameTime = 0
      lastDataUrl = ''
      lastMaskUpdate = 0
      frameCount = 0
    }

    function animate(time) {
      if (!startTime) startTime = time
      if (time - lastFrameTime < 1000 / TARGET_FPS) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }
      lastFrameTime = time
      const elapsed = (time - startTime) * 0.001
      const shaderTime = Math.max(elapsed, 0.0)
      uniforms.u_time.value = shaderTime
      const revealFactor = Math.min(shaderTime * 0.6, 1.0)
      renderer.render(scene, camera)
      frameCount++
      // Only update mask every MASK_UPDATE_INTERVAL frames
      if (frameCount % MASK_UPDATE_INTERVAL === 0 || revealFactor >= 1.0) {
        const dataUrl = canvas.toDataURL()
        if (dataUrl !== lastDataUrl) {
          if (isSafari()) {
            element.style.webkitMaskImage = `url(${dataUrl})`
            element.style.maskImage = ''
          } else {
            element.style.webkitMaskImage = `url(${dataUrl})`
            element.style.maskImage = `url(${dataUrl})`
          }
          lastDataUrl = dataUrl
        }
      }
      if (revealFactor < 1.0 && isAnimating) {
        animationFrameId = requestAnimationFrame(animate)
      } else if (revealFactor >= 1.0) {
        cleanup()
      }
    }

    // Set up ScrollTrigger
    let scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      onEnter: () => {
        gsap.to(element, { opacity: 1, duration: 1 })
        if (!isAnimating) {
          isAnimating = true
          startTime = null // Reset start time
          if (!scene) initThree()
          resize()
          window.addEventListener('resize', resize)
          animationFrameId = requestAnimationFrame(animate)
        }
      },
      onLeave: () => {
        // Clean up if user scrolls away before animation completes
        if (isAnimating) cleanup()
      },
      once: true, // Only trigger once
    })
  })
}
