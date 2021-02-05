//导入app
const app = require('./app')
const connection = require('./app/database')
//导入环境变量的数据
const { APP_PORT } = require('./app/config.js')

//监听端口
app.listen(APP_PORT, () => {
  console.log(APP_PORT + '端口监听成功')
})
