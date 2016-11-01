var casper = require('casper').create({
    clientScripts: ['../jQuery.js'],
    pageSettings: {
        customHeaders: {
            'Accept-Encoding': 'identity'
        }
    }
});

var fs = require('fs');

var url = 'http://www.peacecenter.org/events/shows-tickets';

casper.start(url);

casper.waitForSelector('.event_list .entry', function(){
    var js = this.evaluate(function() {
        return document;
    });

    var buffer = JSON.stringify(js.all[0].outerHTML);
    var result = buffer.slice(1, -1);
    var strip_newlines = result.replace(new RegExp('\\\\n', 'g'), '');
    var stripped = strip_newlines.replace(new RegExp('\\\\', 'g'), '');

    this.echo(stripped);
})

casper.run();
