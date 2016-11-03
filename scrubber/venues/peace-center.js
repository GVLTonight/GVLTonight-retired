let cheerio = require('cheerio'),
    request = require('request'),
    fs = require('fs');

let url = 'http://www.peacecenter.org/events',
    local_path = './scrubber/casper/html/peace-center.html',
    shows = [];

peace_center = function(done){
    var $ = cheerio.load(fs.readFileSync(local_path));
    $('.entry').each(function(i, elem) {
        var $$ = cheerio.load(elem);
        var raw_date = $$('.tour-timeframe').attr('data-tour-datetime');
        var raw_time = raw_date;
        // var date = raw_date.split('T')[0];
        // var time = raw_date.split('T')[1];
        var show = {
            venue: 'Radio Room Greenville',
            venueUrl: 'http://www.radioroomgreenville.com/',
            title: $$('.tour-venue-name').text(),
            url: $$('.tour-venue > a').attr('href')
            // time: time,
            // date: date
        }
        shows.push(show);
    });

    if (shows.length > 0){
        console.log('peace center OKAY');
    }
    done(null, shows)
}

module.exports = peace_center;
