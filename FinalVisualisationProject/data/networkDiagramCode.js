
    
d3.json("data.json", function(error, data) {
    
    
    
    var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
    
      for(i=0;i<data.nodes.length;i++)
        {
            data.nodes[i].group = i;
            data.nodes[i].tradeAmt = 0;
            data.nodes[i].linkss = [];
        }
    for(j=0;j<data.links.length;j++)
        {
            for(k=0;k<data.nodes.length;k++)
                {
                    if(data.links[j].node01 == data.nodes[k].id)
                        {
                            data.links[j].source = data.nodes[k].group
                        }
                    if(data.links[j].node02 == data.nodes[k].id)
                        {
                            data.links[j].target = data.nodes[k].group
                        }
                }
        }
    for(i=0;i<data.nodes.length;i++)
        {
            for(j=0;j<data.links.length;j++)
                {
                    if( (data.nodes[i].id== data.links[j].node01) || (data.nodes[i].id== data.links[j].node02) )
                        {
                            data.nodes[i].tradeAmt = data.nodes[i].tradeAmt + data.links[j].amount;
                        }
                }
        }
    
    console.log(data);
    

    
    
    
    
    
    
    
    
    var graph = d3.select('#container');

var svg = graph.append('svg')
               .attr('width', 1000)
               .attr('height', 600)
.style("margin-left","15%")
.style("margin-top","50px");

   
// append links:
links = svg.selectAll()
  .data(data.links)
  .enter()
  .append("line")
  .attr("x1", function(d) { return data.nodes[d.source].x; })
  .attr("y1", function(d) { return data.nodes[d.source].y; })
  .attr("x2", function(d) { return data.nodes[d.target].x; })
  .attr("y2", function(d) { return data.nodes[d.target].y; })
  .attr("stroke-width", function(d) { return Math.pow(d.amount, 1/3); });
  
// append nodes:
nodes = svg.selectAll()
  .data(data.nodes)
  .enter()
  .append("circle")
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; })
    .attr("fill", "white")
    .attr("stroke", "red")
    .on("mouseover", handleMouseOver)
              .on("mouseout", handleMouseOut)

  .attr("r", function(d) { return Math.pow(d.tradeAmt, 1/2); });
  
    var elem = svg.selectAll("g")
        .data(data.nodes);
var elemEnter = elem.enter()
        .append("g")
        .attr("transform", function(d){return "translate("+d.x+","+d.y+")"})

       
    
      elemEnter.append("text")
        .attr("dx", function(d){return -20})
        .attr("dy", function(d){return 0})
        .text(function(d){return d.id})
    
    
    function handleMouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this).attr({
              fill: "white",
            });

            // Select text by id and then remove
            //d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
                    div.transition()		
                .duration(500)		
                .style("opacity", 0);	

         for(i=0;i<links[0].length;i++)
                {
                    if( ((links[0][i].x1.baseVal.value == d.x) && (links[0][i].y1.baseVal.value == d.y)) ||( (links[0][i].x2.baseVal.value == d.x) && (links[0][i].y2.baseVal.value == d.y)))
                        {
                            links[0][i].style.stroke="#999"

                        }
                }
        
        
            
          }
    

    
    function handleMouseOver(d, i) {  // Add interactivity

            // Use D3 to select element, change color and size
            d3.select(this).attr({
              fill: "red",
            });


        
        
        
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html("Name: " + [d.id] + "<br/>" + "Trade Amount: "+ [d.tradeAmt])	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	

        
            for(i=0;i<links[0].length;i++)
                {
                    if( ((links[0][i].x1.baseVal.value == d.x) && (links[0][i].y1.baseVal.value == d.y)) ||( (links[0][i].x2.baseVal.value == d.x) && (links[0][i].y2.baseVal.value == d.y)))
                        {
                            links[0][i].style.stroke="orange"
                        }
                }
        
        
          }
    
});

    
  
    


    