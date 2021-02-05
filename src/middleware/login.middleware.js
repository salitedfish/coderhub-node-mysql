const errorType = require('../constants/error-types')
const { getUserByName } = require('../service/user.service')
const { md5password } = require('../utils/passwordHandler')

//登录校验函数
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

  await next()
}

module.exports = { verifyLogin }