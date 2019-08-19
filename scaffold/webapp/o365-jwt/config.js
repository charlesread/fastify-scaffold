'use strict'

const config = {}

config.api = {
  username: process.env['X_API_USER'],
  password: process.env['X_API_PASSWORD'],
  uri: process.env['X_API_URI']
}

config.fastify = {
  address: '0.0.0.0',
  port: 8443
}

const tenant = undefined
// const tenant = '56b445ce-91ad-4e6b-af20-6439b7c7da9b'

config.fjwt = {
  service: 'o365',
  urlAuthorize: `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`,
  urlToken: `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`,
  urlJWKS: `https://login.microsoftonline.com/${tenant}/discovery/v2.0/keys`,
  client_id: '102ed68e-675a-48df-9a75-20e38ba6589a',
  client_secret: process.env['X_O365_SECRET'],
  redirect_uri: process.env['X_REDIRECT_URI'],
  pathSuccessRedirect: '/',
  pathExempt: [
    '/',
    '/login',
    '/callback',
    '/public/**',
    '/poll'
  ],
  serviceAttributes: {
    discriminator: 'form',
    authorization: {
      response_type: 'code',
      response_mode: 'query',
      scope: 'openid profile email offline_access user.read'
    },
    token: {
      grant_type: 'authorization_code',
      scope: 'openid profile email offline_access user.read'
    }
  },
  nameTokenAttribute: 'id_token',
  cookie: {
    domain: process.env['X_DOMAIN']
  }
}

config.logger = {
  pretty: true,
  level: 'trace'
}

module.exports = config