let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "#FFF8E5")
;

function gotData(incomingData){

    let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
      .append("g")
        .attr("class","datagroup")
    ;
    
    let circleCup = d3.symbol()
        .type(d3.symbolCircle).size(3000);

    let circleLiquid = d3.symbol()
        .type(d3.symbolCircle).size(2000);
    
    let squareTable = d3.symbol()
        .type(d3.symbolSquare).size(50000);
    
    
    // datagroups.append("path")
    //             .attr("d", circleTable)
    //             .attr("fill", "#604702")
    //             .attr("transform", "translate(1500,200)")
    // ;

    // datagroups.append("path")
    //             .attr("d", circleTable)
    //             .attr("fill", "#604702")
    //             .attr("transform", "translate(2200,250)")
    // ;

    datagroups.append("svg:image")
                .attr('x', 1850)
                .attr('y', 475)
                .attr("xlink:href", "assets/circle_table.png")
    ;

    datagroups.append("svg:image")
                .attr('x', 1500)
                .attr('y', 200)
                .attr("xlink:href", "assets/circle_table.png")
    ;

    datagroups.append("svg:image")
                .attr('x', 2000)
                .attr('y', 100)
                .attr("xlink:href", "assets/circle_table.png")
    ;
      
   

    // datagroups.append("path")
    //             .attr("d", squareTable)
    //             .attr("fill", "#604702")
    //             .attr("transform", "translate(200,500)")
    // ;   

    // datagroups.append("path")
    //             .attr("d", squareTable)
    //             .attr("fill", "#604702")
    //             .attr("transform", "translate(500,200)")
    // ;  

    datagroups.append("svg:image")
                .attr('x', 80)
                .attr('y', 375)
                .attr("xlink:href", "assets/wooden_square.png")
    ;

    datagroups.append("svg:image")
                .attr('x', 500)
                .attr('y', 200)
                .attr("xlink:href", "assets/wooden_square.png")
    ;
    // datagroups.append("rect")
    //             .attr('x', 600)
    //             .attr("y", 650)
    //             .attr('width', 800)
    //             .attr('height', 150)
    //             .attr("fill", "#604702")
    // ;

    datagroups.append("svg:image")
                .attr('x', 800)
                .attr('y', 600)
                .attr("xlink:href", "assets/wooden_table.png")
    ;
    datagroups.append("svg:image")
                .attr('x', 230)
                .attr('y', 410)
                .attr('width', 180)
                .attr('height', 180)
                .attr("xlink:href", "assets/person.png")
                .attr("transform", "translate(760, 380) rotate(100)")
    ;
    
    datagroups.append("svg:image")
                .attr('x', 2000)
                .attr('y', 515)
                .attr('width', 180)
                .attr('height', 180)
                .attr("xlink:href", "assets/person.png")
    ;

    datagroups.append("svg:image")
                .attr('x', 2200)
                .attr('y',400)
                .attr('width', 180)
                .attr('height', 180)
                .attr("xlink:href", "assets/plant.png")
    ;

    datagroups.append("svg:image")
                .attr('x', 500)
                .attr('y',550)
                .attr('width', 180)
                .attr('height', 180)
                .attr("xlink:href", "assets/plant.png")
    ;

    datagroups.append("svg:image")
                .attr('x', 1200)
                .attr('y',50)
                .attr('width', 180)
                .attr('height', 180)
                .attr("xlink:href", "assets/plant.png")
    ;

    datagroups.append("path")
                .attr("d", circleCup)
                .attr("fill", "white")
                .attr("transform", "translate(200,520)")
    ;

    datagroups.append("rect")
                .attr('width', 10)
                .attr('height', 20)
                .attr("fill", "white")
                .attr("rx", 6)
                .attr("ry", 6)
                .attr("transform", "translate(175,520) rotate(90)")
    ;

    datagroups.append("path")
                .attr("d", circleLiquid)
                .attr("fill", "#774E02")
                .attr("transform", "translate(200,520)")
    ;

    datagroups.append("path")
                .attr("d", circleCup)
                .attr("fill", "black")
                .attr("transform", "translate(2000,620)")
    ;
   
    datagroups.append("rect")
                .attr('width', 10)
                .attr('height', 20)
                .attr("fill", "black")
                .attr("rx", 6)
                .attr("ry", 6)
                .attr("transform", "translate(1985,640) rotate(30)")
    ;


    datagroups.append("path")
                .attr("d", circleLiquid)
                .attr("fill", "#71D0E3")
                .attr("transform", "translate(2000,620)")
    ;
    
}   


d3.json("data.json").then(gotData);
