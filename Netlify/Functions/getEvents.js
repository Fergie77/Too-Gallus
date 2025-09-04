// Introspection query using the global fetch API (Node 18+)
const introspectionQuery = `
  query IntrospectionQuery {
    __schema {
      types {
        name
        kind
        fields { name }
      }
    }
  }
`

fetch('https://ra.co/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: introspectionQuery }),
})
  .then((res) => res.json())
  .then((json) => console.log(JSON.stringify(json, null, 2)))
  .catch((err) => console.error('Introspection error:', err))

exports.handler = async function (event) {
  // Check for introspection request
  if (
    event.queryStringParameters &&
    event.queryStringParameters.introspect === 'true'
  ) {
    const introspectionQuery = `
      query IntrospectionQuery {
        __schema {
          types {
            name
            kind
            fields { name }
          }
        }
      }
    `

    const response = await fetch('https://ra.co/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: introspectionQuery }),
    })

    const json = await response.json()

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(json),
    }
  }

  // Introspection for EventQueryType enum values
  if (
    event.queryStringParameters &&
    event.queryStringParameters.eventQueryTypes === 'true'
  ) {
    const enumQuery = `
      query IntrospectEventQueryTypeEnum {
        __type(name: \"EventQueryType\") {
          name
          enumValues { name description }
        }
      }
    `
    const response = await fetch('https://ra.co/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: enumQuery }),
    })
    const json = await response.json()
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(json),
    }
  }

  const eventId = event.queryStringParameters && event.queryStringParameters.id
  const idType =
    event.queryStringParameters && event.queryStringParameters.idType

  let query, variables
  if (idType === 'promoter' && eventId) {
    // Query events for a specific promoter
    const eventType =
      event.queryStringParameters && event.queryStringParameters.eventType
    query = `
      query GET_PROMOTER_EVENTS($id: ID!, $type: EventQueryType!) {
        promoter(id: $id) {
          id
          name
          events(type: $type) {
            id
            title
            attending
            date
            time
            startTime
            endTime
            contentUrl
            images { filename }
            venue { name }
          }
        }
      }
    `
    variables = { id: eventId, type: eventType || 'PREVIOUS' }
  } else if (eventId) {
    // Query a specific event
    query = `
      query GET_EVENT($id: ID!) {
        event(id: $id) {
          id
          title
          attending
          date
          time
          contentUrl
          images { filename }
          venue { name }
        }
      }
    `
    variables = { id: eventId }
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
              time
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

  if (!json.data) {
    // Log and return the error for debugging
    console.error('GraphQL error:', json.errors)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'GraphQL error', details: json.errors }),
    }
  }

  let result
  if (idType === 'promoter' && eventId) {
    result = json.data.promoter?.events || []
  } else if (eventId) {
    result = json.data.event
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
