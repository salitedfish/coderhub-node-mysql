const lanelService = require('../service/label.service')

class LabelController {

  //创建标签
  async createLabel(ctx,next){

    const {name} = ctx.request.body

    const result = await lanelService.createLabelService(name)

    ctx.response.body = result[0]
  }

}

module.exports = new LabelController