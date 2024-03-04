const mongoose = require('mongoose');
const schema = mongoose.Schema;

const albumSchema = new schema(
    {
        name: String,
        description: String,
        showNbTracks: { type: Boolean, default: false },
        lastSongAddedAt: Date,
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Album', albumSchema);