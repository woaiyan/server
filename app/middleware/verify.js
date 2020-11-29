'use strict';
module.exports = () => {
  return async (ctx, next) => {
    try {

      if (ctx.session.loginId || ctx.req.method === 'GET' || ctx.req.url === '/api/login' || ctx.req.url === '/api/user' && ctx.req.method === 'POST') {
        await next();
      } else {
        ctx.status = 401;
        return;
      }
    } catch (e) {
      ctx.app.emit('error', e, ctx);
      console.log(e);
    }
  };
};
