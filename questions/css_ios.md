## 1.ios ��input��Ĭ������

### cssȥ��iosĬ��inputԲ�Ǻ���Ӱ

```
input {
	-webkit-appearance: none;  //�����Ӱ
	border-radius: 0; 
}
```

## 2.ios ���� -webkit-overflow-scrolling:touch��������

### ����Ԫ�����ƶ��豸���Ƿ�ʹ�ù����ص�Ч�� 

�������⣺

```
1.��ͷ���͵ײ��̶�ʱ�������м�dataList���������м����ݳ����߶�ʱ��ҳ������ʱ������ײ�tool��
	Ȼ��ֹͣ�Ż�ص�;
2.���ڴ˽���ʹ��position: fixed;����ȫ�ֵ���ʱ������ֲ����ڸǣ��ϲ㲿��û���ڸ�
```

## 3.���ʵ��ͷ�����ײ��̶����м䲿�ֻ���

### (1)�򵥲㷽ʽ��header��footerͨ��fixed�̶���main���ּ������µ�padding��Ȼ����Ҫ���κι��������ԣ�
		���м䳬����ʾ�߶ȣ����Զ�����������

���Դ��룺

```
<!DOCTYPE html>
<html>
<head>
  <title>����</title>
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

### (2)Ƕ�׶�㣺ʹ��flexʵ�֣�����ͨ��js��ȡ��Ļ����߶ȣ���������flex��Ȼ��̶�����ͳһ������
			.noshrink { flex-shrink: 0; }, ��Ҫ���й��������������ţ�.hasshrink { flex: 1 1 auto; overflow: auto;}

��ȡ�߶�ʱ��iosҳ��ˢ�»ᵼ�¸߶ȱ仯���⣺

```
let lht = localStorage.jjHeight || 0;
let wht = $(window).height();
if(lht <= wht) {
  localStorage.jjHeight = wht;
  lht = wht;
}

$('.outbox').css("height", lht);
```

## 4.ios ����ҳĬ���е��Ч��

### ȫ��ȥ����ҳĬ�ϵ������Ч��

```
*{
	-webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color:transparent;
}
```

## 5.border���ܼ�ͬ��Ч����Ӱ

### CSS3 box-shadow: h-shadow  ˮƽ��Ӱ(ˮƽƫ��) ����
										 v-shadow  ��ֱ��Ӱ(��ֱƫ��) ����      
										 blur      ģ������(���ܷ�����Ӱ���)
										 spread 	 ��Ӱ�ߴ�
										 color     ��Ӱ��ɫ
										 inset;    Ĭ���ⲿ��Ӱ(inset�ڲ���Ӱ)
										 
����ͬ��Ч����Ӱ��Ҫȥ��ˮƽ��ֱ��Ӱƫ�ƣ�ֻ�����÷�����ȼ���
			 
```
div {
	box-shadow: 0 0 3px #eee;
}
```