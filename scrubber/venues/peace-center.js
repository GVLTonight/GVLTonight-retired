const cheerio = require('cheerio');
const fs = require('fs');
const moment = require('moment');

const url = 'http://www.peacecenter.org/events';
const local_path = './scrubber/casper/html/peace-center.html';
let shows = [];
let span;
let date;

peace_center = function(done) {
    let $ = cheerio.load(fs.readFileSync(local_path));
    $('.entry').each(function(i, elem) {
        let $$ = cheerio.load(elem);
        let raw_date = $$('.date').text();
        let cleaned_date = raw_date.replace(new RegExp('t', 'g'), '');
        normalizeDate(cleaned_date);

        let show = {
            venue: 'Peace Center',
            venueUrl: url,
            title: $$('h3').text(),
            url: $$('.more').attr('href'),
            date: date,
            span: span
        };
        shows.push(show);
    });

    if (shows.length > 0) {
        console.log('peace center OKAY');
    }
    done(null, shows);
    // console.log(shows);
};

normalizeDate = function(input) {
    if (input.indexOf('-')  > 0) {
        prebuildDateSpan(input);
    } else {
        completeSplit(input);
    }
};

function prebuildDateSpan(input) {
    let split_date = input.split(' - ');
    let start = completeSplit(split_date[0]);
    let end = completeSplit(split_date[1]);
    span = [start, end];
    // console.log(span);
    return span;
}

function momentDiff(start, end) {
    let startMoment = moment(start);
    let endMoment = moment(end);
    let diff = endMoment.diff(startMoment, 'days');
    console.log(diff);
}

function completeSplit(input) {
    let split_date = input.split('.');
    let month = split_date[0];
    let day = split_date[1];
    let year = split_date[2];
    let rebuilt_date = ['20' + year, month, day];
    let returnValue = rebuilt_date.join('-');
    date = moment(returnValue, 'YYYY-M-D').format('YYYY-MM-DD');
    // console.log(momentDate);
    return date;
}

// peace_center();

module.exports = peace_center;
