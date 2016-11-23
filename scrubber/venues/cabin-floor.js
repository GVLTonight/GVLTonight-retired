const cheerio = require('cheerio');
const fs = require('fs');

let url = 'https://www.facebook.com/Cabin-Floor-Records-126363234062075/events/?ref=page_internal';
let local_path = './scrubber/casper/html/cabin-floor.html';
let shows = [];

cabin_floor = function(done) {
    let $ = cheerio.load(fs.readFileSync(local_path));
    $('._51mx').each(function(i, elem) {
        let $$ = cheerio.load(elem);
        let raw_date = $$('._4dme').text();
        let raw_time = $$('.fsm > span').text();
        let date = raw_date;
        let time = raw_time;
        let show = {
            venue: 'Cabin Floor Records',
            venueUrl: url,
            title: $$('._4dmk').text(),
            url: $$('._4dmk').attr('href'),
            time: time,
            date: date
        };
        shows.push(show);
        // console.log(shows);
    });
    if (shows.length > 0) {
        console.log('Cabin Floor OKAY');
    }

    done(null, shows);
};

normalizeDate = function(date) {
    date = date.split('/');
    let month = date.shift();
    let day = date.shift();
    date.push(month);
    date.push(day);
    return date.join('-');
};

module.exports = cabin_floor;

// cabin_floor();
