const moment = require('moment');
const show = require('./show.js');

let gaillard = [];
let hometeamsi = [];
let hometeamwa = [];
let musicfarm = [];
let musichall = [];
let pourhouse = [];
let royalamerican = [];
let sparrow = [];
let theatre99 = [];
let tinroof = [];
let windjammer = [];
let tonight = [];
let thisWeek = [];
let woolfe = [];

module.exports = function(shows, done) {
    sortShows(shows);
    const tonightList = tonightHTML(tonight);
    thisWeek.push(generateHTML(gaillard, 'Gaillard Center'));
    thisWeek.push(generateHTML(hometeamsi, "Home Team Sullivan's Island"));
    thisWeek.push(generateHTML(hometeamwa, 'Home Team West Ashley'));
    thisWeek.push(generateHTML(musicfarm, 'Music Farm'));
    thisWeek.push(generateHTML(musichall, 'Charleston Music Hall'));
    thisWeek.push(generateHTML(pourhouse, 'Pour House'));
    thisWeek.push(generateHTML(royalamerican, 'The Royal American'));
    thisWeek.push(generateHTML(sparrow, 'The Sparrow'));
    thisWeek.push(generateHTML(theatre99, 'Theatre 99'));
    thisWeek.push(generateHTML(tinroof, 'Tin Roof'));
    thisWeek.push(generateHTML(windjammer, 'The Windjammer'));
    thisWeek.push(generateHTML(woolfe, 'Woolfe Street'));
    thisWeek.push(['</body></html>']);
    done(tonightList, thisWeek);
};

function sortShows(sorting_shows) {
    const today = show.referenceDate().format('YYYY-MM-DD');
    sorting_shows.forEach(function(sort_show) {
        sort_show = JSON.parse(sort_show);
        let venue = sort_show.venue;
        if (venue === 'Gaillard Center') {
            gaillard.push(sort_show);
        } else if (venue === "Home Team Sullivan's Island") {
            hometeamsi.push(sort_show);
        } else if (venue === 'Home Team West Ashley') {
            hometeamwa.push(sort_show);
        } else if (venue === 'Music Farm') {
            musicfarm.push(sort_show);
        } else if (venue === 'Charleston Music Hall') {
            musichall.push(sort_show);
        } else if (venue === 'Pour House') {
            pourhouse.push(sort_show);
        } else if (venue === 'The Royal American') {
            royalamerican.push(sort_show);
        } else if (venue === 'The Sparrow') {
            sparrow.push(sort_show);
        } else if (venue === 'Theatre 99') {
            theatre99.push(sort_show);
        } else if (venue === 'Tin Roof') {
            tinroof.push(sort_show);
        } else if (venue === 'The Windjammer') {
            windjammer.push(sort_show);
        } else if (venue === 'Woolfe Street') {
            woolfe.push(sort_show);
        }
        if (sort_show.date === today) {
            tonight.push(sort_show);
        }
    });
}

function tonightHTML(tonight_shows) {
    const today = moment().format('MMMM Do YYYY');
        // generate all the boilerplate stuff
    let html = "<!DOCTYPE html><html><head><title>chs-tonight</title><link rel='stylesheet' type='text/css' href='./public/css/style.css' />";
    html += "<link href='http://fonts.googleapis.com/css?family=Quicksand' rel='stylesheet' type='text/css'>";
        // google analytics
    html += "<script>";
    html += "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){";
    html += "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),";
    html += "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)";
    html += "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');";
    html += "ga('create', 'UA-72197750-1', 'auto');";
    html += "ga('send', 'pageview');";
    html += "</script></head><body>";
        // now here's the meat
    html += "<div id='nav'><a href='./about.html'>about</a></div>";
    html += "<span id='date'><h2>" + today + "</h2></span>";
    html += "<h1><span class='red'>T</span><span class='orange'>O</span><span class='yellow'>N</span>";
    html += "<span class='green'>I</span><span class='blue'>G</span><span class='indigo'>H</span><span class='violet'>T</span></h1>";
    html += "<ul>";
    tonight_shows.forEach(function(tonight_show) {
        html += "<li><div class='venueName'><h2><a href='" + tonight_show.venueUrl + "' target='_blank'>" + tonight_show.venue + "</a></h2></div>";
        if (tonight_show.url) {
            html += "<h3><a target='_blank' href='" + tonight_show.url + "'>" + tonight_show.title + "</a></h3>";
        } else {
            html += "<h3>" + tonight_show.title + "</h3>";
        }
        if (tonight_show.time) {
            html += "<span>Time: " + tonight_show.time + "</span><br />";
        }
        if (tonight_show.price) {
            html += "<span>Price: " + tonight_show.price + "</span><br />";
        }
        if (tonight_show.details) {
            html += "<span>Details: " + tonight_show.details + "</span><br />";
        }
        html += "</div></li>";
    });
    html += "</ul>";
    html += "<h1><span class='red'>T</span><span class='orange'>H</span><span class='yellow'>I</span>";
    html += "<span class='green'>S</span> <span class='blue'>W</span><span class='indigo'>E</span>";
    html += "<span class='violet'>E</span><span class='red'>K</span></h1>";
    return html;
}

function generateHTML(generate_shows, venue) {
    let html;
    if (generate_shows.length > 0) {
        let venueUrl = generate_shows[0].venueUrl;
        html = "<div class='venueName'><h2><a href='" + venueUrl + "' target='_blank'>" + venue + "</a></h2></div> <ul>";
    } else html = "<div class='venueName'><h2>" + venue + "</h2></div> <ul>";
    generate_shows.forEach(function(generate_show) {
        let newDate = [];
        const date = generate_show.date.split('-');
        const year = date[0];
        const month = date[1];
        const day = date[2];
        newDate.push(month);
        newDate.push(day);
        newDate.push(year);
        html += "<div class='showItem'><li>";
        if (generate_show.url) {
            html += "<h3><a target='_blank' href='" + generate_show.url + "'>" + generate_show.title + "</a></h3>";
        } else {
            html += "<h3>" + generate_show.title + "</h3>";
        }
        html += "<span>Date: " + newDate.join('-') + "</span><br />";
        if (generate_show.time) {
            html += "<span>Time: " + generate_show.time + "</span><br />";
        }
        if (generate_show.price) {
            html += "<span>Price: " + generate_show.price + "</span><br />";
        }
        if (generate_show.details) {
            html += "<span>Details: " + generate_show.details + "</span><br />";
        }
        if (generate_show.age) {
            html += "<span>Age: " + generate_show.age + "</span><br />";
        }
        html += "</li></div><span class='spacer'> </span>";
    });
    html += "</ul>";
    return html;
}
