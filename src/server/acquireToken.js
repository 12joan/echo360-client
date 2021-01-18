const fetch = require('node-fetch')

const acquireToken = (code, appId) => {
  return fetch('https://login.echo360.org.uk/api/v1/token/retrieve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId: appId,
      code: code
    })
  })
    .then(response => response.json())
    .then(response => Promise.resolve(response["token"]))
}

module.exports = acquireToken
