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
}

module.exports = new CommentService()