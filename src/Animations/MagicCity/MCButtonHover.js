export function MCButtonHover(container) {
  const buttons = container.querySelectorAll('.mc_button_wrapper')
  const psuedoButtons = container.querySelectorAll('.mc_events_link-layout')

  buttons.forEach((button) => {
    addButtonHover(button)
  })

  psuedoButtons.forEach((button) => {
    addPseudoButtonHover(button, psuedoButtons)
  })
}

// Function to add hover effects to a single button element
export function addButtonHover(button) {
  button.addEventListener('mouseenter', () => {
    const arrow = button.querySelector('.mc_button_arrow')
    if (arrow) arrow.classList.add('expanded')
  })
  button.addEventListener('mouseleave', () => {
    const arrow = button.querySelector('.mc_button_arrow')
    if (arrow) arrow.classList.remove('expanded')
  })
}

// Function to add hover effects to a single pseudo button (event link)
export function addPseudoButtonHover(button, allPseudoButtons = null) {
  // If allPseudoButtons not provided, find them in the same container
  if (!allPseudoButtons) {
    const container = button.closest('[data-barba-namespace]') || document
    allPseudoButtons = container.querySelectorAll('.mc_events_link-layout')
  }

  const selectedIndex = Array.from(allPseudoButtons).indexOf(button)

  button.addEventListener('mouseenter', () => {
    allPseudoButtons.forEach((btn, index) => {
      if (index !== selectedIndex) {
        btn.classList.add('unselected')
      }
    })
    const mcButton = button.querySelector('.mc_button')
    const arrow = button.querySelector('.mc_button_arrow')
    if (mcButton) mcButton.classList.add('hover')
    if (arrow) arrow.classList.add('expanded')
  })

  button.addEventListener('mouseleave', () => {
    allPseudoButtons.forEach((btn, index) => {
      if (index !== selectedIndex) {
        btn.classList.remove('unselected')
      }
    })
    const mcButton = button.querySelector('.mc_button')
    const arrow = button.querySelector('.mc_button_arrow')
    if (mcButton) mcButton.classList.remove('hover')
    if (arrow) arrow.classList.remove('expanded')
  })
}
