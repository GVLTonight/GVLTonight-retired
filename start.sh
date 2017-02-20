#!/bin/sh
casperjs src/casper/multiple-urls.js;
node src/init.js;
node src/dump_DB_to_file.js;
gulp build;
git status;
git add .;
git status;
git commit -m "nightly update";
git subtree push --prefix dist origin gh-pages;
git push;
