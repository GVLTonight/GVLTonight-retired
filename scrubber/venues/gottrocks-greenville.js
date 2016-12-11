const cheerio = require('cheerio');
const fs = require('fs');
const moment = require('moment');

const url = 'http://www.gottrocksgreenville.com/shows-1/';
const local_path = './scrubber/casper/html/gottrocks-greenville.html';
let shows = [];

gottrocks = function(done){
    let $ = cheerio.load(fs.readFileSync(local_path));
    $('.eventlist-event').each(function(i, elem) {
        let $$ = cheerio.load(elem);

        let show = {
            venue: 'Gottrocks',
            venueUrl: url,
            title: $$('.eventlist-title').text(),
            url: $$('.eventlist-title-link').attr('href'),
            time: $$('.event-time-12hr > .event-time-12hr-start').text(),
            date: $$('.eventlist-meta-date > time').attr('datetime')
        }

        shows.push(show);
    });
    if (shows.length > 0) {
        console.log('Radio Room OKAY');
    }

    done(null, shows);
    // console.log(shows);
};

module.exports = gottrocks;
// gottrocks();

