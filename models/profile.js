const userModel = require("./../models/users")
const {
    Users
} = require("../utils/db")
const findOne = userModel.findOne
const updata = async (data) => {
    return await Users.findByIdAndUpdate(data.id, data)
}
module.exports = {
    findOne,
    updata
}