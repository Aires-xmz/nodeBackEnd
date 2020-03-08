const tools = require('../utils/tools')
const isSignin = async function (req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    // Website you wish to allow to connect
    res.set('Access-Control-Allow-Origin','http://localhost:8080')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Access-Token,Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

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