const levelup = require('levelup');
const db = levelup('./db');

db.get('undefined!Radio Room Greenville!', function(err, value) {
    if (err) {
        if (err.notFound) {
            // handle a 'NotFoundError' here
            console.log('NotFoundError');
            return;
        }
        // I/O or other error, pass it up the callback chain
        return callback(err);
    }

    console.log(value);
    // .. handle `value` here
});
