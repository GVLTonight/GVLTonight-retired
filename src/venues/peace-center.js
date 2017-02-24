const cheerio = require('cheerio');
const fs = require('fs');
const moment = require('moment');

const url = 'http://www.peacecenter.org/events';
const local_path = './src/casper/html/peace-center.html';
let shows = [];

peace_center = function(done){
    let $ = cheerio.load(fs.readFileSync(local_path));
    $('.entry').each(function(i, elem) {
        let $$ = cheerio.load(elem);
        let raw_date = $$('.date').text();
        let cleaned_date = raw_date.replace(new RegExp('t', 'g'), '');
        let dateSwitch = parseDate(cleaned_date);

        if (typeof(dateSwitch) === 'string'){
            let show = {
                venue: 'Peace Center',
                venueUrl: url,
                title: $$('h3').text(),
                url: $$('.more').attr('href'),
                date: dateSwitch
            };
            shows.push(show);
        } else {
            let dateSpan = getDates(dateSwitch[0], dateSwitch[1]);
            for (var i = 0; i < dateSpan.length; i++){
                let show = {
                    venue: 'Peace Center',
                    venueUrl: url,
                    title: $$('h3').text(),
                    url: $$('.more').attr('href'),
                    date: dateSpan[i]
                };
                shows.push(show);
            }
        }
    });

    if (shows.length > 0) {
        console.log('peace center OKAY');
    }

    // console.log(shows);
    done(null, shows);
}

function parseDate(input, option) {
    if (input.indexOf('-')  > 0) {
        return prebuildDateSpan(input);
    } else {
        return completeSplit(input);
    }
}

function prebuildDateSpan(input) {
    let split_date = input.split(' - ');
    let start = completeSplit(split_date[0]);
    let end = completeSplit(split_date[1]);
    span = [start, end];
    // console.log(span);
    return span;
}

function completeSplit(input) {
    let split_date = input.split('.');
    let month = split_date[0];
    let day = split_date[1];
    let year = split_date[2];
    let rebuilt_date = ['20' + year, month, day];
    let returnValue = rebuilt_date.join('-');
    let momentDate = moment(returnValue, 'YYYY-M-D').format('YYYY-MM-DD');
    // console.log(momentDate);
    return momentDate;
}

function getDates(startDate, endDate) {
    let startMoment = moment(startDate);
    let endMoment = moment(endDate);
    var dateArray = [];
    var currentDate = startMoment;
    while (currentDate <= endMoment) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

// peace_center();

module.exports = peace_center;
