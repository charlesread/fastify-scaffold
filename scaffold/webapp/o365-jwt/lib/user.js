'use strict'

const api = require('~/lib/api')

const implementation = {}

implementation.getInfo = async function (username) {

  try {
    const userResults = await api.get(
      `/user`,
      {
        username
      }
    )

    const credentials = userResults.data
    credentials.username = username
    credentials.roles.instructor = credentials.roles.instructor === 'Y'
    credentials.roles.student = credentials.roles.student === 'Y'

    return credentials
  } catch (err) {
    throw err
  }

}

module.exports = implementation
