const levelup = require('levelup');
const db = levelup('./db');

// db.get('name', function(err, value) {
//     if (err) {
//         if (err.notFound) {
//             // handle a 'NotFoundError' here
//             console.log('NotFoundError');
//             return;
//         }
//         // I/O or other error, pass it up the callback chain
//         return callback(err);
//     }
//     console.log(value)

//     // var idk = JSON.parse(value);
//     // console.log(idk);
//     // .. handle `value` here
// });

// YOU HAVE REACHED ENLIGHTENMENT
// PUTTING DATA ON CURRENT MATCHED STREAMED KEYS
function createandwriteyo(){
    db.createReadStream({gte: '2016-11-28', lt: '2016-12-29'})
      .on('data', function (data) {
        var idk = JSON.parse(data.value);
        idk.yo = 'you have reached enlightenment';
        // console.log(data.key, '=', idk)
        db.put(data.key, JSON.stringify(idk));
      })
      .on('error', function (err) {
        console.log('Oh my!', err)
      })
      .on('close', function () {
        console.log('Stream closed')
      })
      .on('end', function () {
        console.log('Stream ended')
      })
}

function getyo(){
    db.createReadStream({gte: '2016-11-28', lt: '2016-12-29'})
      .on('data', function (data) {
        // var idk = JSON.parse(data.value);
        // idk.yo = 'you have reached enlightenment';
        console.log(data.key, '=', idk)
        // db.put(data.key, JSON.stringify(idk));
      })
      .on('error', function (err) {
        console.log('Oh my!', err)
      })
      .on('close', function () {
        console.log('Stream closed')
      })
      .on('end', function () {
        console.log('Stream ended')
      })
}

getyo();

// var ops = [
//     { type: 'del', key: 'father' }
//   , { type: 'put', key: 'name', value: 'Yuri Irsenovich Kim' }
//   , { type: 'put', key: 'dob', value: '16 February 1941' }
//   , { type: 'put', key: 'spouse', value: 'Kim Young-sook' }
//   , { type: 'put', key: 'occupation', value: 'Clown' }
// ]

// db.batch(ops, function (err) {
//   if (err) return console.log('Ooops!', err)
//   console.log('Great success dear leader!')
// })

// db.get('name')
