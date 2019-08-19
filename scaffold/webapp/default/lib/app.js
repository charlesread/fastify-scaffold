'use strict'

const path = require('path')

const config = require('~/config')
const log = require('~/lib/logger')()

// hijacks require to allow it to require marko templates
require('marko/node-require')
// tells marko to not output .js "temp" files
require('marko/compiler').defaultOptions.writeToDisk = false

const pem = require('pem')
const lasso = require('lasso')
const dir = require('node-dir')
const fastifyFactory = require('fastify')

let fastify

function createCertificate() {
  return new Promise(function (resolve, reject) {
    pem.createCertificate({days: 1, selfSigned: true}, function (err, keys) {
      if (err) return reject(err)
      return resolve(keys)
    })
  })
}

const app = {}

app.start = async function () {

  const keys = await createCertificate()

  fastify = fastifyFactory({
    https: {
      key: keys.serviceKey,
      cert: keys.certificate
    },
    logger: log
  })

// bundle up all CSS, LESS, and JS assets
  lasso.configure({
    outputDir: path.join(__dirname, '..', 'public', 'static'),
    urlPrefix: '/public/static',
    plugins: ['lasso-marko', 'lasso-less']
  })
  log.trace('finished lasso initialization')

// register templating engine; marko
  await fastify.register(require('point-of-view'), {
    engine: {
      marko: require('marko')
    },
    includeViewExtension: true
  })
  log.trace('finished marko initialization')

// serve all the static files; all of /public
  await fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '..', 'public'),
    prefix: '/public/',
  })
  log.trace('finished static files initialization')

// loop through all files in /plugins and fastify.register(require()) them
  const pluginPaths = await dir.promiseFiles(path.join(__dirname, '..', 'plugins'))
  for (let i = 0; i < pluginPaths.length; i++) {
    log.trace('registering plugin at %s', pluginPaths[i])
    await fastify.register(require(pluginPaths[i]))
  }
  log.trace('finished registering plugins')

  await fastify.listen(config.fastify.port, config.fastify.address)
  log.trace('fastify is listening')

  return fastify

}

module.exports = app