'use strict';

module.exports = {
// 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('picture', {
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
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('picture');
  }
};
