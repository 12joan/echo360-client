const fetch = require('node-fetch')

const dig = (object, path) =>
  path.reduce(
    (o, key) => o && o[key] ? o[key] : undefined,
    object
  )

const fetchLessons = (sectionId, token) => {
  const url = `https://echo360.org.uk/api/v1/section/${
    encodeURIComponent(sectionId)
  }/lesson/withMedia`

  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(response => {
      return Promise.resolve(
        response["data"][0]["lessons"].map(lessonData => {
          const primaryFiles = dig(
            lessonData,
            ["video", "media", "media", "current", "primaryFiles"]
          )

          const lessonName = dig(lessonData, ["lesson", "name"])

          if (primaryFiles && primaryFiles.length > 0 && lessonName) {
            const largestFile = primaryFiles.reduce((r, x) =>
              r.size > x.size ? r : x
            )

            return {
              name: lessonData["lesson"]["name"],
              s3Url: largestFile.s3Url
            }
          } else {
            return undefined
          }
        }).filter(x => x)
      )
    })
}

module.exports = fetchLessons
