const fs = require('fs')

const useRoutesApp = (app) => {
  //通过文件模块读取本路径下的所有文件，并循环导入路由并注册
  fs.readdirSync(__dirname).forEach((item)=>{

    if(item === 'index.js') return 

    //循环注册路由，因为commonjs的模块是运行时执行，所以可以在语句中使用
    const route = require(`./${item}`)
    app.use(route.routes())
    app.use(route.allowedMethods())

  })

}

module.exports = useRoutesApp