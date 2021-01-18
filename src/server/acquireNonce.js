const FormData = require('form-data')
const fetch = require('node-fetch')
const url = require('url')

const acquireNonce = (email, password) => {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)
  formData.append('callbackUrl', 'null') // not used
  formData.append('readOnly', 'readonly')

  return fetch('https://idp.echo360.org.uk/login', {
    method: 'POST',
    redirect: 'manual',
    body: formData
  }).then(response => {
    const redirectLocation = response.headers.get('location')
    const nonce = (new URL(redirectLocation)).searchParams.get('nonce')
    return Promise.resolve(nonce)
  })
}

module.exports = acquireNonce
