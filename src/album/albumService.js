const albumModel = require('./albumModel');
const customError = require('../errors');
//const { findSongByAlbumId } = require('../song/songService');
const songServices = require('../song/songService');


const findAlbumById = async (id) => {

    const albumFinder = await albumModel.findOne({ _id: id });

    if (!albumFinder) {

        throw new customError('No album found with this id ' + id, 400);

    } else {
        console.log('returnedd');
        return albumFinder;
    }

}

const addAlbum = async (nameParam, desc, show, createdBy, updatedBy) => {

    let toReturn = await new albumModel({
        name: nameParam,
        description: desc,
        showNbTracks: show,
        lastSongAddedAt: Date(),
        createdBy: createdBy,
        updatedBy: updatedBy
    }).save();

    console.log(`album name : ${nameParam} is added `);

    return toReturn;

}

const updateAlbum = async (albumId, name, desc, show, lastSong, createdBy, updatedBy) => {


    let albumFinded = await findAlbumById(albumId);

    if (albumFinded) {
        //console.log("album found // name : " + albumFinded.name);

        name = name || albumFinded.name;
        desc = desc || albumFinded.description;
        lastSong = lastSong || albumFinded.lastSongAddedAt;

        if (show === undefined) {
            show = albumFinded.showNbTracks;
        }


        let updatedAlbum = {
            name: name,
            description: desc,
            showNbTracks: show,
            lastSongAddedAt: lastSong,
            createdBy: createdBy,
            updatedBy: updatedBy

        }

        await albumModel.updateOne({ _id: albumId }, { $set: updatedAlbum });
        //console.log('album updated successfully ');
    }
    else {
        throw new customError('the album you want to update is not found ', 400);
    }








}

const readAlbum = async (albumId) => {
    let foundedAlbum = await findAlbumById(albumId);

    if (foundedAlbum) {
        return `album info => 
     name : ${foundedAlbum.name} 
     description : ${foundedAlbum.description} 
     showNbTracks : ${foundedAlbum.showNbTracks}
     lastSongAddedAt : ${foundedAlbum.lastSongAddedAt}
     createdAt : ${foundedAlbum.createdAt}
     updatedAt : ${foundedAlbum.updatedAt}
       `
    }
    else {
        return false;
    }

}

const deleteAlbum = async (albumId) => {


    let fAlbum = await findAlbumById(albumId);

    if (fAlbum) {

        let fSong = await songServices.findSongByAlbumId(albumId);

        if (!fSong) {

            await albumModel.deleteOne({ _id: albumId });
            console.log('album deleted successfully');

        } else {
            throw new customError("this album is in one or many songs so we can't delete it", 400);
        }

    }


}

const readAlbumByName = async (albumName, pageNum, itemsPerPage) => {
    // let foundedAlbum = await findAlbumById(albumId);

    const albumFinder = await albumModel.find({ name: albumName }).skip((pageNum - 1) * itemsPerPage).limit(itemsPerPage);



    if (albumFinder.length === 0) {

        throw new customError('No album found with this name ' + albumName, 400);

    } else {
        console.log('i found it ');
        return albumFinder;
    }

}


module.exports = {
    addAlbum,
    updateAlbum,
    readAlbum,
    findAlbumById,
    deleteAlbum,
    readAlbumByName
};
