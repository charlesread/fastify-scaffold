'use strict'

const dependencies = {}

dependencies.default = [
  '@lasso/marko-taglib',
  'fastify',
  'fastify-static',
  'lasso',
  'lasso-less',
  'lasso-marko',
  'marko',
  'node-dir',
  'pem',
  'point-of-view',
  'pino',
  'pino-pretty',
  'require-self-ref'
]

dependencies.webapp = {
  cas: [
    'fastify-cas'
  ]
}

module.exports = dependencies