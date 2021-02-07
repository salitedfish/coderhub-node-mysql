const Router = require('koa-router')

const { login, success } = require('../controller/login.controller.js')

const { verifyLogin, logined } = require('../middleware/login.middleware')

const loginRouter = new Router()

loginRouter.post('/login', verifyLogin, login)
loginRouter.get('/test', logined, success)

module.exports = loginRouter