const isAutho = async (req, res, next) => {

    console.log('is autho ');

    if (!req.session.isLoggedIn) {
        return res.status(400).send({ message: 'Unauthorized access' });
    }
    next();

}

module.exports = { isAutho };