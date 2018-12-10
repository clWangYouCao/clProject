## vue 知识点

### 1.基本使用点

(1) 常用meta属性 —— 适配手机页面

```
<!-- 在iPhone 手机上禁止数字转化为拨号链接 -->
<meta name="format-detection" content="telephone=no">

<!-- 删除默认的苹果工具栏和菜单栏 -->
<meta name="apple-mobile-web-app-capable" content="yes">

<!-- 在web app应用下状态条（屏幕顶部条）的颜色-->
<meta name="apple-mobile-web-app-status-bar-style" content="white">

<!-- 在iPhone的浏览器中页面将以原始大小显示，不允许缩放 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

<!-- 如果安装了GCF（Google Chrome Frame 谷歌内嵌浏览器框架的简称），则使用GCF来渲染页面，   
      如果没安装GCF，则使用最高版本的IE内核进行渲染。这个插件可以让用户的IE浏览器外不变，   
      但用户在浏览网页时，实际上使用的是Google Chrome浏览器内核，而且支持IE6、7、8等多个版本的IE浏览器 -->
<meta http-equiv=”X-UA-Compatible” content=”IE=edge,chrome=1″/>
```

(2) v-bind

说明：上述input依次显示为myValue、Hello vue。`在v-bind绑定变量，要直接显示字符串而非变量，需加双重引号。`

```
new Vue({
  el: "#app",
  template: `
    <div>
      <input type="text" :value="'myValue'"/>
      <input type="text" :value="myValue"/>
    </div>
  `,
  data: {
    myValue: "Hello vue"
  }
});
```

(3) 组件使用 -- 全局/局部注册 -- 父传子

组件使用：`生出子（定义组件）、声明子（components）、使用子（模板内使用）`   
父传子：`父传属性值、子接收、子使用`

见以下代码：

```
<body>
  <div id="app"></div>
  <script>

    //全局注册 无须声明  减少components
    Vue.component('my-btn', {
      template: `<div>Button</div>`
    });
    
    // 局部注册
    var MyHeader = {
      template: `<div>Header</div>`
    };

    var MyBody = {
      props: ["content"],
      template: `<div>
          <div>Body</div>
          <div style="background-color: red;">{{content}}</div>
        </div>`
    };

    var MyFooter = {
      template: `<div>Footer</div>`
    };

    var App = {
      data: function(){
        return {
          str: "Hello World"
        }
      },
      components: {
        'my-header': MyHeader,
        'my-body': MyBody,
        'my-footer': MyFooter
      },
      template: `
        <div>
          <my-header />
          <my-body :content="str" />
          <my-footer />
          <my-btn />
        </div>`
    };
    
    new Vue({
      el: "#app",
      components: {
        'app': App
      },
      template: `<app />`
    });
  </script>
</body>
```

(4) 过滤器的使用 -- 全局/局部注册

注意点: `区分局部注册的filters(可包含多个)，全局注册的filter(一个)`

见以下代码：

```
<body>
  <div id="app"></div>
  <script>
    
    // 全局注册
    Vue.filter("reverse", function(val, arg1){
      return val.split("").reverse().join("");
    });

    var App = {
      data: function() {
        return {
          value: ""
        }
      },
      template:  `
        <div>
          <input type="text" v-model="value"/>
          {{value | reverse}}
        </div>
      `,
      // 局部注册
      filters: {
        reverse: function(val, arg1) {
          return val.split("").reverse().join("");
        }
      }
    };

    new Vue({
      el: "#app",
      components: {
        "app": App
      },
      template: `<app />`,
    });
  </script>
</body>
```

(5) 监听 -- watch/computed

watch: 监听单个。   
computed: 监听多个。   
说明：`都不能监听复杂类型，如object、array。因为监听的是对象地址，地址并没有改变，改变的是该地址属性的值。`

见以下代码：

