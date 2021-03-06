const userM = require("./../models/users")
const tools = require('../utils/tools')
const authMiddleware = require('../middleware/auth')
const signup = async function (req, res, next) {

  res.set('Content-Type', 'application/json;charset=utf-8');
  //指定允许其他域名访问
  //一般用法（*，指定域，动态设置），3是因为*不允许携带认证头和cookies
  //是否允许后续请求携带认证信息（cookies）,该值只能是true,否则不返回
  res.set('Access-Control-Allow-Origin','http://localhost:8080')
  res.set('Access-Control-Allow-Origin','http://localhost:8000')
  res.set('Access-Control-Allow-Credentials',true)

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
  res.set('Access-Control-Allow-Origin','http://localhost:8080')
  res.set('Access-Control-Allow-Credentials',true)
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
  res.set('Access-Control-Allow-Origin','http://localhost:8080')
  res.set('Access-Control-Allow-Credentials',true)
  let {username,password} = req.body
  let result = await userM.findOne({username})
  if (result) {
    let compareResult = await tools.compare(password,result.password)
    if (compareResult) {
      //基于session给前端送username
      // req.session.username = username
      let token = await tools.generateToken(username)
      res.header('X-Access-Token',token)
      res.header("token", token)
      res.header("Access-Control-Expose-Headers", "token")
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
  res.set('Access-Control-Allow-Origin','http://localhost:8080')
  res.set('Access-Control-Allow-Credentials',true)
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
