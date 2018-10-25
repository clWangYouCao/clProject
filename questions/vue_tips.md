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