$(document).ready(function() {

    
    
    
$("#refreshButton").click(function(){


        $("#barChartForHeatMap").empty();
$("#barChartHeading").text("Members attending Career/Fine Arts/Book Club")
renderFirstBarChart();






});
        
      var margin = { top: 50, right: 0, bottom: 100, left: 50 },
          width = 960 - margin.left - margin.right,
          height = 430 - margin.top - margin.bottom,
          gridSize = Math.floor(width / 24),
          legendElementWidth = gridSize*2,
          buckets = 9,
          colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
          days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];

      var svg = d3.select("#svgForHeatMap")
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var dayLabels = svg.selectAll(".dayLabel")
          .data(days)
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", -20)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

      var timeLabels = svg.selectAll(".timeLabel")
          .data(times)
          .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return i * gridSize; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

    
    
    function renderFirstBarChart()
    {
        countForCareer = 0;
        countForFineArts = 0;
        countForBookClub = 0;
        
        
        for(q=0;q<globalBar.length;q++)
            {
                if(globalBar[q]['career/business'])
                    {
                countForCareer = countForCareer + globalBar[q]['career/business'];
                    }
                if(globalBar[q]['fine arts/culture'])
                    {
                countForFineArts = countForFineArts + globalBar[q]['fine arts/culture'];
                    }
                if(globalBar[q]['book clubs'])
                    {
                countForBookClub = countForBookClub + globalBar[q]['book clubs'];
                    }
            }
        
            var barData = [{"type":"Career","count": countForCareer},{"type":"Arts & Culture","count":countForFineArts},{"type":"Book Club","count":countForBookClub}]
            

    
    var vis = d3.select('#barChartForHeatMap'),
    HEIGHT = 500,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 100
    },
    xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, 450], 0.1).domain(barData.map(function (d) {
      return d.type;
    })),


    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
      d3.max(barData, function (d) {
        return d.count;
      }) + d3.max(barData, function (d) {
        return d.count;
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
      return xRange(d.type);
    })
    .attr('y', function (d) {
      return yRange(d.count);
    })
    .attr('width', xRange.rangeBand())
    .attr('height', function (d) {
      return ((HEIGHT - MARGINS.bottom) - yRange(d.count));
    })
    .attr('fill', 'steelblue');
    }
    
    function handleMouseClickForHeatMap(hour,day)
    {
        
        
        time = (hour%12)+1
        if(hour>=12)
            {
                time = time +  "PM"
            }
        else
            {
                time = time + "AM";
            }
        if(day == 1)
            {
                dayText = "Monday"
            }
        else if(day ==2)
            {
                dayText = "Tuesday"
            }
        else if(day ==3)
            {
                dayText = "Wednesday"
            }
        else if(day == 4)
            {
                dayText = "Thursday"
            }
        else if(day == 5)
            {
                dayText = "Friday"
            }
        else if(day == 6)
            {
                dayText = "Saturday"
            }
        else if(day == 7)
            {
                dayText = "Sunday"
            }
        $("#barChartForHeatMap").empty();
        $("#barChartHeading").text("Attendance at "+ time + " " +dayText)
        filteredList = [];
        
        for(q=0;q<globalBar.length;q++)
            {
                if(globalBar[q].day == day && globalBar[q].hour == hour)
                    {
                        filteredList.push(globalBar[q]);
                    }
            }
        
        
    
    var barData = [{"type":"Career","count":filteredList[0]["career/business"]},{"type":"Fine Arts & Culture","count":filteredList[0]["fine arts/culture"]},{"type":"Book Club","count":filteredList[0]["book clubs"]}]
    
    
    
    var vis = d3.select('#barChartForHeatMap'),
    HEIGHT = 500,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 100
    },
    xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, 450], 0.1).domain(barData.map(function (d) {
      return d.type;
    })),


    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
      d3.max(barData, function (d) {
        return d.count;
      }) + d3.max(barData, function (d) {
        return d.count;
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
      return xRange(d.type);
    })
    .attr('y', function (d) {
      return yRange(d.count);
    })
    .attr('width', xRange.rangeBand())
    .attr('height', function (d) {
      return ((HEIGHT - MARGINS.bottom) - yRange(d.count));
    })
    .attr('fill', 'steelblue');

        
        
    
    
    
        
    }
    var globalBar;
    d3.json("data/dayTime.json",function(error, data) {
        
        globalBar = data;

          var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.count; })])
              .range(colors);

          var cards = svg.selectAll(".hour")
              .data(data, function(d) {return d.day+':'+d.hour;});

          cards.append("title");

        
        
        
        
        
          cards.enter().append("rect")
              .attr("x", function(d) { return (d.hour - 1) * gridSize + 40; })
              .attr("y", function(d) { return (d.day - 1) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
            .on("click", function(d) { return handleMouseClickForHeatMap(d.hour,d.day); })

              .attr("class", "hour bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0]);

          cards.transition().duration(1000)
              .style("fill", function(d) { return colorScale(d.count); });

          cards.select("title").text(function(d) { return d.count; });
          
          cards.exit().remove();

          var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; });

          legend.enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { return "≥ " + Math.round(d); })
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height + gridSize);

          legend.exit().remove();
        
        renderFirstBarChart()
        
        

        });  
});