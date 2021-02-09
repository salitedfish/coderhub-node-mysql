const Router = require('koa-router')

//导入验证是否已经登录的中间件
const { logined, canUpdate } = require('../middleware/login.middleware')

const { createComment, createCommentReply, patchComment, deleteComment,getCommentList } = require('../controller/comment.controller')

const comRoute = new Router()

//评论动态接口
comRoute.post('/comment', logined, createComment)
//评论评论接口
comRoute.post('/comment/:commentId/reply', logined, createCommentReply)
//获取评论列表接口
comRoute.get('/comment', logined, getCommentList)
//修改评论接口
comRoute.patch('/comment/:commentId', logined, canUpdate, patchComment)
//删除评论接口
comRoute.delete('/comment/:commentId', logined, canUpdate, deleteComment)

module.exports = comRoute
