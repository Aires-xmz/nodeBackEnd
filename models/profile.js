const {
    Admin
} = require("../utils/db")

const findOne = (conditions) => {
    return Admin.findOne(conditions)
}

const updata = async (data) => {
    return await Admin.findByIdAndUpdate(data.id, data)
}
module.exports = {
    findOne,
    updata
}