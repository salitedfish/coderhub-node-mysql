const fs = require('fs')

const { AVATAR_PATH } = require('../constants/file-path')
const errorType = require('../constants/error-types')
const { getUserByName } = require('../service/user.service')
const { md5password } = require('../utils/passwordHandler')
const { getUploadInfoService } = require('../service/upload.service')



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

//获取头像信息，这里中间件位置写错了，应该写在controller里面，不过懒得改了，功能不影响
const getAvatarInfo = async (ctx, next) => {

  const userId = ctx.request.params.userId

  //获取到最新的头像信息
  const result = await getUploadInfoService(userId)

  //读取头像的数据流
  const avatar = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`)

  //设置响应头，告诉客户端返回的是什么类型的数据，类似从数据库获取，数据库的类型是由上传文件时multer解析得到的
  ctx.response.set('content-type',avatar.mimetype)
  //将数据流返回给客户端
  ctx.response.body = avatar

}

module.exports = { verifyUser, passwordHandler, getAvatarInfo }