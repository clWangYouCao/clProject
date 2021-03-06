## js 知识点

### 1. 基本知识点

(1) 数据类型    

1. 6种数据类型：Undefined、Null、Boolean、Number、String、Object
2. typeof 返回依次为小写，且 typeof(null) => object，typeof(NaN) => number，null是个空对象指针    


(2) 函数   

1. 即使定义的函数只接收2个参数，但在调用时可以传递0个、多个参数。因为参数在内部用一个数组来表示的，   
函数接收到的始终都是这个数组arguments，通过arguments[0]、arguments[1]等来取值   
   

(3) 变量、作用域、内存    

* a. 基本类型和引用类型的值

  1. 变量分为基本类型值(除了Object外)和引用类型值(Object)。前者按值访问，可操作保存在变量中实际值；   
  后者是保存在内存中的对象，不能直接操作对象的内存空间。实际操作对象的引用而不是实际的对象。 

  2. 基本类型值复制：会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上，相互操作不受影响；   
    引用类型值复制：同样也会将存储在变量对象中的值复制一份放到为新变量分配的空间中。不同的是，   
    这个值副本是一个指针。这个指针指向存储在堆中的一个对象，两个变量实际将引用同一个对象，则操作相互影响。   

  3. 所有函数的参数都是按值传递的。   

  4. 检测基本数据类型可用typeof，但检测引用类型值用处不大。可用 instanceof 来判断具体对象类型。   
  如果变量是给定引用类型实例，那么 instanceof 操作符会返回 true。   
  `如：alert(person instanceof Object/Array/RegExp); // 变量person 是Object/Array/RegExp 吗?`    

* b. 执行环境及作用域   

  1. 概念：`执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。` 每个执行环境都有一个与之关联的   
  变量对象，环境中定义的所有变量和函数都保存在这个对象中。   

  2. 每个函数都有自己的执行环境。当执行流进入一个函数时，函数的环境就会被推入一个环境栈中。而在函数执行   
  之后，栈将其环境弹出，把控制权返回给之前的执行环境。   

  3. 当代码在一个环境执行时，会创建变量对象的一个作用域链。`作用域链用途：是保证对执行环境有权访问的所有变量和函数的有序访问。`    
     
  4. 作用域链的前端，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其活动对象作为   
  变量对象。活动对象在最开始时只包含一个变量，即arguments对象。作用域链中的下一个变量对象来自外部环境，   
  而再下一个变量对象则来自下一个包含环境。这样，一直延续到全局执行环境；全局执行环境的变量对象始终都是   
  作用域链中最后一个对象。   

  5. 在js中，由for创建的变量i即使在for循环执行结束后，也依旧会存在于外部的执行环境中。   
  `如：if(true) { var color = 'blue'; } alert(color); //blue`. if语句中变量声明会把变量添加到当前执行环境   
  (这里是全局环境。js并没有所谓的块级作用域，javascript的作用域是相对函数而言的，可以称为函数作用域)    

* c. 垃圾收集   

  js具有自动垃圾收集机制，执行环境会负责管理代码执行过程中使用的内存。`原理：找出不再继续使用的变量，释放其占用内存。`垃圾收集器会按照固定的时间间隔周期性执行这一操作。   


(4) 函数表达式   

1. 分为函数声明、函数表达式。`前者可先调用，后声明 => 存在函数声明提升；后者必须先声明再调用。`   

2. 闭包：`是指有权访问另一个函数作用域中的变量的函数`。创建闭包常见方式，就是在一个函数内部创建另一个函数。   
*内部函数的作用域链仍然保存着对父函数活动对象的引用，就是闭包。*   

3. 闭包作用：a.可以读取自身函数外部的变量；b.让这些外部变量始终保存在内存中。

    (3)(4)见链接：<https://blog.csdn.net/whd526/article/details/70990994>      
    <http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html>     

   
    见以下代码：   

    ```
    var name = "The Window";
    var object = {
    　name : "My Object",
    　getNameFunc : function(){
    　  return function(){
    　　　return this.name;
    　　};
    　}
    };
    alert(object.getNameFunc()()); // The Window
    // this对象是在运行时基于函数的执行环境绑定的：在全局函数中，this等于window，
    //而当函数被作为某个对象调用时，this等于那个对象。不过，匿名函数具有全局性，
    //因此this对象同常指向window


    var name = "The Window";
    var object = {
    　name : "My Object",
    　getNameFunc : function(){
        console.log(this); // object
        var that = this;
    　  return function(){
        console.log(this); // Window
    　　　return that.name;
    　　};
    　}
    };
    alert(object.getNameFunc()()); // My Object
    ```   

    说明：`每个函数在被调用时，其活动对象都会自动取得两个特殊变量：this 和 arguments。内部函数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远不可能直接访问外部函数中的这两个变量`   

4. js 仿块级作用域    

    定义并立即调用了一个匿名函数(没有名字的函数表达式)：

    ```
    (function(){

    })();
    ```   

(5) 继承、原型链   
   
