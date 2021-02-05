class LoginController {
  async login(ctx, next) {
    const { name } = ctx.request.body
    ctx.response.body = `欢迎${name}回来`
  }
}

module.exports = new LoginController()