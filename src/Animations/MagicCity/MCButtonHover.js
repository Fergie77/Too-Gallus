export function MCButtonHover(container) {
  const buttons = container.querySelectorAll('.mc_button_wrapper')
  const psuedoButtons = container.querySelectorAll('.mc_events_link-layout')
  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      button.querySelector('.mc_button_arrow').classList.add('expanded')
    })
    button.addEventListener('mouseleave', () => {
      button.querySelector('.mc_button_arrow').classList.remove('expanded')
    })
  })

  psuedoButtons.forEach((button, selectedIndex) => {
    button.addEventListener('mouseenter', () => {
      console.log(selectedIndex)
      psuedoButtons.forEach((button, index) => {
        if (index !== selectedIndex) {
          button.classList.add('unselected')
        }
      })
      button.querySelector('.mc_button').classList.add('hover')
      button.querySelector('.mc_button_arrow').classList.add('expanded')
    })
    button.addEventListener('mouseleave', () => {
      psuedoButtons.forEach((button, index) => {
        if (index !== selectedIndex) {
          button.classList.remove('unselected')
        }
      })
      button.querySelector('.mc_button').classList.remove('hover')
      button.querySelector('.mc_button_arrow').classList.remove('expanded')
    })
  })
}
