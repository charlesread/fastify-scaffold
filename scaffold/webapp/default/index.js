'use strict'

const path = require('path')

const app = require(path.join(__dirname, 'lib', 'app.js'))
const log = require(path.join(__dirname, 'lib', 'logger.js'))()

app.start()
  .then(function (fastify) {
    log.info('server listening on port %s', fastify.server.address().port)
    process.on('SIGINT', function() {
      log.info('SIGINT caught, shutting fastify down gracefully')
      fastify.close(process.exit)
    })
  })
  .catch(function (err) {
    console.error(err.stack)
  })