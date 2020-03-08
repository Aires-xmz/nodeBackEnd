const {
    Admin
} = require("../utils/db")

function save(data) {
    const user = new Admin(data);
    return user.save();

}

const findOne = (conditions) => {
    return Admin.findOne(conditions)
}

module.exports = {
    save,
    findOne
}