
const { insertUser, findUser } = require('./userService');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let createUser = async (req, res) => {
    const { name, email, password, dateOfBirth, longitude, latitude } = req.body;

    try {
        if (await findUser(email)) {

            console.log('user aldready exist in my database ');
            res.status(400).send('Error while signing in / user aldready exist in database');

        } else {
            await insertUser(name, email, password, dateOfBirth, longitude, latitude);
            res.redirect('/');
        }

    } catch (error) {
        res.status(400).send(error);
    }
}

let loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        let userFinder = await findUser(email);
        // console.log(email);
        // console.log(password);

        if (userFinder) {
            let passChecker = await bcrypt.compare(password, userFinder.password);

            if (userFinder && email == userFinder.email && passChecker) {

                req.session.isLoggedIn = true;
                req.session.userId = userFinder._id;

                console.log('user : ' + email + ' is loged in ');

                const token = jwt.sign({ email: email }, 'a_secret_key');

                // CRUD.ejs is only for testing bas la et2akkad enno kel chi meche  
                // res.render(path.join(__dirname, '..', 'views', 'CRUD.ejs'));
                res.json({ token: token });

            } else {
                req.session.isLoggedIn = false;
                res.status(400).send({ message: 'wrong password ' });
            }
        } else {
            res.status(400).send({ message: 'wrong email ' });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }


}

module.exports = {
    createUser,
    loginUser
};

