const userModel = require('./userModel');


const findUser = async (userEmail) => {

    const userfinder = userModel.findOne({ email: userEmail })
    return userfinder
}

const insertUser = async (name, email, password, dateOfBirth, longitude, latitude) => {

    await new userModel({
        name: name,
        email: email,
        password: password,
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
