const router = require('koa-router')()
const DB = require('./mongodb/index')
const axios = require("axios")

// 获取活动类型列表
router.get('/activityType', async (ctx, next) => {
  try {
    const result = await DB.find('activityType', {});
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

// 获取素拓类型列表
router.get('/sutuoType', async (ctx, next) => {
  try {
    const result = await DB.find('sutuoType', {});
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

// 获取面向对象类型列表
router.get('/peopleType', async (ctx, next) => {
  try {
    const result = await DB.find('peopleType', {});
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
    let result
    if (ctx.query.title) result = await DB.find('activity', { ...ctx.query, title: { $regex: ctx.query.title } });  // 兼容 标题模糊搜素
    else if (ctx.query._id) result = await DB.find('activity', { _id: DB.getObjectID(ctx.query._id) });  // 按 活动id 搜索
    else result = await DB.find('activity', ctx.query);
    console.log(result);
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

// 发布信息
router.post('/activity/add', async (ctx, next) => {
  try {
    // console.log(ctx.request.body);
    const result = await DB.insert('activity', ctx.request.body);
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


// 获取用户信息
router.get('/user', async (ctx, next) => {
  try {
    const result = await DB.find('user', ctx.query);
    ctx.response.body = JSON.stringify({
      code: 200,
      data: result[0]
    })
  } catch (error) {
    ctx.response.body = JSON.stringify({
      code: 500,
      data: "服务器错误" + error
    })
  }
});

// 更新用户信息
router.post('/user/update', async (ctx, next) => {
  const data = ctx.request.body;
  // console.log(data);
  try {
    let result;
    if (data[1].nickname) result = await DB.update('user', data[0], { $set: data[1] });
    else result = await DB.update('user', data[0], { $push: data[1] });
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


// 登录,获取openid
router.get('/onLogin', async (ctx, next) => {
  let appid = "wx6972672e0cb4a9bc";
  let secret = "f35f242a3e9e977dc7f4fdd2f45b3830";
  let grant_type = "authorization_code";

  const { code } = ctx.query
  const url = "https://api.weixin.qq.com/sns/jscode2session?grant_type=" + grant_type +
    "&appid=" + appid + "&secret=" + secret + "&js_code=" + code;

  try {
    const result = await axios.get(url);
    ctx.response.body = JSON.stringify({
      code: 200,
      data: result.data
    })
  } catch (error) {
    ctx.response.body = JSON.stringify({
      code: 500,
      data: "服务器错误" + error
    })
  }
});

module.exports = router