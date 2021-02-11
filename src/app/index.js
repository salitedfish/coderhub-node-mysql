//导入第三方模块
const Koa = require("koa");
const bodyParser = require('koa-bodyparser')
//导入循环注册路由的函数
const useRoutesApp = require('../route')

const { errorHandler } = require('./error')

//koa导出的是一个类，express导出的是一个函数
const app = new Koa();

//应用koa-bodyparser这个中间件的客户端的json数据进行解析
app.use(bodyParser())

//利用node的文件读写模块，循环注册路由的函数，将app传入,重点
useRoutesApp(app)

//响应错误，并处理
app.on('error', errorHandler)

//监听端口
app.listen(APP_PORT, () => {
  console.log(APP_PORT + '端口监听成功')
})

//导出app
module.exports = app;
