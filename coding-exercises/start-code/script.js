let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("id", "viz")
                    .attr("width", 600)
                    .attr("height", 400)
                    .style("background-color", "lavender")
;

function randomX(d, i){
    return Math.random() * 600;
}
function randomY(d, i){
    return Math.random() * 400;
}

function translateGroup(d, i){
    //let x = Math.random() * 600;
    //let y = Math.random() * 400;

    //grid 
    let x = 50 + i * 80;
    let y = 100;
    return "translate("+ x +","+y+")";
}

function gotData(incomingData){
    console.log("the incoming data is:" , incomingData)

    // //                0                7         7
    // viz.selectAll(".blackCircle").data(incomingData).enter().append("circle")
    //     .attr("class", "blackCircle")
    //     .attr("cx", randomX)
    //     .attr("cy", randomY)
    //     .attr("r", 10)
    //     .attr("fill", "black")
    // ;


    // //                   0                7          7
    //  viz.selectAll("redCircle").data(incomingData).enter().append("circle")
    //  .attr("class","redCircle")
    //  .attr("cx", randomX)
    //  .attr("cy", randomY)
    //  .attr("r", 10)
    //  .attr("fill", "red")
    // ;

    //adding group tags - and inside each group tag you can put several circles and labels (containers)
    let datagroups = viz.selectAll(".datagroup").data(incomingData).enter().append("g")
        .attr("class", "datagroup")
    ;

    datagroups.append("circle")
                    .attr("cx", -10)
                    .attr("cy", 0)
                    .attr("r",20)
                    .attr("fill","black")       
    ;

    datagroups.append("circle")
                    .attr("cx",10)
                    .attr("cy",0)
                    .attr("r",20)
                    .attr("fill","red")       
    ;
    
    datagroups.append("text")
                    .text("hello")
                    .attr("x", -15)
                    .attr("y", 35)

    //moving the groups around - alter their transform attribute with a value of translate

    datagroups.attr("transform", translateGroup);



}


d3.json("data.json").then(gotData)

