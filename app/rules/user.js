'use strict';
module.exports = {
  createUserRule: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string'
    }
  },
  updateUserRule: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string'
    },
    newPassword: {
      type: 'string'
    }
  },
  loginRule: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string'
    }
  }
};

