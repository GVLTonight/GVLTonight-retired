let cheerio = require('cheerio'),
    request = require('request');

let url_dom = 'http://www.peacecenter.org/events',
    url_rss = 'http://www.peacecenter.org/events/rss',
    url_tickets_dom = 'https://tickets.peacecenter.org/Online/default.asp',
    shows = [];



function peace_concert_hall_dom(url_selection){
    request(url_selection, function(err, response, body) {
        var $ = cheerio.load(body)
        $('.entry').each(function(i, elem) {
            var $$ = cheerio.load(elem)
            if($$('.info').find('h4').last().text() === 'Peace Concert Hall'){
                var date = $$('.date').text().split(' - ')[0].split('.').join('-').trim()
                // date = normalizeDate(date)
                var show = {
                    venue: 'Peace Center - Concert Hall',
                    venueUrl: 'http://www.peacecenter.org/',
                    title: $$('h3 > a').text(),
                    url: $$('.more').attr('href'),
                    date: date
                }
                shows.push(show)
                console.log(shows)
            }
        });
    });
}


function peace_concert_hall_dom_tickets(url_selection){
    request(url_selection, function(err, response, body) {
        var $ = cheerio.load(body)
        $('.result-box-item').each(function(i, elem) {
            var $$ = cheerio.load(elem)
            console.log($$(elem).html())
            // if($$('.info').find('h4').last().text() === 'Peace Concert Hall'){
            //     var date = $$('.date').text().split(' - ')[0].split('.').join('-').trim()
            //     // date = normalizeDate(date)
            //     var show = {
            //         venue: 'Peace Center - Concert Hall',
            //         venueUrl: 'http://www.peacecenter.org/',
            //         title: $$('h3 > a').text(),
            //         url: $$('.more').attr('href'),
            //         date: date
            //     }
            //     shows.push(show)
            //     console.log(shows)
            // }
        });
    });
}

function peace_rss(url_selection){
    request(url_selection, function(err, response, body) {
        var $ = cheerio.load(body, {
            xmlMode: true
        });
        $('item').each(function(i, elem) {
            var $$ = cheerio.load(elem);
            console.log($$('link').text())
        });
    });
}


// peace_rss(url_rss);
// peace_concert_hall_dom(url_dom);
peace_concert_hall_dom_tickets(url_tickets_dom);
