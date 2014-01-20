#!/usr/bin/env node
var cluster = require('cluster')
  , cc = require('config-chain')
  , argv = require('optimist').argv
  , server = require('./index')

var config = cc( argv
  , argv.config
  , 'config.json'
  , cc.find('config.json')
  , cc.env('hello-hacker_')
  , { p: 8080
    }
  )

if (cluster.isMaster) {
  cluster.on('disconnect', function () {
    console.error('disconnect')
    cluster.fork()
  })

  cluster.fork()

} else {

  server(config.store)

}