```
<body>
  <div id="app"></div>
  <script>
  
    var App = {
      data: function() {
        return {
          value: "111",
          stus: {"name": "cl"},
          n1: '',
          n2: '',
          rate: ''
        }
      },
      template:  `
        <div>
          <input type="text" v-model="value"/>
          {{value}}

          <button @click="stus.name='kcb'">{{stus.name}}</button>
          <div>
            <input type="number" v-model="n1"/> + <input type="number" v-model="n2"/> 
            * <input type="number" v-model="rate"/> = {{result}}
          </div>
        </div>
      `,
      watch: {
        value: function(newVal, oldVal) {
          console.log(newVal);
        },
        // 监测复杂类型，监测不成功，因为监视的是对象地址，地址并没有改变，改变的是该地址属性的值
        // stus: function(){
        //   // 不会执行
        //   console.log("监测不成功");
        // }

        // 深度监视：object || array
        stus: {
          deep: true,
          handler: function(newVal, oldVal) {
            console.log("深度监测成功", newVal);
          }
        }
      },
      computed: {
        // 包含原值不变，缓存不调函数的优化机制(复制粘贴不会触发)
        result: function() {
          return (Number(this.n1) + Number(this.n2)) * this.rate;
        },
        // stus: function() {
        //   // 不会执行
        //   console.log(stus);
        // }
      }
    };

    new Vue({
      el: "#app",
      components: {
        "app": App
      },
      template: `<app />`,
    });
  </script>
</body>
```

(6) 插槽 -- slot(Vue内置组件)

slot：分为非具名插槽和具名插槽。非具名插槽是有多少接收多少，具名是对应name的slot接收。   
说明：`slot其实就是父组件传递的DOM结构。`

见以下代码：

```
<body>
  <div id="app"></div>
  <script>
    // slot是留坑，外部填入html内容
    // 不具名slot
    var MyLi = {
      template: `<li>
        <slot></slot> 
      </li>`
    };
    // 具名slot
    var ClLi = {
      template: `<li>
        <slot name="cl"></slot> 
        <slot name="kcb"></slot> 
      </li>`
    };
    Vue.component('my-li', MyLi);
    
    // 九宫格
    var App = {
      components: {
        "cl-li": ClLi
      },
      template: `<div>
        <ul>
          <my-li>
            非具名slot全接收
            <button>111</button>
            <h3>222</h3>
            <span>333</span>
          </my-li>
          <my-li>
            <h1>222</h1>
          </my-li>
          <my-li>333</my-li>
          <cl-li>
            <div slot="cl">具名插槽--CL</div>
          </cl-li>
          <cl-li>
              <div slot="kcb">具名插槽--KCB</div>
          </cl-li>
          <cl-li>
            <div slot="cl">具名插槽--CL</div>
          </cl-li>
          <my-li>777</my-li>
          <my-li>
              <h1>888</h1>
          </my-li>
          <my-li>
              <button>999</button>
          </my-li>
        </ul>
      </div>`
    };

    new Vue({
      el: "#app",
      components: {
        "app": App
      },
      template: `<app />`
    })
  </script>
</body>
```

(7) 样式绑定 -- class/style

可使用对象、数组语法

见以下代码：

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script type="text/javascript" src="lib/vue.min.js"></script>
  <script type="text/javascript" src="lib/jquery.min.js"></script>
  <style type="text/css">
  .class_h1 {
    color: red;
  }
  .class_h2 {
    color: blue;
  }
  .class_h3 {
    color: green;
  }
  .class_h4 {
    color: pink;
  }
  .border_h1 {
    border: 3px solid purple;
  }
  .border_h3 {
    border: 3px solid red;
  }
  .border_h4 {
    border: 3px solid blue;
  }
  </style>
