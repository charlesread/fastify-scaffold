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
  'point-of-view',
  'pino'
]

dependencies.webapp = {
  cas: [
    'fastify-cas'
  ]
}

module.exports = dependencies