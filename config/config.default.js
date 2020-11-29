/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    sequelize: {
      dialect: 'mysql',
      host: '127.0.0.1',
      username: 'root',
      password: '123456',
      port: 3306,
      database: 'db',
      define: {
        underscored: true,
        freezeTableName: true,
        timestamps: false
      }
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1605618385718_2910';

  // add your middleware config here
  config.middleware = [ 'verify' ];

  // add your user config here
  const userConfig = {
    pictureDir: 'E:\\waiyan\\app\\public'
  };
  return {
    ...config,
    ...userConfig,
  };
};
