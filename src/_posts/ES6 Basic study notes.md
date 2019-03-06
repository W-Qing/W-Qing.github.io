---
category: Notes

tags: 
  - ES6

title: 'ES6学习笔记'

description: 'ECMAScript 6 是JS语言的下一代标准。Mizilla将在这个标准的基础上，退出JavaScript 2.0版。'

date: 2018-04-03

vssue-title: 'ES6学习笔记'
---

<!-- more -->

## 1. let、const

`var` 可以重复声明，无法限制修改，没有块级作用域

`let` 不能重复声明，变量（可以重新赋值），块级作用域

`const` 不能重复声明，常量（不能重新赋值），块级作用域

**let：**

```js
//要实现每隔0.5秒输出0，1，2
for(var i = 0;i<3;i++){
  setTimeout(function(){
    //没有块级作用域
	console.log(i);
    },500)
}
//错误写法：运行结果为 3 3 3
//es5中利用IIFE：
for(var i = 0;i<3;i++){
  (function(i){
    setTimeout(function(){
	  console.log(i);
	  },500)
  })(i);
}   //运行结果 0 1 2
//es6中使用let：
for(let i = 0;i<3;i++){
  setTimeout(function(){
    console.log(i);
  },500)
}//运行结果 0 1 2
```

**const：**

```js
const name; name = "wang";
//Uncaught SyntaxError: Missing initializer in const declaration
//const一旦声明就必须初始化，不能留到后面赋值,不然会报错。

const PI = Math.PI();
const PI = 3;
//TypeErrorL "PI" is read-only
//const声明的变量不能重复声明且不能重新赋值。

const obj = {a:1};
console.log(obj); //{a: 1}
obj.a = a;
obj.b = b;
console.log(obj);//{a:a,b:b}
//对于复合型数据类型，常量名不指向数据，而是指向数据所在的地址。
//const关键字只是保证常量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须注意该点。
```

## 2. 解构赋值

**1. 左右两边结构必须相同（数组或JSON）**

**2. 声明和初始化（赋值）不能分开（必须在一行内同时完成）**

**数组的解构赋值：**

```js
//es5中将数组中的元素赋值给变量：
var arr = [1,2,3];

var a = arr[0];
var b = arr[1];
var c = arr[2];

console.log(a,b,c);
//运行结果 1 2 3
//es6中利用数组的解构赋值：
let [a,b,c] = [1,2,3];
console.log(a,b,c);
//只要等号两边的模式相同，左边的变量就会被赋予对应的值
//运行结果 1 2 3

let [[a,b],c] = [[1,2],3,4]
console.log([a,b],c);
//[1,2] 3
//如果等号左边的模式只匹配等号右边数组的一部分，解构依然可以成功，这种情况叫做不完全解构。

let [a,b] = [0]
console.log(a,b);
//0 undefined
//如果解构不匹配，变量的值就等于undefined（只声明未赋值）
//但可以给其设置默认值。
let [a,b=1] = [0];
console.log(a,b); //0 1
```

**JSON对象的解构赋值：**

```js
////数组的元素是按次序排序的，变量的取值由它的位置决定，而对象的属性没有次序，变量必须与对象属性名相同，才能取到正确的值。
let {name,age} = {"name":"mintnoii","age":21};
console.log(name,age);
//mintnoii,21
//注意对象解构赋值的规则：
let obj = {
    name: "mintnoii",
    data:[{
        "age":21,
        "job":"teacher"
    }]
}
let {name,data:[{age,job}]} = obj;

console.log(name,age);
//mintnoii 21
```

也可以根据需求进行不同粒度的拆分：

```js
let [name,age,json1,arr1] = ["mintnoii",21,{"job":"teacher","grade":"A"},[97,3,8]];

console.log(name,age,json1,arr1);
//mintnoii 21 {job: "teacher", grade: "A"} [97, 3, 8]
```

## 3. 函数

**1. 箭头函数**

1. 如果只有一个参数`parameter`，圆括号`()`可以省略
2. 如果只有一个返回值`return`，花括号`{}`可以省略

