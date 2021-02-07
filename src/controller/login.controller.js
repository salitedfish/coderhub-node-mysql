const jwt = require('jsonwebtoken')
const fs = require('fs')
//导入私钥
const { PRIVATE_KEY } = require('../app/config.js')

class LoginController {

  //登录成功时
  async login(ctx, next) {

    //此时用户已经输入了正确的用户名和密码，服务端需要颁发token
    const { id, name } = ctx.user
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60*60*24, algorithm: "RS256"
    })

    //登录成功后给客户端返回信息和token
    ctx.response.body = {
      message: `欢迎${name}回来~`,
      id,
      name,
      token
    }
    console.log(`欢迎${name}回来~`)
  }

  //之前已经登录成功，通过token验证之前已经登录成功时
  async success(ctx, next) {
    ctx.response.body = `${ctx.user.name}，恭喜你，授权成功~`
  }
  
}

module.exports = new LoginController()