* 构造函数继承

1. 构造函数绑定 —— 使用call、apply方法   

    用法：`obj.call(thisObj, arg1, arg2, ...); ` 、`obj.apply(thisObj, [arg1, arg2, ...]);`
    
    作用：`都是把 obj(即this) 绑定到 thisObj，这时候 thisObj具备了obj的属性和方法`。或者说thisObj 继承了obj的属性和方法。绑定后会立即执行函数。   

    区别：`call接收连续参数，apply 接收数组参数`  

    **方法**：*使用call或apply方法，将父对象的构造函数绑定在子对象上，即在子对象构造函数中加一行：Animal.apply(this, arguments)*

    见以下代码：   

    ```
    function Animal() {
        this.species = "动物";
    }

    Animal.prototype.getName = function() {
        console.log("我是动物");
    }

    function Cat(name, color) {
        this.name = name;
        this.color = color;
        Animal.apply(this, arguments);
    }

    var cat = new Cat();
    alert(cat.species);    // 动物
    cat.getName()  // 报错
    ```   
   
   说明：`这种方法可以继承父类构造函数的属性，但是无法继承 prototype 属性，即父类中共享的方法和属性`

2. prototype 模式 —— 使用prototype属性   

    **方法**：*如果‘猫’的prototype对象，指向一个Animal的实例，那么所有‘猫’实例就能继承Animal了*   

    见以下代码：   

    ```
    ①Cat.prototype = new Animal(); 
    console.log(Cat.prototype.constructor == Animal) // true

    ②Cat.prototype.constructor = Cat; 
    console.log(Cat.prototype.constructor == Cat) // true

    var cat = new Cat(); // 每个实例都有个construtor属性，默认调用prototype对象的construtor属性
    console.log(cat.constructor == Cat.prototype.constructor) // true
    alert(cat.species); // 动物
    ```

    说明：`①完全删除了prototype对象原先的值，赋予了一个新值；②原来任何一个prototype对象都有一个construtor属性，指向它的构造函数，本来没有①是指向Cat的，加了①后，指向Animal，所以就必须手动纠正②指向原来构造函数.`   

3. 直接继承prototype   

    **方法**：*这一种对上一种的改进。不变属性写入prototype。让Cat跳过Animal，直接继承Animal.prototype*  

    见以下代码：   

    ```
    function Animal() {}

    Animal.prototype.species = "动物";

    Cat.prototype = Animal.prototype;
    console.log(Animal.prototype.constructor); // Animal

    Cat.prototype.constructor = Cat;
    console.log(Animal.prototype.constructor); // Cat

    var cat = new Cat("大毛", "黄色");
    console.log(cat.species); // 动物
    ```

    说明：`优点 —— 效率高，不用执行和建立Animal实例了，比较省内存；缺点 —— Cat.prototype和Animal.prototype现在指向同一个对象，对Cat.prototype修改反映到Animal.prototype.`   

4. 利用空对象作为中介   

    **方法**：*直接继承prototype存在上述缺点，所有就有这种利用一个空对象作为中介*    

    见以下代码：   

    ```
    function extend(Child, Parent) {
        var F = function() {};
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;

        <!-- 意思是为子对象设一个uber(“向上”、“上一层”)属性，这个属性直接指向父对象的prototype属性。
        等于在子对象上打开一条通道，可以直接调用父对象的方法。=> 实现继承完备性，纯属备用性质 -->
        Child.uber = Parent.prototype; 
    }

    extend(Cat, Animal);
    console.log(Animal.prototype.constructor); // Animal

    var cat = new Cat("大毛", "黄色");
    console.log(cat.species); // 动物
    ```   

    说明：`F是空对象，几乎不占内存。此时修改Cat的prototype对象，不会影响Animal的prototype对象`   

5. 拷贝继承   

    **方法**：*把父对象的所有属性和方法，拷贝进子对象*   

    见以下代码：

    ```
    function Animal() {}

    Animal.prototype.species = "动物";

    function extend2(Child, Parent) {
        var p = Parent.prototype;
        var c = Child.prototype;
        for(var i in p) {
            c[i] = p[i];
        }
        c.uber = p;
    }

    extend2(Cat, Animal);
    var cat = new Cat("大毛", "黄色");
    console.log(cat.species); // 动物
    ```

    说明：`将父对象的prototype对象中的属性，一一拷贝给Child对象的prototype对象`   


* 非构造函数的继承   

1. object() 方法   

    **方法**：*把子对象的prototype属性，指向父对象，从而使子对象与父对象连在一起*   

    见以下代码：

    ```
    var Chinese = {
        nation: '中国'
    };

    var Doctor = {
        career: '医生'
    };

    function object(o) {
        function F() {}

        F.prototype = o;

        return new F();
    }

    var Doctor = object(Chinese);
    Doctor.career = '医生';
    console.log(Doctor.nation);
    ```
     
2. 浅拷贝   

3. 深拷贝   

    说明：`2、3 见 js_proto.md`

























