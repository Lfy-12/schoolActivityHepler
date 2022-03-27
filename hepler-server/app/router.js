const router = require('koa-router')()
const DB = require('../mongodb/index')

// 获取分类列表
router.get('/category', async (ctx, next) => {
  try {
    const result = await DB.find('category', {});
    ctx.response.body = JSON.stringify({
      code: 200,
      data: result
    })
  } catch (error) {
    ctx.response.body = JSON.stringify({
      code: 500,
      data: "服务器错误" + error
    })
  }
});

// 获取活动信息列表
router.get('/activity', async (ctx, next) => {
  try {
    const result = await DB.find('activity', {});
    ctx.response.body = JSON.stringify({
      code: 200,
      data: result
    })
  } catch (error) {
    ctx.response.body = JSON.stringify({
      code: 500,
      data: "服务器错误" + error
    })
  }
});

// router.post('/category', async (ctx, next) => {
//   const data = ctx.request.body;
//   const result = await DB.insert('category', data);
//   ctx.body = result;
// });



module.exports = router