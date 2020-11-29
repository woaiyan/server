'use strict';

const { factory } = require('factory-girl');

module.exports = app => {
  app.factory = factory;
  factory.define('picture', app.model.Picture, {
    name: factory.sequence('picture.name', n => `name_${n}`),
    path: factory.sequence('picture.path', n => `path_${n}`),
    type: '1',
    width: '500',
    height: '500',
    create_user: '1',
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString()
  });
  factory.define('article', app.model.Article, {
    title: factory.sequence('articel.title', n => `name_${n}`),
    type: '1',
    content: '文档测试',
    create_user: '1',
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString()
  });
  factory.define('user', app.model.User, {
    username: 'username',
    password: 'password',
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString()
  });
};
