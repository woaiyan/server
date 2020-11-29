'use strict';

const Controller = require('egg').Controller;
const { Op } = require('sequelize');
const { createArtileRule, batchArticleRule } = require('../rules/article');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ArticleController extends Controller {
  async index() {
    const ctx = this.ctx;
    const app = this.app;
    const errors = app.validator.validate(batchArticleRule, ctx.query);
    if (errors) {
      ctx.status = 400;
      ctx.body = errors;
      return;
    }
    const offset = (ctx.query.page - 1) * ctx.query.pagesize;
    const limit = toInt(ctx.query.pagesize);
    const loginId = ctx.query.type === true ? ctx.session.loginId : '1';
    const type = ctx.query.type;
    const query = {
      attributes: [ 'id', 'title', 'type', 'create_user', 'created_at', 'updated_at' ],
      limit,
      offset,
      where: {
        type,
        create_user: loginId,
        title: {
          [Op.like]: `%${ctx.query.title}%`
        }
      }
    };
    const res = await ctx.model.Article.findAndCountAll(query);
    ctx.body = res.rows;
  }
  async show() {
    const ctx = this.ctx;
    const Article = await ctx.model.Article.findByPk(toInt(ctx.params.id));
    if (!Article) {
      ctx.status = 404;
      ctx.body = 'resource is not exist';
      return;
    }
    ctx.status = 200;
    ctx.body = Article;
  }
  async create() {
    const ctx = this.ctx;
    const app = this.app;
    const { title, type, content } = ctx.request.body;
    const errors = app.validator.validate(createArtileRule, ctx.request.body);
    if (errors) {
      ctx.status = 400;
      ctx.body = errors;
      return;
    }
    const created_at = new Date().toDateString();
    const updated_at = new Date().toDateString();
    const create_user = ctx.session.loginId;
    const article = await ctx.model.Article.create({ title, type, create_user, created_at, updated_at, content });
    ctx.status = 201;
    ctx.body = article;
  }
  async update() {
    const ctx = this.ctx;
    const app = this.app;
    const id = toInt(ctx.params.id);
    const errors = app.validator.validate(createArtileRule, ctx.request.body);
    if (errors) {
      ctx.status = 400;
      ctx.body = errors;
      return;
    }
    const article = await ctx.model.Article.findByPk(id);
    if (!article) {
      ctx.status = 404;
      return;
    }
    if (article.create_user !== toInt(ctx.session.loginId)) {
      ctx.status = 403;
      return;
    }
    const { title, type, content } = ctx.request.body;
    await article.update({ title, type, content });
    ctx.status = 204;
    ctx.body = article;
  }
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const article = await ctx.model.Article.findByPk(id);
    if (!article) {
      ctx.status = 404;
      return;
    }
    if (article.create_user !== toInt(ctx.session.loginId)) {
      ctx.status = 403;
      return;
    }

    await article.destroy();
    ctx.status = 200;
  }
}

module.exports = ArticleController;
