const songModel = require('./songModel');
const customError = require('../errors');
const { findAlbumById, updateAlbum } = require('../album/albumService');
const { findCategoryById } = require('../category/categoryService');

const findSongByAlbumId = async (id) => {
    let songFinder = await songModel.findOne({ albumId: id });

    if (songFinder) {
        return songFinder;
    } else {
        throw new customError('no album with this id ' + id + ' is found in songs', 400);
    }
}

const findSongById = async (id) => {

    let songFinder = await songModel.findOne({ _id: id });

    if (songFinder) {
        return songFinder;
    } else {
        throw new customError('no Song found with this id ' + id, 400);

    }

}

const addSong = async (Pname, Psinger, albumObject, categoryObject) => {

    await updateAlbum(albumObject._id, '', '', undefined, Date.now());

    let albumFinder = await findAlbumById(albumObject._id);
    let categoryFinder = await findCategoryById(categoryObject._id);

    console.log('album finder : ' + albumFinder._id);
    console.log('category finder : ' + categoryFinder._id);

    if (albumFinder._id && categoryFinder._id) {

        let toReturn = await new songModel({
            name: Pname,
            singer: Psinger,
            categoryId: categoryObject._id,
            albumId: albumObject._id
        }).save();

        console.log(`song added successfully `);
        return toReturn;

    } else {
        throw new customError('album or category not found  // song not added', 400);
    }
}

const deleteSong = async (id) => {
    let songFinder = await findSongById(id);
    if (songFinder) {
        await songModel.deleteOne({ _id: id });
        console.log('song deleted ');
    } else {
        throw new customError('song to delete not found', 400);
    }
}

module.exports = {
    findSongByAlbumId,
    addSong,
    deleteSong,
    findSongById
};
