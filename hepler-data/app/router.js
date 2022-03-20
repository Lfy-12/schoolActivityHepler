const router = require('koa-router')()
const User = require('./controller/user')

router.get('/', User.query)

router.get('/add', async ctx => {
    const mongodb = require('mongodb')
    const MongoClient = mongodb.MongoClient

    // 2. 创建 MongoDB 客户端实例
    // MongoDB 服务器的连接地址，其中可包含用户名、密码、域名、端口、数据库名等信息
    const mongoClient = new MongoClient('mongodb://127.0.0.1:27017')

    // 3. 建立连接
    mongoClient.connect()

    // 4. 连接关联哪个数据库
    const db = mongoClient.db('helper')

    const collection = db.collection('user')

    const info = await collection.insertOne({ id: '3', name: 'lft' })
    console.log(info)

    collection.find().forEach(item => {
        console.log(item)
    })

    ctx.body = '操作完成'
})

module.exports = router