const express = require('express')
const bodyParser = require('body-parser')

const acquireInstitutionId = require('./acquireInstitutionId')
const acquireNonce = require('./acquireNonce')
const acquireCode = require('./acquireCode')
const acquireToken = require('./acquireToken')
const fetchSections = require('./fetchSections')
const fetchLessons = require('./fetchLessons')
const acquireCloudfrontUrls = require('./acquireCloudfrontUrls')

const appId = '61dca414-007f-4b10-8434-456a40bb7a7e' // Echo360 iOS client

const app = express()

app.use(express.static('dist'))

app.post('/api/login', bodyParser.json(), (req, res) => {
  const { email, password } = req.body

  acquireInstitutionId(email, appId)
    .then((institutionId) => {
      return acquireNonce(email, password, appId, institutionId)
        .then((nonce) => acquireCode(nonce, appId, institutionId))
        .then((code) => acquireToken(code, appId))
        .then((token) => res.send({
          ok: true,
          token: token,
          institutionId: institutionId
        }))
    })
    .catch((err) => {
      console.error(err)
      res.send({ ok: false })
    })
})

app.post('/api/fetchSections', bodyParser.json(), (req, res) => {
  const { institutionId, token } = req.body

  fetchSections(institutionId, token)
    .then((sections) => res.send({ ok: true, sections: sections }))
    .catch((err) => {
      console.error(err)
      res.send({ ok: false })
    })
})

app.post('/api/fetchLessons', bodyParser.json(), (req, res) => {
  const { sectionId, token } = req.body

  fetchLessons(sectionId, token)
    .then((lessons) => {
      return acquireCloudfrontUrls(lessons.map((lesson) => lesson.s3Url), token)
        .then((urls) => {
          res.send({
            ok: true,
            lessons: lessons.map((lesson, i) => ({
              ...lesson,
              publicUrl: urls[i]
            }))
          })
        })
    })
    .catch((err) => {
      console.error(err)
      res.send({ ok: false })
    })
})

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
)
