
const { saveUploadInfoService } = require('../service/upload.service.js')

class UploadController {

  //保存图片信息的中间件，注意图片本身没有保存在数据库中个，而是保存在外部文件夹里面
  async saveUploadInfo(ctx, next) {
    //获取ctx.req.file里面的数据
    const mimetype = ctx.req.file.mimetype
    const filename = ctx.req.file.filename
    const size = ctx.req.file.size
    const id = ctx.user.id

    //将信息保存在数据库中
    const result = await saveUploadInfoService(mimetype, filename, size, id)

    ctx.response.body = result

  }

  //保存配图的中间件，注意图片本身没有保存在数据库中个，而是保存在外部文件夹里面
  async savePictureInfo(ctx, next) {
    //拿到所有文件的数组
    const files = ctx.req.files
    ctx.response.body = "不写了，乱七八糟~"

  }

}

module.exports = new UploadController()