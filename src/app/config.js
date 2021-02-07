const dotenv = require("dotenv")
const fs = require('fs')
const path = require('path')

dotenv.config();

//读取文件中的私钥和公钥
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, '../key/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, '../key/public.key'))


//读取环境参数
const encDate = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env

module.exports = { ...encDate, PRIVATE_KEY, PUBLIC_KEY }