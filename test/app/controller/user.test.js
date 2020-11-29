'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  it('should POST /api/user create one User', async () => {
    app.mockCsrf();
    await app.httpRequest().post('/api/user')
      .send({
        username: 'waiyan',
      })
      .expect(400);
    await app.httpRequest().post('/api/user')
      .send({
        username: 'waiyan',
        password: 'waiyan'
      })
      .expect(201);
  });

  it('should PUT /api/user update one User', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .put('/api/user/1')
      .send(
        {
          username: 'username',
          password: 'password',
          newPassword: 'waiyan'
        })
      .expect(401);
    await app.factory.createMany('user', 1);
    app.mockSession({
      loginId: '1'
    });
    await app.httpRequest()
      .put('/api/user/1')
      .send(
        {
          username: 'username',
          password: 'password',
          newPassword: 'waiyan'
        })
      .expect(204);
    await app.httpRequest()
      .put('/api/user/2')
      .send(
        {
          username: 'username',
          password: 'password',
          newPassword: 'waiyan'
        })
      .expect(404);
    await app.httpRequest()
      .put('/api/user/1')
      .send(
        {
          username: 'username',
          password: 'password',
          newPassword: 'password'
        })
      .expect(403);
  });

  it('should DELETE /api/user delete one User', async () => {
    app.mockCsrf();
    await app.factory.createMany('user', 1);
    await app.httpRequest()
      .delete('/api/user/1')
      .expect(401);
    app.mockSession({
      loginId: '1'
    });
    await app.httpRequest()
      .delete('/api/user/2')
      .expect(403);
    await app.httpRequest()
      .delete('/api/user/1')
      .expect(200);
  });
});
