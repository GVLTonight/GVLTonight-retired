var fs = require('fs')

module.exports = function(tonight, thisWeek, done) {
  var data = tonight
  data += thisWeek
fs.writeFile('./app/tempor.html', data, function(){
    done()
  })
}
