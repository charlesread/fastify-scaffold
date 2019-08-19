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
  ],
  'o365-jwt': [
    'request',
    'fastify-jwt-webapp',

  ]
}

module.exports = dependencies