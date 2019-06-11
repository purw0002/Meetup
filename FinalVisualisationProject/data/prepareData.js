$(document).ready(function() {

    
            d3.csv("data/groupEvents.csv",function(error, data) {

                g= [];
                for(i=0;i<data.length;i++)
                    {
                        date = new Date(data[i].hourIs);
                        data[i].month = date.getMonth()+1;
                        data[i].day = date.getDay()+1;
                        data[i].hours = date.getHours();
                        
                        flag = 0;
                        
                        for(j=0;j<g.length;j++)
                            {
                                if(g[j].hour == data[i].hours && data[i].day == g[j].day)
                                    {
                                        if(parseInt(data[i].yes_rsvp_count  == 0))
                                           {
                                        g[j].count = parseInt(g[j].count) + 1;
                                           }
                                           else{
                                        g[j].count = parseInt(g[j].count) + parseInt(data[i].yes_rsvp_count);
                                           }
                                        flag=1;
                                if(g[j][data[i]['category.name']])
                                    {
                                        g[j][data[i]['category.name']] = g[j][data[i]['category.name']] + 1;
                                    }
                                else
                                    {
                                        g[j][data[i]['category.name']] = 1
                                    }
                                    }

                            }
                        if(flag == 0)
                            {
                         g.push({"hour":data[i].hours, "count" :  data[i].yes_rsvp_count, "day"  : data[i].day})
                            }
                        

                    }
                console.log(g)
            });
    
});