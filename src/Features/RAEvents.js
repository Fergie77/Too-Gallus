import gsap from 'gsap'

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

// export function logRAEvents(events) {
//   //console.log('🎟️ RA Events:')
//   // If events is not an array, wrap it in an array
//   const eventArray = Array.isArray(events) ? events : [events]
//   eventArray.forEach(({ event, ...rest }) => {
//     // If the object is a single event, it won't have an 'event' property
//     const e = event || rest
//     console.log({
//       title: e.title,
//       date: new Date(e.date).toLocaleDateString(),
//       venue: e.venue.name,
//       attending: e.attending,
//       link: `https://ra.co${e.contentUrl}`,
//       image: e.images[0]?.filename ?? 'No image',
//     })
//   })
// }

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
  // console.log('events', events, id)

  // Ensure events is always an array
  const eventArray = Array.isArray(events) ? events : [events]

  const elements = document.querySelectorAll('.mc_events_item')
  elements.forEach((element) => {
    const image = element.querySelector('.mc_events_item_image')
    const date = element.querySelector('.mc_events_item_date')
    const heading = element.querySelector('.mc_events_item_heading')
    const idText = element
      .querySelector('.mc_events_item_id')
      ?.textContent?.trim()
    const attending = element.querySelector('.mc_events_item_attending')
    const venue = element.querySelector('.mc_events_item_location')
    const link = element.querySelector('.mc_events_item_link')

    // Find the event with a matching id
    const matchedEvent = eventArray.find((e) => {
      // Support both {event, ...rest} and direct event object
      const eventObj = e.event || e
      return String(eventObj.id) === idText
    })

    if (!matchedEvent) return // Skip if no matching event
    const eventObj = matchedEvent.event || matchedEvent

    // Remove Webflow image attributes and set only the RA image
    if (image) {
      image.removeAttribute('srcset')
      image.removeAttribute('sizes')
      image.src =
        eventObj.images?.[0]?.filename ??
        'https://cdn.prod.website-files.com/6675303cee30c2e7a7543b50/6808e56c4103fad41924fd1b_000071%20copy.webp'
    }
    if (date) {
      const d = new Date(eventObj.date)
      const options = { weekday: 'short', day: '2-digit', month: 'long' }
      // Format: Sat, 12 April
      date.textContent = d
        .toLocaleDateString('en-GB', options)
        .replace(/\s/, ', ')
    }
    if (heading) heading.textContent = eventObj.title
    if (attending) attending.textContent = eventObj.attending
    if (venue) venue.textContent = eventObj.venue?.name
    if (link) link.href = `https://ra.co${eventObj.contentUrl}`
    setTimeout(() => {
      eventLoaded(element)
    }, 1000)
  })
}

// Fetch and log GraphQL introspection info from Netlify function
export async function logRAIntrospection() {
  try {
    const res = await fetch(
      'https://toogallus.netlify.app/.netlify/functions/getEvents?introspect=true'
    )
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const introspection = await res.json()
    console.log('🎛️ RA GraphQL Introspection:', introspection)
    return introspection
  } catch (err) {
    console.error('Failed to fetch RA introspection:', err)
    return null
  }
}

// Optionally, call this function somewhere for debugging:
// logRAIntrospection()

export async function fetchPromoterEvents(promoterId, type) {
  try {
    let url = `https://toogallus.netlify.app/.netlify/functions/getEvents?id=${promoterId}&idType=promoter`
    if (type) {
      url += `&eventType=${type}`
    }
    const res = await fetch(url)
    if (!res.ok) {
      const errorData = await res.json()
      const details = Array.isArray(errorData.details)
        ? errorData.details.map((d) => JSON.stringify(d)).join('\n')
        : JSON.stringify(errorData.details)
      throw new Error(
        `HTTP error! status: ${res.status}, error: ${errorData.error}, details: ${details}`
      )
    }
    const events = await res.json()
    //logRAEvents(events)
    return events
  } catch (err) {
    console.error('Failed to fetch promoter events:', err)
    return []
  }
}

