## 1.weex使用限制

### (1)样式

1.border不能使用复合属性，只能分开设置：

```
.border {
	border-width: 1px;
	border-style: solid;
  border-color: #40A1EE;	
}
```

2.Flexbox 是默认且唯一的样式模型，所以你不需要手动为元素添加 display: flex; 属性。直接设置flex-directtion: row/column; 即可

3.使用相对定位，不能设置负值偏移量，否则不显示

4.显示文字，必须用<text></text>标签包含，而且文字大小，字体颜色，居中等样式均需在text上设置，设置上层div无效

5.必须设置weex组件高度，否则ios将不显示

6.weex默认盒模型，即box-sizing: border-box，盒子宽高包含内容、内边距、边框，不包含外边距

7.宽高不能设置百分比，只能设置固定px。默认以iphone6 分辨率750*1334作为标准宽高，不同设备屏幕都会按照比例转化为这一尺寸进行计算。

8.weex设置px都是web设置px的两倍

9.weex只支持单个class name选择器，不支持多个

错误示例：

```
.box .div1 {}
```

10.设置背景颜色不能写background:#fff，必须是background-color: #fff

11.内部动态设置class不能使用object，只能用数组

```
:class="[index==0 ? 'specialStyle' : '']" 
不能
:class="{specialStyle: index==0}"
```

### (2)其他

1.也可直接用bus进行父子、兄弟等组件通信;
	还可直接使用this.$emit("btnClick", param)，用父组件@btnClick=submitClick，在submitClick函数里接收参数

bus.js:

```
import Vue from 'vue'
export default new Vue();
```

引用：

```
import bus from '@/components/bus.js';
bus.$emit("funcname", param);
```

2.weex组件使用注意事项

a.list、scroller可直接作为列表使用，超出设定高度，会自行滑动。内部含下拉子组件<refresh></refresh>，
	上拉子组件<loading></loading>作为上拉下拉效果。其中list除了cell作为直接子组件，还有这两个也可以作为子组件，
	其他div不能作为直接子组件，必须在cell里设置.
	说明：`无论refresh、loading初始display显示或隐藏，上拉下拉初始都会显示效果。并且显示隐藏有默认最小时间间隔，不能直接show后hide`
	
b.图片必须使用image组件，并且它不能包含任何子组件。必须明确指定 width 和 height，否则图片无法显示


