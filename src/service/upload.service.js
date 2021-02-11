const connection = require("../app/database")
const { APP_HOST, APP_PORT } = require('../app/config')

class UploadService {

  //保存文件信息，并且把地址保存在user里面
  async saveUploadInfoService(mimetype, filename, size, id) {

    const sqlLanA = 'INSERT INTO avatar (filename,mimetype,size,user_id) VALUE (?,?,?,?)'
    const sqlLanB = 'UPDATE user SET avatar_url = ? WHERE id = ?;'


    //把图片信息保存在avatar里面
    const result = await connection.execute(sqlLanA, [filename, mimetype, size, id])
    //把图片地址保存在user里面
    await connection.execute(sqlLanB, [`${APP_HOST}:${APP_PORT}/users/${id}/avatar/${filename}`, id])

    return result[0]

  }
  
  //获取文件信息
  async getUploadInfoService(userId) {

    const sqlLan = `SELECT * FROM avatar WHERE user_id = ?`

    const results = await connection.execute(sqlLan, [userId])

    //因为同一用户可能上传了几个头像，这里取出最新的头像，也就是最后一个头像
    const result = results[0].pop()

    return result

  }
}

module.exports = new UploadService()