```js
function Add(a){
    //ES5中的函数
    return (a+10);
}
//完整写法
let Add=(a)=>{
   //箭头函数
   return (a+10);
}
//简洁写法
let Add =a=>a+10;
---------------------------------------
Demo数组排序:
let arr = [24,7,3,14];
//从小到大排序
arr.sort((n1,n2)=>n1-n2);

console.log(arr);//运行结果 [3,7,14,24]
```

**2. 函数参数**

- 默认参数

```js
function show(a,b=10,c=5){
    //未传入的参数会使用默认值
    console.log(a,b,c);
}
show(5);  //运行结果 5，10，5
show(1,2,3);  //运行结果 1，2，3
```

- 收集剩余的参数

```js
 function show(a,b,...args){
     //Rest Parameter必须是最后一个形参
 	console.log(args);
 }
 show(1,2,3,4,5);
// 运行结果 [3,4,5]
```

- 展开数组内容

```js
 let arr = [1,2,3];
 console.log(...arr);
//运行结果 1，2，3

//注意...arr 等价于 1,2,3  而不是[1，2，3]
```

## 4. 数组

**map（映射）**

```js
一个对应一个：
let arr = [2,3,5];
let result = arr.map(item=>item*2)

console.log(result);  //运行结果 [4,6,10]
-----------------------------------------------------
let score = [55,65,90];

let result = score.map(item=>item>=60?'及格':'不及格');
console.log(result);
//运行结果 ["不及格", "及格", "及格"]
```

**reduce（汇总）**

```js
一堆对应一个：
let arr = [15,30,65,70];

let result = arr.reduce((tem,item,index)=>{
    //tem中间临时结果、item当前数值、index次数下标
    if(index == arr.length-1){//最后一次
    	return (tem+item)/arr.length;//返回平均值
    }else{//不是最后一次
        return tem+item; //返回相加的总数
    }
});

console.log(result);//运行结果 45
```

**filter（过滤器）**

```js
保留一部分，过滤出一部分：
let arr = [10,15,24,32,50];

let result = arr.filter(item=>{
    if(item%3==0){
       return true; //过滤出能被3整除的元素并返回
    }else{
       return false; //不能被3整除的元素保留下来
    }
})
更简单的写法：
let result = arr.filter(item=>item%3==0);
console.log(result); //运行结果 15，24
--------------------------------------------------
对象的过滤：
let arr = [
    {"title":"前端","class":"ES6"},
    {"title":"后端","calss":"PHP"},
    {"title":"前端","class":"Vue"}
]

let result = arr.filter(json=>json.title=="前端");
console.log(result);
//运行结果 [{"title":"前端","class":"ES6"},{"title":"前端","class":"Vue"}]
```

**forEach（迭代）**

```js
循环列举出集合中所有的元素，并一一取出：
let arr = [1,2,4];
arr.forEach((item,index)=>{
    console.log(index+':'+item);
})
//运行结果 0:1 1:22:4
```

## 5. 字符串

**1. startsWith和endsWith**

```js
let str = 'http://sunburst.wang';
//字符串是以http开头，返回true
console.log(str.startsWith('http'));

let str = 'show.png';
//字符串不是以.png结尾，返回false
console.log(str.endsWith('.png'));
```

**2. 字符串模板**

反单引号 **``** 内包裹的字符串可以折行

美元符号与大括号 **${variate}** 可以输出变量

```js
// ES5中的字符串拼接：
var title = '标题'
var content = '内容'
var str = '<div>\
	<h1>'+title+'</h1>\
	<p>'+content+'</p>\
</div>';
// ES6中的字符串拼接：
let str = `<div>
	<h1>${title}</h1>
	<p>${content}</p>
</div>`;
```

## 6. JSON

**1.两个新方法**

- **JSON.stringify()** 字符串化（串行化）

  将json对象转化成字符串

```js
let json = {"name":"mintnoii","age":21};
console.log(JSON.stringify(json));
//运行结果为String  {"name":"mintnoii","age":21}
```

- **JSON.parse()** 字符串解析

  将字符串解析为json对象（**注意要使用json的标准写法** ）

