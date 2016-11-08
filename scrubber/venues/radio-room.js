const cheerio = require('cheerio');
const fs = require('fs');

let url = 'http://www.radioroomgreenville.org/calendar';
let local_path = './scrubber/casper/html/radio-room.html';
let shows = [];

radio_room = function(done) {
    let $ = cheerio.load(fs.readFileSync(local_path));
    $('.tour-item').each(function(i, elem) {
        let $$ = cheerio.load(elem);
        let raw_date = $$('.tour-timeframe').attr('data-tour-datetime');
        let raw_time = raw_date;
        let date = raw_date.split('T')[0];
        let time = raw_time.split('T')[1];
        let show = {
            venue: 'Radio Room Greenville',
            venueUrl: url,
            title: $$('.tour-venue-name').text(),
            url: $$('.tour-venue > a').attr('href'),
            time: time,
            date: date
        };
        shows.push(show);
    });
    if (shows.length > 0) {
        console.log('radio room OKAY');
    }

    done(null, shows);
};

module.exports = radio_room;
