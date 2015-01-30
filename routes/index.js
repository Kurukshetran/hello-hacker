var f = require('flates')

var scripts =
  [ '/dep/d3.v3.min.js'
  , '/bundle.js'
  ]

var stylesheets =
  [ '/codemirror.css'
  , '/style.css'
  , '/theme.css'
  ]

module.exports = function () {
  return f.d() + 
    stylesheets.map(function (loc) {
      return f.link({ rel: 'stylesheet', href: loc})
    }).join('') +
    scripts.map(function (loc) {
      return f.script({ src: loc })
  }).join('') +
  f.div({id: 'emulator'}) +
  f.div({id: 'lesson'}) +
  f.button({id: 'prev'}, 'previous') +
  f.button({id: 'next'}, 'next') +
  f.div({id: 'editor'}) +
  f.div({id: 'run'})
}
