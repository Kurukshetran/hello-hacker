// server.js
var http = require('http')
  // dependencies
  , f = require('flates')
  , ecstatic = require('ecstatic')
  , ramrod = require('ramrod')
  , index = require('./public/routes/index')
  , shoe = require('shoe')
  , level = require('level')
  , streamCb = require('stream-cb')
  , spi = require('spi')

module.exports = server

function server (opts) {
  var routes = 
      { '': null
      , 'led': null
      , 'save/:name': null
      , 'load/:name': null
      }
    , router = ramrod(routes)
    , app = http.createServer(router.dispatch.bind(router))
    , db = level(process.env.HOME + '/.hello-hacker')
    , pixel = new spi.Spi('/dev/spidev0.0', {}, function (s) {s.open()})
    , animationLoop = setInterval(display, 250)
    , dataSequence = [new Buffer(75)]
    , idx = 0

  function display () {
    pixel.write(dataSequence[idx])
    idx = (idx + 1)%dataSequence.length
  }

  router.on('', function (req, res) {
    res.statusCode = 200
    res.write(index())
    res.end()
  })

  router.on('led', function (req, res) {
    req.pipe(streamCb(function (err, data) {
      if (err) {
        res.statusCode = 500
        return res.end(String(err))
      }
      try {
        var frames = JSON.parse(data)
      } catch (err) {
        if (err) {
          res.statusCode = 500
          return res.end(String(err))
        }
      }
      var buffs = frames.map(function (frame) {
          var buff = new Buffer(75)
            , i = 0
            , j = 0
          for (var y = 0; y < 5; y++) {
            for (var x = 0; x < 5; x++) {
              if (y%2 === 0) i = 5 * y + (4 - x)
              else i = 5 * y + x
              j = 5 * y + x
              buff[i*3] = frame[j].r
              buff[i*3+1] = frame[j].g
              buff[i*3+2] = frame[j].b
            }
          }
          return buff
        })
      idx = 0
      dataSequence = buffs
    }))
    res.end('ok')
  })

  router.on('save/:name', function (req, res, name) {
    req.pipe(streamCb(function (err, data) {
      if (err) {
        res.statusCode = 500
        return res.end(String(err))
      }
      db.put(name, data, function (err) {
        if (err) {
          res.statusCode = 500
          return res.end(String(err))
        }
        res.statusCode = 200
        res.end('saved')
      })
    }))
  })

  router.on('load/:name', function (req, res, name) {
    db.get(name, function (err, data) {
      if (err) {
        res.statusCode = 500
        return res.end(String(err))
      }
      res.statusCode = 200
      res.end(data)
    })
  })

  router.on('*', ecstatic(__dirname + '/public'))

  app.listen(opts.p, function (e) {
    if (e) throw e
    console.log('Listening on: ' + opts.p)
  })

  return app
}

