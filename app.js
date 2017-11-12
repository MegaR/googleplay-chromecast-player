const express = require('express');
const app = express();
const socketio = require('socket.io');

const args = require('args-parser')(process.argv);
const promisify = require('promisify-node');
const PlayMusic = promisify('playmusic');
const pm = new PlayMusic();

if(!args.email || !args.password) {
    console.error('Email of password missing. correct usage: node app.js --email=EMAIL --password=PASSWORD');
    return;
}

//
// async function run() {
//     await pm.init({email: args.email, password: args.password});
//     const library = await pm.getAllTracks();
//     const storeSongs = library.data.items;
//     console.dir(storeSongs);
// }
//
// run().catch(error => console.error(error));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.send('hello world')
});

const io = socketio.listen(app.listen(3000));