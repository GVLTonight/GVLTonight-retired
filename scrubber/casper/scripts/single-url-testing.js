/* eslint-disable */

var venues = [
    {
        url: 'http://www.smileysacousticcafe.com/calendar.php',
        title: 'smileys',
        selector: '#mvEventContainer2 > div:nth-child(3) > table.st-grid > tbody > tr:nth-child(2)'
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
        casper.waitForSelector(venue.selector, function(){
            var js = this.evaluate(function() {
                return document;
            });
            var buffer = JSON.stringify(js.all[0].outerHTML);
            var result = buffer.slice(1, -1);
            var strip_newlines = result.replace(new RegExp('\\\\n', 'g'), '');
            stripped = strip_newlines.replace(new RegExp('\\\\', 'g'), '');
            this.echo('Completed: ' + venue.title);
        });

        casper.then(function(){
            fs.write('./scrubber/casper/html/' + venue.title + '.html', '<!-- ' + new Date(Date.now()).toLocaleString() + ' -->' + stripped + '<!-- ' + new Date(Date.now()).toLocaleString() + ' -->', 'w');
        })
    });
});

casper.run();
