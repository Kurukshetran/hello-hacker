var f = require('flates')
  , number = 0
  , elid

module.exports = render

function render (id) {
  elid = id
  document.querySelector(id).innerHTML = template(lesson[number])
}

function modplus (n, inc, mod) {
  return (((n + inc) % mod) + mod) % mod
}

render.next = function () {
  number = modplus(number, 1, lesson.length)
  render(elid)
}

render.prev = function () {
  number = modplus(number, -1, lesson.length)
  render(elid)
}

function template(data) {
  return f.pre(data.text)
}

var lesson = [ { text: [
'Welcome to Hello Hacker!',
'',
'Hello Hacker is a programming environment which lets you control the',
'lights on the pixel. It is easy; click next to get started.'].join('\n')}

             , { text: [
'Lets start by changing the color of the lights. Type the following',
'into the  text box below:',
'',
'    solid(rgb(255,255,255))',
'',
'Hello Hacker uses the Javascript programming language, and adds a few',
'additional functions which manipulate the lights. For creating colors,',
'we provide the function rgb, which takes a value between 0 and 255 for',
'each of the three inputs. solid takes a color (as created by rgb) and',
'turns all of the lights to that color.'].join('\n')}

             , { text: [
'Hello Hacker provides four more functions for manipulating the',
'lights: write, twinkle, and pixel. Let us try them in turn. Enter into',
'the text field below:',
'',
'    write(\'Hello World\')',
'',
'And the pixels should flash the message to you.'].join('\n')}
             , { text: [
'The write function also lets you choose the color which it uses. Try',
'changing the line you just wrote into the following:',
'',
'    write(\'Hello World\', rgb(0,250,0), rgb(0,0,250))',
'',
'It should still print the same message, but now with different colors.'].join('\n')}
             , { text: [
'Now lets try the next function, twinkle.',
'',
'    twinkle(rgb(180,80,0))',
'',
'Simple!'].join('\n')}

             , { text: [
'The last primitive provided by Hello Hacker is pixel. It lets you',
'light up a specific pixel, specified by its number. The pixels are',
'numbered from 0 to 24:',
'',
'    pixel(rgb(255,255,255), 0)',
'    pixel(rgb(0,0,0), 24)'].join('\n')}

             , { text: [
'To light up a group of pixels at the same time, use the following:',
'',
'    pixelArray(rgb(255,100,255), [0, 2, 4])',
'',
'That second argument given to pixelArray is a javascript array. You',
'can change [0, 2, 4] to an array specify any elements you want, like',
'[1, 3].'].join('\n')}

             , { text: [
'All right, now the pixels are your oyster. You can use the provided',
'functions along with Javascript features to make the patterns you',
'want. For example:',
'',
'    solid(rgb(255,255,255))',
'    for (i = 0; i <=  24; i++) pixel(rgb(0,i*5,0), i)'].join('\n')}

           , { text: [
'Summary: ',

'    rgb(r,g,b) makes a color, where r, g, and b are values 0-255',
'    solid(color) turns all the lights to that color',
'    write(\'Message\', color, color) writes the message',
'    twinkle(color) Turns lights on in a random pattern',
'    pixel(color, number) turns the numbered pixel to the color',
'    pixelArray(color, array) sets the specified pixels to the color'].join('\n')}
             ]

