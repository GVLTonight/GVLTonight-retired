const levelup = require('levelup');
const queue = require('queue-async');
const moment = require('moment');
const db = levelup('./db');

exports.getShows_from_DB = function(done) {
    getShows_from_DB(function(result) {
        done(result);
    });
};

exports.addShows_to_DB = function(shows) {
    addShows_to_DB(shows, function() {
        console.log('written');
    });
};

// if there is a date on the command line, use that. else use current moment(
// command line argument should be of format YYYY-MM-DD
exports.referenceDate = function() {
    let result = moment();

    if (process.argv.length === 3) {
        result = moment(process.argv[2]);
    }

    return result;
};

function getShows_from_DB(done) {
    let showsThisWeek = [];
    let date = exports.referenceDate();

    let today = date.toISOString().slice(0, 10);
    let nextWeek = date.add(7, 'days').toISOString().slice(0, 10);
    db.createReadStream({
        gte: today,
        lt: nextWeek
    })
    .on('data', function(data) {
        showsThisWeek.push(data.value);
    })
    .on('error', function(err) {
        console.log('err::::' + err);
    })
    .on('end', function() {
        done(showsThisWeek);
    });
}

function addShows_to_DB(shows, done) {
    let q = queue(1);
    shows.forEach(function(show) {
        q.defer(function(cb) {
            db.put(show.date + '!' + show.venue + '!' + show.title, JSON.stringify(show), function(err) {
                console.log(show.date + '!' + show.venue + '!' + show.title);
                cb(null, null);
            });
        });
    });
    q.awaitAll(function() {
        console.log('putting');
    });
}
