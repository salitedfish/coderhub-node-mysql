const errorType = require('../constants/error-types')
const { getUserByName } = require('../service/user.service')
const { md5password } = require('../utils/passwordHandler')


//用户名验证函数
const verifyUser = async (ctx, next) => {
  //获取用户名和密码
  const { name, password } = ctx.request.body;

  //判断用户名和密码是否合法
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx);
  }

  //判断用户名是没有被注册过得
  const result = await getUserByName(name)
  if (result.length >= 1) {
    const error = new Error(errorType.NAME_DID_USED)
    return ctx.app.emit('error', error, ctx);
  }

  //如果客户端的参数没有问题再调用下一个中间件
  await next()
}


//密码处理函数
const passwordHandler = async (ctx, next) => {

  //拿到koa-bodyparser处理后的客户端传递过来的参数
  let { password } = ctx.request.body

  ctx.request.body.password = md5password(password)

  //密码加密完后再调用下一个中间件
  await next()
}

module.exports = { verifyUser, passwordHandler }