const router = require('koa-router')()
const DB = require('../mongodb/index')

router.get('/category', async (ctx, next) => {
  const result = await DB.find('category', {});
  ctx.body = result;
});

// router.post('/lfy', async (ctx, next) => {
//   const result = await DB.insert('category', {"name":"lfy"});
//   ctx.body = result;
// });



module.exports = router