---
category: Notes

tags: 
  - interview

title: '上海华尔街见闻前端面试题'

description: '见闻是我入职的第一家公司，记录一下当时做的前端面试题吧。题目难度不大,但对基础知识考查比较全面。'

date: 2018-06-12

vssue-title: '上海华尔街见闻前端面试题'
---

<!-- more -->

## HTML／DOM部分

1. 使用HTML5的*原生功能*的校验`<input type="text">`，要求value为1开头的11位数字且不能为空

   ```html
   <input type="text" pattern="^1\d{10}$" required="required" />
   ```

2. 页面中有一元素：

   ```html
   <div class="foo bar" data-value="baz">hello world</div>
   ```

   使用原生DOM API选择该元素。有哪些API可以使用？

   ```js
   document.getElementsByClassName("foo")[0];
   document.querySelector(".foo, .bar");
   document.querySelectorAll('[data-value="baz"]')[0];
   ```

3. 给上一题的元素绑定一个鼠标点击事件，在DevTools控制台中输出该元素的标签名，属性class和data-value的值。有哪些获取元素属性的API？

   ```javascript
   //获取元素标签名
   .localName
   //获取元素的class属性值
   getAttribute('class')
   //获取自定义属性data-value的值
   .dataset.value
   //getAttribute('data-value')
   ```

4. 如下HTML：

   ```html
   <ul class="menu">
     <li>hello world</li>
     <li>goodbye world</li>
   </ul>
   ```

   *只能绑定一个事件*，点击不同的`<li>`时在控制台输出元素内容

   ```javascript
   document.getElementsByClassName("menu")[0].addEventListener('click',function(event){
   e = event || window.event;
   var el = e.target || e.srcElement;
   if(el.tagName === 'LI'||el.parentNode.tagName === 'LI'){
       console.log(el.innerText)
   }
   })
   ```

5. 如下表单:

   ```html
   <form id="form1">
     <input type="file" name="file">
     <input type="text" name="foo">
   </form>
   ```

   使用 `fetch` API 将表单提交到 `http://www.example.com/submit` 并打印返回的内容

   ```javascript
   let form1 = document.getElementById("form1")
   var formData = new FormData(form1)
   fetch('http://www.example.com/submit', {
     method: 'POST',
     headers: {
        'Content-Type': 'multipart/form-data'
     },                                                                          
     body:formData
   }).then(data => console.log(data))
   .catch(e => console.log("Oops, error", e))
   ```

## CSS部分

1. 把一个不知父容器宽和高的子元素垂直和水平居中。有几种方法？
   1.position定位

   ```css
   /*父容器*/
   .parent{position: relative;} 
   /*子容器*/
   .child{position: absolute; top: 50%, left: 50%; transform: translate(-50%, -50%); }
   ```

   2.flex布局

   ```css
   .parent{display: flex; justify-content: center; align-items: center;}
   ```

   3.利用表格的伸缩性

   ```css
   .parent{
    text-align: center; 
    display: table-cell;
    vertiacal-align: middle;//垂直方向居中
   } 
   .child{display: inline-block;}
   ```

2. 有一元素：

   ```html
   <div class="container">hello world</div>
   ```

   要求在屏幕宽度小于800px时使它的宽度为100%，屏幕宽度大于800px时固定它的宽度为800px

   ```css
   /*小于800px*/
   @media screen and (max-width: 800px) {
   .container{
      width:100%;
   }
   }
   /*大于等于800px*/
   .container{
      width:800px;
   }
   ```

3. 如下HTML：

   ```html
   <ul>
     <li>one</li>
     <li>two</li>
     <li>three</li>
   </ul>
   ```

   要求在`<li>`中间画一条分割线，但第一个`<li>`的上面和最后一个`<li>`的下面不能有分割线

   ```css
   ul li { border-bottom:1px solid red; }
   ul li:last-child{
     border-bottom: none;
   }
   ```

## JS部分

1. 请将下面两个数组合并去重，并倒序排列

   ```javascript
   const arr1 = [4, 3, 2, 1]
   const arr2 = [2, 4, 6, 8]
   ```

   ```javascript
   let arr = [...arr1,...arr2]
   //利用Set自动去重
   const newArr = Array.from(new Set(arr))
   newArr.sort((a,b)=>b-a)
   ```

2. 假设有一个类 `Animal`

   ```javascript
   class Animal {
     constructor(name) {
       this.name = name
     }
   }
   ```

   请写一个类 `Human`，继承自 `Animal`，构造函数支持如下参数:

   ```javascript
   new Human(name, age)
   ```

   ```javascript
   class Human extends Animal{
   constructor(name,age){
     super(name)
     this.age = age
     }
   }
   ```

3. 请将对象 `bar` 自己的属性遍历并打印出来：

   ```js
   const foo = { a: 1 }
   const bar = Object.create(foo)
   bar.b = 2
   ```

   ```js
   //返回对象自身的可枚举属性
   Object.keys(bar).forEach(attr=>console.log(attr))
   //返回对象自身的属性，包括不可枚举类型
   //Object.getOwnProperty()
   ```