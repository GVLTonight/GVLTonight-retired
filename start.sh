#!/bin/bash
casperjs scrubber/casper/multiple-urls.js;
node scrubber/init.js;
gulp build;
git status;
git add .;
git commit -m "nightly update";
git subtree push --prefix dist origin gh-pages;
