// const path = require('path'),
//     username = require('username'),
//     fs = require('fs'),
//     os = require('os');

// let homedir = os.homedir()

// let current_user;
// username().then(username => {
//     // console.log(username);
//     current_user = username;
// });

// let dirname = path.dirname(__filename);
// let parse = path.parse(__filename);
// let basename = path.basename(__filename, '.js')
// let approot = homedir + '/Workspace/GVLTonight/';

// let htmlpath = approot + 'scrubber/casper/html/';

// // if (parse.dir.indexOf('casper') !== -1){
// // console.log('casper')
// // } else {
// // console.log('not casper')
// // }

// // console.log(htmlpath + basename + '.html');

// // let resolve = path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')

// // fs.writeFile(approot + 'tester.txt', 'lol')
// console.log(homedir)
// //console.log(dirname)
// //console.log(basename)


let cheerio = require('cheerio'),
    request = require('request'),
    fs = require('fs');

let shows = [];

lol = function(done){
    console.log('test test OKAY')
    done(null, shows)
}

module.exports = lol;
