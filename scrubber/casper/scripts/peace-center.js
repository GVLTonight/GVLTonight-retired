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
    }
]

var casper = require('casper').create({
    verbose: false,
    logLevel: 'debug',
    pageSettings: {
        customHeaders: {
            'Accept-Encoding': 'identity'
        }
    }
});

var moment = require('../moment');
var fs = require('fs');

var stripped;

function Parser(url, title, selector){
    var current_date = moment();

    casper.start(url);

    casper.waitForSelector(selector, function(){
        var js = this.evaluate(function() {
            return document;
        });

        var buffer = JSON.stringify(js.all[0].outerHTML);
        var result = buffer.slice(1, -1);
        var strip_newlines = result.replace(new RegExp('\\\\n', 'g'), '');
        stripped = strip_newlines.replace(new RegExp('\\\\', 'g'), '');

        // this.echo(stripped);
        this.echo(title + ': ' + stripped.length + ' characters.');
    });

    casper.then(function(){
        fs.write('./scrubber/casper/html/' + title + '.html', '<!-- ' + current_date + ' -->' + stripped + '<!-- ' + current_date+ ' -->', 'w');
    });

    casper.run();
}

for (var i = 0; i < venues.length; i++) {
    Parser(venues[i].url, venues[i].title, venues[i].selector);
}
