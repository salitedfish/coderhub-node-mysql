const connection = require('../app/database')

class AuthService {

  async checkMoment(userId, momId){

    //寻找用户id和动态id同时匹配的动态
    const sqlLan = "SELECT * FROM moment WHERE user_id = ? AND id = ?;"

    //执行sql语句
    const result = await connection.execute(sqlLan,[userId,momId])
    
    //如果数组为空，则表示没有权限，返回false
    if(result[0].length === 0) {
      return false
    }

    return true

    
  }
}

module.exports = new AuthService()