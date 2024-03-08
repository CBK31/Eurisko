const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');

const session = require('express-session');


// const { addSong, findSongByAlbumId, deleteSong, findSongById } = require('./src/song/songService');
// const { addcategory, findCategoryById } = require('./src/category/categoryService');
// const { addAlbum, updateAlbum, readAlbum, deleteAlbum, findAlbumById } = require('./src/album/albumService');
// const schema = mongoose.Schema;
//const path = require('path');

mongoose.connect('mongodb://localhost:27017/audioLibrary')
    .then(() => {
        console.log("connected");
    })
    .catch(err => {
        console.log("not connected // error ");
        console.log(err);
    })

// for parsing the req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false }));

app.use(routes);





app.listen(3000, () => {
    console.log("listening on port 3000");
})


