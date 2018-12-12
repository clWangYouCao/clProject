## 1.ǳ���������

### (1)ǳ���� ���ڸ����󱻴۸�

���Դ��룺

```
var Chinese = {
	nation: "�й�",
	birthPlaces: ["����", "�Ϻ�", "���"]
};

function extendCopy(p) {
	var c = {};
	for(var i in p) {
		c[i] = p[i]
	}
	c.uber = p;  //ָ����ԭ��
	return c;
}

var Doctor = extendCopy(Chinese);
Doctor.birthPlaces.push('����');
console.log(Doctor.birthPlaces);   //["����", "�Ϻ�", "���", "����"]
console.log(Chinese.birthPlaces); //���۸� ["����", "�Ϻ�", "���", "����"]
```

### (2) ��� �ݹ����ǳ����

���Դ��룺

```
var Chinese = {
	nation: "�й�",
	birthPlaces: ["����", "�Ϻ�", "���"]
};

function deepCopy(p, c) {
	var c = c || {};
	for(var i in p) {
		if(typeof p[i] === "object") {
			c[i] = (p[i].constructor === Array) ? [] : {};
			deepCopy(p[i], c[i]);
		} else {
			c[i] = p[i];
		}
	}
	return c;
}

var Doctor = deepCopy(Chinese);
Doctor.birthPlaces.push('����');
console.log(Doctor.birthPlaces);   //["����", "�Ϻ�", "���", "����"]
console.log(Chinese.birthPlaces); //���۸� ["����", "�Ϻ�", "���"]
```


## 2.js ԭ��

### (1)����ģʽ��ȱ��-�޷�ʶ���������

���룺

```
function createPerson(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function() {
		alert(this.name);
	};
	return o;
}

var person1 = createPerson('cl', 24, 'web');
var person2 = createPerson('kcb', 29, 'web');
```

### (2)���캯��ģʽ�����Դ����ض����Ͷ���ȱ�㣺��ͬʵ��������ͬFunctionʵ��

���룺

```
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.jon = job;
	this.sayName = function() {
		alert(this.name);
	};
}

var person1 = new Person('cl', 24, 'web');
var person2 = new Person('kcb', 29, 'web');
alert(person1.constructor == Person); //true
alert(person2.constructor == Person); //true
alert(person1.sayName == person2.sayName); //false
```

### (3)ԭ��ģʽ�����ж���ʵ�������������������Ժͷ�����   
									ȱ�㣺a.����ʵ��Ĭ�ϻ�ȡ��ͬ����ֵ   
												b.���������������Թ���ụ��Ӱ��

���룺

```
function Person() {
}

Person.prototype.name = "cl";
Person.prototype.age = 24;
Person.prototype.job = "web";
Person.prototype.friends = ["zy", "zc"];
Person.prototype.sayName = function() {
	alert(this.name);
};

=��Person.prototype = { //��д��Ĭ�ϵ�prototype����construtor����ָ��Person
	constructor: Person,
	name: "cl",
	age: 24,
	job: "web",
	friends: ["zy", "zc"],
	sayName: function() {
		alert(this.name);
	}
};

var person1 = new Person();
person1.sayName(); //"cl"

var person2 = new Person(); //"cl"
person2.sayName();

alert(person1.sayName == person2.sayName); //true

person1.friends.push("mn");
alert(person1.friends); //"zy,zc,mn"
alert(person2.friends); //"zy,zc,mn"
alert(person1.friends === person2.friends); //true
```

### (4)���ʹ�ù��캯��ģʽ��ԭ��ģʽ��
			 �ŵ㣺���캯��ģʽ���ڶ���ʵ�����ԣ�ԭ��ģʽ���ڶ��巽���͹�������
			 
���룺

```
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.jon = job;
	this.friends = ["zy", zc];
}

Person.prototype = {
	constructor: Person,
	sayName = function() {
		alert(this.name);
	}
};

var person1 = new Person('cl', 24, 'web');
var person2 = new Person('kcb', 29, 'web');

person1.friends.push("mn");
alert(person1.friends); //"zy,zc,mn"
alert(person2.friends); //"zy,zc"
alert(person1.friends === person2.friends); //false
alert(person1.sayName === person2.sayName); //true
```


