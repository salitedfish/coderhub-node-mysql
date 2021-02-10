const multer = require('koa-multer')
const {AVATAR_PATH} = require('../constants/file-path')

const uploadMulter = multer({
  dest: AVATAR_PATH
})
//定义一个专门处理头像图片的multer
const singleMulter = uploadMulter.single('avatar')


module.exports = { singleMulter }