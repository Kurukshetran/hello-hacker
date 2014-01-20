module.exports = makeEmulator

function makeEmulator (el) {
  // Add the emulator to the dom. 
  var cHeight = el.scrollHeight
    , cWidth = el.scrollWidth
    , margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = cWidth - margin.left - margin.right
    , height = cHeight - margin.top - margin.bottom
    , emulator = d3.select(el)
      .append('svg')
        .attr("width", width + margin.left + margin.right) 
        .attr("height", height + margin.bottom + margin.top) 
    , r = height / 12.5
    , slide = height / 5
    , defaultData = []
    , dataSequence = [defaultData]
    , index = 0
    , animationLoop = setInterval(display, 250)

  for(i = 0; i < 25; i++) defaultData.push( {'r': 100, 'g': 0, 'b': 200} );

  var x = d3.scale.linear()
    .domain([0, width])
    .range([0, height]);
  var bar = emulator.selectAll("g")
    .data(defaultData)
    .enter().append("g")
    .attr("transform", function(d, i)
          { return "translate(" + (i * slide % width + r)
            + "," + (r + slide * Math.floor(i * slide / height)) + ")"; });

  bar.append("circle")
    .attr("r", r)
    .attr("fill", function(d) {
      return "rgb(" + d.r + "," + d.g + "," + d.b + ")";})

//  bar.append("text")
//    .attr("x", function(d) { return x(d) - 5; })
//    .attr("dy", ".35em")
//    .text(function(d, i) { return i; });

  function display () {
    emulator.selectAll("circle").data(dataSequence[index])
      .transition().duration(50)
      .attr("fill", function(d) {
        return "rgb(" + d.r + "," + d.g + "," + d.b + ")";
      });
    index = (index + 1)%dataSequence.length
  }

  function updateEmulator (frames) {
    dataSequence = frames
    index = 0
  }

  return updateEmulator
}

