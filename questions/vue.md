## vue ֪ʶ��

### 1.����ʹ�õ�

(1) ����meta���� ���� �����ֻ�ҳ��

```
<!-- ��iPhone �ֻ��Ͻ�ֹ����ת��Ϊ�������� -->
<meta name="format-detection" content="telephone=no">

<!-- ɾ��Ĭ�ϵ�ƻ���������Ͳ˵��� -->
<meta name="apple-mobile-web-app-capable" content="yes">

<!-- ��web appӦ����״̬������Ļ������������ɫ-->
<meta name="apple-mobile-web-app-status-bar-style" content="white">

<!-- ��iPhone���������ҳ�潫��ԭʼ��С��ʾ������������ -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

<!-- �����װ��GCF��Google Chrome Frame �ȸ���Ƕ�������ܵļ�ƣ�����ʹ��GCF����Ⱦҳ�棬   
      ���û��װGCF����ʹ����߰汾��IE�ں˽�����Ⱦ���������������û���IE������ⲻ�䣬   
      ���û��������ҳʱ��ʵ����ʹ�õ���Google Chrome������ںˣ�����֧��IE6��7��8�ȶ���汾��IE����� -->
<meta http-equiv=��X-UA-Compatible�� content=��IE=edge,chrome=1��/>
```

(2) v-bind

˵��������input������ʾΪmyValue��Hello vue��`��v-bind�󶨱�����Ҫֱ����ʾ�ַ������Ǳ��������˫�����š�`

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

(3) ���ʹ�� -- ȫ��/�ֲ�ע�� -- ������

���ʹ�ã�`�����ӣ�����������������ӣ�components����ʹ���ӣ�ģ����ʹ�ã�`   
�����ӣ�`��������ֵ���ӽ��ա���ʹ��`

�����´��룺

```
<body>
  <div id="app"></div>
  <script>

    //ȫ��ע�� ��������  ����components
    Vue.component('my-btn', {
      template: `<div>Button</div>`
    });
    
    // �ֲ�ע��
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

(4) ��������ʹ�� -- ȫ��/�ֲ�ע��

ע���: `���־ֲ�ע���filters(�ɰ������)��ȫ��ע���filter(һ��)`

�����´��룺

```
<body>
  <div id="app"></div>
  <script>
    
    // ȫ��ע��
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
      // �ֲ�ע��
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

(5) ���� -- watch/computed

watch: ����������   
computed: ���������   
˵����`�����ܼ����������ͣ���object��array����Ϊ�������Ƕ����ַ����ַ��û�иı䣬�ı���Ǹõ�ַ���Ե�ֵ��`

