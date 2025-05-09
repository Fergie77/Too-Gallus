// src/Features/RAEvents.js

export async function fetchRAEvents() {
  try {
    const res = await fetch(
      'https://toogallus.netlify.app/.netlify/functions/getEvents?promoterId=69759'
    )
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const events = await res.json()
    return events
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
