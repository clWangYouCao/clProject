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

说明：上述input依次显示为myValue Hello vue。`在v-bind绑定变量，要直接显示字符串而非变量，需加双重引号。`

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



