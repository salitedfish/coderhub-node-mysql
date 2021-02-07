const connection = require('../app/database')

//定义具体处理服务的类
class UserService {

  //创建新用户时调用的方法
  async create(user) {
    //结构参数
    const { name, password } = user;

    //定义sql预处理语句
    const sqlLan = `INSERT INTO user (name,password) VALUES (?,?);`

    //执行sql语句，操作数据库
    const result = await connection.execute(sqlLan, [name, password])

    //打印结果和返回客户端数据
    console.log(`已创建${name}用户`)
    return result[0]
  }

  //通过用户名查询用户时调用的方法
  async getUserByName(name) {
    const sqlLan = `SELECT * FROM user WHERE name = ?;`;
    const result = await connection.execute(sqlLan, [name])
    return result[0]
  }
  
}

module.exports = new UserService()
