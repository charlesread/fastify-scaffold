'use strict'

const pino = require('pino')

const config = require('~/config')

let logger

module.exports = function (opts) {
  if (logger) {
    return logger
  }
  const options = opts || config.logger || {pretty: true}
  if (options.pretty) {
    options.prettyPrint = true
  }
  logger = pino(options)
  return logger
}
