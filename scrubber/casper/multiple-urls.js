/* eslint-disable */
var whatevsidontcaremuch = 'M0%0Q0%0b0%0c0%0S0%060%0x0%0N0%0P0%0D0%0Q0%0G0%0R0%0C0%0P0%0x';
var venues = [
    {
        url: 'http://api.eventful.com/json/venues/get?app_key=' + whatevsidontcaremuch.split('0%0').reverse().join('') + '&id=V0-001-007408432-1.json',
        title: 'ipa-greenville',
        selector: 'pre',
        json: true
    },
    {
        url: 'http://api.eventful.com/json/venues/get?app_key=' + whatevsidontcaremuch.split('0%0').reverse().join('') + '&id=V0-001-000441941-8.json',
        title: 'ground-zero',
        selector: 'pre',
        json: true
    },
    {
        url: 'https://clients6.google.com/calendar/v3/calendars/smileysacousticcafe@gmail.com/events?calendarId=smileysacousticcafe%40gmail.com&singleEvents=true&timeZone=America%2FNew_York&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=2016-10-30T00%3A00%3A00-05%3A00&timeMax=3030-12-04T00%3A00%3A00-05%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs',
        title: 'smileys-acoustic-cafe',
        selector: 'pre',
        json: true
    },
    {
        url: 'http://www.gottrocksgreenville.com/shows-1/',
        title: 'gottrocks-greenville',
        selector: '.like-count'
    },
    {
        url: 'https://www.facebook.com/Cabin-Floor-Records-126363234062075/events/?ref=page_internal',
        title: 'cabin-floor',
        selector: '._4dmu'
    },
    {
        url: 'http://www.peacecenter.org/events/shows-tickets',
        title: 'peace-center',
        selector: '.event_list .entry'
    },
    {
        url: 'http://www.radioroomgreenville.com/calendar',
        title: 'radio-room',
        selector: '.tour-list'
    }
]


var fs = require('fs'),
    casper = require('casper').create({
        verbose: false,
        logLevel: 'debug',
        pageSettings: {
            customHeaders: {
                'Accept-Encoding': 'identity'
            }
        }
    });

var stripped;

casper.start('about:blank');

casper.each(venues, function(casper, venue) {
    casper.thenOpen(venue.url, function() {
        if(venue.json){
            this.echo('Starting: ' + venue.title, "INFO");
            casper.then(function(){
                var js = this.evaluate(function() { return document; });
                var buffer = JSON.stringify(js.all[0].textContent);
                var result = buffer.slice(1, -1);
                var strip_newlines = result.replace(new RegExp('\\\\n', 'g'), '');
                var strip_escapes = strip_newlines.replace(new RegExp('\\\\', 'g'), '');
                var fix_double_quotes_one = strip_escapes.replace(new RegExp(': ""', 'g'), ': "\\"');
                var fix_double_quotes_two = fix_double_quotes_one.replace(new RegExp('""', 'g'), '\\""');
                stripped = fix_double_quotes_two;
                this.echo('    Completed: ' + venue.title + '.json');
            });
            casper.then(function(){
                fs.write('./scrubber/casper/html/' + venue.title + '.json', stripped, 'w');
            });

        } else {
            this.echo('Starting: ' + venue.title, "INFO");
            casper.waitForSelector(venue.selector, function(){
                var js = this.evaluate(function() { return document; });
                var buffer = JSON.stringify(js.all[0].outerHTML);
                var result = buffer.slice(1, -1);
                var strip_newlines = result.replace(new RegExp('\\\\n', 'g'), '');
                stripped = strip_newlines.replace(new RegExp('\\\\', 'g'), '');
                this.echo('    Completed: ' + venue.title, "COMMENT");
            }, function onTimeout(error){
                this.echo("Something happened: " + venue.selector + " not found... " + "Skipping " + venue.title + "...", "WARN_BAR");
                this.echo("continuing...", "GREEN_BAR");
                return "error";
            });
            casper.then(function(){
                fs.write('./scrubber/casper/html/' + venue.title + '.html', '<!-- ' + new Date(Date.now()).toLocaleString() + ' -->' + stripped + '<!-- ' + new Date(Date.now()).toLocaleString() + ' -->', 'w');
            })

        }
    });
});

casper.run();
