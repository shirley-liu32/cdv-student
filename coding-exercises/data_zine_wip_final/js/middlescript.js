let w = 2400;
let h = 800;

// visualization container
let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "#f7f4e6")
;

// tables for each location
viz.append("svg:image")
        .attr('x', 460)
        .attr('y', 15)
        .attr("xlink:href", "assets/home.png")
;
viz.append("svg:image")
        .attr('x', 200)
        .attr('y', 400)
        .attr("xlink:href", "assets/gym.png")
;

viz.append("svg:image")
        .attr('x', 2000)
        .attr('y', -20)
        .attr("xlink:href", "assets/stadium.png")
;

viz.append("svg:image")
        .attr('x', 50)
        .attr('y', 0)
        .attr("xlink:href", "assets/rest.png")
;

viz.append("svg:image")
        .attr('x', 2000)
        .attr('y', 310)
        .attr("xlink:href", "assets/school.png")
;

// viz.append("rect") 
//         .attr("x", 600)
//         .attr("y", 50) 
//         .attr("width",300)
//         .attr("height",300)
//         .attr("fill", "#753F00")
//         .attr("rx", 50)
//         .attr("ry", 50)   
//         .attr("class", "shadow")  
// ;



// controls the group locations - seen by where the cups are
function translateGroup(d, i){
    

        // handle the cups for table 28 - rest/xintiandi
        if (i == 6){
            y = 180;
            x = 215;
        }
        else if (i == 7){
            y = 320;
            x = 200;
        }

        // table 20 - gym
        else if (i == 10){
            y = 640;
            x = 370;
        }

        // table 23 - luwan stadium
        else if (i == 0){
            y = 180;
            x = 2220;
        }

        // table 11 - school/AB

        else if (i == 2){
            y = 615;
            x = 2150;
        }
        else if (i == 3){
            y = 480;
            x = 2180;
        }
        else if (i == 4){
            y = 550;
            x = 2225;
        }
        
        // table 16 - home
        else{
            console.log(d,i)
            if (i == 1){
                y = 250;
                x = 750;
            }
            else if (i == 5){
                y = 250;
                x = 930;
            }
            else if (i == 8){
                y = 250;
                x = 1090;
            }
            else if (i == 9){
                y = 250;
                x = 1330;
            }
            else if (i == 11){
                y = 220;
                x = 1530;
            }
            else if (i == 12){
                y = 250;
                x = 1680;
            }
            else if (i == 13){
                y = 470;
                x = 650;
            }
            else if (i == 14){
                y = 480;
                x = 830;
            }
            else if (i == 15){
                y = 460;
                x = 1040;
            }
            else if (i == 16){
                y = 460;
                x = 1250;
            }
            else if (i == 17){
                y = 470;
                x = 1450;
            }
            else if (i == 18){
                y = 480;
                x = 1620;
            }
            else if (i == 19){
                y = 360;
                x = 1720;
            }
            else{
                y = 350;
                x = 670;
            }

        }    
    
   
    return "translate("+x+", "+y+")"
}

function gotData(incomingData){

    let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
      .append("g")
        .attr("class","datagroup")
    ;
    console.log(incomingData)

    // controls the color of the beverage
    function getBevColor(d, i) {
        let bevColor;
        if (d.beverage == "Green Tea") {
           bevColor = "#D3E1A2";
        }
        else if (d.beverage == "Water"){
           bevColor = "#A2CFE1";
        }
        else if (d.beverage == "Dirty Matcha"){
            bevColor = "#BAE1A2";
        }
        else if (d.beverage == "Milk Tea"){
            bevColor = "#F3D6B0";
        }
        else if (d.beverage == "Coffee"){
            bevColor = "#A9744F";
        }
        else if (d.beverage == "Carrot Juice"){
            bevColor = "#FBB374";
        }
        else if (d.beverage == "Protein Shake"){
            bevColor = "#FFAABA";
        }
        else if (d.beverage == "Tequila Sunrise"){
            bevColor = "#F6A7A1";
        }
        else if (d.beverage == "Mango Tea"){
            bevColor = "#F6C5A1";
        }
        else if (d.beverage == "Apple Cider"){
            bevColor = "#F8E0A2";
        }
        console.log(bevColor)
    
        return bevColor;
    }
    
    // making the cups with the beverage
    let cup = d3.symbol()
                                .type(d3.symbolCircle).size(2800);
    
    let bev = d3.symbol()
                                .type(d3.symbolCircle).size(1800);

    let handle = d3.symbol()
                        .type(d3.symbolCircle).size(150);
    datagroups.append('path')
                .attr("d", cup)
                .attr('fill', 'white')
    ;


    datagroups.append('path')
                .attr("d", bev)
                .attr('fill', getBevColor)
    ;

    datagroups.append('path')
                .attr("d", handle)
                .attr('fill', "white")
                .attr("transform", "translate(31,5)")
    ;

    
    datagroups.attr("transform", translateGroup);


}




d3.json("data.json").then(gotData);
