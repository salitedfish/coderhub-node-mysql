const Router = require('koa-router')

//导入权限验证中间件
const { logined } = require('../middleware/login.middleware')

//导入文件解析中间件
const { singleMulter, anyMulter } = require('../middleware/upload.middleware')

const { saveUploadInfo, savePictureInfo } = require('../controller/upload.controller')

const uploadRouter = new Router({ prefix: '/upload' })

//上传头像接口，并且使用multer用来解析文件
uploadRouter.post('/avatar', logined, singleMulter, saveUploadInfo)
//上传动态配图接口
uploadRouter.post('/pictures', logined, anyMulter, savePictureInfo)


module.exports = uploadRouter