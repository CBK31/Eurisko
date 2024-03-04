const { addcategory } = require('./categoryService');


const addcateg = async (req, res) => {
    try {

        const { categoryName, categoryDescription } = req.body;

        await addcategory(categoryName, categoryDescription, req.session.userId, req.session.userId);
        res.send("category added successfully");

    } catch (error) {
        res.status(400).send({ message: error.message });
    }

}

module.exports = {
    addcateg
};