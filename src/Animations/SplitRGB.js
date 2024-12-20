import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

import { EffectComposer } from '/node_modules/three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from '/node_modules/three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from '/node_modules/three/examples/jsm/postprocessing/ShaderPass.js'

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export const splitRGB = () => {
  let camera, scene, renderer, composer, renderPass, customPass
  let geometry, material, mesh, texture
  let splitAmount = { value: 0.1 } // Initialize to maximum split

  const img = document.getElementById('texture')

  const dummyimg = document.createElement('img')
  dummyimg.crossOrigin = 'anonymous'

  dummyimg.onload = function () {
    document.body.classList.remove('loading')
    img.style.opacity = 0
    texture = new THREE.Texture(this)
    texture.needsUpdate = true

    init()
    animate()
    setupScrollTriggers()
  }
  dummyimg.src = img.src

  function init() {
    scene = new THREE.Scene()

    geometry = new THREE.PlaneGeometry(1, 0.6)
    material = new THREE.MeshBasicMaterial({
      map: texture,
    })
    mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.domElement.classList.add('split-container')
    const canvasParent = document.querySelector('#canvas-parent')
    const w = canvasParent.offsetWidth
    const h = canvasParent.offsetHeight
    renderer.setSize(w, h)
    canvasParent.appendChild(renderer.domElement)

    camera = new THREE.PerspectiveCamera(70, w / h, 0.01, 10)
    camera.position.z = 0.5

    // Post processing
    composer = new EffectComposer(renderer)
    renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const myEffect = {
      uniforms: {
        tDiffuse: { value: null },
        resolution: {
          value: new THREE.Vector2(1, window.innerHeight / window.innerWidth),
        },
        splitAmount: { value: splitAmount.value },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        uniform float splitAmount;
        varying vec2 vUv;

        void main() {
          // Invert the y-coordinate to make the effect stronger at the bottom
          float invertedY = 1.0 - vUv.y;
          // Calculate the split based on the inverted y position with a quadratic curve
          float splitStrength = splitAmount * pow(invertedY, 2.0);

          // Shift UV coordinates for each color channel
          vec2 redUV = vUv + vec2(splitStrength * 0.6 * (0.98 - 2.0 * vUv.x) * invertedY, 0.0);
          
          // Modify greenUV to curve left and right only at the bottom
          // Interpolate the shift based on the inverted y position
          vec2 greenUV = vUv + vec2(splitStrength * 0.6 * (1.02 - 2.0 * vUv.x) * invertedY, 0.0);
          
          vec2 blueUV = vUv + vec2(splitStrength * 0.65 * (1.02 - 2.0 * vUv.x) * invertedY, 0.0);

          // Sample the texture
          float r = texture2D(tDiffuse, redUV).r;
          float g = texture2D(tDiffuse, greenUV).g;
          float b = texture2D(tDiffuse, blueUV).b;

          gl_FragColor = vec4(r, g, b, 1.0);
        }
      `,
    }

    customPass = new ShaderPass(myEffect)
    customPass.renderToScreen = true
    composer.addPass(customPass)

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false)
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    composer.setSize(window.innerWidth, window.innerHeight)
    customPass.material.uniforms.resolution.value.set(
      window.innerWidth,
      window.innerHeight
    )
  }

  function animate() {
    requestAnimationFrame(animate)
    composer.render()
  }

  // Setup multiple ScrollTriggers
  function setupScrollTriggers() {
    // ScrollTrigger for controlling splitAmount based on scroll
    gsap.to(splitAmount, {
      value: 0.0, // Target value when scrolled past
      ease: 'none',
      scrollTrigger: {
        trigger: '.split-container', // Element that triggers the effect
        start: 'top top', // When the top of trigger hits the top of viewport
        end: 'bottom 50%', // When the bottom of trigger hits the top of viewport
        scrub: true, // Smoothly scrubs the animation
        // markers: true, // Uncomment to see ScrollTrigger markers for debugging
      },
      onUpdate: () => {
        customPass.material.uniforms.splitAmount.value = splitAmount.value
      },
    })

    // ScrollTrigger for controlling the Y position of the mesh
    gsap.from(mesh.position, {
      y: -0.5, // Target Y position (adjust as needed)
      ease: 'none',
      scrollTrigger: {
        trigger: '.split-container', // Element that triggers the animation
        start: 'top center', // When the top of trigger hits the center of viewport
        end: 'bottom 70%', // When the bottom of trigger hits the center of viewport
        scrub: true, // Smoothly scrubs the animation
        markers: true, // Uncomment to see ScrollTrigger markers for debugging
      },
      onUpdate: () => {
        // If you need to perform additional actions on update, add them here
      },
    })
  }
}
