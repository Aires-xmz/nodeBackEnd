const {
    Positions
} = require('../utils/db')

const save = (data) => {
    let position = new Positions(data)
    return position.save()
}

const findAll = async (pageInfo) => {
    let {
        start,
        count
    } = pageInfo
    let list = await Positions.find({}).sort({
        depdate:1,
        deptime:1
    }).limit(~~count).skip(~~start)
    let total = await Positions.find({}).countDocuments()
    return {
        list,
        total
    }
}

const update = async (data) => {
    return await Positions.findByIdAndUpdate(data.id, data)
}

const findOne = async (id) => {
    return await Positions.findById(id)
}

const remove = async (id) => {
    return await Positions.findByIdAndDelete(id)
}
const search = async (data) => {
    let {
        start,
        count,
        keywords
    } = data
    let reg = new RegExp(keywords, 'gi')
    let list = await Positions.find({}).or([{
        dep: reg
    }, {
        des: reg
    }]).limit(~~count).skip(~~start).sort({
        deptime: 1
    })
    let total = await Positions.find({}).or([{
        dep: reg
    }, {
        des: reg
    }]).countDocuments()
    if (total) {
        return {
            list,
            total
        }
    } else {
        return false
    }
}
module.exports = {
    save,
    findAll,
    update,
    findOne,
    remove,
    search
}