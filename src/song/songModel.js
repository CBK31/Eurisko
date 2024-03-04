const mongoose = require('mongoose');
const schema = mongoose.Schema;

const songSchema = new schema({
    name: String,
    singer: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }
});

songSchema.index({ categoryId: 1 });
songSchema.index({ albumId: 1 });

module.exports = mongoose.model('Track', songSchema);