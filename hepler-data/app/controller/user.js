const User = require('../dbHelper/user')

const sumFunction = async function() {
  return new Promise(function (resolve, reject) {
    try {
      resolve('ok')
    } catch(e) {
      reject(e)
    }
  })
}

exports.query = async function(ctx, next) {
  let res = await User.queryUsers()
  let message = await sumFunction()
  let result = {
  	code:200,
  	data: res || {},
  	message: message
  }
  ctx.response.body = result
}