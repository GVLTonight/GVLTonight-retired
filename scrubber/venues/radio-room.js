const cheerio = require('cheerio'),
    request = require('request'),
    fs = require('fs');

let url = 'http://www.radioroomgreenville.org/calendar',
    local_path = './scrubber/casper/html/radio-room.html',
    shows = [];

radio_room = function(done){
    var $ = cheerio.load(fs.readFileSync(local_path));
    $('.tour-item').each(function(i, elem) {
        var $$ = cheerio.load(elem);
        var raw_date = $$('.tour-timeframe').attr('data-tour-datetime');
        var raw_time = raw_date;
        var date = raw_date.split('T')[0];
        var time = raw_date.split('T')[1];
        var show = {
            venue: 'Radio Room Greenville',
            venueUrl: 'http://www.radioroomgreenville.com/',
            title: $$('.tour-venue-name').text(),
            url: $$('.tour-venue > a').attr('href'),
            time: time,
            date: date
        }
        shows.push(show);
    });
    if (shows.length > 0){
        console.log('radio room OKAY');
    }

    done(null, shows)
}

module.exports = radio_room;
