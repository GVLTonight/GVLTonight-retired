const fs = require('fs');
const queue = require('queue-async');
// const childProcess = require('child_process');
const show = require('./show.js');
// const generateHTML = require('./generateHTML.js');
// const makePage = require('./makePage.js');

// Scrapers run / DB updated every 30 minutes
//new cronJob('*/30 * * * *', function(){
fs.readdir(__dirname + '/venues', function(err, dirs) {
    let q = queue();
    dirs.forEach(function(dir) {
        let fn = require(__dirname + '/venues/' + dir);
        q.defer(fn);
    });
    q.awaitAll(function(errs, results) {
        let shows = [];
        results.forEach(function(venue) {
            shows = shows.concat(venue);
        });
        show.addShows(shows);
    });
});

show.getShows(function(result) {
    console.log(result);
    // generateHTML(result, function(tonight, thisWeek) {
    //     // returns html for tonight and array of html for each venue this week
    //     makePage(tonight, thisWeek.join(' '), function() {
    //         childProcess.execSync('git add .; git commit -m "refresh"; git push origin gh-pages;')
    //             console.log('done');
    //     });
    // });
});
