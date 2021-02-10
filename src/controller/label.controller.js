const lanelService = require('../service/label.service')

class LabelController {

  //创建标签
  async createLabel(ctx, next) {

    const { name } = ctx.request.body

    const result = await lanelService.createLabelService(name)

    ctx.response.body = result[0]
  }

  //获取标签列表
  async labelList(ctx, next) {

    const { limit, offset } = ctx.request.query

    if (offset >= 0 && limit >= 0) {
      const result = await lanelService.labelListService(limit, offset)
      ctx.response.body = result
    }else {
      ctx.response.body = "对不起，请输入正确的参数~"
    }
    
  }

}

module.exports = new LabelController