```js
let str = '{"name":"walker","age":20}'; 
console.log(JSON.parse(str));
//运行结果为Object {"name":"walker","age":20}
```

- 应用：深度克隆新对象

直接复制对象会造成-对象引用

```js
var a = {
	name : 'hello'
};
var b = a; //
b.name = 'hi';
//b 对属性的修改会影响到 a
alert( a.name ); //hi
```

使用for in进行-浅拷贝

```js
var a = {
	name : 'hello'
};
var b = {};

for(var attr in a){
	b[attr] = a[attr];
}
//但如果a[attr]的值为一个对象而不是字符串，则还会造成对象引用的问题
//除非使用递归进行深拷贝
b.name = 'hi';
alert( a.name );//hello
```



使用JSON进行-深拷贝（IE6、7不兼容）

```js
var a = {
	name : { age : 100 } //属性值也是一个对象
};
var str = JSON.stringify(a); //将a对象转化成字符串
var b = JSON.parse(str); //再将字符串解析为对象
//此时b 已经与 a之间已经没有关系了
b.name.age = 200;
//b的name再进行修改不会影响到a
alert( a.name.age );//100
```

**2. key与方法的简写**

```js
let a = 5;
let b = 10;

let json = {a:a,b:b};
//key的简写  
let json = {a,b};
console.log(json); //运行结果都是{a:5,b:10}

let json = {
	"name":"mintnoii",
    show:function(){
    	console.log(this.name);
    }
}
//方法的简写（ES6中面向对象的方法简写也是一样 ）
let json = {
    "name":'mintnoii',
    show(){ //不用再写 :function
    	console.log(this.name);
    }
}
json.show(); //运行结果都是 mintnoii
```

## 7. 面向对象

**1. 类的定义**

ES5中类的定义（类同时也是构造函数）：

```js
function Student(name,grade){
    //通过this添加属性
	this.name=name;
    this.grade=grade;
}
//通过原型prototype将方法添加在类的外部
Student.prototype.show=function (){
	console.log(this.name,this.grade);
};

var stu1=new Student('Walker', '92');
stu1.show(); //运行结果 walker 92
```

ES6中类的定义：

- **class**关键字声明类

- 类与构造器分开

- 方法可直接在类内部定义

  ```js
  class Student{ //关键字class
  	constructor(name, pass){ //构造器
      this.name=name;
      this.pass=pass;
  }//直接定义方法,注意不用写function
  	show(){
  		console.log(this.name,this.grade);
  	}  //注意 方法之间也不用逗号或分号隔开
      anotherFun(){
          console.log(...);
      }
  }
  ```

**2. 类的继承**

ES5中的继承（继承上面的学生类）：

```js
function CollegeStu(name,grade,academy){
    Student.call(this,name,grade); //继承的属性
    this.academy = academy; //自身新增的属性
}

CollegeStu.prototype = new Student(); //通过原型继承方法
CollegeStu.prototype.constructor = Student;//修正构造器
CollegeStu.prototype.showAcademy = function(){
    console.log(this.academy); //原型上添加自身新增的方法
}

var stu2 = new CollegeStu('mintnoii','96','外国语学院');
stu2.show(); stu2.showAcademy(); //运行结果 mintnoii 外国语学院
```

ES6中类的继承：

- **extends** 关键字定义类的继承
- **constructor**构造器内使用**super**关键字执行父类的构造函数（传入参数，继承父类的属性和方法）
- 自身新增的属性写在constructor里面（注意传入新参）
- 自身新增方法可直接定义在类的内部（construction下面）

```js
class CollegeStu extends Student{ //extends
    constructor(name,grade,academy){ //注意向constructor传参
        super(name,grade); //super执行构造函数
        this.academy = academy; //新增属性
    }
    showAcademy(){  //新增方法
        console.log(this.academy);
    }
}
```

## 8. Promise

**消除异步操作：用同步一样的方式书写异步操作的代码**

**new一个Promise对象**

