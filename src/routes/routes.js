const express = require('express');
const myRoutes = express.Router();
const path = require('path');
const { loginUser, createUser } = require('../user/userControler');
const albumControler = require('../album/albumController');
const categoryControler = require('../category/categoryController');
const songControler = require('../song/songController');
const isAuthorised = require('./is-auth');
//just for testing 
myRoutes.use('/login', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'login.ejs'));
});

//just for testing 
myRoutes.use('/signup', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'signup.ejs'));
});

myRoutes.use('/api/user/loginUser', loginUser);

myRoutes.use('/api/user/createUser', createUser);

// myRoutes.use('/api/album', (req, res, next) => {
//     if (req.session.isLoggedIn) {
//         next();
//     } else {
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// });

// myRoutes.use('/api/category', (req, res, next) => {
//     if (req.session.isLoggedIn) {
//         next();
//     } else {
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// });

myRoutes.use('/api/album/add', isAuthorised.isAutho, albumControler.addAlb);

myRoutes.use('/api/album/delete', isAuthorised.isAutho, albumControler.deleteAlb);

myRoutes.use('/api/album/read', isAuthorised.isAutho, albumControler.readAlbum);

myRoutes.use('/api/album/update', isAuthorised.isAutho, albumControler.updatealbum);

myRoutes.use('/api/category/add', isAuthorised.isAutho, categoryControler.addcateg);

myRoutes.use('api/songs/add', isAuthorised.isAutho, songControler.addsong);

myRoutes.use('api/songs/delete', isAuthorised.isAutho, songControler.delSong);



myRoutes.use('/', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'home.ejs'));
});

module.exports = myRoutes;


