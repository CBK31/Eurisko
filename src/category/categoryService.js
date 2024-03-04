const catModel = require('./categoryModel');
const customError = require('../errors');

const findCategoryById = async (id) => {

    const category = await catModel.findOne({ _id: id });
    if (!category) {
        throw new customError('No category found with this id ' + id, 400);
    } else {
        return category;
    }

}


let addcategory = async (pName, desc, createdBy, updatedBy) => {

    let toReturn = await new catModel({
        name: pName,
        description: desc,
        createdBy: createdBy,
        updatedBy: updatedBy
    }).save();
    console.log(`category of name : ${pName} is inserted `);
    return toReturn;


}

module.exports = {
    addcategory,
    findCategoryById
};
