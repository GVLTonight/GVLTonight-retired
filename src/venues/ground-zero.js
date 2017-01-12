const fs = require('fs');
const moment = require('moment');

// SOURCE_URL is the actual JSON data source, url is linked to FB
const SOURCE_URL = 'http://eventful.com/spartanburg/venues/ground-zero-/V0-001-000441941-8';

const url = 'https://www.facebook.com/pg/groundzeroSC/events/?ref=page_internal';
const local_path = './src/casper/html/ground-zero.json';
let shows = [];

ground_zero = function(done){
    let res = JSON.parse(fs.readFileSync(local_path));
    let items = res.events.event;

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let raw_date = items[i].start_time;
        let date = moment(raw_date, 'YYYY-MM-DD H:m:ss').format('YYYY-MM-DD');
        let time = moment(raw_date, 'YYYY-MM-DD H:m:ss').format('h:mm a');

        let show = {
            venue: 'Ground Zero',
            venueUrl: url,
            title: item.title,
            description: item.description,
            url: item.url,
            time: time,
            date: date
        };
        shows.push(show);
    }

    if (shows.length > 0) {
        console.log('Radio Room OKAY');
    }

    done(null, shows);
    // console.log(shows);
};

module.exports = ground_zero;
// ground_zero();
