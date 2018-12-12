## 1.浅拷贝、深拷贝

### (1)浅拷贝 存在父对象被篡改

测试代码：

```
var Chinese = {
	nation: "中国",
	birthPlaces: ["北京", "上海", "香港"]
};

function extendCopy(p) {
	var c = {};
	for(var i in p) {
		c[i] = p[i]
	}
	c.uber = p;  //指向父类原型
	return c;
}

var Doctor = extendCopy(Chinese);
Doctor.birthPlaces.push('厦门');
console.log(Doctor.birthPlaces);   //["北京", "上海", "香港", "厦门"]
console.log(Chinese.birthPlaces); //被篡改 ["北京", "上海", "香港", "厦门"]
```

### (2) 深拷贝 递归调用浅拷贝

测试代码：

```
var Chinese = {
	nation: "中国",
	birthPlaces: ["北京", "上海", "香港"]
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
Doctor.birthPlaces.push('厦门');
console.log(Doctor.birthPlaces);   //["北京", "上海", "香港", "厦门"]
console.log(Chinese.birthPlaces); //被篡改 ["北京", "上海", "香港"]
```


## 2.js 原型

### (1)工厂模式：缺点-无法识别对象类型

代码：

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

### (2)构造函数模式：可以创建特定类型对象。缺点：不同实例创建不同Function实例

代码：

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

### (3)原型模式：所有对象实例共享它所包含的属性和方法。   
									缺点：a.所有实例默认获取相同属性值   
												b.对于引用类型属性共享会互相影响

代码：

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

=》Person.prototype = { //重写了默认的prototype对象，construtor不再指向Person
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

### (4)组合使用构造函数模式和原型模式：
			 优点：构造函数模式用于定义实例属性，原型模式用于定义方法和共享属性
			 
代码：

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


## 2.js 继承 

### (1)原型链：利用原型让一个引用类型继承另一个引用类型的属性和方法

代码：

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

//继承了SuperType
SubType.prototype = new SuperType(); ⑹

//给之类添加新的方法
SubType.prototype.getSubValue = function() {
	return this.subproperty;
};

var instance = new SubType();
alert(instance.getSuperValue()); //true
```

a.原型链：
```
每个构造函数⑴都有一个原型对象⑵，原型对象都包含一个指向构造函数的指针⑶，而实例都包含一个指向原型对象的内部指针⑷。
若让一个子原型对象⑸等于父类型实例⑹，此时子原型对象⑸内部有一个指向父类型原型指针⑷，而父类型原型⑵也包含着一个指向父类型
构造函数的指针⑶。
```

b.图例：
```
       SuperType⑴										 SuperType Prototype⑵
prototype | 指向SuperType原型			constructor⑶ | 指向SuperType构造函数
													        getSuperValue | (function)⑻
													
		   SubType											     SubType Prototype⑸
prototype | 指向SubType原型			  [[prototype]]⑷ | 指向SuperType原型(继承SuperType实例属性⑺和原型方法⑻)
														        property      |    true⑺
													          getSubValue   | (function)

			 instance									
[[prototype]]⑷ | 指向SubType原型
 subproperty	  |   false	
									
```
说明：instance -》SubType原型 -》SuperType原型，instance.constructor指向SuperType，因为
			SubType.prototype的construtor被重写=》SubType.prototype指向SuperType.prototype，而SuperType.prototype的construtor指向SuperType，


### (2)原型链问题：通过原型实现继承，原型实际上会变成另一个类型的实例。原先的实例属性也就变成了原型属性。

代码：

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

### (3)借用构造函数：在子类型构造函数内部调用超类型构造函数
				缺点：构造函数模式问题=》方法在构造函数中定义，无法形成函数复用
代码：

```
function SuperType() {
	this.colors = ["red", "blue", "green"];
}

function SubType() {
	//继承SuperType => 在新SubType对象上执行SuperType()函数中定义的所有对象初始化代码，每个实例都有自己的colors副本
	SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"

var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green"
```

### (4)组合继承：原型链和借用构造函数

说明：原型链实现对原型属性和方法的继承，借用构造函数实现对实例属性的继承

代码：

```
function SuperType(name) {
	this.name = name;
	this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
	alert(this.name);
};

function SubType(name, age) {
	//继承属性
	SuperType.call(this, name);
	this.age = age;
}

//继承方法
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