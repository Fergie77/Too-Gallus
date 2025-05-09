exports.handler = async function () {
  const response = await fetch('https://ra.co/graphql', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query GET_POPULAR_EVENTS($filters: FilterInputDtoInput, $pageSize: Int) {
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
      }`,
      variables: {
        filters: {
          areas: { eq: 229 },
          listingDate: { gte: '2023-06-01', lte: '2023-08-04' },
          listingPosition: { eq: 1 },
        },
        pageSize: 10,
      },
    }),
  })

  const json = await response.json()
  return {
    statusCode: 200,
    body: JSON.stringify(json.data.eventListings.data),
  }
}
