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
  let pretty
  if (options.pretty) {
    pretty = pino.pretty()
    pretty.pipe(process.stdout)
  }
  logger = pino(options, pretty)
  return logger
}
