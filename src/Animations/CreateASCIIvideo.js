export function CreateASCIIVideo(className) {
  let asciiChar =
    "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,^`'. "
  let size = 4
  let videoElement = document
    .querySelector(`.${className}`)
    .querySelector('video')

  if (!videoElement) {
    console.error(`No video element found with class name: ${className}`)
    return
  }

  videoElement.width = videoElement.videoWidth / size
  videoElement.height = videoElement.videoHeight / size
  let canvas = document.createElement('canvas')
  canvas.width = videoElement.width * size
  canvas.height = videoElement.height * size
  document.body.appendChild(canvas)

  let context = canvas.getContext('2d')

  function draw() {
    context.drawImage(
      videoElement,
      0,
      0,
      videoElement.width,
      videoElement.height
    )
    let imageData = context.getImageData(
      0,
      0,
      videoElement.width,
      videoElement.height
    )
    let pixels = imageData.data

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < videoElement.width; i++) {
      for (let j = 0; j < videoElement.height; j++) {
        let pixelIndex = (i + j * videoElement.width) * 4
        let r = pixels[pixelIndex + 0]
        let g = pixels[pixelIndex + 1]
        let b = pixels[pixelIndex + 2]

        let bright = (r + g + b) / 3
        let tIndex = Math.floor(map(bright, 0, 255, 0, asciiChar.length))

        let x = i * size + size / 2
        let y = j * size + size / 2
        let t = asciiChar.charAt(tIndex)

        context.fillStyle = 'black'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.font = `${size}px monospace`
        context.fillText(t, x, y)
      }
    }

    requestAnimationFrame(draw)
  }

  videoElement.addEventListener('play', function () {
    if (!videoElement.paused && !videoElement.ended) {
      draw()
    }
  })

  if (videoElement.paused) {
    videoElement.play()
  }
}

function map(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
}
