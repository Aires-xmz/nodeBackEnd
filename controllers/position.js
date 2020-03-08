const positionModel = require('../models/positions')
const findAll = async (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')
    res.set('Access-Control-Allow-Origin','http://localhost:8080')
    res.set('Access-Control-Allow-Credentials',true)
    let pageInfo = req.query
    let result = await positionModel.findAll(pageInfo)
    if (result) {
        res.render('succ', {
            data: JSON.stringify(result)
        })
    } else {
        res.render('succ', {
            data: JSON.stringify({
                message: '暂时没有数据'
            })
        })
    }
}

const save = async (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')
    let data = req.body
    let result = await positionModel.save(data)
    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                message: '数据添加成功'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '数据添加失败'
            })
        })

    }
}

const update = async (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')
    let data = req.body
    let result = await positionModel.update(data)
    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                message: '数据修改成功'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '数据修改失败'
            })
        })
    }
}

const findOne = async (req, res, next) => {

    let id = req.query.id
    let result = await positionModel.findOne(id)
    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                result
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '数据获取失败'
            })
        })
    }
}

const remove = async (req, res, next) => {
    let id = req.body.id
    let result = await positionModel.remove(id)
    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                message: '删除成功'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '操作失败'
            })
        })
    }
}
const search = async (req, res, next) => {
    let data = req.body
    let result = await positionModel.search(data)
    let {total,list} = result
    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                list,
                total
            })
        })
    } else {
        res.render('succ', {
            data: JSON.stringify({
                message: '暂无数据'
            })
        })
    }
}
module.exports = {
    findAll,
    save,
    update,
    findOne,
    remove,
    search
}