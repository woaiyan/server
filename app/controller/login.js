'use strict';

const Controller = require('egg').Controller;
const { loginRule } = require('../rules/user');
class LoginController extends Controller {
  async login() {
    const ctx = this.ctx;
    const app = this.app;
    const errors = app.validator.validate(loginRule, ctx.request.body);
    if (errors) {
      ctx.status = 400;
      ctx.body = errors;
      return;
    }
    const { username, password } = ctx.request.body;
    const query = {
      attributes: [ 'username', 'password' ],
      where: {
        username
      }
    };
    const user = await ctx.model.User.findOne(query);
    if (!user || user.username !== username || user.password !== password) {
      ctx.status = 403;
      ctx.body = '用户名或密码错误';
      return;
    }
    ctx.session.loginId = user.id;
    ctx.status = 200;
    ctx.body = '登录成功';
  }
}

module.exports = LoginController;
