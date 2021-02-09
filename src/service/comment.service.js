const connection = require('../app/database')

class CommentService {
  //评论动态接口
  async createCommentService(userId, momentId, content) {

    const sqlLan = `INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?);`

    const result = await connection.execute(sqlLan, [content, momentId, userId])

    console.log('评论完成')
    return result

  }

  //回复评论接口
  async createCommentReplyService(userId, momentId, commentId, content) {

    const sqlLan = `INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES (?,?,?,?);`

    const result = await connection.execute(sqlLan, [content, momentId, userId, commentId])

    console.log('回复完成')
    return result

  }

  //修改评论接口
  async patchCommentReplyService(commentId, content) {

    const sqlLan = `UPDATE comment SET content = ? WHERE id = ?;`

    const result = await connection.execute(sqlLan, [content, commentId])

    return result

  }

  //删除评论接口
  async deleteCommentReplyService(commentId){

    const sqlLan = `DELETE FROM comment WHERE id = ?;`

    const result = await connection.execute(sqlLan,[commentId])

    return result

  }

  //获取评论列表接口
  async getCommentListService(momentId){

    const sqlLan = `SELECT comment.id,comment.content,comment.comment_id AS commentId,comment.createAt AS createTime,JSON_OBJECT('id',u.id,'name',u.name) AS user
                   FROM comment 
                   LEFT JOIN user AS u
                   ON u.id = comment.user_id
                   WHERE moment_id = ?;`

    const result = await connection.execute(sqlLan,[momentId])

    return result[0]

  }
}

module.exports = new CommentService()