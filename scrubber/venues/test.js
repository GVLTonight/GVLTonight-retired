let path = require('path');

let dirname = path.dirname(__filename);
let parse = path.parse(__filename);
let basename = path.basename(__filename, '.js')
let approot = '/home/kb/Workspace/GVLTonight/';

let htmlpath = approot + 'scrubber/casper/html/';

if (parse.dir.indexOf('casper') !== -1){
console.log('casper')
} else {
console.log('not casper')
}

console.log(htmlpath + basename + '.html');

let resolve = path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')

//console.log(dirname)
//console.log(basename)
