const Router = require('koa-router')

const { logined } = require('../middleware/login.middleware')
const laberController = require('../controller/label.controller.js')
const labelRoute = new Router({ prefix: '/label' })

labelRoute.post('/', logined, laberController.createLabel)

module.exports = labelRoute