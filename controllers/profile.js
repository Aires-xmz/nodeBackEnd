const profileModel = require('../models/profile')
const personalData = async (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')
    let username = req.body.username
    let result = await profileModel.findOne({
        username
    })
    if (result) {
        res.render('succ', {
            data: JSON.stringify(result)
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '暂时没有数据'
            })
        })
    }
}
const updata = async (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')
    let data = req.body
    if(req.body.pic === ''){
        delete data.pic
    }
    let result = await profileModel.updata(data)
    if (result) {
        console.log(result.pic)
        res.render('succ', {
            data: JSON.stringify({
                message: '资料更新成功',
                pic:req.body.pic
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '资料更新失败'
            })
        })
    }
}
module.exports = {
    personalData,
    updata
}