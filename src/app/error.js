const errorType = require('../constants/error-types')

//错误执行函数
const errorHandler = (err, ctx) => {

  let status = ''
  let message = ''

  switch (err.message) {

    //当用户名或密码为空时
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400//bad request
      message = '对不起，输入的用户名或密码不能为空~'
      break

    //当用户名已经被使用时
    case errorType.NAME_DID_USED:
      status = 409//conflick request
      message = '对不起，您输入的用户名已经被使用~'
      break

    //登录时当用户不存在时
    case errorType.NAME_NOT_EXISTS:
      status = 400
      message = "对不起，您输入的用户名不存在~"
      break
    
    //当用户输入的密码错误时
    case errorType.PASSWORD_WRONG:
      status = 400
      message = '对不起，您输入的密码有误~'
      break

    default:
      status = 404
      message = "对不起，发生了未知错误~"
  }

  ctx.response.status = status
  ctx.response.body = message
  console.log(message)
}

module.exports = { errorHandler }