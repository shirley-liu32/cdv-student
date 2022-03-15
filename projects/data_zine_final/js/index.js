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
                .text("我在喝什么？")
                .style("font-size", "100px")
                .attr("y",680)
                .attr("x",340)
                .attr("class", "chinese")
                .style("text-align","center")
                .style("fill", "black")
;

viz.append("text")
                .text("Shirley Liu")
                .style("font-size", "40px")
                .attr("y",760)
                .attr("x",500)
                .style("text-align","center")
                .style("fill", "black")
;

viz.append("svg:image")
        .attr('x', 350)
        .attr('y', 80)
        .attr("xlink:href", "assets/cup.png")
;