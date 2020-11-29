'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/login.test.js', () => {
  it('should POST /api/login', async () => {
    app.mockCsrf();
    await app.factory.createMany('user', 1);
    await app.httpRequest()
      .post('/api/login')
      .send({
        username: 'username',
        password: 'password'
      })
      .expect(200)
      .expect('登录成功');
    await app.httpRequest()
      .post('/api/login')
      .send({
        username: 'username_1',
        password: 'password_2'
      })
      .expect(403)
      .expect('用户名或密码错误');
    await app.httpRequest()
      .post('/api/login')
      .send({
        username: 'username'
      })
      .expect(400);
  });
});
