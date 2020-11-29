'use strict';
const fs = require('fs');
module.exports = {
  uploadFile(src, dst) {
    return new Promise(resolve => {
      const writeStream = fs.createWriteStream(dst);
      writeStream.on('finish', () => {
        resolve();
      });
      writeStream.on('error', () => {
        throw new Error('copy error');
      });
      src.pipe(writeStream);
    });
  },
  deleteFile(dst) {
    return new Promise(resolve => {
      try {
        if (!fs.existsSync(dst)) {
          resolve();
        }
        fs.unlinkSync(dst);
      } catch (e) {
        throw new Error('delete error');
      }
    });
  },
  createBatchResult(total, current, results) {
    if (total && current && results) {
      return { total, current, results };
    }
    throw new Error('Missing parameter');
  }
};
