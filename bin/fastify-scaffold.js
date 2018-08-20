#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const spawn = require('child_process').spawnSync

const _ = require('lodash')
const program = require('commander')
require('colors')
const copydir = require('copy-dir')

const scaffoldDependencies = require(path.join(__dirname, '..', 'scaffoldDependencies.js'))

program
  .option('-a, --applicationType [type]', 'the type of application to scaffold')
  .option('-c, --configuration [config]', 'the configuration of the application to scaffold')
  .option('-r, --runImmediately', 'runs the application right after scaffolding it')

program.parse(process.argv)

const applicationType = program.applicationType || 'webapp'
const configuration = program.configuration || 'default'

const defaultScaffoldPath = path.join(__dirname, '..', 'scaffold', applicationType, 'default')
const configurationScaffoldPath = path.join(__dirname, '..', 'scaffold', applicationType, configuration)

let scaffoldPath

fs.readdir(configurationScaffoldPath, function (err) {
  // if the scaffold files specified exist use those, if not use the default scaffold files
  if (err) {
    scaffoldPath = defaultScaffoldPath
    console.log('\nWARNING: cannot find scaffold files at %s, using %s instead\n'.yellow, configurationScaffoldPath, defaultScaffoldPath)
  } else {
    scaffoldPath = configurationScaffoldPath
  }
  // actually copy all of the scaffold files to the current working directory
  copydir.sync(scaffoldPath, process.cwd())
  // build up the arguments for npm install <deps>
  const cmdDependencyInstallArgs = ['install', '--save']
  const dependencies = scaffoldDependencies[applicationType] && scaffoldDependencies[applicationType][configuration]
    ? _.concat(scaffoldDependencies[applicationType][configuration], scaffoldDependencies.default)
    : scaffoldDependencies.default
  for (let dependency of dependencies) {
    cmdDependencyInstallArgs.push(dependency)
  }
  const spawnOpts = {stdio: 'inherit'}
  spawn('npm', ['init'], spawnOpts)
  spawn('npm', cmdDependencyInstallArgs, spawnOpts)
  console.log('\nSweet, your project was scaffolded successfully.\n'.green)
  if (program.runImmediately) {
    console.log('Running...\n'.blue)
    spawn('node', ['index.js'], spawnOpts)
  } else {
    console.log('Run `node index.js` to start your app.\n'.green)
  }

})
