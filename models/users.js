const {
    Users
} = require("../utils/db")

function save(data) {
    const user = new Users(data);
    return user.save();

}

const findOne = (conditions) => {
    return Users.findOne(conditions)
}

module.exports = {
    save,
    findOne
}