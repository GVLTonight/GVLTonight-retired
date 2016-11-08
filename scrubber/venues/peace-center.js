const cheerio = require('cheerio');
const fs = require('fs');

const url = 'http://www.peacecenter.org/events';
const local_path = './scrubber/casper/html/peace-center.html';
let shows = [];

peace_center = function(done) {
    let $ = cheerio.load(fs.readFileSync(local_path));
    $('.entry').each(function(i, elem) {
        let $$ = cheerio.load(elem);
        let raw_date = $$('.date').text();
        let date = raw_date.replace(new RegExp('t', 'g'), '');
        // var date = raw_date.split('T')[0];
        // var time = raw_date.split('T')[1];
        let show = {
            venue: 'Peace Center',
            venueUrl: url,
            title: $$('h3').text(),
            url: $$('.more').attr('href'),
            date: date
        };
        shows.push(show);
    });

    if (shows.length > 0) {
        console.log('peace center OKAY');
    }
    done(null, shows);
};

module.exports = peace_center;
