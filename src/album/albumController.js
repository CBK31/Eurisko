const { addAlbum, updateAlbum, deleteAlbum, findAlbumById } = require('./albumService');




const addAlb = async (req, res) => {
    try {
        const { albumName, albumDescription } = req.body;
        const showNbTracks = req.body.showNbTracks === 'on';
        await addAlbum(albumName, albumDescription, showNbTracks, req.session.userId, req.session.userId);
        res.json({ message: 'Album created successfully' });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const deleteAlb = async (req, res) => {

    try {
        const { id } = req.params;
        await deleteAlbum(id);
        res.json({ message: 'Album deleted successfully' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }


}

const updatealbum = async (req, res) => {
    try {
        const { id } = req.params;
        const { albumName, albumDescription } = req.body;
        const showNbTracks = req.body.showNbTracks === 'on';
        await updateAlbum(id, albumName, albumDescription, showNbTracks, '', '', req.session.userId);
        res.json({ message: 'Album updated successfully' });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }

}

const readAlbum = async (req, res) => {

    try {
        const { id } = req.params;
        let album = await findAlbumById(id);

        res.status(200).json({ album: album });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports = { addAlb, deleteAlb, updatealbum, readAlbum };