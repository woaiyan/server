'use strict';

const Controller = require('egg').Controller;
const Path = require('path');
const md5 = require('md5');
const { Op } = require('sequelize');
const { createPictureRule, batchPictureRule } = require('../rules/picture');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class PictureController extends Controller {
  async index() {
    const ctx = this.ctx;
    const app = this.app;
    const errors = app.validator.validate(batchPictureRule, ctx.query);
    if (errors) {
      ctx.status = 400;
      ctx.body = errors;
      return;
    }
    const offset = (ctx.query.page - 1) * ctx.query.pagesize;
    const limit = toInt(ctx.query.pagesize);
    const loginId = ctx.query.type === true ? ctx.session.loginId : '1';
    const type = ctx.query.type;
    const name = ctx.query.name;
    const query = {
      limit,
      offset,
      where: {
        type,
        name: {
          [Op.like]: `%${name}%`
        },
        create_user: loginId
      }
    };
    ctx.status = 200;
    ctx.body = await ctx.model.Picture.findAll(query);
  }
  async create() {
    const ctx = this.ctx;
    const app = this.app;
    let stream = null;
    try {
      stream = await ctx.getFileStream();
    } catch (e) {
      ctx.status = 400;
      return;
    }
    const errors = app.validator.validate(createPictureRule, stream.fields);
    if (!stream || errors || !stream.filename) {
      ctx.status = 400;
      ctx.body = errors;
      return;
    }
    const { name, type, width, height } = stream.fields;
    const create_user = ctx.session.loginId;
    const filename = md5(stream.filename) + Path.extname(stream.filename);
    const destination = Path.join(this.config.pictureDir, filename);
    try {
      await ctx.helper.uploadFile(stream, destination);
      const created_at = new Date().toDateString();
      const updated_at = new Date().toDateString();
      const picture = await ctx.model.Picture.create({ name, type, width, height, path: destination, create_user, created_at, updated_at });
      ctx.status = 201;
      ctx.body = picture;
    } catch (e) {
      await ctx.helper.deleteFile(destination);
      ctx.status = 500;
      ctx.body = e.message;
    }
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const picture = await ctx.model.Picture.findByPk(id);
    if (!picture) {
      ctx.status = 404;
      return;
    }
    if (picture.id !== toInt(ctx.session.loginId)) {
      ctx.status = 403;
      return;
    }
    await picture.destroy();
    ctx.status = 200;
  }
}

module.exports = PictureController;
