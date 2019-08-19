'use strict'

const config = require('~/config')
const log = require('~/lib/logger.js')()

const _request = require('request')

const defaultOptions = {
  auth: {
    user: config.api.username,
    pass: config.api.password,
    sendImmediately: true
  },
  strictSSL: false
}

const implementation = {}

implementation.request = function (_options) {
  return new Promise(function (resolve, reject) {
    _request(
      _options,
      function (err, response, body) {
        if (err) {
          log.error(`Error CONNECTING to API: ${err.message}`)
          return reject(err)
        }
        if (body.error) {
          log.error(`Error RETURNED from API, error: ${body.error}, message: ${body.message}`)
          return reject(  new Error(body.error || body.message))
        }
        return resolve(body)
      }
    )
  })
}

implementation.post = async function (_path, _body) {
  const options = Object.assign({}, defaultOptions)
  options.uri = `${config.api.uri}${_path}`
  options.method = 'POST'
  options.json = true
  options.body = _body
  return await implementation.request(options)
}

implementation.get = async function (_path, _qs) {
  try {
    const options = Object.assign({}, defaultOptions)
    options.uri = `${config.api.uri}${_path}`
    options.method = 'GET'
    options.qs = _qs || {}
    const response = await implementation.request(options)
    return JSON.parse(response)
  } catch (err) {
    log.debug(err.stack)
    throw err
  }
}

module.exports = implementation
