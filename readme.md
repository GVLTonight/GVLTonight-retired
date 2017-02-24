#GVLTonight

In progress source for what's happening tonight in Greenville, SC.

(project is in a very raw state)

[GVLTonight.com](http://gvltonight.com)


Digital Ocean Droplet is live ready to be cron'd.

Run using casperjs to loop through venue event url and pull rendered raw html to file, then runs custom cheerio scripts per venue to parse and format event data based on their source html.

[UPDATE] FB Graph API will be a better option moving forward.

1. Install PhantomJS
1. Install CasperJS
1. $`npm install`
1. $`sh start.sh`

### Or

1. Install PhantomJS
1. Install CasperJS
1. $`npm install`
1. $`casperjs src/casper/scripts/multiple-urls.js`
1. $`node src/init.js`

Based on [http://chs-tonight.com]
