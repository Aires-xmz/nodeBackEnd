const mhomeModel = require('../models/mhome')
const homeinfo = async (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')
    res.set('Access-Control-Allow-Origin','http://localhost:8080')
    res.set('Access-Control-Allow-Credentials',true)
    let data = req.body
    let result = await mhomeModel.getinfo(data)
    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                data:result
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: 'fail'
            })
        })
    }
}
module.exports = {
    homeinfo
}