## ES6.0 知识点

### 1. 基本使用点

(1) 变量

* var
  1. 可以重复声明
  2. 无法限制修改
  3. 没有块级作用域

* let 不能重复声明，变量可以修改，块级作用域

* const 不能重复声明，变量不能修改，块级作用域

(2) 箭头函数 () => {}

1. 如果只有一个参数，() 可以省
2. 如果只有一个return，{} 可以省

如：`let show = a => a*2;`

(3) 函数 - 参数

1. 参数扩展/数组展开
2. 默认参数

见代码如下：   

```
// 收集参数  (args 只能放在最后一个参数)
function show(a, b, ...args) {
  alert(args); //3 4 5
}
show(1, 2, 3, 4, 5);


// 展开数组 (就跟直接把数组内容写在这儿一样)
let arr1 = [1, 2, 3];
let arr2 = [5, 6, 7];
let arr = [...arr1, ...arr2];
alert(arr); // 1, 2, 3, 5, 6, 7


// 默认参数 (直接赋值，没有传参即显示默认赋值)
function fn(a, b=5, c=6) {
  console.log(a, b, c); // 1 99 6
}
fn(1, 99);
```

(4) 解构赋值

1. 左右两边结构必须一样
2. 右边必须是个东西(格式规范)
3. 声明和赋值不能分开(必须在一句话里完成)

见以下代码：

```
let [a, b, c] = [12, 5, 8];
let {a, b, c} = {a: 12, b: 5, c: 8};
let [json, [n1, n2, n3], num, str] = [{a: 12, b: 5}, [12, 5, 8], 99, "abc"];
console.log(json, n1, n2, n3, num, str); //{a: 12, b: 5} 12 5 8 99 "abc"
```

(5) 数组

1. map —— 映射 (一个对一个)
2. reduce —— 汇总 (一堆出来一个)
3. filter —— 过滤器
4. forEach —— 循环(迭代)

见以下代码：

```
let arr = [1, 2, 4];
let res = arr.map(n => n*2);
console.log(arr, res); // [1 2 4]   [2 4 8]


let arr = [1, 5, 8, 99];
// tmp第一次取1，后续每次都是取return的值
let res = arr.reduce(function(tmp, n, index) {
  return tmp + n;
});
console.log(res); // 113

let arr = [12, 1, 2, 6];
let res = arr.filter(n => n%3==0);
console.log(res); // 12 6

arr.forEach((n, index) => {
  console.log(index + ':' + n);  // 0: 12 1: 1 ...
})
```

(6) 字符串

1. 多了两个新方法 startsWith/endsWith
2. 字符串模板 ``

见以下代码：

```
let str = "http://baidu.com";
str.startsWith("http"); // true
str.endsWith("com"); // true


// ${变量} 拼接可换行
let a = 12;
let str = `a${a}bc`;
console.log(str); // "a12bc"
```

(7) 面向对象

1. class 关键字，构造器和类分开了
2. class 里面直接加方法
3. 继承

见以下代码：

```
class User {
  constructor(name, pass) {
    this.name = name;
    this.pass = pass;
  }
  showUser() {
    alert(this.name + "," + this.pass);
  }
}
// 继承
class VipUser extends User {
  constructor(name, pass, level) {
    super(name, pass); // 执行父级构造函数
    this.level = level;
  }
  showLevel() {
    alert(this.level);
  }
}

var u1 = new User('cl', '123456');
u1.showUser();

var v1 = new VipUser('cl', '123456', 3);
v1.showUser();
v1.showLevel();
```

(8) json

1. JSON对象 —— `JSON.stringify / JSON.parse`
2. 简写 —— `key 和 value 值一样 留一个 / 方法 :function 一块删`   


json 标准写法：
* 只能用双引号
* 所有的名字都必须用引号包起来

如：   

```
let a = 12;
let b = 5;
let json = {a, b, c: 55};
console.log(json); // a:12, b:5, c:55


let str = "{a: 1, b: 2}";
let str1 = "{'a': 1, 'b': 2}";  
let str2 = '{"a": 1, "b": 2}';

JSON.parse(str); //不能解析
JSON.parse(str1); //不能解析
JSON.parse(str2); //正常解析
```

(9) Promise

1. 基本用法 —— promise、then
2. Promise.all([p1, p2, p3]) —— 接收一个数组入参，且数组元素皆为Promise实例，且所有promise成功才算成功
3. Promise.race([p1, p2, p3]) —— 与Promise.all类似，只是只要有一个成功就算成功

使用如下：

