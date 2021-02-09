const Router = require('koa-router')

//导入登录验证中间件
const {
  logined,
  canUpdate
} = require('../middleware/login.middleware')

//导入验证完登录后，创建动态的中间件
const {
  createMoment,
  getMoment,
  getMomentList,
  patchMoment,
  deleteMoment,
  addLabelToMoment
} = require('../controller/moment.controller.js')

//导入标签相关的中间件
const { isLabelExists } = require('../middleware/label.middleware.js')

//创建route实例
const momentRoute = new Router()

//定义发表动态的接口
momentRoute.post('/moment', logined, createMoment)
//定义获得动态的接口
momentRoute.get('/moment', logined, getMomentList)
momentRoute.get('/moment/:momentId', logined, getMoment)
//修改对应的动态
momentRoute.patch('/moment/:momentId', logined, canUpdate, patchMoment)
//删除对应的动态
momentRoute.delete('/moment/:momentId', logined, canUpdate, deleteMoment)
//给动态添加标签
momentRoute.post('/moment/:momentId/labels', logined, canUpdate, isLabelExists, addLabelToMoment)

//导出route
module.exports = momentRoute
