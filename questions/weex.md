## 1.weexʹ������

### (1)��ʽ

1.border����ʹ�ø������ԣ�ֻ�ֿܷ����ã�

```
.border {
	border-width: 1px;
	border-style: solid;
  border-color: #40A1EE;	
}
```

2.Flexbox ��Ĭ����Ψһ����ʽģ�ͣ������㲻��Ҫ�ֶ�ΪԪ����� display: flex; ���ԡ�ֱ������flex-directtion: row/column; ����

3.ʹ����Զ�λ���������ø�ֵƫ������������ʾ

4.��ʾ���֣�������<text></text>��ǩ�������������ִ�С��������ɫ�����е���ʽ������text�����ã������ϲ�div��Ч

5.��������weex����߶ȣ�����ios������ʾ

6.weexĬ�Ϻ�ģ�ͣ���box-sizing: border-box�����ӿ�߰������ݡ��ڱ߾ࡢ�߿򣬲�������߾�

7.��߲������ðٷֱȣ�ֻ�����ù̶�px��Ĭ����iphone6 �ֱ���750*1334��Ϊ��׼��ߣ���ͬ�豸��Ļ���ᰴ�ձ���ת��Ϊ��һ�ߴ���м��㡣

8.weex����px����web����px������

9.weexֻ֧�ֵ���class nameѡ��������֧�ֶ��

����ʾ����

```
.box .div1 {}
```

10.���ñ�����ɫ����дbackground:#fff��������background-color: #fff

11.�ڲ���̬����class����ʹ��object��ֻ��������

```
:class="[index==0 ? 'specialStyle' : '']" 
����
:class="{specialStyle: index==0}"
```

### (2)����

1.Ҳ��ֱ����bus���и��ӡ��ֵܵ����ͨ��;
	����ֱ��ʹ��this.$emit("btnClick", param)���ø����@btnClick=submitClick����submitClick��������ղ���

bus.js:

```
import Vue from 'vue'
export default new Vue();
```

���ã�

```
import bus from '@/components/bus.js';
bus.$emit("funcname", param);
```

2.weex���ʹ��ע������

a.list��scroller��ֱ����Ϊ�б�ʹ�ã������趨�߶ȣ������л������ڲ������������<refresh></refresh>��
	���������<loading></loading>��Ϊ��������Ч��������list����cell��Ϊֱ�������������������Ҳ������Ϊ�������
	����div������Ϊֱ���������������cell������.
	˵����`����refresh��loading��ʼdisplay��ʾ�����أ�����������ʼ������ʾЧ����������ʾ������Ĭ����Сʱ����������ֱ��show��hide`
	
b.ͼƬ����ʹ��image��������������ܰ����κ��������������ȷָ�� width �� height������ͼƬ�޷���ʾ


