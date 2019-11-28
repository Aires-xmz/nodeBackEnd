const tools = require('../utils/tools')
const isSignin = async function (req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    //let token = req.session.token //基于session的验证
    let token = req.get('X-Access-Token') //基于头部token的验证
    // let token = req.cookies.token //基于cookie的token的验证
    if (token) {
        let result = await tools.verifyToken(token)
        if (req.path === '/isSignin') {
            res.render('succ', {
                data: JSON.stringify({
                    username: result.username,
                    isSignin: true,
                })
            })
        } else {
            if (result) {
                req.body.username = result.username
                next()
            } else {
                res.render('fail', {
                    data: JSON.stringify({
                        message: '验证失败.'
                    })
                })
            }
        }
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '没有权限.'
            })
        })
    }
}
module.exports = isSignin