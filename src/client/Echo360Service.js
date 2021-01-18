exports.performLogin = (options) =>
  fetch('/api/login', {
    method: 'POST',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options)
  })
    .then(response => response.json())
    .then(response =>
      response.ok ? Promise.resolve(response) : Promise.reject(response)
    )


exports.fetchSections = (options) =>
  fetch('/api/fetchSections', {
    method: 'POST',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options)
  })
    .then(response => response.json())
    .then(response =>
      response.ok ? Promise.resolve(response) : Promise.reject(response)
    )

exports.fetchLessons = (options) =>
  fetch('/api/fetchLessons', {
    method: 'POST',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options)
  })
    .then(response => response.json())
    .then(response =>
      response.ok ? Promise.resolve(response) : Promise.reject(response)
    )