�����´��룺

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
        // ��⸴�����ͣ���ⲻ�ɹ�����Ϊ���ӵ��Ƕ����ַ����ַ��û�иı䣬�ı���Ǹõ�ַ���Ե�ֵ
        // stus: function(){
        //   // ����ִ��
        //   console.log("��ⲻ�ɹ�");
        // }

        // ��ȼ��ӣ�object || array
        stus: {
          deep: true,
          handler: function(newVal, oldVal) {
            console.log("��ȼ��ɹ�", newVal);
          }
        }
      },
      computed: {
        // ����ԭֵ���䣬���治���������Ż�����(����ճ�����ᴥ��)
        result: function() {
          return (Number(this.n1) + Number(this.n2)) * this.rate;
        },
        // stus: function() {
        //   // ����ִ��
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

(6) ��� -- slot(Vue�������)

slot����Ϊ�Ǿ�����ۺ;�����ۡ��Ǿ���������ж��ٽ��ն��٣������Ƕ�Ӧname��slot���ա�   
˵����`slot��ʵ���Ǹ�������ݵ�DOM�ṹ��`

�����´��룺

```
<body>
  <div id="app"></div>
  <script>
    // slot�����ӣ��ⲿ����html����
    // ������slot
    var MyLi = {
      template: `<li>
        <slot></slot> 
      </li>`
    };
    // ����slot
    var ClLi = {
      template: `<li>
        <slot name="cl"></slot> 
        <slot name="kcb"></slot> 
      </li>`
    };
    Vue.component('my-li', MyLi);
    
    // �Ź���
    var App = {
      components: {
        "cl-li": ClLi
      },
      template: `<div>
        <ul>
          <my-li>
            �Ǿ���slotȫ����
            <button>111</button>
            <h3>222</h3>
            <span>333</span>
          </my-li>
          <my-li>
            <h1>222</h1>
          </my-li>
          <my-li>333</my-li>
          <cl-li>
            <div slot="cl">�������--CL</div>
          </cl-li>
          <cl-li>
              <div slot="kcb">�������--KCB</div>
          </cl-li>
          <cl-li>
            <div slot="cl">�������--CL</div>
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

(7) ��ʽ�� -- class/style

��ʹ�ö��������﷨

�����´��룺

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
      <button @click="changeColor">����ı�������ɫ</button>
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

(8) $refs �Լ� $nextTick ʹ��

* $���ԣ�$refs ��ȡ����ڵ�Ԫ��
* $parent����ȡ��ǰ�������ĸ����
* $children����ȡ�����
* $root����ȡ new Vue��ʵ�� vm
* $el����������DOMԪ��    

* $nextTick��`���ص��ӳٵ��´� DOM ����ѭ��֮��ִ�С����޸�����֮������ʹ������Ȼ��ȴ� DOM ����`

�����´��룺

```
<body>
  <div id="app"></div>
  <script>

    var MySub = {
      template: `<div>���������</div>`
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
        <button ref="btn">��ť</button>
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
        
        // this.$refs.input.focus(); //���� ��ʱ��ȡ����input 
        // �����ظ�������������������

        //���ƣ����մ���ִ������Ժ�vue�Ż����ʵ�ʵ�ֵ������DOM�Ĳ���
        //���������$nextTick => ��vue������ȾDOM��ҳ���Ժ�Ĳ���

        this.$nextTick(function() {
          this.$refs.input.focus(); //��ʱ��ȡ����ɹ�
        });
    
        console.log("mounted", this.$refs.btn); // <button>��ť</button>
        console.log("mounted", this.$refs.mySub); //�������
        console.log("mounted", this.$refs.mySub.$el); //<div>���������</div>
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


### 2.Vue�������� -- ���Ӻ���

(1)beforeCreate���������֮ǰ��created���������֮��

(2)beforeMount��vue�����ã�װ�����ݵ�DOM֮ǰ���ɻ�ȡvue����ǰ��DOM��mounted��vue�����ã�װ�����ݵ�DOM֮�󣬿ɻ�ȡvue�������DOM��ִֻ��һ��

(3)activated�����deactivated��ͣ�á���keep-alive�������������v-if=true/false ������Ҳ�����٣����ᴥ��(1)(5)����ʱ����(3)

(4)beforeUpdate���ı�ǰ����ȡԭDOM��updated���ı�󣬻�ȡ��DOM���������ݲŻᴥ��

(5)beforeDestroy������֮ǰ��destroyed������֮�󡣶�Ӧ����� v-if=true/false �ͷֱ��Ӧ�������ٵ�ǰ�����������(1)(5)

�����´��룺

```
<body>
  <div id="app"></div>
  <script>

    var Test = {
      template:  `<div>
        ����test��� {{text}}
        <button @click="text='hello vue'">��ť</button>
      </div>`,
      data: function() {
        return {
          text: 'hello world'
        }
      },
      beforeCreate: function() {
        //�������֮ǰ
        console.log("beforeCreate", this.text); //undefined
      },
      created: function() {
        //�������֮�� -- ���Բ������ݣ���ajax����
        console.log("created", this.text); //hello world
      },
      beforeMount: function() {
        //vue������ װ�����ݵ�DOM֮ǰ
        console.log("beforeMount", document.body.innerHTML); //���� ����δ��� <div id="app"></div>
      },
      mounted: function() {
        //vue������ װ�����ݵ�DOM֮��
        console.log("mounted", document.body.innerHTML); //���� ��������� <div><div>����test���</div></div>
      },
      // �������ݸı�Żᴥ��
      beforeUpdate: function() {
        //�ı�ǰ
        console.log("beforeUpdate", document.body.innerHTML); //���� ��ӡ hello world
        console.log("beforeUpdate", this.text); //��ӡ���� hello vue
      },
      updated: function() {
        //�ı��
        console.log("updated", document.body.innerHTML); //���� ��ӡ hello vue
        console.log("updated", this.text); //��ӡ���� hello vue
      },
      activated: function() {
        console.log("���������");
      },
      deactivated: function() {
        console.log("�����ͣ��");
      },
      // ��Ӧ����� v-if false �����ٵ�ǰ���
      beforeDestroy: function() { //����֮ǰ ����һЩ���ܣ����磺���浽localStorage
        console.log("beforeDestroy");
        console.log("beforeDestroy", this.text); //����ӡ hello world
      },
      destroyed: function() { //����֮��
        console.log("destroyed");
        console.log("destroyed", this.text); //����ӡ hello world
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
      // keep-alive Vue�����������ʱ�����������ᴥ�����ٴ�����
      // �ᴥ�� activated deactivated ���� ͣ��
      template: `<div>
        <keep-alive>
          <test v-if="isExist"></test>
        </kepp-alive>
        <button @click="isExist = !isExist">�����������������</button>
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


### 3.Vue ·�� -- router

(1) spa (single page web application) ��ҳ��Ӧ��

˵����`url�Ĳ���ê������(#xxx)�ı䣬ҳ�治����ת`

�����´��룺

```
<body>
    <a href="#/login">���ҵ�¼</a>
    <a href="#/register">����ע��</a>
    <div id="app"></div>
  <script>

    // ���� hashchange �¼� <= ê��ı�

    var app = document.getElementById('app');
    window.addEventListener('hashchange', function() {
      switch(location.hash) {
        case '#/login':
          app.innerHTML = '<h1>��¼����</h1>';
          break;
        case '#/register':
          app.innerHTML = '<h1>ע�����</h1>';
          break;
      }
    });
  </script>
</body>
```

(2) router -- router-link ʹ��

`<router-link> Ĭ�ϻᱻ��Ⱦ��һ�� <a> ��ǩ`

ʹ�ò��裺
1. ����vue-router ���Ĳ��
2. ��װ���
3. ����һ��·�ɶ���
4. ����·�ɶ���
5. �����úõ�·�ɶ��������vueʵ����
6. ָ��·�ɸı�ֲ���λ��     

˵����`Vue.use(�������)�������л�ע��һЩȫ�����(router-view/router-link)�Լ���vm�����������������ԡ�`    
���ط�ʽ��
```
Object.defineProperty(Vue.prototype, '$router', {
  get: function() {
    return �Լ���router����;
  }
})
```

router-link���Σ�`ͨ��query��params���Σ�params��Ҫ��Ӧ·�ɶ���path���н��գ�query����Ҫ��`    
*��������href��׺�ֱ�Ϊ��#/login?id=123��#/register/abc*

�����´��룺

```
<body>
  <div id="app"></div>

  <!-- 1.����vue-router(���Ĳ��)���� -->
  <script type="text/javascript" src="lib/vue-router.min.js"></script>
  <script type="text/javascript"> 

    // 2.��װ���
    Vue.use(VueRouter);
    
    var Login = {
      template: `<div>��¼����</div>`,
      created: function() {
        console.log(this.$route.query); //{id: "123"}
      }
    };

    var Register = {
      template: `<div>ע�����</div>`,
      created: function() {
        console.log(this.$route.params); //{name: "abc"}
      }
    };

    // 3.����һ��·�ɶ���
    var router = new VueRouter({
      // 4.����·�ɶ���
      routes: [
        // { path: "/login", component: Login },
        // { path: "/register", component: Register }

        // ·�ɶ����������ƾ͵������˱�������router-link ֻ��˵���������������
        { name: "login", path: "/register", component: Login },
        { name: "register", path: "/register/:name", component: Register }
      ]
    });
    
    // 6.ָ��·�ɸı�ֲ���λ��
    var App = {
      // router-link������� ��������д�������Ҫ�ı�ָ�������ظ��޸�to���ָ��
      // template: `
      //   <div>
      //     <router-link to="/login">��¼</router-link>
      //     <router-link to="/login">��¼</router-link>
      //     <router-link to="/login">��¼</router-link>
      //     <router-link to="/login">��¼</router-link>
      //     <router-link to="/register">ע��</router-link>
      //     <router-view></router-view>
      //   </div>
      // `

      // �ɽ�·�����ü���name���ԣ���to�󶨵�name�����ϣ�
      // ���ͨ��name��·�ɶ��󣬻�ȡ��path�������Լ���href
      template: `
        <div>
          <router-link :to="{name: 'login', query: {id: '123'}}">��¼</router-link>
          <router-link :to="{name: 'register', params: {name: 'abc'}}">ע��</router-link>
          <router-view></router-view>
        </div>
      `
    };

    // 5.�����úõ�·�ɶ��������vueʵ����
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

(3) Ƕ��·��

ʹ��˵����`1.router-view ���� router-view; 2.·�� children ·��`   

�����´��룺   

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
      template: `<div>woman���</div>`
    };

    var Man = {
      template: `<div>man���</div>`
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
          <router-link :to="{name: 'woman'}">Ůʿ</router-link>
          <router-link :to="{name: 'man'}">��ʿ</router-link>
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

(4) ·��Ԫ��Ϣ��·�ɹ���    

meta��`�Ƕ���·�ɹ����Ƿ���Ҫ��֤Ȩ�޵�����`��·�ɶ����к� name ͬ��( meta: { isChecked: true } )    
     
·�ɹ��ӣ�`Ȩ�޿��Ƶĺ���ִ��ʱ�ڡ�`     

˵����   
1. ÿ��·��ƥ�����Ⱦ�����router-view֮ǰ   
2. router.beforeEach(function(to, from, next){ });     

�����´��룺

```
<body>
  <div id="app"></div>

  <script type="text/javascript"> 

    Vue.use(VueRouter);
    
    var isLogin = false;

    var Login = {
      template: `<div>��¼����</div>`,
      created: function() {
        isLogin = true;
      }
    };
    var Music = {
      template: `<div>���ֽ���</div>`,
    };
    
    // ���Զ��׷��·�ɹ��򣬶�̬��ȡ·�ɹ���
    var router = new VueRouter();
    
    // ʹ�ø�Ϊ�����Է�����ú�׷��·�ɹ���
    router.addRoutes(
      [
        // Ĭ����ҳ·�� => �ض��� 
        { path: '/', redirect: { name: 'login' } }, 
        { name: "login", path: "/login", component: Login },
        { name: "music", path: "/music", component: Music, meta: { isChecked: true } }
      ]
    );
    
    router.beforeEach(function(to, from, next){
      if(!to.meta.isChecked) {
        next(); //������next �ͻῨס
      } else {
        if(isLogin) {
          next();
        } else {
          alert("���ȵ�¼...");

          //�ض��� /login
          next({ name: 'login' });
        }
      }
    });

    var App = {
      template: `
        <div>
          <router-link :to="{name: 'login'}">��¼</router-link>
          <router-link :to="{name: 'music'}">������</router-link>
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

(5) ��̵���

����ʽ��`<router-link :to="...">��<router-link :to="..." replace>`

���ʽ��`router.push(...)��router.replace(...)��router.go(n)`

1. ����ָ����ê�㲢��ʾҳ�棺`this.$router.push({ name: 'xxx', query: {id: 1}, params: {name: 'abc'} });`   

2. ���ù���`{ name: 'xxx', path: '/xxx/:name' }`   

3. router.replace �滻����ǰhistory��¼

4. ������ʷ��¼ǰ�������һ����`this.$router.go(-1 | 1)`   

�����´��룺

```
/* ���������ת·�� */
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

/* HelloWorld.vue ���·����ת */
/* paramsֻ����name������·�� queryʹ��name��path������*/

export default {
	methods: {
    jumpPage() {
      this.$router.push({
      	// path: '/test',  // ����
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


/* test.vue ���ղ��� */

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


### 4.vue -- ����APIʹ��˵��

(1)ѡ��/DOM -- render

���ͣ�(createElement: () => VNode) => VNode

��ϸ���ַ���ģ��Ĵ��淽������js�ﴴ��dom������Ⱦ��������һ��createElement ������Ϊ��һ�������������� VNode(Virtual Node).

���룺

```
<div id="app">
	<child :level=2>Hello World</child>
</div>

<script type="text/javascript">
	Vue.component('child', {
		render: function(createElement) {
			return createElement(
				'h' + this.level, //tag name��ǩ����
				this.$slots.default //������е�����
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

˵����

createElement(��ǩ������ǩ���ԣ���ǩ������): `createElement���������þ��Ƕ�̬�Ĵ���һ��dom���ڱ�render������Ⱦ��`

����˵����

```
��ͨ��render�����Ĳ������ݽ����ģ������������������: 
��һ��������Ҫ�����ṩdom��html���ݣ����Ϳ������ַ������������������"div"���Ǵ���һ�� <div>��ǩ 
�ڶ��������������Ƕ�����Ҫ�����������dom��һЩ��ʽ�����ԡ���������Ĳ��������¼�֮�࣬������Բο� �ٷ��ĵ� ����һС�ڵ�˵�� 
���������������������飬����Ԫ��������VNode����Ҫ����˵�Ǹý�������������Ļ����ͷ�������
```

(2)���� -- mixins

˵�������������԰����������ѡ������ʹ�û������ʱ�����л�������ѡ����������������ѡ�

ѡ��ϲ�:

 ```
 1.�������������ͬ��ѡ�������ڲ����ǻ������ѡ��;
 2.ͬ�����Ӻ���(��created��)�����Ϊһ�����顣�������Ĺ��ӽ������������֮ǰ����;
 3.ֵΪ�����ѡ��(��methods,components��)���������Ϊͬһ�������������������ͻʱ��ȡ�������ļ�ֵ��
 ```












