//导入Router类
const Router = require("koa-router");
//导入服务的处理方式
const { create } = require('../controller/user.controller')
const { verifyUser, passwordHandler, getAvatarInfo } = require('../middleware/user.middleware')
// const { logined } = require('../middleware/login.middleware')

//创建一个路由实例,并添加路径前缀
const userRouter = new Router({ prefix: '/users' });

//创建路由和中间件的映射
//注册接口
userRouter.post('/', verifyUser, passwordHandler, create);
//获取头像接口
userRouter.get('/:userId/avatar', getAvatarInfo)

//导出user相关的路由
module.exports = userRouter
