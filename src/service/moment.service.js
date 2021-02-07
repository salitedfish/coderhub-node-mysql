const connection = require('../app/database')

class MomentService {

  //创建动态的操纵数据库函数
  async create(userId, content) {

    //先写sql预处理语句模板
    const sqlLan = `INSERT INTO moment (content,user_id) values (?,?);`

    //再执行sql语句
    const result = await connection.execute(sqlLan, [content, userId])

    //返回数据库操作结果
    return result[0]

  }

  //获取动态的操作数据库函数
  async getMom(momId) {

    //先写sql预处理语句，采用左连接的方式，以动态列表为主表，用户为副表连接
    const sqlLan = `SELECT m.id AS id,m.content AS content,m.createAt AS createTime,m.updateAt AS updateTime,
            JSON_OBJECT('id',u.id,'name',u.name) AS user
            FROM moment AS m LEFT JOIN user AS u 
            ON m.user_id = u.id
            WHERE m.id = ?;`

    //处理数据库语句
    const result = await connection.execute(sqlLan, [momId])

    //返回获取到的动态列表
    return result[0]

  }

  //批量获取动态的操作数据库函数
  async getMomList(userId, offect, size) {

    //先写sql预处理语句，采用左连接的方式，以动态列表为主表，用户为副表连接，偏移和大小用limit在最后限制
    const sqlLan = `SELECT m.id AS id,m.content AS content,m.createAt AS createTime,m.updateAt AS updateTime,
          JSON_OBJECT('id',u.id,'name',u.name) AS user
          FROM moment AS m LEFT JOIN user AS u 
          ON m.user_id = u.id
          WHERE m.user_id = ?
          LIMIT ?,?;`

    //处理数据库语句
    const result = await connection.execute(sqlLan, [userId, offect, size])

    //返回获取到的动态列表
    return result[0]
  }

  //修改指定动态的数据库操作函数
  async patchMom(userId, momId, content) {

    const sqlLan = `UPDATE moment SET content = ? WHERE user_id = ? and id = ?`

    const result = await connection.execute(sqlLan, [content, userId, momId])

    return result[0]

  }

  async canUpdateService(userId, momId){

    //寻找用户id和动态id同时匹配的动态
    const sqlLan = "SELECT * FROM moment WHERE user_id = ? AND id = ?"

    //执行sql语句
    const result = await connection.execute(sqlLan,[userId,momId])

    return result[0]
  }
}

module.exports = new MomentService()