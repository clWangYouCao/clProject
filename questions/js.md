## js

### 1. URL编码与反编码

* `encodeURL() 与 decodeURL()`   
* `encodeURLComponent() 与 decodeURLComponent()`   

### 2. 访问对象属性 

* 中括号表示法   

* 点号表示法

  说明：`如果要访问的属性名是不确定的，就必须使用中括号表示法。它允许在运行时通过变量来实现相关属性的动态存取`   

  见以下代码：   

  ```
  var obj = {
    name: 'cl',
    age: 24,
    info: {
      career: 'web'
    }
  };

  var key = 'career';
  console.log(obj.info.key); // undefined
  console.log(obj.info[key]); // web
  ```