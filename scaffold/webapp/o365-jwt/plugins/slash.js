'use strict'

const api = require('~/lib/api')
const user = require('~/lib/user')
const log = require('~/lib/logger')()

module.exports = function (fastify, opts, next) {

  fastify.get('/', async function (req, reply) {
    let userData
    try {
      if (req.credentials && req.credentials.username) {
        userData = await user.getInfo(req.credentials.username)
      }
    } catch (err) {
      log.debug(err.stack)
    } finally {
      reply.view('/pages/slash/index', {
        user: userData
      })
    }
  })

  next()

}
