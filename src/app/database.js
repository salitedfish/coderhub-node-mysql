//导入连接数据库的桥梁
const mysql = require('mysql2');

//导入环境变量的数据
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD, } = require('./config.js')

//创建连接池
const connection = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
})

connection.getConnection((err, conn) => {
  conn.connect((err) => {
    if (!err) {
      console.log('数据库连接成功')
    } else {
      console.log('数据库连接失败')
    }
  })
})

//导出连接池
module.exports = connection.promise();