const FormData = require('form-data')
const fetch = require('node-fetch')
const url = require('url')

const acquireInstitutionId = (email, appId) => {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('appId', appId)
  formData.append('requestedResource', '')

  return fetch('https://login.echo360.org/login/institutions', {
    method: 'POST',
    redirect: 'manual',
    body: formData
  }).then(response => {
    const redirectLocation = response.headers.get('location')
    const callbackUrl = (new URL(redirectLocation)).searchParams.get('callbackUrl')
    const institutionId = (new URL(callbackUrl)).searchParams.get('institutionId')
    return Promise.resolve(institutionId)
  })
}

module.exports = acquireInstitutionId
