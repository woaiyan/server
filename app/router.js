'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.router.resources('article', '/api/article', app.controller.article);
  app.router.resources('picture', '/api/picture', app.controller.picture);
  app.router.resources('user', '/api/user', app.controller.user);
  app.router.post('/api/login', app.controller.login.login);
};
