const connection = require('../app/database')

class LabelService {

  //创建标签
  async createLabelService(name) {

    const sqlLan = "INSERT INTO label (name) VALUE (?)"

    const result = await connection.execute(sqlLan, [name])

    return result
  }

  //判断标签是否已经存在，如果不存在则添加上
  async isLabelExistsService(labels) {

    const results = []

    const sqlLan = 'SELECT * FROM label WHERE name = ?'

    //遍历数组，如果标签不存在则添加上
    for (let item of labels) {
      const result = await connection.execute(sqlLan, [item])
      const label = { name: item }
      //如果标签不存在则添加上
      if (result[0].length <= 0) {
        const result = await this.createLabelService(item)
        label.id = result[0].insertId
      } else {
        label.id = result[0][0].id
      }
      results.push(label)
    }

    return results

  }

  //批量获取标签
  async labelListService(limit, offset) {

    const sqlLan = `SELECT * FROM label LIMIT ?,?;`

    const result = await connection.execute(sqlLan, [offset, limit])

    return result[0]
  }

}

module.exports = new LabelService()