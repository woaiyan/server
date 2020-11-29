'use strict';

const { assert, app } = require('egg-mock/bootstrap');


describe('test/app/controller/article.test.js', () => {
  it('should POST /api/article create Article', async () => {
    app.mockCsrf();
    await app.httpRequest().post('/api/article')
      .send({
        title: '文档',
        type: '1',
        content: '文档测试',
      })
      .expect(401);
    app.mockSession({
      loginId: '1'
    });
    await app.httpRequest().post('/api/article')
      .send({
        title: '文档',
        type: '1',
      })
      .expect(400);
    const res = await app.httpRequest().post('/api/article')
      .send({
        title: '文档',
        type: '1',
        content: '文档测试',
      })
      .expect(201);
    assert(res.body.id);
  });
  it('should GET /api/article batch get Article', async () => {
    app.mockCsrf();
    await app.factory.createMany('article', 3);
    app.httpRequest()
      .get('/api/article?page=1&type=1&onlyself=true&title=name')
      .expect(400);
    const res = await app.httpRequest()
      .get('/api/article?page=1&pagesize=2&type=1&onlyself=true&title=name')
      .expect(200);
    assert(res.body.length === 2);
  });
  it('should GET /api/article/:id get one Artile by id', async () => {
    app.mockCsrf();
    await app.factory.createMany('article', 1);
    await app.httpRequest()
      .get('/api/article/2')
      .expect(404);
    await app.httpRequest()
      .get('/api/article/1')
      .expect(200);
  });
  it('should PUT /api/article/:id update one Artilce', async () => {
    app.mockCsrf();
    await app.factory.createMany('article', 1);
    await app.httpRequest()
      .put('/api/article/1')
      .send({ title: 'article_update', type: '2', content: 'article_update' })
      .expect(401);
    app.mockSession({
      loginId: '1'
    });
    await app.httpRequest()
      .put('/api/article/2')
      .send({ title: 'article_update', type: '2', content: 'article_update' })
      .expect(404);
    await app.httpRequest()
      .put('/api/article/1')
      .send({ title: 'article_update', type: '2', content: 'article_update' })
      .expect(204);
    const res = await app.httpRequest()
      .get('/api/article/1')
      .expect(200);
    assert(res.body.title === 'article_update');
    assert(res.body.type === '2');
    assert(res.body.content === 'article_update');
    app.mockSession({
      loginId: '2'
    });
    await app.httpRequest()
      .put('/api/article/1')
      .send({ title: 'article_update', type: '2', content: 'article_update' })
      .expect(403);
  });
  it('should Delete /api/article/:id delete one Article', async () => {
    app.mockCsrf();
    await app.factory.createMany('article', 1);
    await app.httpRequest()
      .delete('/api/article/1')
      .expect(401);
    app.mockSession({
      loginId: '1'
    });
    await app.httpRequest()
      .delete('/api/article/2')
      .expect(404);
    app.mockSession({
      loginId: '2'
    });
    await app.httpRequest()
      .delete('/api/article/1')
      .expect(403);
    app.mockSession({
      loginId: '1'
    });
    await app.httpRequest()
      .delete('/api/article/1')
      .expect(200);
  });
});
