

let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("id","viz")
                    .attr("width", 800)
                    .attr("height", 800)
;

viz.attr("height", 600);

// let myCircle = viz.append("circle")
//     .attr("cx", 100)
//     .attr("cy", 400)
//     .attr("r", 90)
// ;

// myCircle.attr("fill", "white");

let myData = [4,6,8,2,9];


function randomXposition(){
    return Math.random()*800;
}

function xPos(d,i){
    console.log("d3 passed" , d, "into my xPos function!");
    console.log("d3 passed" ,i, "!");

    return 50 + i * 100;
}

function getRadius(d){
    return d*4;
}

viz.selectAll("circle").data(myData).enter().append("circle")
                                                .attr("cx", xPos)
                                                .attr("cy", 400)
                                                .attr("r", getRadius)
;

function gotData(newData){
    console.log(newData);

    viz.selectAll("circle").data(myData).enter().append("circle")
                                                .attr("cx", xPos)
                                                .attr("cy", 400)
                                                .attr("r", getRadius)
}
d3.json("data.json").then(gotData)