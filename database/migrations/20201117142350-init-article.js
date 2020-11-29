'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('article', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      title: STRING(254),
      type: STRING(254),
      content: TEXT('long'),
      create_user: INTEGER,
      created_at: DATE,
      updated_at: DATE
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('article');
  }
};
