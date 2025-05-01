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

  // Handle smoke reveal animations
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

    // Set up Three.js
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      preserveDrawingBuffer: true,
      premultipliedAlpha: false,
    })

    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(1.0, 1.0) },
      u_seed: { value: Math.random() * 1000 },
    }

    const material = new THREE.ShaderMaterial({
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

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    function resize() {
      const rect = element.getBoundingClientRect()
      const pixelRatio = window.devicePixelRatio || 1
      renderer.setSize(rect.width * pixelRatio, rect.height * pixelRatio)
      renderer.setPixelRatio(pixelRatio)
      uniforms.u_resolution.value.set(
        rect.width * pixelRatio,
        rect.height * pixelRatio
      )
    }

    let startTime = null
    let animationFrameId = null
    let isAnimating = false

    function animate(time) {
      if (!startTime) startTime = time

      const elapsed = (time - startTime) * 0.001
      const shaderTime = Math.max(elapsed - 1.0, 0.0)

      uniforms.u_time.value = shaderTime

      // Check if animation is complete (reveal factor reaches 1.0)
      const revealFactor = Math.min(shaderTime * 0.6, 1.0)

      renderer.render(scene, camera)
      const dataUrl = canvas.toDataURL()
      element.style.webkitMaskImage = `url(${dataUrl})`
      element.style.maskImage = `url(${dataUrl})`

      // If not fully revealed and still animating, continue animation
      if (revealFactor < 1.0 && isAnimating) {
        animationFrameId = requestAnimationFrame(animate)
      } else if (revealFactor >= 1.0) {
        // Clean up resources when animation is complete
        window.removeEventListener('resize', resize)
        renderer.dispose()
        geometry.dispose()
        material.dispose()
        scene.remove(mesh)
        canvas.remove()
      }
    }

    // Set up ScrollTrigger
    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      markers: true,
      onEnter: () => {
        if (!isAnimating) {
          isAnimating = true
          startTime = null // Reset start time
          resize()
          animationFrameId = requestAnimationFrame(animate)
        }
      },
      once: true, // Only trigger once
    })

    window.addEventListener('resize', resize)
    resize()
  })
}