## 2.js �̳� 

### (1)ԭ����������ԭ����һ���������ͼ̳���һ���������͵����Ժͷ���

���룺

```
function SuperType() {
	this.property = true;
}

SuperType.Prototype.getSuperValue = function() {
	return this.property;
};

function SubType() {
	this.subproperty = false;
}

//�̳���SuperType
SubType.prototype = new SuperType(); ��

//��֮������µķ���
SubType.prototype.getSubValue = function() {
	return this.subproperty;
};

var instance = new SubType();
alert(instance.getSuperValue()); //true
```

a.ԭ������
```
ÿ�����캯���Ŷ���һ��ԭ�Ͷ���ƣ�ԭ�Ͷ��󶼰���һ��ָ���캯����ָ��ǣ���ʵ��������һ��ָ��ԭ�Ͷ�����ڲ�ָ��ȡ�
����һ����ԭ�Ͷ���ɵ��ڸ�����ʵ���ʣ���ʱ��ԭ�Ͷ�����ڲ���һ��ָ������ԭ��ָ��ȣ���������ԭ�͢�Ҳ������һ��ָ������
���캯����ָ��ǡ�
```

b.ͼ����
```
       SuperType��										 SuperType Prototype��
prototype | ָ��SuperTypeԭ��			constructor�� | ָ��SuperType���캯��
													        getSuperValue | (function)��
													
		   SubType											     SubType Prototype��
prototype | ָ��SubTypeԭ��			  [[prototype]]�� | ָ��SuperTypeԭ��(�̳�SuperTypeʵ�����Ԣ˺�ԭ�ͷ�����)
														        property      |    true��
													          getSubValue   | (function)

			 instance									
[[prototype]]�� | ָ��SubTypeԭ��
 subproperty	  |   false	
									
```
˵����instance -��SubTypeԭ�� -��SuperTypeԭ�ͣ�instance.constructorָ��SuperType����Ϊ
			SubType.prototype��construtor����д=��SubType.prototypeָ��SuperType.prototype����SuperType.prototype��construtorָ��SuperType��


### (2)ԭ�������⣺ͨ��ԭ��ʵ�ּ̳У�ԭ��ʵ���ϻ�����һ�����͵�ʵ����ԭ�ȵ�ʵ������Ҳ�ͱ����ԭ�����ԡ�

���룺

```
function SuperType() {
	this.colors = ["red", "blue", "green"];
}

function SubType() {

}

SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"

var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green,black"
```

### (3)���ù��캯�����������͹��캯���ڲ����ó����͹��캯��
				ȱ�㣺���캯��ģʽ����=�������ڹ��캯���ж��壬�޷��γɺ�������
���룺

```
function SuperType() {
	this.colors = ["red", "blue", "green"];
}

function SubType() {
	//�̳�SuperType => ����SubType������ִ��SuperType()�����ж�������ж����ʼ�����룬ÿ��ʵ�������Լ���colors����
	SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"

var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green"
```

### (4)��ϼ̳У�ԭ�����ͽ��ù��캯��

˵����ԭ����ʵ�ֶ�ԭ�����Ժͷ����ļ̳У����ù��캯��ʵ�ֶ�ʵ�����Եļ̳�

���룺

```
function SuperType(name) {
	this.name = name;
	this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
	alert(this.name);
};

function SubType(name, age) {
	//�̳�����
	SuperType.call(this, name);
	this.age = age;
}

//�̳з���
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function() {
	alert(this.age);
};

var instance1 = new SubType("cl", 24);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"cl"
instance1.sayAge();  //24

var instance2 = new SubType("kcb", 29);
alert(instance2.colors); //"red,blue,green"
instance2.sayName();    //"kcb"
instance2.sayAge();     //29
```