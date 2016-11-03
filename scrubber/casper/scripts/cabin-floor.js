var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    pageSettings: {
        customHeaders: {
            'Accept-Encoding': 'identity'
        }
    }
});


var url = 'https://www.facebook.com/search/events/?q=Cabin%20Floor%20Records&place_id=126363234062075&surface=tyah';
var title = 'cabin-floor';
var selector = '._1yt';
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
