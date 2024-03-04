const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    registrationDate: {
        type: Date,
    },
    dateOfBirth: {
        type: Date,
    },
    location: {
        coordinates: {
            longitude: {
                type: Number,
            },
            latitude: {
                type: Number,
            }
        }
    }
});

userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
