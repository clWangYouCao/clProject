## 1.ios 下input框默认属性

### css去掉ios默认input圆角和阴影

```
input {
	-webkit-appearance: none;  //解决阴影
	border-radius: 0; 
}
```

## 2.ios 设置 -webkit-overflow-scrolling:touch引发问题

### 控制元素在移动设备上是否使用滚动回弹效果 

引发问题：

```
1.当头部和底部固定时，设置中间dataList滑动，当中间内容超过高度时，页面上拉时会拉起底部tool，
	然后停止才会回弹;
2.当在此界面使用position: fixed;进行全局弹框时，会出现部分遮盖，上层部分没有遮盖
```

## 3.如何实现头部、底部固定，中间部分滑动

### (1)简单层方式：header、footer通过fixed固定，main部分加上上下的padding，然后不需要加任何滚动条属性，
		当中间超过显示高度，会自动产生滚动条

测试代码：

```
<!DOCTYPE html>
<html>
<head>
  <title>测试</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <style type="text/css">
    * {
      padding: 0;
      margin: 0;
    }
    .header, .footer {
      position: fixed;
      width: 100%;
      height: 50px;
      line-height: 50px;
      border: 1px solid #000;
      left: 0;
      background-color: #333;
      color: #fff;
      text-align: center;
    }
    .header {
      top: 0;
    }
    .footer {
      bottom: 0;
    }
    .main {
      height: 1000px;
      padding-top: 50px;
      padding-bottom: 50px;
    }
  </style>
</head>
<body>
<div id="box">
  <div class="header">header</div>
  <div class="main">main</div>
  <div class="footer">footer</div>
</div>
</body>
</html>
```

### (2)嵌套多层：使用flex实现，首先通过js获取屏幕整体高度，整体纵向flex，然后固定部分统一不缩放
			.noshrink { flex-shrink: 0; }, 需要进行滚动部分设置缩放，.hasshrink { flex: 1 1 auto; overflow: auto;}

获取高度时，ios页面刷新会导致高度变化问题：

```
let lht = localStorage.jjHeight || 0;
let wht = $(window).height();
if(lht <= wht) {
  localStorage.jjHeight = wht;
  lht = wht;
}

$('.outbox').css("height", lht);
```

## 4.ios 下网页默认有点击效果

### 全局去掉网页默认点击阴暗效果

```
*{
	-webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color:transparent;
}
```

## 5.border四周加同等效果阴影

### CSS3 box-shadow: h-shadow  水平阴影(水平偏移) 必需
										 v-shadow  垂直阴影(垂直偏移) 必需      
										 blur      模糊距离(四周辐射阴影深度)
										 spread 	 阴影尺寸
										 color     阴影颜色
										 inset;    默认外部阴影(inset内部阴影)
										 
四周同等效果阴影，要去掉水平垂直阴影偏移，只需设置辐射深度即可
			 
```
div {
	box-shadow: 0 0 3px #eee;
}
```