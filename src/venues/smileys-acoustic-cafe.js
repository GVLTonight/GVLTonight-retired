const cheerio = require('cheerio');
const fs = require('fs');

let url = 'http://www.smileysacousticcafe.com/calendar.php';
let local_path = './src/casper/html/smileys-acoustic-cafe.json';
let shows = [];

smileys_acoustic_cafe = function(done) {
    let res = JSON.parse(fs.readFileSync(local_path));
    let items = res.items;
    for (let i = 0; i < items.length; i++) {
        let raw_date = items[i].start.dateTime;
        let date = raw_date.split('T')[0];
        let raw_time = raw_date.split('T')[1];
        let time = raw_time.split('-')[0];
        let show = {
            venue: 'Smileys Acoustic Cafe',
            venueUrl: url,
            title: items[i].summary,
            url: items[i].htmlLink,
            time: time,
            date: date
        };
        shows.push(show);
    }
    if (shows.length > 0) {
        console.log('Smileys OKAY');
    }

    done(null, shows);
    // console.log(shows);
};

module.exports = smileys_acoustic_cafe;
// smileys_acoustic_cafe();
