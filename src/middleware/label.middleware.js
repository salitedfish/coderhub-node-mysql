const labelService = require('../service/label.service')

//这个中间件用来判断标签是否已经存在，如果不存在则创建标签
const isLabelExists = async (ctx, next) => {

  const { labels } = ctx.request.body

  const result = await labelService.isLabelExistsService(labels)

  ctx.labels = result

  await next()
}


module.exports = { isLabelExists }