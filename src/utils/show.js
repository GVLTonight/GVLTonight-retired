// PLEASE REFACTOR ME PLEEAASE DONT LEEAAAVE MEEE

const levelup = require('levelup');
const queue = require('queue-async');
const moment = require('moment');
const Table = require('cli-table');
const db = levelup('./db');

const tableOptions = { head: ['DATE', 'VENUE', 'TITLE'], colWidths: [12, 30, 40] };
let table = new Table(tableOptions);
let allShowsList = "";

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
    let result = moment().utcOffset("-05:00");
    if(process.argv.indexOf("-d") != -1){
        let date_argument = process.argv[process.argv.indexOf("-d") + 1];
        if (!moment(date_argument, "YYYY-MM-DD", true).isValid()){
            console.log("\nSorry that is not a valid date, please provide date in YYYY-MM-DD format.\nUsing standard date format.\n")
        } else {
            result = process.argv[process.argv.indexOf("-d") + 1];
        }
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
        let buffer = JSON.parse(data.value);
        showsThisWeek.push(data.value);
        table.push([buffer.date, buffer.venue, buffer.title]);
    })
    .on('error', function(err) {
        console.log('err::::' + err);
    })
    .on('end', function() {
        for (let i = 0; i < showsThisWeek.length; i++){
            let parsed = JSON.parse(showsThisWeek[i]);
            // console.log('\t' + parsed.date + '!' + parsed.venue + '!' + parsed.title);
        }
        done(showsThisWeek);
    });
}

function addShows_to_DB(shows, done) {
    let q = queue(1);
    shows.forEach(function(show) {
        q.defer(function(cb) {
            db.put(show.date + '!' + show.venue + '!' + show.title, JSON.stringify(show), function(err) {
                if (show.title != "Charles Hedgepath"){
                    allShowsList += "\n" + show.date + '!' + show.venue + '!' + show.title;
                }
                cb(null, null);
            });
        });
    });
    q.awaitAll(function() {
        if(process.argv.indexOf("-a") != -1){ //does our flag exist?
            console.log(allShowsList);
        } else {
            console.log(table.toString());
        }
        console.log('Adding values to DB\nTo see all values being added/merged, run command with "-a" flag.\n');
    });
}