```js
let p = new Promise(function(resolve,reject){
    //resolve（解决）-->成功  reject（排斥） -->失败
    $.ajax({
        //模拟jQuery中的ajax请求数据文件
    	url: './www/data.txt',
        dataType: 'json',
        success(data){
        	resolve(data); //成功，调用resolve
        },
        error(err){
        	reject(err); //失败，调用reject
        }
    })
});
//在then()方法里进行异步处理
p.then(succ(data)=>{
    //第一个回调函数succ其实就是resolve
   	console.log("成功"+data);
},error(err)=>{
    //第二个回调函数error其实就是reject
    console.log("失败"+err);//err为抛出的错误对象
});
```

**Promise.all()**

上面只是最基础的用法，请求单个数据文件并不能体现出同步操作的书写方式，当请求多个数据文件时，采用 **Promise.all()** 方法

```js
//假如有p1，p2,p3等多个请求数据文件的Promise对象
Promise.all([
    p1,p2,p3   //将它们存入数组后放进Promise.all()内
]).then(succ(arr)=>{  //直接.then()进行链式操作
    console.log("所有的数据文件全部请求成功");
    //成功返回的数据全部在数组arr里
    let [res1,res2,res3] = arr; //可直接解构赋值
    console.log(res1,res2,res3);
},error(err)=>{
    console.log("有数据文件请求失败");
})
```

值得注意的是在多个请求数据文件的Promise对象p1,p2的代码中，只有请求的url地址不同，同时jQuery中的ajax自带对Promise的支持，

```js
let p = $.ajax({url:'test.json',dataType:'json'});
```

其返回值其实就是一个Promise对象，因此可以进一步简化。

```js
Promise.all([
    //同步的书写方式
    $.ajax({url:'data1.txt',dataType:'json'}),
    $.ajax({url:'data2.json',dataType:'json'}),
    $.ajax({url:'data3.txt',dataType:'json'})
]).then(results=>{
    let [res1,res2,res3] = results;
    console.log(res1,res2,res3);
},error=>{
    console.log("有数据文件请求失败");
})
```

**Promise.race()**

用法与Promise.all()基本相同，但Promise.race()是哪个请求的数据文件先加载完就先用哪个，有加载失败的就直接忽略。（不常用）

## 9. generator

**基本用法**

- generator（生成器）函数使用 `* ` 号进行标识（不能写成箭头函数形式）
- generator函数在执行过程中可以暂停
- 在生成器的执行过程中，遇到**yield** （放弃）立即暂停，后续可恢复执行状态。
- 运行generator函数不会直接执行函数里面的代码，而是创建一个generator对象
- generator生成器对象的 **.next()** 方法控制函数执行

```js
function *show(){
   alert("a");
   yield;
   alert("b");
}
//直接调用show()并不会执行
let genObj = show(); 
console.log(genObj); //[object Generator]
genObj.next(); //使用一次.next()方法只会弹出a
//因为函数里有yield暂停
genObj.next(); //所以需要再使用一次.next()方法弹出b
```

**yield详解**

1. yield传参

```js
function* show(){
   console.log("begin");
   let num = yield;
   console.log(num);
   console.log("end");
}
let genObj = show();
genObj.next(2); //①调用第一个.next()函数从开始执行，打印输出 begin 然后遇到yield暂停 （第一个.next()是无法给yield传参的，所以2为无效参数）
genObj.next(4); //②调用第二个.next()恢复执行后，将参数4传给num并打印输出
//③最后打印输出 end
//运行结果 begin 4 end
```

2. yield返回

```js
function *show(){
    console.log("begin");
    yield 6; 
    console.log("end");
}
let genObj = show();
let res1 = genObj.next(); //①第一次调用.next()，函数开始执行并打印 begin
//②取到yield的返回值6，函数未执行完成所以done为false 放入数组后赋值给res1
console.log(res1); //③打印 {value: 6, done: false} 
let res2 = genObj.next();//④第二次调用.next()后，函数继续执行 打印 end
//⑤后续函数执行过程中已无yield返回值，所以value为undefined。一直执行到最后，所以done为true
console.log(res2)//⑤打印 {value: undefined, done: true} 
//tips: 要想res返回值，可以在函数最后通过添加return语句返回
```