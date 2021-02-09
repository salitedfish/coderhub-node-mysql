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
            JSON_OBJECT('id',u.id,'name',u.name) AS user,
            (SELECT COUNT(*) FROM comment WHERE moment_id = m.id) AS cmomentCount, 
            JSON_ARRAYAGG(JSON_OBJECT(
              'id',comment.id,
              'content',comment.content,
              'momentId',comment.moment_id,
              'userId',comment.user_id,
              'commentId',comment.comment_id,
              'createTime',comment.createAt,
              'user',JSON_OBJECT('id',cu.id,'name',cu.name)
            )) AS comments
            FROM moment AS m 

            LEFT JOIN user AS u 
            ON m.user_id = u.id

            LEFT JOIN comment
            ON comment.moment_id = m.id

            LEFT JOIN user AS cu
            ON comment.user_id = cu.id

            WHERE m.id = ?;`

    //处理数据库语句
    const result = await connection.execute(sqlLan, [momId])

    //返回获取到的动态列表
    return result[0]

  }

  //批量获取动态的操作数据库函数
  async getMomList(userId, offect, size) {

    // 先写sql预处理语句，采用左连接的方式，以动态列表为主表，用户为副表连接，偏移和大小用limit在最后限制
    const sqlLan = `SELECT m.id AS id,m.content AS content,m.createAt AS createTime,m.updateAt AS updateTime,
          JSON_OBJECT('id',u.id,'name',u.name) AS user,
          (SELECT COUNT(*) FROM comment WHERE moment_id = m.id) AS cmomentCount
          FROM moment AS m 
          LEFT JOIN user AS u 
          ON m.user_id = u.id
          WHERE m.user_id = ?
          LIMIT ?,?;`

    // const sqlLan = `SELECT m.id AS id,m.content AS content,m.createAt AS createTime,m.updateAt AS updateTime,
    //       JSON_OBJECT('id',u.id,'name',u.name) AS user,
    //       (SELECT COUNT(*) FROM comment WHERE moment_id = m.id) AS cmomentCount, 
    //       JSON_ARRAYAGG(JSON_OBJECT(
    //         'id',comment.id,
    //         'content',comment.content,
    //         'momentId',comment.moment_id,
    //         'userId',comment.user_id,
    //         'commentId',comment.comment_id,
    //         'createTime',comment.createAt,
    //         'user',JSON_OBJECT('id',cu.id,'name',cu.name)
    //       )) AS comments

    //       FROM moment AS m 

    //       LEFT JOIN user AS u 
    //       ON m.user_id = u.id

    //       LEFT JOIN comment
    //       ON comment.moment_id = m.id

    //       LEFT JOIN user AS cu
    //       ON comment.user_id = cu.id

    //       WHERE m.user_id = ?
    //       LIMIT ?,?;`


    //处理数据库语句
    const result = await connection.execute(sqlLan, [userId, offect, size])

    //返回获取到的动态列表
    return result[0]
  }

  //修改指定动态的数据库操作函数
  async patchMom(userId, momentId, content) {

    const sqlLan = `UPDATE moment SET content = ? WHERE user_id = ? and id = ? `

    const result = await connection.execute(sqlLan, [content, userId, momentId])

    return result[0]

  }


  //删除动态接口
  async deleteMom(momentId) {

    const sqlLan = "DELETE FROM moment WHERE id = ?"

    const result = await connection.execute(sqlLan, [momentId])

    return result

  }

  //给动态添加标签
  async addLabelToMomentService(momentId, labels,ctx) {

    const sqlLan = `INSERT INTO moment_label (moment_id,label_id) VALUE (?,?);`
    const sqlLanB = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`

    //循环遍历labels数组
    for (let label of labels) {
      //查看每个label是不是已经被moment添加过了
      const result = await connection.execute(sqlLanB, [momentId, label.id])
      //如果没有被添加过，则添加，否则啥也不干
      if (result[0].length <= 0) {
        const result = await connection.execute(sqlLan, [momentId, label.id])
      }
    }
  }

}

module.exports = new MomentService()