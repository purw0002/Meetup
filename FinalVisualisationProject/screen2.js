$( document ).ready(function() {

    var globalData,groupEventsAndCategories;

    
    function filterData(data, keyword)
    {
        m = $( "#wordCloudSelector option:selected" ).text();
        q=[];
        
        if(m == "All")
            {
                q=data;
            }
        else
            {
            for(i=0;i<data.length;i++)
                {
                    if(data[i].city == m && keyword == undefined)
                    {
                        q.push(data[i])
                    }
                    else if(data[i].city == m && keyword == data[i].venue_name.toLowerCase())
                    {
                        q.push(data[i])
                    }
                }
                
            }
        
        
        return q;
    }
    

d3.csv("data/groupsEventsAndCategories.csv",function(error, data) {
                
                
                groupEventsAndCategories = data;
                
                
            });
            
$( "#wordCloudSelector" ).change(function() {

    selectedOption = "";
    if($( "#wordCloudSelector option:selected" ).text() == "All")
        {
            selectedOption = "Chicago, San Francisco and New York"
        }
    else
        {
            selectedOption = $( "#wordCloudSelector option:selected" ).text();
        }
    
        $("#selectedCity").html("&nbsp <b>"+selectedOption+"</b>")
        data = filterData(globalData);
        $("#WC").remove();
    
        createWordCloud(data)
        //prashanth
    
            m = $( "#wordCloudSelector option:selected" ).text();
        $("#networkDiagram").remove();
            if(m == "All")
                {
    drawNetworkDiagram(fullNetworkNodes,AllNetworkData)
                }
    else if(m == "Chicago")
    {
    drawNetworkDiagram(chicagoNodesNetwork,chicagoNetworkData)
    }
    else if(m == "New York")
        {
    drawNetworkDiagram(newYorkNodes,newYorkNetworkData)
        }
    else if(m == "San Francisco")
        {
    drawNetworkDiagram(sanFranciscoNodes,sanFransiscoNetworkData)

        }
    


});
    
    
    
    function createWordCloud(data)
    {
        a = {};
        for(i=0;i<data.length;i++)
                {
                    if(data[i].venue_name in a)
                        {
                            a[data[i].venue_name] = a[data[i].venue_name]  + 1
                        }
                    else
                        {
                            
                            a[data[i].venue_name] = 1;
                        }
                }


        
        
var items = Object.keys(a).map(function(key) {
  return [key, a[key]];
});


        
        mainString = "";
        var top35 = items.sort(function(first, second) { return second[1] - first[1]; })
                .slice(0, 50);
        
        
for (var p = 0; p<top35.length;p++)    
    {

                    for(q=0;q<top35[p][1];q++)
                {
                    mainString = mainString + ":::::" + top35[p][0];
                }

    }
      drawWordCloud(mainString);
    }
    
    
    d3.csv("data/venues.csv",function(error, data) {
        
        globalData = data;
        
        data = filterData(data);
        
        createWordCloud(data)
        
    });

      function drawWordCloud(text_string){
      
        var word_count = {};

        var words = text_string.split(":::::");
          if (words.length == 1){
            word_count[words[0]] = 1;
          } else {
            words.forEach(function(word){
              var word = word.toLowerCase();
              if (word != "" && word.length>1){
                if (word_count[word]){
                  word_count[word]++;
                } else {
                  word_count[word] = 1;
                }
              }
            })
          }

        var width = 1000;
        var height = 500;

        var fill = d3.scale.category20();

        var word_entries = d3.entries(word_count);

        var xScale = d3.scale.linear()
           .domain([0, d3.max(word_entries, function(d) {
              return d.value;
            })
           ])
           .range([10,50]);

        d3.layout.cloud().size([width, height])
          .timeInterval(20)
          .words(word_entries)
          .fontSize(function(d) { return xScale(d.value); })
          .text(function(d) { return d.key; })
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          .font("Impact")
          .on("end", draw)
          .start();

          
          function filterEventNames(data)
          {
              g = [];
              for(i=0;i<groupEventsAndCategories.length;i++)
                  {
                      if(groupEventsAndCategories[i]["venue.name"].toLowerCase() == data.toLowerCase())
                          {
                              console.log("yesssss");
                              
                          }
                  }
              
          }
          
        function clicked(d)
          {

            filteredCatInfo = filterEventNames(d.text);
            console.log(filteredCatInfo);
              
          }
        function draw(words) {
          d3.select("#wordCloud").append("svg")
                .attr("id","WC")
            
              .attr("width", width)
              .attr("height", height)
            .append("g")
              .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
            .selectAll("text")
              .data(words)
            .enter().append("text")
              .style("font-size", function(d) { return xScale(d.value) + "px"; })
              .style("font-family", "Impact")
              .style("fill", function(d, i) { return fill(i); })
              .attr("text-anchor", "middle")
              .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .text(function(d) { return d.key; })
            
            .on("click",clicked);
        }

        d3.layout.cloud().stop();
      }
    

    
    var memberData;
    
    
    
    function countDuplicates(original) {
  const uniqueItems = new Set();
  const duplicates = new Set();
  for (const value of original) {
    if (uniqueItems.has(value)) {
      duplicates.add(value);
      uniqueItems.delete(value);
    } else {
      uniqueItems.add(value);
    }
  }
  return duplicates.size;
}
    
var newYorkNetworkData, sanFransiscoNetworkData, AllNetworkData, chicagoNetworkData;
    
var fullNetworkNodes, newYorkNodes, chicagoNodesNetwork, sanFranciscoNodes;
    
    
    
    
    

        d3.json("data/AllNodes.json",function(error, data) {
        
            fullNetworkNodes = data;
            
            d3.json("data/AllLinks.json",function(error, data) {
        
            AllNetworkData = data;
    drawNetworkDiagram(fullNetworkNodes,AllNetworkData)

        });


        });
    d3.json("data/NYNodes.json",function(error, data) {
        
            newYorkNodes = data;
        d3.json("data/CNodes.json",function(error, data) {
        
            chicagoNodesNetwork = data;
            
                d3.json("data/SFNodes.json",function(error, data) {
        
            sanFranciscoNodes = data;
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
        
    countForNewYork = 0;
    countForSanFrancisco = 0;
    countForChicago = 0;

    

    
    for(i=0;i<newYorkNodes.length;i++)
        {
            countForNewYork = countForNewYork + newYorkNodes[i].total;
        }
    
    for(i=0;i<chicagoNodesNetwork.length;i++)
        {
            countForChicago = countForChicago + chicagoNodesNetwork[i].total;
        }
    
    for(i=0;i<sanFranciscoNodes.length;i++)
        {
            if(sanFranciscoNodes[i].total)
                {
            countForSanFrancisco = countForSanFrancisco + sanFranciscoNodes[i].total;
                }
        }

                    
                    
                    
 


	
        
barData = [{x:"New York","y" : countForNewYork },{x :  "San Francisco",  "y" : countForSanFrancisco},{"x" :  "Chicago","y": countForChicago}]


 InitChart(barData);

                    
        });



        });

        });

    

    
    
    
    
    


        d3.json("data/NYLinks.json",function(error, data) {
        
            newYorkNetworkData = data;

        });
    d3.json("data/SFLinks.json",function(error, data) {
        
            sanFransiscoNetworkData = data;

        });
    d3.json("data/CLinks.json",function(error, data) {
        
            chicagoNetworkData = data;

        });

    

    
     
    
    
function drawNetworkDiagram(nodes,links)
    {
        
            
    var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
    
      for(i=0;i<nodes.length;i++)
        {
            nodes[i].group = i;
        }
    for(j=0;j<links.length;j++)
        {
            for(k=0;k<nodes.length;k++)
                {
                    if(links[j].source == nodes[k].source)
                        {
                            links[j].x1= nodes[k].x;
                            links[j].y1 = nodes[k].y;
                            links[j].source = nodes[k].group
                        }
                    if(links[j].target == nodes[k].source)
                        {
                            links[j].x2= nodes[k].x;
                            links[j].y2 = nodes[k].y;
                            links[j].target = nodes[k].group
                        }
                }
        }
    

    
    totalTrafficForAllNodes = 0;
        
        for(h=0;h<links.length;h++)
            {
                totalTrafficForAllNodes = totalTrafficForAllNodes + links[h].totalTraffic;
            }
    
    
    
    
    
    var graph = d3.select('#container');

var svg = graph.append('svg')
               .attr('width', 1000)
               .attr('height', 500)
.attr("id","networkDiagram")
.style("margin-top","50px");

// append links:
links = svg.selectAll()
  .data(links)
  .enter()
  .append("line")
  .attr("x1", function(d) { return d.x1; })
  .attr("y1", function(d) { return d.y1; })
  .attr("x2", function(d) { return d.x2; })
  .attr("y2", function(d) { return d.y2; })
  .attr("stroke","grey")
  .attr("stroke-width", function(d) { return (d.totalTraffic/totalTrafficForAllNodes)*30; });
  
// append nodes:
        kkk=nodes;
nodes = svg.selectAll()
  .data(nodes)
  .enter()
  .append("circle")
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; })
    .attr("fill", "white")
    .attr("stroke", "red")
    .on("mouseover", handleMouseOver)
              .on("mouseout", handleMouseOut)

  .attr("r", function(d) { return Math.pow(d.total, 1/4); });
  
        console.log(nodes)
    var elem = svg.selectAll("g")
        .data(kkk);
var elemEnter = elem.enter()
       .append("g")
        .attr("transform", function(d){return "translate("+d.x+","+d.y+")"})

    
      elemEnter.append("text")
        .attr("dx", function(d){return -20})
        .attr("dy", function(d){return (-1*Math.pow(d.total, 1/4))-5})
        .text(function(d){return d.source})
    
    
    function handleMouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this).attr({
              fill: "white",
            });

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
        
                        $("#barChartForCities").empty();
       $("#attendanceHeading").text("Meeting Attendance for all Categories");

        InitChart(barData);


            
          }
        
        
    function handleMouseOver(d, i) {  // Add interactivity

            // Use D3 to select element, change color and size
            d3.select(this).attr({
              fill: "red",
            });
       $("#attendanceHeading").text("Meeting Attendance for "+ d.source);

        div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html("Name: " + [d.source] + "<br/>" + "Attendance: "+ [d.total])	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	

        
            for(i=0;i<links[0].length;i++)
                {
                    if( ((links[0][i].x1.baseVal.value == d.x) && (links[0][i].y1.baseVal.value == d.y)) ||( (links[0][i].x2.baseVal.value == d.x) && (links[0][i].y2.baseVal.value == d.y)))
                        {
                            links[0][i].style.stroke="orange"
                        }
                }
        
        
         yNewYork =0;
        ySF = 0;
        yCh = 0;
        
        for(i=0;i<newYorkNodes.length;i++)
            {
                if(d.source == newYorkNodes[i].source)
                    {
                        yNewYork = newYorkNodes[i].total;
                    }
            }
           for(i=0;i<sanFranciscoNodes.length;i++)
            {
                if(d.source == sanFranciscoNodes[i].source)
                    {
                        ySF = sanFranciscoNodes[i].total;
                    }
            }
           for(i=0;i<chicagoNodesNetwork.length;i++)
            {
                if(d.source == chicagoNodesNetwork[i].source)
                    {
                        yCh = chicagoNodesNetwork[i].total;
                    }
            }
        

        var barData = [{x:"New York","y" : yNewYork },{x :  "San Francisco",  "y" : ySF},{"x" :  "Chicago","y": yCh}]

                $("#barChartForCities").empty();

        
 InitChart(barData);
        
        
        
        
          }
    

    }
    
    

    
    function InitChart(barData) {



  var vis = d3.select('#barChartForCities'),
    WIDTH = 500,
    HEIGHT = 500,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 100
    },
    xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, 390], 0.1).domain(barData.map(function (d) {
      return d.x;
    })),


    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
      d3.max(barData, function (d) {
        return d.y;
      }) + d3.max(barData, function (d) {
        return d.y;
      })/10
    ]),

    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),

    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient("left")
      .tickSubdivide(true);


  vis.append('svg:g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
    .call(xAxis);

  vis.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
    .call(yAxis);

  vis.selectAll('rect')
    .data(barData)
    .enter()
    .append('rect')
    .attr('x', function (d) {
      return xRange(d.x);
    })
    .attr('y', function (d) {
      return yRange(d.y);
    })
    .attr('width', xRange.rangeBand())
    .attr('height', function (d) {
      return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
    })
    .attr('fill', 'steelblue');


}
                    
    
    
    
    
});