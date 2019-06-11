library(jsonlite)
library(rjson)


url <- 'http://api.meetup.com/2/cities?country=us&offset=0&page=20&format=json&offset'

# in this case we pass an URL to the fromJSON function instead of the actual content we want to parse
a <- fromJSON(url)

data = rjson::fromJSON(file=url)

print(data$results)

json_data_frame <- as.data.frame(data$results[[1]])



toJSON(rbind(fromJSON(step1), order3))

json_data_frame <- as.data.frame(data$results)

data$results[[1]]


json <- toJSON(data$results[[1]])

for(i in 2:20)
{
  json = toJSON(rbind(fromJSON(json),   toJSON(data$results[[2]])   ))
}

json
