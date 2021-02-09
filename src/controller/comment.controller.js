const { createCommentService, createCommentReplyService, patchCommentReplyService, deleteCommentReplyService,getCommentListService } = require('../service/comment.service')

class CommentController {
  //评论动态接口
  async createComment(ctx, next) {

    //获得请求体里面的json数据
    const { momentId, content } = ctx.request.body

    //获得token解析出来的用户id
    const userId = ctx.user.id

    const result = await createCommentService(userId, momentId, content)

    ctx.response.body = result
  }

  //回复评论接口
  async createCommentReply(ctx, next) {

    //获得token解析出来的用户id
    const userId = ctx.user.id

    //获得请求体里面的json数据
    const { momentId, content } = ctx.request.body
    const { commentId } = ctx.request.params

    const result = await createCommentReplyService(userId, momentId, commentId, content)

    ctx.response.body = result

  }

  //修改评论接口
  async patchComment(ctx, next) {

    const { commentId } = ctx.request.params

    const { content } = ctx.request.body

    const result = await patchCommentReplyService(commentId, content)

    ctx.response.body = result
  }

  //删除评论接口
  async deleteComment(ctx, next) {
    const { commentId } = ctx.request.params

    const result = await deleteCommentReplyService(commentId)

    ctx.response.body = result
  }

  //获取评论列表接口
  async getCommentList(ctx, next) {

    const momentId = ctx.request.query.momentId

    const result = await getCommentListService(momentId)

    ctx.response.body = result

  }
}

module.exports = new CommentController()