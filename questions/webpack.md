## webpack 使用

### 1.基础

(1) package.json    

`启动 scripts 脚本编译，会找到对应 node_modules 下的 webpack`   

(2) webpack 打包模块源码   

1. 把所有模块的代码放入到函数中，用一个数组保存起来
2. 根据require时传入的数组索引，能知道需要哪一段代码
3. 从数组中，根据索引取出包含我们代码的函数
4. 执行该函数，传入一个对象module.exports
5. 我们的代码，按照约定，正好是用 module.exports = 'xxx' 进行赋值
6. 调用函数结束后，module.exports 从原来的空对象，就有值了
7. 最终 return module.exports; 作为require 函数的返回值    

(3) webpack.config.js 文件配置   
   
`见 webpack_demo`