</head>
<body>
  <div id="app">
    <div>
      <h1 :class="{class_h1: color=='red', border_h1: color=='red'}">hello red</h1>
      <h2 :class="color=='blue' ? 'class_h2' : ''">hello blue</h2>
      <h3 :class="[{class_h3: color=='green'}, color=='green' ? 'border_h3' : '']">hello green</h3>
      <h4 :class="[{class_h4: color=='pink'}, {border_h4: color=='pink'}]">hello pink</h4>
      <div :style="{color: hColor, fontSize: fontSize + 'px'}">hello orange</div>
      <div :style="styleObject">hello orange</div>
      <div :style="[baseStyle, exStyle]">hello world</div>
      <button @click="changeColor">点击改变字体颜色</button>
    </div>
  </div>
  <script>
    new Vue({
      el: "#app",
      data: {
        colorArr: ["red", "blue", "green", "pink"],
        selIndex: 0,
        hColor: "orange",
        fontSize: 20,
        styleObject: {
          color: "orange",
          fontSize: "20px"
        },
        baseStyle: {
          fontSize: "30px",
          color: "gray"
        },
        exStyle: {
          border: "3px solid red"
        }
      },
      computed: {
        color: function() {
          return this.colorArr[this.selIndex];
        }
      },
      methods: {
        changeColor: function() {
          this.selIndex = (++this.selIndex) % 4;
        }
      }
    });
  </script>
</body>
</html>
```

(8) $refs 以及 $nextTick 使用

* $属性：$refs 获取组件内的元素
* $parent：获取当前组件对象的父组件
* $children：获取子组件
* $root：获取 new Vue的实例 vm
* $el：组件对象的DOM元素    

* $nextTick：`将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新`

见以下代码：

```
<body>
  <div id="app"></div>
  <script>

    var MySub = {
      template: `<div>我是子组件</div>`
    };
    
    Vue.component('my-sub', MySub);

    var App = {
      data: function() {
        return {
          isShow: false
        }
      },
      template: `<div>
        <input ref="input" type="text" v-if="isShow" />
        <my-sub ref="mySub"></my-sub>
        <button ref="btn">按钮</button>
      </div>`,
      beforeCreate: function() {
        console.log("beforeCreate", this.$refs.btn); //undefined
      },
      created: function() {
        console.log("created", this.$refs.btn); //undefined
      },
      beforeMount: function() {
        console.log("beforeMount", this.$refs.btn); //undefined
      },
      mounted: function() { 
        this.isShow = true; 
        this.isShow = false;
        this.isShow = true; 
        
        // this.$refs.input.focus(); //报错 此时获取不到input 
        // 以上重复操作都不会立即触发

        //机制：最终代码执行完毕以后，vue才会根据实际的值，进行DOM的操作
        //解决方法：$nextTick => 在vue真正渲染DOM到页面以后的操作

        this.$nextTick(function() {
          this.$refs.input.focus(); //此时获取焦点成功
        });
    
        console.log("mounted", this.$refs.btn); // <button>按钮</button>
        console.log("mounted", this.$refs.mySub); //组件对象
        console.log("mounted", this.$refs.mySub.$el); //<div>我是子组件</div>
      }

    };

    new Vue({
      el: "#app",
      components: {
        app: App
      },
      template: `<app />`
    });
  </script>
