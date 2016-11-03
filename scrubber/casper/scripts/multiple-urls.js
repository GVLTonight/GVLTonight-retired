var venues = [
    {
        url: 'http://www.peacecenter.org/events/shows-tickets',
        title: 'peace-center',
        selector: '.event_list .entry'
    },
    {
        url: 'http://www.radioroomgreenville.com/calendar',
        title: 'radio-room',
        selector: '.tour-item'
    },
    {
        url: 'https://www.facebook.com/search/events/?q=Cabin%20Floor%20Records&place_id=126363234062075&surface=tyah',
        title: 'cabin-floor',
        selector: '._1yt'
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
