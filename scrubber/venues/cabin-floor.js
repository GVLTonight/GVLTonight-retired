const cheerio = require('cheerio');
const fs = require('fs');

let url = 'https://www.facebook.com/search/events/?q=Cabin%20Floor%20Records&place_id=126363234062075&surface=tyah';
let local_path = './scrubber/casper/html/cabin-floor.html';
let shows = [];

cabin_floor = function(done) {
    let $ = cheerio.load(fs.readFileSync(local_path));
    $('._1yt').each(function(i, elem) {
        let $$ = cheerio.load(elem);
        let raw_date = $$('._pac').text();
        let raw_time = raw_date;
        let date = raw_date;
        let time = raw_time;
        let show = {
            venue: 'Cabin Floor Records',
            venueUrl: url,
            title: $$('._gll').text(),
            url: $$('._gll > a').attr('href'),
            time: time,
            date: date
        };
        shows.push(show);
        console.log(shows)
    });
    if (shows.length > 0) {
        console.log('Cabin Floor OKAY');
    }

    // done(null, shows);
};

module.exports = cabin_floor;

cabin_floor()
