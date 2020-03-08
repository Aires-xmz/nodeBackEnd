const adminModel = require("./../models/admin")
const tools = require('../utils/tools')
const authMiddleware = require('../middleware/auth')
const signup = async function (req, res, next) {

  res.set('Content-Type', 'application/json;charset=utf-8');
  
  let { username, password } = req.body
  let hash = await tools.hash(password)
  let adminname = username
  let result = await adminModel.save({
    adminname,
    password:hash,
  });
  
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '用户注册成功'
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户注册失败'
      })
    })
  }
}

const hasUsername = async function(req,res,next){
  res.set('Content-Type', 'application/json;charset=utf-8');
  let adminname = req.body.username
  let result = await adminModel.findOne({adminname})
  if(result){
    res.render('fail',{
      data:JSON.stringify({
        message:'用户名已经存在'
      })
    })
  }else{
    next()
  }
}

const signin = async function(req,res,next){
  res.set('Content-Type', 'application/json;charset=utf-8');
  let {username,password} = req.body
  let adminname = username
  let result = await adminModel.findOne({adminname})
  if (result) {
    let compareResult = await tools.compare(password,result.password)
    if (compareResult) {
      //基于session给前端送username
      // req.session.username = username
      let token = await tools.generateToken(adminname)
      res.header('X-Access-Token',token)
      //往浏览器种cookie
      // res.cookie('token',token)
      res.render('succ', {
        data: JSON.stringify({
          type: 'signin',
          adminname,
          isSignin:true,
          message: '用户登录成功.'
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '用户名或密码不正确.'
        })
      })
    }
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户名或密码错误'
      })
    })
  }
}

const isSignin = authMiddleware

const signout = function(req, res, next) {
  res.set('Content-Type','application/json; charset=utf-8')
  // req.session = null //基于session的注销登录操作
  // res.cookie('token','') //基于cookie的注销登录操作
  res.render('succ', {
    data: JSON.stringify({
      isSignin:false,
      message: '注销成功.'
    })
  })
}

module.exports = {
  signup,
  hasUsername,
  signin,
  isSignin,
  signout
}
