import p5 from 'p5'

export function CreateASCII(
  className,
  blockSize = 8,
  asciiChars = '@%#*+=-:. ',
  hoverRadius = 200 // Editable hover radius in pixels.
) {
  // Find the element with the given class name.
  const originalElem = document.querySelector('.' + className)
  if (!originalElem) {
    console.error("Element with class '" + className + "' not found.")
    return
  }

  // Get the element’s dimensions.
  let width = originalElem.offsetWidth
  let height = originalElem.offsetHeight
  if (!width || !height) {
    const rect = originalElem.getBoundingClientRect()
    width = Math.floor(rect.width)
    height = Math.floor(rect.height)
  }

  // Determine if the element is a video (or image) and get its source.
  const tagName = originalElem.tagName.toLowerCase()
  const isVideo = tagName === 'video'
  const src =
    originalElem.src ||
    originalElem.currentSrc ||
    originalElem.getAttribute('src')
  const elemId = originalElem.id

  // Create a container div to replace the original element.
  // This container will inherit the original classes and id and will have the same dimensions.
  const container = document.createElement('div')
  container.className = originalElem.className
  if (elemId) container.id = elemId
  container.style.width = width + 'px'
  container.style.height = height + 'px'

  // Replace the original element with the container.
  const parent = originalElem.parentNode
  parent.insertBefore(container, originalElem)
  parent.removeChild(originalElem)

  // Create a new p5 instance that will attach a canvas to the container.
  new p5((p) => {
    let sourceMedia
    let mediaLoaded = false
    let mediaWidth, mediaHeight

    p.setup = function () {
      // Create a canvas with the original element’s dimensions.
      p.createCanvas(width, height).parent(container)
      // Using a higher pixelDensity if desired.
      p.pixelDensity(2)
      p.textFont('monospace')
      p.textSize(blockSize)
      p.textAlign(p.CENTER, p.CENTER)

      // Determine the resolution at which to sample the media.
      // (This is the number of “blocks” horizontally and vertically.)
      mediaWidth = Math.floor(width / blockSize)
      mediaHeight = Math.floor(height / blockSize)

      if (isVideo) {
        // For videos, create the p5 video element and set its size to the lower resolution.
        sourceMedia = p.createVideo([src], () => {
          sourceMedia.loop()
          // We don't show the video element itself.
          sourceMedia.hide()
        })
        sourceMedia.size(mediaWidth, mediaHeight)
        mediaLoaded = true // Assume video is ready once set up.
      } else {
        // For images, load the image and resize it to our lower resolution.
        sourceMedia = p.loadImage(src, () => {
          sourceMedia.resize(mediaWidth, mediaHeight)
          mediaLoaded = true
        })
      }
    }

    p.draw = function () {
      if (!sourceMedia || !mediaLoaded) return

      // For both video and static images, update continuously
      // so that the hover effect (based on p.mouseX/p.mouseY) is dynamic.

      // Ensure the media’s pixels are updated.
      sourceMedia.loadPixels()

      // Clear the canvas (black background) and set text color (white).
      p.background(0)
      p.fill(255)

      // Iterate over every “block” (i.e. each pixel of our low-res media).
      for (let i = 0; i < mediaWidth; i++) {
        for (let j = 0; j < mediaHeight; j++) {
          // Calculate the index in the media's pixels array.
          let pixelIndex = (i + j * mediaWidth) * 4
          let r = sourceMedia.pixels[pixelIndex]
          let g = sourceMedia.pixels[pixelIndex + 1]
          let b = sourceMedia.pixels[pixelIndex + 2]

          // Compute the average brightness.
          let bright = (r + g + b) / 3
          // Map the brightness value (100–255) to an index in the asciiChars string.
          let tIndex = p.floor(p.map(bright, 100, 250, asciiChars.length, 0))
          if (tIndex >= asciiChars.length) {
            tIndex = asciiChars.length - 1
          }

          // Compute the center position of this block on the canvas.
          let x = i * blockSize + blockSize / 2
          let y = j * blockSize + blockSize / 2

          // If the mouse is over the canvas, modify the ascii character in a circular area.
          if (
            p.mouseX >= 0 &&
            p.mouseX <= width &&
            p.mouseY >= 0 &&
            p.mouseY <= height
          ) {
            let d = p.dist(x, y, p.mouseX, p.mouseY)
            if (d < hoverRadius) {
              // Linear fade: at center fadeFactor = 1, at edge fadeFactor = 0.
              let fadeFactor = 1 - d / hoverRadius
              // Determine how far we can shift tIndex toward the lightest character (space).
              let maxShift = asciiChars.length - tIndex + 1
              let shift = p.floor(maxShift * fadeFactor)
              tIndex = tIndex + shift
              if (tIndex >= asciiChars.length) {
                tIndex = asciiChars.length - 1
              }
            }
          }

          let t = asciiChars.charAt(tIndex)
          p.text(t, x, y)
        }
      }
    }
  })
}
