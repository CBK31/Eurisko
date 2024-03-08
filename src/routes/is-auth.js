const isAutho = async (req, res, next) => {

    console.log('is autho ');

    if (!req.session.isLoggedIn) {

        return res.status(400).send({ message: 'Unauthorized access ' + req.session.isLoggedIn });
    }
    next();

}

module.exports = { isAutho };