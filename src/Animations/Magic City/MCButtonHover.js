export function MCButtonHover(container) {
  const buttons = container.querySelectorAll(
    '.mc_button_wrapper, .mc_events_link-layout'
  )
  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      button.querySelector('.mc_button_arrow').classList.add('expanded')
    })
    button.addEventListener('mouseleave', () => {
      button.querySelector('.mc_button_arrow').classList.remove('expanded')
    })
  })
}
