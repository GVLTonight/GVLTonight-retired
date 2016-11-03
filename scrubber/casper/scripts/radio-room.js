var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    pageSettings: {
        customHeaders: {
            'Accept-Encoding': 'identity'
        }
    }
});


var url = 'http://www.radioroomgreenville.com/calendar';
var title = 'radio-room';
var selector = '.tour-item';
var stripped;

var fs = require('fs');

casper.start(url);

casper.waitForSelector(selector, function(){
    var js = this.evaluate(function() {
        return document;
    });
    var buffer = JSON.stringify(js.all[0].outerHTML);
    var result = buffer.slice(1, -1);
    var strip_newlines = result.replace(new RegExp('\\\\n', 'g'), '');
    stripped = strip_newlines.replace(new RegExp('\\\\', 'g'), '');

    this.echo(stripped);
    this.echo('done');
});

casper.then(function(){
    fs.write('./scrubber/casper/html/' + title + '.html', '<!-- ' + new Date(Date.now()).toLocaleString() + ' -->' + stripped + '<!-- ' + new Date(Date.now()).toLocaleString() + ' -->', 'w');

})

casper.run();