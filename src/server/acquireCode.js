const FormData = require('form-data')
const fetch = require('node-fetch')
const url = require('url')

const acquireCode = (nonce, appId, institutionId) => {
  const formData = new FormData()
  formData.append('nonce', nonce)

  const url = new URL('https://login.echo360.org.uk/login/echoidp/complete')
  url.searchParams.append('appId', appId)
  url.searchParams.append('institutionId', institutionId)
  url.searchParams.append('domain', 'echo360.org.uk')

  return fetch(url, {
    method: 'POST',
    redirect: 'manual',
    body: formData
  }).then(response => {
    const redirectLocation = response.headers.get('location')
    const redirectTo = (new URL(redirectLocation)).searchParams.get('redirectTo')
    const code = (new URL(redirectTo)).searchParams.get('code')
    return Promise.resolve(code)
  })
}

module.exports = acquireCode
