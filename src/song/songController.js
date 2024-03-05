const { deleteSong } = require('./songService');

const delSong = async (req, res) => {

    try {
        const { id } = req.params;
        await deleteSong(id);
        res.json({ message: 'Album deleted successfully' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const addsong = async (req, res) => {

    const { Pname, Psinger, albumObject, categoryObject } = req.body;

    try {
        if (!Pname || !Psinger || !albumObject || !categoryObject) {
            throw new Error('Missing required parameters');
        }

        const newSong = await addSong(Pname, Psinger, albumObject, categoryObject);

        res.json({ message: 'Song added successfully', song: newSong });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = { delSong, addsong };