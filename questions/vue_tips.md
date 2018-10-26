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

(8) ref ʹ��

* $���ԣ�$refs ��ȡ����ڵ�Ԫ��
* $parent����ȡ��ǰ�������ĸ����
* $children����ȡ�����
* $root����ȡ new Vue��ʵ�� vm
* $el����������DOMԪ��

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
      template: `<div>
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
      mounted: function() { //��ʱ�����õ�
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







