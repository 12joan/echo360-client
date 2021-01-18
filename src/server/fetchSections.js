const fetch = require('node-fetch')

const fetchSections = (institutionId, token) => {
  const url = `https://echo360.org.uk/api/v1/${
    encodeURIComponent(institutionId)
  }/section/Student`

  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(response => {
      return Promise.resolve(
        response["data"].map(sectionData => ({
          id: sectionData["section"]["id"],
          name: sectionData["section"]["sectionNumber"]
        }))
      )
    })
}

module.exports = fetchSections
