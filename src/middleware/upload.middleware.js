const multer = require('koa-multer')
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path')

const uploadMulter = multer({
  dest: AVATAR_PATH
})
//定义一个专门处理头像图片的multer
const singleMulter = uploadMulter.single('avatar')


const picturesMulter = multer({
  dest: PICTURE_PATH
})
//定义一个专门处理配图的multer
const anyMulter = picturesMulter.array('pictures', 9)


module.exports = { singleMulter, anyMulter }