var font = require('./font')

module.exports = makeFun

function makeFun (obj) {
  var frames = [],
      frame;

  obj.rgb = function (r, g, b) {
    return {'r': r, 'g': g, 'b': b}
  }

  obj.solid = function(rgb) {
    var nextArray = []
    for (i = 0; i < 25; i++) {
      nextArray.push(rgb)
    }
    frames.push(nextArray)
    return nextArray
  }

  obj.write = function (str, foreground, background) {
    if (!foreground) foreground = obj.rgb(255, 255, 255)
    if (!background) background = obj.rgb(0, 0, 0)
    str.split('').map(function (c) {
      return font[c].map(function (on) {
        if (on) return foreground
        return background
      })
    }).forEach(function (frame) {
      // repeating frames.push results in desired timing
      frames.push(frame)
      frames.push(frame)
      frames.push(frame)
      frames.push(frame)
    })
  }

  obj.twinkle = function (rgb) {
    var nextArray = []
      , check
    if (!rgb) rgb = obj.rgb(255, 255, 255)
    for (var j = 0; j < 25; j++) {
      for (var i = 0; i < 25; i++) {
        if (Math.random() > 0.5) nextArray.push(rgb)
        else nextArray.push(obj.rgb(0, 0, 0))
      }
      frames.push(nextArray)
      nextArray = []
    }
  }

  obj.pixel = function (a, i) {
    var nextArray
    if (!frames.length) {
      nextArray = obj.solid(obj.rgb(0, 0, 0))
    } else {
      nextArray = frames[frames.length -1].slice()
      frames.push(nextArray);
    }
    nextArray[i] = a;
  }

  obj.pixelArray = function (color, arr) {
    var nextArray
    if (!frames.length) {
      nextArray = obj.solid(obj.rgb(0, 0, 0))
    } else {
      nextArray = frames[frames.length -1].slice()
      frames.push(nextArray);
    }
    arr.forEach(function (val) {
      nextArray[val] = color
    })
  }

  obj.start = function () {
    if (!frames.length) obj.solid(obj.rgb(0, 0, 0))
    obj.updateEmu(frames)
    obj.updateHw(frames)
  }

  return obj
}

