'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Picture = app.model.define('picture', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(254),
    type: STRING(254),
    path: STRING(254),
    width: INTEGER,
    height: INTEGER,
    create_user: INTEGER,
    created_at: DATE,
    updated_at: DATE
  });

  return Picture;
};
