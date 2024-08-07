import KeenSlider from 'keen-slider'

export const projectSliderAnimation = (container) => {
  const slider = container.querySelectorAll('.sliding-images')
  var animation = { duration: 30000, easing: (t) => t }

  slider.forEach((element) => {
    const slider = new KeenSlider(element, {
      selector: '.project-background-video',
      slides: {
        perView: 2,
      },
      loop: true,
      renderMode: 'performance',
      drag: false,
      created(s) {
        s.moveToIdx(5, true, animation)
      },
      updated(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      },
      animationEnded(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      },
    })
    slider
  })
}
