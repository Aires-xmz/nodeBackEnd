const userM = require("./../models/users")
const tools = require('../utils/tools')
const authMiddleware = require('../middleware/auth')
const signup = async function (req, res, next) {

  res.set('Content-Type', 'application/json;charset=utf-8');
  
  let { username, password } = req.body
  let hash = await tools.hash(password)
    
  let result = await userM.save({
    username,
    password:hash,
    pic:"",
    birthday:"暂无数据",
    sex:0,
    signature:"这个用户很懒，什么也没有留下"
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
  let {username} = req.body
  let result = await userM.findOne({username})
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
  let result = await userM.findOne({username})
  if (result) {
    let compareResult = await tools.compare(password,result.password)
    if (compareResult) {
      //基于session给前端送username
      // req.session.username = username
      let token = await tools.generateToken(username)
      res.header('X-Access-Token',token)
      //往浏览器种cookie
      // res.cookie('token',token)
      res.render('succ', {
        data: JSON.stringify({
          type: 'signin',
          username,
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
