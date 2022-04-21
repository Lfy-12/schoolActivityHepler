const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const router = require('./router')
const corsConfigs = require('./configs/cors')

const Koa = require('koa');
const app = new Koa()

// 处理跨域的配置
app.use(cors(corsConfigs));

// router
app.use(bodyParser()); // 解析request的body
app.use(router.routes());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...')