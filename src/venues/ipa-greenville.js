const fs = require('fs');
const moment = require('moment');

// SOURCE_URL is the actual JSON data source, url is linked to FB
const SOURCE_URL = 'http://eventful.com/greenville/venues/independent-public-alehouse-/V0-001-007408432-1';

const url = 'https://www.facebook.com/ipagreenville/';
const local_path = './src/casper/html/ipa-greenville.json';
let shows = [];

ipa_greenville = function(done){

    let res = JSON.parse(fs.readFileSync(local_path));
    if (res.events != null) {
        let items = res.events.event;

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let raw_date = items[i].start_time;
            let date = moment(raw_date, 'YYYY-MM-DD H:m:ss').format('YYYY-MM-DD');
            let time = moment(raw_date, 'YYYY-MM-DD H:m:ss').format('h:mm a');

            let show = {
                venue: 'Independent Public Alehouse',
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
            console.log('IPA OKAY');
        }

        done(null, shows);
        console.log(shows);
    }
};

module.exports = ipa_greenville;
// ipa_greenville();
