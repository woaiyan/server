// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle = require('../../../app/model/article');
import ExportPicture = require('../../../app/model/picture');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    Picture: ReturnType<typeof ExportPicture>;
    User: ReturnType<typeof ExportUser>;
  }
}
