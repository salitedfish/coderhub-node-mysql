const { create, getMom, getMomList, patchMom, deleteMom, addLabelToMomentService } = require('../service/moment.service')

const { QUERY_IS_EMPERTY, MOMENT_IS_NOT_FOUND } = require('../constants/error-types')

const connection = require('../app/database')

class MomentController {

  //创建动态的中间件
  async createMoment(ctx, next) {
    //获取user_id和内容
    //前面验证token时，已经给ctx.user赋值了用户信息
    const userId = ctx.user.id
    const { content } = ctx.request.body

    //将数据插入到数据库
    const result = await create(userId, content)

    //如果返回的结果正常，则给客户端发送成功信息
    if (result) {
      ctx.response.body = "动态发布成功"
    }

  }

  //获取一条动态的中间件
  async getMoment(ctx, next) {

    //前面验证token的时候，已经给ctx.user赋值了用户信息
    const { momentId } = ctx.request.params

    //将用户id传递给获取动态的函数，函数返回动态列表
    const result = await getMom(momentId)

    //给客户端返回获取到的动态列表
    ctx.response.body = result
  }

  //获取多条动态的中间件
  async getMomentList(ctx, next) {

    //前面验证token的时候，已经给ctx.user赋值了用户信息
    const userId = ctx.user.id

    //获取偏移和数据大小
    const { offect, size } = ctx.request.query

    if (offect >= 0 && size <= 10 && size >= 1) {

      //将用户id传递给获取动态的函数，函数返回动态列表
      const result = await getMomList(userId, offect, size)

      //给客户端返回获取到的动态列表
      ctx.response.body = result

    } else {
      const error = new Error(QUERY_IS_EMPERTY)
      return ctx.app.emit('error', error, ctx)
    }

  }

  //修改用户指定的动态
  async patchMoment(ctx, next) {

    const { momentId } = ctx.request.params
    const { content } = ctx.request.body

    const result = await patchMom(userId, momentId, content)

    //把更改结果返回给客户端
    ctx.response.body = result

  }

  //删除指定的动态
  async deleteMoment(ctx, next) {



    const momentId = ctx.request.params.momentId

    const result = await deleteMom(momentId)

    //把更改结果返回给客户端
    ctx.response.body = result

  }

  //给动态添加标签
  async addLabelToMoment(ctx, next) {

    const { momentId } = ctx.request.params

    await addLabelToMomentService(momentId,ctx.labels)

    ctx.response.body = "动态添加标签成功~"

    

  }

}

module.exports = new MomentController()
