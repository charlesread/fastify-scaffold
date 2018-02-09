'use strict'

const path = require('path')

const log = require(path.join(__dirname, 'logger.js'))()

// tells marko to not output .js "temp" files
require('marko/compiler').defaultOptions.writeToDisk = false

const lasso = require('lasso')
const dir = require('node-dir')
const fastify = require('fastify')()

const app = {}

app.start = async function () {

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

  await fastify.listen(3000)
  log.trace('fastify is listening')

  return fastify

}

module.exports = app