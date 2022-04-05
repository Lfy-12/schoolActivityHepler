const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const router = require('./router')
const corsConfigs = require('./configs/cors')

const Koa = require('koa');
const app = new Koa()

// 处理跨域的配置
app.use(cors(corsConfigs));

// logger 中间件
// const loggerAsync = require('./middleware/logger-async')
// app.use(loggerAsync())

// router
app.use(bodyParser()); // 解析request的body
app.use(router.routes());

// response
// app.use(async ctx => {
//   ctx.body = 'Hello World, Koa!'
// })

// router.get('/', User.query)

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...')