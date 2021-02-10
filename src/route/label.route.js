const Router = require('koa-router')

const { logined } = require('../middleware/login.middleware')
const laberController = require('../controller/label.controller.js')
const labelRoute = new Router({ prefix: '/label' })

//创建标签接口
labelRoute.post('/', logined, laberController.createLabel)
//获取标签接口
labelRoute.get('/', logined, laberController.labelList)

module.exports = labelRoute