var f = require('flates')
  , createEditor = require('javascript-editor')
  , makeEmulator = require('./emulator')
  , Script = require('vm').Script
  , fun = require('./fun')
  , lesson = require('./routes/lesson')

window.addEventListener('DOMContentLoaded', function () {
  var updateEmulator = makeEmulator(document.getElementById('emulator'))

  lesson('#lesson')

  document.getElementById('prev').addEventListener('click', lesson.prev)
  document.getElementById('next').addEventListener('click', lesson.next)

  var username = prompt('please enter your library card number:')

  if (!username) username = (new Date()).toISOString()

  load(function (data) {
    try {
      data = JSON.parse(data)
      data.history = JSON.parse(data.history)
    } catch (e) {
      data = { value: '// Hello hacker!'}
    }
    var cm = window.cm = createEditor(
        { value: data.value
        , mode: 'javascript'
        , container: document.getElementById('editor')
        })
    if (data.history) cm.editor.setHistory(data.history)
    cm.on('valid', function (works) {
      if (works) {
        save({ value: cm.getValue(), history: JSON.stringify(cm.editor.getHistory())})
        vm = new Script(cm.getValue() + '\n;start()')
        vm.runInNewContext(fun({ updateEmu: updateEmulator.bind(null), updateHw: updateHw.bind(null)}))
      }
    })
  })

  function save (contents) {
    return localStorage[username] = JSON.stringify(contents)
    var xhr = new XMLHttpRequest()
    xhr.open('POST', '/save/' + username)
    xhr.send(JSON.stringify(contents))
    xhr.addEventListener('load', function () { console.log(xhr.response) })
  }

  function load (cb) {
    return cb(localStorage[username])
    var xhr = new XMLHttpRequest()
    xhr.open('GET', '/load/' + username)
    xhr.send()
    xhr.addEventListener('load', function () { cb(xhr.response) })
  }

})

function updateHw (frames) {
  return
  var xhr = new XMLHttpRequest()
  xhr.open('POST', '/led')
  xhr.send(JSON.stringify(frames))
  xhr.addEventListener('load', function () { console.log(xhr.response) })
}

