'use strict'

const path = require('path')

const pino = require('pino')

const config = require(path.join(__dirname, '..', 'config.js'))

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
