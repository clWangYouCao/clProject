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

(2)v-bind

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