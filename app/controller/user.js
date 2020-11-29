'use strict';

const Controller = require('egg').Controller;
const { createUserRule, updateUserRule } = require('../rules/user');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async auth(id) {
    return id;
  }
  async create() {
    const ctx = this.ctx;
    const app = this.app;
    const errors = app.validator.validate(createUserRule, ctx.request.body);
    if (errors) {
      ctx.status = 400;
      ctx.body = errors;
      return;
    }
    const { username, password } = ctx.request.body;
    const created_at = new Date().toDateString();
    const updated_at = new Date().toDateString();
    await ctx.model.User.create({ username, password, created_at, updated_at });
    ctx.status = 201;
    ctx.body = '添加成功';
  }
  async update() {
    const ctx = this.ctx;
    const app = this.app;
    const errors = app.validator.validate(updateUserRule, ctx.request.body);
    if (errors) {
      ctx.status = 400;
      ctx.body = errors;
      return;
    }
    const id = toInt(ctx.params.id);
    const { username, password, newPassword } = ctx.request.body;
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      ctx.body = 'user is not exist';
      return;
    }
    if (user.password === password && user.username === username) {
      await user.update({ username, password: newPassword });
      ctx.status = 204;
      ctx.body = '密码修改成功';
    } else {
      ctx.status = 403;
      ctx.body = '用户名或密码错误';
    }
  }
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    if (id !== toInt(ctx.session.loginId)) {
      ctx.status = 403;
      return;
    }
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserController;
