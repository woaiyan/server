'use strict';

const { assert, app } = require('egg-mock/bootstrap');
const md5 = require('md5');
const fs = require('fs');

describe('test/app/controller/picture.test.js create one Picture', () => {
  it('should POST /api/picture', async () => {
    app.mockCsrf();
    app.mockSession({
      loginId: '1'
    });
    await app.httpRequest()
      .post('/api/picture')
      .set('Content-Type', 'multipart/form-data;')
      .field('type', '1')
      .field('width', '500')
      .field('height', '500')
      .attach('file', './test/public/test.jpg')
      .expect(400);
    await app.httpRequest()
      .post('/api/picture')
      .set('Content-Type', 'multipart/form-data;')
      .field('type', '1')
      .field('width', '500')
      .field('height', '500')
      .field('name', 'waiayn')
      .expect(400);
    const result = await app.httpRequest()
      .post('/api/picture')
      .set('Content-Type', 'multipart/form-data;')
      .field('type', '1')
      .field('width', '500')
      .field('height', '500')
      .field('name', 'waiayn')
      .attach('file', './test/public/test.jpg')
      .expect(201);
    assert(result.body.hasOwnProperty('name'));
    assert(result.body.hasOwnProperty('width'));
    assert(result.body.hasOwnProperty('height'));
    assert(result.body.hasOwnProperty('type'));
    assert(result.body.hasOwnProperty('path'));
    assert(result.body.hasOwnProperty('created_at'));
    assert(result.body.hasOwnProperty('updated_at'));
    // assert(fs.existsSync(`E:\\waiyan\\app\\public\\${md5('test.jpg')}.jpg`), true);
  });

  it('should GET /api/picture get one Picture', async () => {
    app.mockCsrf();
    await app.factory.createMany('picture', 3);
    await app.httpRequest()
      .get('/api/picture?page=1&type=1')
      .expect(400);
    const res = await app.httpRequest()
      .get('/api/picture?page=1&pagesize=2&type=1&onlyself=true&name=name')
      .expect(200);
    assert(res.body.length === 2);
  });

  it('should DELETE /api/picture delete one Picture', async () => {
    app.mockCsrf();
    await app.factory.createMany('picture', 1);
    await app.httpRequest()
      .delete('/api/picture/1')
      .expect(401);
    app.mockSession({
      loginId: '2'
    });
    await app.httpRequest()
      .delete('/api/picture/1')
      .expect(403);
    app.mockSession({
      loginId: '1'
    });
    await app.httpRequest()
      .delete('/api/picture/2')
      .expect(404);
    await app.httpRequest()
      .delete('/api/picture/1')
      .expect(200);
  });
});
