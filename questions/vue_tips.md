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

˵��������input������ʾΪmyValue Hello vue��`��v-bind�󶨱�����Ҫֱ����ʾ�ַ������Ǳ��������˫�����š�`

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



