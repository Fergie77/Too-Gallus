import KeenSlider from 'keen-slider'

export const FreddiesCaseStudySlider = () => {
  const animation = { duration: 25000, easing: (t) => t }

  new KeenSlider('.is-slider', {
    mode: 'snap',
    selector: '.case-study-image',
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
    slides: () => [
      {
        size: 0.5,
        spacing: 0.01,
      },
      {
        size: 1,
        spacing: 0.01,
      },
      {
        size: 0.5,
        spacing: 0.01,
      },
      {
        size: 1,
        spacing: 0.01,
      },
    ],
  })
}

export const ButtermilkCaseStudySlider = () => {
  const animation = { duration: 25000, easing: (t) => t }

  new KeenSlider('.is-slider', {
    mode: 'snap',
    selector: '.case-study-image',
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
    slides: () => [
      {
        size: 0.5,
        spacing: 0.01,
      },
      {
        size: 0.5,
        spacing: 0.01,
      },
      {
        size: 0.5,
        spacing: 0.01,
      },
      {
        size: 0.5,
        spacing: 0.01,
      },
    ],
  })
}
