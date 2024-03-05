const express = require('express');
const myRoutes = express.Router();
const path = require('path');
const { loginUser, createUser } = require('../user/userControler');
const albumControler = require('../album/albumController');
const categoryControler = require('../category/categoryController');
const songControler = require('../song/songController');

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

myRoutes.use('/api/album', (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

myRoutes.use('/api/category', (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

myRoutes.post('/api/album/add', albumControler.addAlb);

myRoutes.post('/api/album/delete', albumControler.deleteAlb);

myRoutes.post('/api/album/read', albumControler.readAlbum);

myRoutes.use('/api/album/update', albumControler.updatealbum);

myRoutes.use('/api/category/add', categoryControler.addcateg);

myRoutes.use('api/songs/add', songControler.addsong);

myRoutes.use('api/songs/delete', songControler.delSong);



myRoutes.use('/', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'home.ejs'));
});

module.exports = myRoutes;


