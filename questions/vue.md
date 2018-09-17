## vue使用

### 1.vue 部分API使用说明

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
 



