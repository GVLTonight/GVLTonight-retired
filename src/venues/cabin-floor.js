const cheerio = require('cheerio');
const fs = require('fs');
const moment = require('moment');

let url = 'https://www.facebook.com/Cabin-Floor-Records-126363234062075/events/?ref=page_internal';
let local_path = './scrubber/casper/html/cabin-floor.html';
let shows = [];

cabin_floor = function(done) {
    let $ = cheerio.load(fs.readFileSync(local_path));
    $('._4-u3:nth-of-type(1)').find('._51mx').each(function(i, elem) {
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
            date: normalizeDate(date, time)
        };
        shows.push(show);
        // console.log(shows);
    });
    if (shows.length > 0) {
        console.log('Cabin Floor OKAY');
    }

    done(null, shows);
    // console.log(shows)
};

function normalizeDate(month_date, day) {
    let month = month_date.substring(0, 3);
    let dayof = month_date.substring(3, 1000);

    let rebuilt_date = moment().format('YYYY') + '-' + month + '-' + dayof;
    let momentDate = moment(rebuilt_date, 'YYYY-MMM-D').format('YYYY-MM-DD');
    return momentDate;
}

module.exports = cabin_floor;

// cabin_floor();