```
// 接收函数作为参数
let promise = new Promise(function(resolve, reject){
    if(/* 异步操作成功 */) {
       resolve(value); // 异步操作成功，将异步操作结果作为参数传递出去
    } else {
        reject(error); // 异步操作失败，将异步操作报出的错误作为参数传递出去
    }
});

// 用then 方法分别制定 resolved 和 rejected 状态的回调函数 接收入参
// 第二个回调函数 是可选
promise.then(function(value){

}, function(error){

});


Promise.all([
  $.ajax({url: 'data/arr.txt', dataType: 'json'}), 
  $.ajax({url: 'data/json.txt', dataType: 'json'})
]).then(results => {
  // 对了
  let [arr, json] = results;
  console.log(arr, json); //
}, err => {
  // 错了
  console.log("失败了");
});
```

(10) generator -- 生成器(可以产出多个值)

1. generator函数执行中间能停 —— 遇 yield 暂停，next 才执行yield后代码
2. yield 表达式 —— 暂停标志(既可传参、又可返回值)

`yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值`

使用如下：

```
function* show() {
  alert('a');

  let a = yield;

  alert('b');
  alert(a); //5
}

let gen = show();
// 第一个传参无效 赋值下一个next执行
gen.next(12); 
gen.next(5);


function* show() {
  alert('a');

  yield 12;

  alert('b');

// return 55;
}

let gen = show();
console.log(gen.next()); // {value: 12, done: false}
console.log(gen.next()); // {value: undefined, done: true} 有return value 则为返回值
```

异步操作：

1. 回调
2. Promise —— 一次读一堆，没有逻辑
3. generator —— 逻辑性

`如果带逻辑回调，1 2没什么区别，generator最方便`   


### 2. AMD、CMD、CommonJS、ES6对比

(1) AMD - 异步模块定义

* 概念：`AMD是RequireJS在推广过程中对模块定义的规范化产出。`它是一个概念，RequireJS是对这个概念的实现。就好比JavaScript语言是对ECMAScript规范的实现。   

* RequireJS：是一个AMD框架，可以异步加载js文件。加载模块方法如下：   

```
define(['package/lib'], function(lib){
  function foo() {
    lib.log('hello world');
  }

  return {
    foo: foo
  }
});
```

说明：`是一个依赖前置、异步定义的AMD框架(在参数里面引入js文件)，在定义同时如果需要用到别的模块，在最前面定义好即在参数数组里面进行引入，在回调里面加载`   

(2) CMD   

* 概念：`CMD是SeaJS在推广过程中对模块定义的规范化产出。`是一个同步模块定义，是SeaJS的一个标准，SeaJS是CMD概念的一个实现，SeaJS是淘宝团队提供的一个模块开发的js框架。   

```
define(function(require, exports, module) {
  // 通过 require 引入依赖
  var $ = require('jquery');
  var Spinning = require('./spinning');
})
```

说明：`通过define()定义，没有依赖前置，通过require加载jQuery插件，CMD是依赖就近，在什么地方使用到插件就在什么地方require该插件，即用即返，这是一个同步的概念`   

(3) CommonJS   

* 概念：`CommonJS规范是通过module.exports定义的，在前端浏览器并不支持module.exports，通过node.js后端使用的。`Nodejs端是使用CommonJS规范的，前端浏览器一般使用AMD、CMD、ES6等定义模块化开发的   

```
exports.area = function(r) {
  return Math.PI * r * r;
};

exports.Circumference = function(r) {
  return 2 * Math.PI * r;
};
```

说明：`输出方式有两种:(1)默认输出 -- module exports (2) 单个导出 -- exports`   

(4) ES6   

* 概念：`模块化 -- export default/export、import 对模块进行导出导入`   

(5) AMD规范与CommonJS规范兼容性   

  ```
  CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面操作。
  
  AMD规范则是非同步加载模块，允许指定回调函数。

  由于Node.js主要用于服务器编程，模块文件一般都存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载方式。所以CommonJS规范比较适用。

  但是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。

  ```


### 3. 2中导入导出区别与关系    

1. module.exports、exports、require 是属于CommonJS模块规范   

2. export default、export、import 是属于ES6语法   

3. module.exports 和 exports   

    ```
    Node应用由模块组成，采用CommonJS模块规范 => 每个文件就是一个模块，有自己作用域，内部定义变量函数皆为私有，外部不可见。   

    CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性 => var exports = module.exports
    ```
    
    链接可见：<http://javascript.ruanyifeng.com/nodejs/module.html>   

    注意：`可以直接在exports对象上添加方法，表示对外输出的接口，如同在module.exports上添加一样。注意，不能将exports变量指向一个值，会切断exports和module.exports联系`   

4. export default 和 export    

    ```
    export其实和export default就是写法上面有点差别，一个是导出一个个单独接口，一个是默认导出一个整体接口。
    
    使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载 => import时，export则对应需要加{}，如import {...} from '...'
    
    还有种不用去知道有哪些具体的暴露接口名，就用export default命令，为模块指定默认输出 => import时，随意命名即可import ... from '...' => 但是一个模块只有一个默认输出，所以export default只能使用一次。
    ```  



















