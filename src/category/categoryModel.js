const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = new schema(
    {
        name: String,
        description: String,
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    { timestamps: true })

module.exports = mongoose.model('Category', categorySchema);
