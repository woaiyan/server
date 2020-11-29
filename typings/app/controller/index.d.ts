// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle = require('../../../app/controller/article');
import ExportLogin = require('../../../app/controller/login');
import ExportPicture = require('../../../app/controller/picture');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    article: ExportArticle;
    login: ExportLogin;
    picture: ExportPicture;
    user: ExportUser;
  }
}
