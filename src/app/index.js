//导出koa类
const Koa = require("koa");
//导入Router类
const Router = require("koa-router");

//koa导出的是一个类，express导出的是一个函数
const app = new Koa();

//创建一个路由实例,并添加路径前缀
const userRouter = new Router({prefix: '/users'});

//创建路由和中间件的映射
userRouter.post('/',(ctx,next)=>{
  ctx.response.body = '创建用户成功';
});

//app应用路由
app.use(userRouter.routes());
app.use(userRouter.allowedMethods())

//导出app
module.exports = app;