</body>
```


### 2.Vue生命周期 -- 钩子函数

(1)beforeCreate：组件创建之前；created：组件创建之后。

(2)beforeMount：vue起作用，装载数据到DOM之前，可获取vue启动前的DOM；mounted：vue起作用，装载数据到DOM之后，可获取vue启动后的DOM。只执行一次

(3)activated：激活；deactivated：停用。被keep-alive内置组件包裹，v-if=true/false 不创建也不销毁，不会触发(1)(5)，此时触发(3)

(4)beforeUpdate：改变前，获取原DOM；updated：改变后，获取新DOM。更新数据才会触发

(5)beforeDestroy：销毁之前；destroyed：销毁之后。对应父组件 v-if=true/false 就分别对应创建销毁当前组件，即触发(1)(5)

见以下代码：

```
<body>
  <div id="app"></div>
  <script>

    var Test = {
      template:  `<div>
        我是test组件 {{text}}
        <button @click="text='hello vue'">按钮</button>
      </div>`,
      data: function() {
        return {
          text: 'hello world'
        }
      },
      beforeCreate: function() {
        //组件创建之前
        console.log("beforeCreate", this.text); //undefined
      },
      created: function() {
        //组件创建之后 -- 可以操作数据，发ajax请求
        console.log("created", this.text); //hello world
      },
      beforeMount: function() {
        //vue起作用 装载数据到DOM之前
        console.log("beforeMount", document.body.innerHTML); //区别 数据未填充 <div id="app"></div>
      },
      mounted: function() {
        //vue起作用 装载数据到DOM之后
        console.log("mounted", document.body.innerHTML); //区别 数据已填充 <div><div>我是test组件</div></div>
      },
      // 基于数据改变才会触发
      beforeUpdate: function() {
        //改变前
        console.log("beforeUpdate", document.body.innerHTML); //区别 打印 hello world
        console.log("beforeUpdate", this.text); //打印还是 hello vue
      },
      updated: function() {
        //改变后
        console.log("updated", document.body.innerHTML); //区别 打印 hello vue
        console.log("updated", this.text); //打印还是 hello vue
      },
      activated: function() {
        console.log("组件被激活");
      },
      deactivated: function() {
        console.log("组件被停用");
      },
      // 对应父组件 v-if false 就销毁当前组件
      beforeDestroy: function() { //销毁之前 可做一些功能，比如：保存到localStorage
        console.log("beforeDestroy");
        console.log("beforeDestroy", this.text); //都打印 hello world
      },
      destroyed: function() { //销毁之后
        console.log("destroyed");
        console.log("destroyed", this.text); //都打印 hello world
      }
    };

    var App = {
      components: {
        'test': Test
      },
      data: function() {
        return {
          isExist: true
        }
      },
      // keep-alive Vue内置组件，此时子组件会存活，不会触发销毁创建，
      // 会触发 activated deactivated 激活 停用
      template: `<div>
        <keep-alive>
          <test v-if="isExist"></test>
        </kepp-alive>
        <button @click="isExist = !isExist">控制子组件创建销毁</button>
      </div>`
    };

    new Vue({
      el: "#app",
      components: {
        'app': App
      },
      template: `<app />`,
    });
  </script>
