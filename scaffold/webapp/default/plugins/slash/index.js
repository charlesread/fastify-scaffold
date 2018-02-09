'use strict'

module.exports = function (fastify, opts, next) {
  fastify.get('/', (req, reply) => {
    reply.view('/pages/slash/index', {now: new Date()})
  })
  next()
}