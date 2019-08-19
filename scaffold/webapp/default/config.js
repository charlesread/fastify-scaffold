'use strict'

const config = {}

config.fastify = {
  address: '0.0.0.0',
  port: 8443
}

config.logger = {
  pretty: true,
  level: 'trace'
}

module.exports = config