exports.handler = async function (event) {
  const eventId = event.queryStringParameters && event.queryStringParameters.id
  const promoterId =
    event.queryStringParameters && event.queryStringParameters.promoterId
  const page =
    parseInt(event.queryStringParameters && event.queryStringParameters.page) ||
    1
  const pageSize =
    parseInt(
      event.queryStringParameters && event.queryStringParameters.pageSize
    ) || 10

  let query, variables
  if (eventId) {
    // Query a specific event
    query = `
      query GET_EVENT($id: ID!) {
        event(id: $id) {
          id
          title
          attending
          date
          contentUrl
          images { filename }
          venue { name }
        }
      }
    `
    variables = { id: eventId }
  } else if (promoterId) {
    // Query events by promoter with pagination and more fields
    query = `
      query GET_PROMOTER_EVENTS($promoterId: ID!, $page: Int!, $pageSize: Int!) {
        eventListings(
          filters: { promoters: { eq: $promoterId } }
          page: $page
          pageSize: $pageSize
          sort: { date: { order: DESCENDING } }
        ) {
          data {
            id
            title
            date
            venue { id name contentUrl }
            artists { id name contentUrl }
            contentUrl
          }
        }
      }
    `
    variables = { promoterId: parseInt(promoterId), page, pageSize }
  } else {
    // Default: popular events
    query = `
      query GET_POPULAR_EVENTS($filters: FilterInputDtoInput, $pageSize: Int) {
        eventListings(filters: $filters, pageSize: $pageSize, page: 1, sort: { attending: { priority: 1, order: DESCENDING } }) {
          data {
            event {
              id
              title
              attending
              date
              contentUrl
              images { filename }
              venue { name }
            }
          }
        }
      }
    `
    variables = {
      filters: {
        areas: { eq: 229 },
        listingDate: { gte: '2023-06-01', lte: '2023-08-04' },
        listingPosition: { eq: 1 },
      },
      pageSize: 10,
    }
  }

  const response = await fetch('https://ra.co/graphql', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  const json = await response.json()

  let result
  if (eventId) {
    result = json.data.event
  } else if (promoterId) {
    // The new query returns data directly, not wrapped in event
    result = json.data.eventListings.data || []
  } else {
    result = json.data.eventListings.data
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify(result),
  }
}