</body>
```


### 3.Vue 路由 -- router

(1) spa (single page web application) 单页面应用

说明：`url的部分锚点数据(#xxx)改变，页面不会跳转`

见以下代码：

```
<body>
    <a href="#/login">点我登录</a>
    <a href="#/register">点我注册</a>
    <div id="app"></div>
  <script>

    // 监听 hashchange 事件 <= 锚点改变

    var app = document.getElementById('app');
    window.addEventListener('hashchange', function() {
      switch(location.hash) {
        case '#/login':
          app.innerHTML = '<h1>登录界面</h1>';
          break;
        case '#/register':
          app.innerHTML = '<h1>注册界面</h1>';
          break;
      }
    });
  </script>
</body>
```

(2) router -- router-link 使用

`<router-link> 默认会被渲染成一个 <a> 标签`

使用步骤：
1. 引入vue-router 核心插件
2. 安装插件
3. 创建一个路由对象
4. 配置路由对象
5. 将配置好的路由对象关联到vue实例中
6. 指定路由改变局部的位置     

说明：`Vue.use(插件对象)，过程中会注册一些全局组件(router-view/router-link)以及给vm或者组件对象挂载属性。`    
挂载方式：
```
Object.defineProperty(Vue.prototype, '$router', {
  get: function() {
    return 自己的router对象;
  }
})
```

router-link传参：`通过query、params传参，params需要对应路由对象path进行接收，query不需要。`    
*以下生成href后缀分别为：#/login?id=123、#/register/abc*

见以下代码：

```
<body>
  <div id="app"></div>

  <!-- 1.引入vue-router(核心插件)对象 -->
  <script type="text/javascript" src="lib/vue-router.min.js"></script>
  <script type="text/javascript"> 

    // 2.安装插件
    Vue.use(VueRouter);
    
    var Login = {
      template: `<div>登录界面</div>`,
      created: function() {
        console.log(this.$route.query); //{id: "123"}
      }
    };

    var Register = {
      template: `<div>注册界面</div>`,
      created: function() {
        console.log(this.$route.params); //{name: "abc"}
      }
    };

    // 3.创建一个路由对象
    var router = new VueRouter({
      // 4.配置路由对象
      routes: [
        // { path: "/login", component: Login },
        // { path: "/register", component: Register }

        // 路由对象有了名称就等于有了变量名，router-link 只需说明这个变量名即可
        { name: "login", path: "/register", component: Login },
        { name: "register", path: "/register/:name", component: Register }
      ]
    });
    
    // 6.指定路由改变局部的位置
    var App = {
      // router-link内置组件 以下这种写法，如果要改变指向，则须重复修改to里的指向
      // template: `
      //   <div>
      //     <router-link to="/login">登录</router-link>
      //     <router-link to="/login">登录</router-link>
      //     <router-link to="/login">登录</router-link>
      //     <router-link to="/login">登录</router-link>
      //     <router-link to="/register">注册</router-link>
      //     <router-view></router-view>
      //   </div>
      // `

      // 可将路由配置加上name属性，将to绑定到name属性上，
      // 则可通过name找路由对象，获取其path，生成自己的href
      template: `
        <div>
          <router-link :to="{name: 'login', query: {id: '123'}}">登录</router-link>
          <router-link :to="{name: 'register', params: {name: 'abc'}}">注册</router-link>
          <router-view></router-view>
        </div>
      `
    };

    // 5.将配置好的路由对象关联到vue实例中
    new Vue({
      el: "#app",
      router: router,
      components: {
        app: App
      },
      template: `<app />`
    });
  </script>
</body>
```

(3) 嵌套路由

使用说明：`1.router-view 包含 router-view; 2.路由 children 路由`   

见以下代码：   

```
<body>
  <div id="app"></div>
  <script>

    Vue.use(VueRouter);
    
    var Login = {
      template: `
        <div>
          <router-view></router-view>
        </div>`
    };
    
    var Woman = {
      template: `<div>woman入口</div>`
    };

    var Man = {
      template: `<div>man入口</div>`
    };

    var router = new VueRouter({
      routes: [
        { path: 'login', component: Login,
          children: [
            { name: 'woman', path: 'woman', component: Woman },
            { name: 'man', path: 'man', component: Man }
          ]
        }
      ]
    });

    var App = {
      template: `
        <div>
          <router-link :to="{name: 'woman'}">女士</router-link>
          <router-link :to="{name: 'man'}">男士</router-link>
          <router-view></router-view>
        </div>
      `
    };

    new Vue({
      el: "#app",
      router: router,
      components: {
        app: App
      },
      template: `<app />`
    });
  </script>
