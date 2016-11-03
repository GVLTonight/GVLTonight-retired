var show = require

function generateHTML(shows, venue) {
  if(shows.length > 0) {
    var venueUrl = shows[0].venueUrl
    var html = "<div class='venueName'><h2><a href='"+venueUrl+"' target='_blank'>"+venue+"</a></h2></div> <ul>"
  }
  else var html = "<div class='venueName'><h2>"+venue+"</h2></div> <ul>"
  shows.forEach(function(show) {
    var newDate = []
    var date = show.date.split('-')
    var year = date[0]
    var month = date[1]
    var day = date[2]
    newDate.push(month)
    newDate.push(day)
    newDate.push(year)
    html += "<div class='showItem'><li>"
    if(show.url) {html+="<h3><a target='_blank' href='"+show.url+"'>"+show.title+"</a></h3>"}
    else {html+= "<h3>"+show.title+"</h3>"}
    html += "<span>Date: "+newDate.join('-')+"</span><br />"
    if(show.time) {html += "<span>Time: "+show.time+"</span><br />"}
    if(show.price) {html += "<span>Price: "+show.price+"</span><br />"}
    if(show.details) {html += "<span>Details: "+show.details+"</span><br />"}
    if(show.age) {html += "<span>Age: "+show.age+"</span><br />"}
    html += "</li></div><span class='spacer'> </span>"
  })
  html += "</ul>"
  return html
}
