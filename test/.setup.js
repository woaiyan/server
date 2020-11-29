const { app } = require('egg-mock/bootstrap');
const factories = require('./factories');

before(() => factories(app));
afterEach(async () => {
  await Promise.all([
    app.model.Picture.destroy({ truncate: true, force: true }),
  ]);
  await Promise.all([
    app.model.Article.destroy({ truncate: true, force: true }),
  ]);
  await Promise.all([
    app.model.User.destroy({ truncate: true, force: true }),
  ]);
});
