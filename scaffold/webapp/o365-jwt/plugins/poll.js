'use strict'

const log = require('~/lib/logger')()
const user = require('~/lib/user')

module.exports = function (fastify, opts, next) {

  fastify.get('/poll', async function (req, reply) {
    log.trace(`received request for /poll`)
    let payload = {}
    payload.authenticated = false
    try {
      if (req.credentials && req.credentials.username) {
        payload.authenticated = true
        payload.user = await user.getInfo(req.credentials.username)
      }
    } catch (err) {
      log.error(`error in /poll: ${err.message}`)
      log.debug(err.stack)
    } finally {
      reply.send(payload)
    }
  })

  next()

}
