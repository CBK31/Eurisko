const userModel = require('./userModel');
const bcrypt = require('bcryptjs');

const findUser = async (userEmail) => {

    const userfinder = userModel.findOne({ email: userEmail })
    return userfinder
}

const insertUser = async (name, email, password, dateOfBirth, longitude, latitude) => {


    let hashedpass = await bcrypt.hash(password, 12);

    console.log('user created ');

    await new userModel({
        name: name,
        email: email,
        password: hashedpass,
        registrationDate: Date(),
        dateOfBirth: dateOfBirth,
        location: {
            coordinates: {
                longitude: longitude,
                latitude: latitude
            }
        }

    }).save();
}

module.exports = {
    findUser,
    insertUser
};
