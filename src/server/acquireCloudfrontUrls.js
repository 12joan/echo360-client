const fetch = require('node-fetch')

const acquireCloudfrontUrls = (resourceUrls, token) => {
  return fetch('https://echo360.org.uk/api/v1/media/cloudfront_urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(
      resourceUrls.map(resourceUrl => ({
        key: resourceUrl,
        uri: resourceUrl,
        expiresAt: '2099-01-01T12:00:00.000Z'
      }))
    )
  })
    .then(response => response.json())
    .then(response => {
      return Promise.resolve(
        response["data"].map(urlsData => urlsData.uri)
      )
    })
}

module.exports = acquireCloudfrontUrls
