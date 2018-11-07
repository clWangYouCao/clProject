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





