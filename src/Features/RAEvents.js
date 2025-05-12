import gsap from 'gsap'

// src/Features/RAEvents.js

export async function fetchRAEvents(element, id) {
  try {
    const res = await fetch(
      `https://toogallus.netlify.app/.netlify/functions/getEvents?id=${id}`
    )
    if (!res.ok) {
      const errorData = await res.json()
      // Stringify the details for better logging
      const details = Array.isArray(errorData.details)
        ? errorData.details.map((d) => JSON.stringify(d)).join('\n')
        : JSON.stringify(errorData.details)
      throw new Error(
        `HTTP error! status: ${res.status}, error: ${errorData.error}, details: ${details}`
      )
    }

    const events = await res.json()

    return { events, id }
  } catch (err) {
    console.error('Failed to fetch RA events:', err)
    return []
  }
}

export function logRAEvents(events) {
  console.log('🎟️ RA Events:')
  // If events is not an array, wrap it in an array
  const eventArray = Array.isArray(events) ? events : [events]
  eventArray.forEach(({ event, ...rest }) => {
    // If the object is a single event, it won't have an 'event' property
    const e = event || rest
    console.log({
      title: e.title,
      date: new Date(e.date).toLocaleDateString(),
      venue: e.venue.name,
      attending: e.attending,
      link: `https://ra.co${e.contentUrl}`,
      image: e.images[0]?.filename ?? 'No image',
    })
  })
}

export function eventLoaded(element) {
  const loadingElements = element.querySelectorAll('.preload')
  const preloaderElements = element.querySelectorAll('.pseudo-element-loader')

  gsap.to(preloaderElements, {
    opacity: 0,
    duration: 1,
    ease: 'ease.inOut',
    onComplete: () => {
      loadingElements.forEach((element) => {
        element.classList.remove('preload')
      })
      preloaderElements.forEach((el) => {
        el.classList.remove('loading')
      })
    },
  })
}

export function setUpcomingRAEvents(events, id) {
  console.log('events', events, id)

  const elements = document.querySelectorAll('.mc_upcoming-events_item')
  elements.forEach((element) => {
    const image = element.querySelector('.mc_upcoming-events_item_image')
    const date = element.querySelector('.mc_upcoming-events_item_date')
    const heading = element.querySelector('.mc_upcoming-events_item_heading')
    const id = element.querySelector('.mc_upcoming-events_item_id').textContent
    const attending = element.querySelector(
      '.mc_upcoming-events_item_attending'
    )
    const venue = element.querySelector('.mc_upcoming-events_item_location')
    const link = element.querySelector('.mc_upcoming-events_item_link')

    // Remove Webflow image attributes and set only the RA image
    if (image) {
      image.removeAttribute('srcset')
      image.removeAttribute('sizes')
      image.src = events.images[0]?.filename ?? 'No image'
    }
    if (date) {
      const d = new Date(events.date)
      const options = { weekday: 'short', day: '2-digit', month: 'long' }
      // Format: Sat, 12 April
      date.textContent = d
        .toLocaleDateString('en-GB', options)
        .replace(/\s/, ', ')
    }
    if (heading) heading.textContent = events.title
    if (attending) attending.textContent = events.attending
    if (venue) venue.textContent = events.venue.name
    if (link) link.href = `https://ra.co${events.contentUrl}`
    setTimeout(() => {
      eventLoaded(element)
    }, 1000)
  })

  // const eventArray = Array.isArray(events) ? events : [events]
  // eventArray.forEach(({ event, ...rest }) => {
  //   // If the object is a single event, it won't have an 'event' property
  //   const e = event || rest

  // })
}
