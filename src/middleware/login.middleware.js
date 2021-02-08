const jwt = require('jsonwebtoken')

const errorType = require('../constants/error-types')
const { getUserByName } = require('../service/user.service')
const { checkMoment, checkComment } = require('../service/auth.service')
const { md5password } = require('../utils/passwordHandler')
const { PUBLIC_KEY } = require('../app/config')

//登录校验函数，这个是用来验证是否可以登录，下面那个函数是来验证是否已经登录
const verifyLogin = async (ctx, next) => {

  const { name, password } = ctx.request.body

  //首先判断用户名和密码不能为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx);
  }

  //再判断数据库中是否存在这个用户，如果不存在返回错误
  const userArray = await getUserByName(name)

  if (userArray.length >= 1) {

    const mysqlPassword = userArray[0].password
    const newPassword = md5password(password)

    //通过判断加密后的密码是否和数据库中的密码一致
    if (newPassword !== mysqlPassword) {
      const error = new Error(errorType.PASSWORD_WRONG)
      return ctx.app.emit('error', error, ctx)
    }

  } else {
    const error = new Error(errorType.NAME_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  //将user赋值到ctx.user上
  ctx.user = userArray[0];

  await next()

}



//这个借口用来验证是否已经登录，通过token验证，后续其他模块在执行时都需要先进行token验证，只有当验证成功后才能调用下一个中间件
const logined = async (ctx, next) => {

  //获取请求头中的token
  const authorization = ctx.request.header.authorization
  //如果获取到没有token，则报未授权的错误并返回
  if (!authorization) {
    const error = new Error(errorType.USER_IS_NOT_LOGINED)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')

  // 运用公钥验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorType.USER_IS_NOT_LOGINED)
    return ctx.app.emit('error', error, ctx)
  }

}


//这个中间件其实主要是验证用户的id是否和动态的user_id对应
const canUpdate = async (ctx, next) => {

  const userId = ctx.user.id
  const table = Object.keys(ctx.request.params)[0]
  const tableName = table.replace('Id','')
  const Id = ctx.request.params[table]


  const result = await checkMoment(userId, Id, tableName)

  //如果当前用户更改的指定动态不是他发的，或者没有指定的动态，会发出错误表示未授权
  if (!result) {
    const error = new Error(errorType.MOMENT_IS_NOT_FOUND)
    return ctx.app.emit('error', error, ctx)
  }

  await next()

}

module.exports = { verifyLogin, logined, canUpdate }