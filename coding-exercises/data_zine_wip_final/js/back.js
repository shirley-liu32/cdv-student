let w = 1200;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "#f7f4e6")
;

viz.append("text")
                .text("Key")
                .style("font-size", "40px")
                .attr("y",70)
                .attr("x",560)
                .style("text-align","center")
                .style("fill", "black")
;

viz.append("svg:image")
        .attr('x', 300)
        .attr('y', 110)
        .attr("width", 608)
        .attr("height", 600)
        .attr("xlink:href", "assets/key.png")
;