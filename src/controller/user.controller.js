const userService = require('../service/user.service')

//定义服务处理方式的类
class UserController {
  async create(ctx,next) {

    //获得koa-bodyparser编译好的客户端传递的数据
    const user = ctx.request.body

    //实际处理服务的函数，并传入参数
    const result = await userService.create(user);

    //给客户端返回结果
    ctx.response.body = result
    
  }
}

module.exports = new UserController();