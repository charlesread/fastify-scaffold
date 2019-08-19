'use strict'

const api = require('~/lib/api')

module.exports = async function (token) {

  const username = token.preferred_username.substring(0, token.preferred_username.indexOf('@'))

  if (!username) {
    throw new Error('No username could be parsed.')
  }

  const credentials = {}
  credentials.username = username

  return credentials

}
