## vueʹ��

### 1.vue ����APIʹ��˵��

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
		}, // <=>  render(h) { return h(App); }
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
 