// Demo: Fetch and log events for promoter 69759
//fetchPromoterEvents('69759')

export async function renderPastEventsForPromoter(promoterId) {
  // Fetch events for the promoter
  const events = await fetchPromoterEvents(promoterId, 'PREVIOUS')
  if (!Array.isArray(events) || events.length === 0) return

  // Find the template and container
  const template = document.querySelector('[mc-element="past-event"]')
  if (!template) {
    console.error('No [mc-element="past-event"] template found!')
    return
  }
  const container = template.parentElement

  // Remove all but the template itself
  container
    .querySelectorAll('[mc-element="past-event"]:not(:first-child)')
    .forEach((el) => el.remove())

  // For each event, clone and populate
  events.forEach((event) => {
    const clone = template.cloneNode(true)
    // Populate fields (adjust selectors as needed)
    const heading = clone.querySelector('.mc_events_item_heading')
    if (heading) heading.textContent = event.title
    const date = clone.querySelector('.mc_events_item_date')
    if (date)
      date.textContent = new Date(event.date)
        .toLocaleDateString('en-GB', {
          weekday: 'short',
          day: '2-digit',
          month: 'long',
        })
        .replace(/\s/, ', ')
    const location = clone.querySelector('.mc_events_item_location')
    if (location) location.textContent = event.venue?.name || ''
    const attending = clone.querySelector('.mc_events_item_attending')
    if (attending) attending.textContent = event.attending
    const link = clone.querySelector('.mc_events_item_link')
    if (link) link.href = `https://ra.co${event.contentUrl}`
    const image = clone.querySelector('.mc_events_item_image')
    if (image && event.images && event.images[0]) {
      image.removeAttribute('srcset')
      image.removeAttribute('sizes')
      image.src = event.images[0].filename
    }

    eventLoaded(clone)
    // Append to container
    container.appendChild(clone)
  })
  // Optionally hide the template
  template.style.display = 'none'
}

export async function renderUpcomingEventsForPromoter(promoterId) {
  // Fetch events for the promoter with type 'LATEST'
  const events = await fetchPromoterEvents(promoterId, 'LATEST')
  if (!Array.isArray(events) || events.length === 0) return

  // Find the template and container
  const template = document.querySelector('[mc-element="upcoming-event"]')
  if (!template) {
    console.error('No [mc-element="upcoming-event"] template found!')
    return
  }
  const container = template.parentElement

  // Remove all but the template itself
  container
    .querySelectorAll('[mc-element="upcoming-event"]:not(:first-child)')
    .forEach((el) => el.remove())

  // For each event, clone and populate
  events.forEach((event) => {
    const clone = template.cloneNode(true)
    // Populate fields (adjust selectors as needed)
    const heading = clone.querySelector('.mc_events_item_heading')
    if (heading) heading.textContent = event.title
    const date = clone.querySelector('.mc_events_item_date')
    if (date)
      date.textContent = new Date(event.date)
        .toLocaleDateString('en-GB', {
          weekday: 'short',
          day: '2-digit',
          month: 'long',
        })
        .replace(/\s/, ', ')
    const location = clone.querySelector('.mc_events_item_location')
    if (location) location.textContent = event.venue?.name || ''
    const attending = clone.querySelector('.mc_events_item_attending')
    if (attending) attending.textContent = event.attending
    const link = clone.querySelector('.mc_events_item_link')
    if (link) link.href = `https://ra.co${event.contentUrl}`
    const image = clone.querySelector('.mc_events_item_image')
    if (image && event.images && event.images[0]) {
      image.removeAttribute('srcset')
      image.removeAttribute('sizes')
      image.src = event.images[0].filename
    }

    eventLoaded(clone)

    // Append to container
    container.appendChild(clone)
  })
  // Optionally hide the template
  template.style.display = 'none'
}
