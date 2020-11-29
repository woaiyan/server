'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Article = app.model.define('article', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(254),
    type: STRING(254),
    content: TEXT('long'),
    created_at: DATE,
    updated_at: DATE,
    create_user: INTEGER
  });

  return Article;
};