</body>
```

(4) 路由元信息、路由钩子    

meta：`是对于路由规则是否需要验证权限的配置`。路由对象中和 name 同级( meta: { isChecked: true } )    
     
路由钩子：`权限控制的函数执行时期。`     

说明：   
1. 每次路由匹配后，渲染组件到router-view之前   
2. router.beforeEach(function(to, from, next){ });     

见以下代码：

```
<body>
  <div id="app"></div>

  <script type="text/javascript"> 

    Vue.use(VueRouter);
    
    var isLogin = false;

    var Login = {
      template: `<div>登录界面</div>`,
      created: function() {
        isLogin = true;
      }
    };
    var Music = {
      template: `<div>音乐界面</div>`,
    };
    
    // 可以多次追加路由规则，动态获取路由规则
    var router = new VueRouter();
    
    // 使用更为灵活，可以方便调用后追加路由规则
    router.addRoutes(
      [
        // 默认首页路由 => 重定向 
        { path: '/', redirect: { name: 'login' } }, 
        { name: "login", path: "/login", component: Login },
        { name: "music", path: "/music", component: Music, meta: { isChecked: true } }
      ]
    );
    
    router.beforeEach(function(to, from, next){
      if(!to.meta.isChecked) {
        next(); //不调用next 就会卡住
      } else {
        if(isLogin) {
          next();
        } else {
          alert("请先登录...");

          //重定向 /login
          next({ name: 'login' });
        }
      }
    });

    var App = {
      template: `
        <div>
          <router-link :to="{name: 'login'}">登录</router-link>
          <router-link :to="{name: 'music'}">听音乐</router-link>
          <router-view></router-view>
        </div>
      `
    };

    new Vue({
      el: "#app",
      router: router,
      components: {
        app: App
      },
      template: `<app />`
    });
  </script>
</body>
```

(5) 编程导航

声明式：`<router-link :to="...">、<router-link :to="..." replace>`

编程式：`router.push(...)、router.replace(...)、router.go(n)`

1. 跳到指定的锚点并显示页面：`this.$router.push({ name: 'xxx', query: {id: 1}, params: {name: 'abc'} });`   

2. 配置规则：`{ name: 'xxx', path: '/xxx/:name' }`   

3. router.replace 替换掉当前history记录

4. 根据历史记录前进或后退一步：`this.$router.go(-1 | 1)`   

见以下代码：

```
/* 点击传参跳转路由 */
/* router/index.js: */

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})

/* HelloWorld.vue 点击路由跳转 */
/* params只能用name来引入路由 query使用name和path都可以*/

export default {
	methods: {
    jumpPage() {
      this.$router.push({
      	// path: '/test',  // 无用
        name: 'test',
        params: {
          msg: 'hello world'
        },
        query: {
          id: 1
        }
      });
    }
  }
}


/* test.vue 接收参数 */

export default {
  name: 'test',
  data() {
    return {
      
    }
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    msg() {
      return this.$route.params.msg;
    }
  }
}
```


### 4.vue -- 部分API使用说明

(1)选项/DOM -- render

类型：(createElement: () => VNode) => VNode

详细：字符串模板的代替方案，在js里创建dom。该渲染函数接收一个createElement 方法作为第一个参数用来创建 VNode(Virtual Node).

代码：

```
<div id="app">
	<child :level=2>Hello World</child>
</div>

<script type="text/javascript">
	Vue.component('child', {
		render: function(createElement) {
			return createElement(
				'h' + this.level, //tag name标签名称
				this.$slots.default //子组件中的阵列
			)
		}, // <=>  render(h) { return h(App); } or render: h => h(App)
		props: {
			level: {
				type: Number,
				required: true
			}
		}
	});
	
	new Vue({
		el: "#app"
	});
</script>
```

说明：

createElement(标签名，标签属性，标签里内容): `createElement方法的作用就是动态的创建一个dom用于被render函数渲染。`

参数说明：

```
是通过render函数的参数传递进来的，这个方法有三个参数: 
第一个参数主要用于提供dom的html内容，类型可以是字符串、对象或函数。比如"div"就是创建一个 <div>标签 
第二个参数（类型是对象）主要用于设置这个dom的一些样式、属性、传的组件的参数、绑定事件之类，具体可以参考 官方文档 里这一小节的说明 
第三个参数（类型是数组，数组元素类型是VNode）主要用于说是该结点下有其他结点的话，就放在这里
```

(2)混入 -- mixins

说明：混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

选项合并:

 ```
 1.组件与混入对象含有同名选项，以组件内部覆盖混入对象选项;
 2.同名钩子函数(如created等)将混合为一个数组。混入对象的钩子将在组件自身钩子之前调用;
 3.值为对象的选项(如methods,components等)，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对
 ```












