'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(254),
    password: STRING(254),
    created_at: DATE,
    updated_at: DATE
  });

  return User;
};
