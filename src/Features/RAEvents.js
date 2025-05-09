// src/Features/RAEvents.js

export async function fetchRAEvents() {
  try {
    const res = await fetch('/.netlify/functions/getEvents')
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
  events.forEach(({ event }) => {
    console.log({
      title: event.title,
      date: new Date(event.date).toLocaleDateString(),
      venue: event.venue.name,
      attending: event.attending,
      link: `https://ra.co${event.contentUrl}`,
      image: event.images[0]?.filename ?? 'No image',
    })
  })
}
