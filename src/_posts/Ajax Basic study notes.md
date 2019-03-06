---
category: Notes

tags: 
  - HTML

title: '原生Ajax学习笔记'

description: 'Ajax: Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）'

date: 2018-03-11

vssue-title: '原生Ajax学习笔记'
---

<!-- more -->

## 1. Ajax定义

Ajax是一种在无需重新加载整个网页的情况下，通过在后台与服务器进行少量数据交换，实现网页部分更新的技术。

## 2. Ajax原理

> Ajax的工作原理相当于在用户和服务器之间加了—个中间层(AJAX引擎)，使用户操作与服务器响应异步化。并不是所有的用户请求都提交给服务器,像—些数据验证和数据处理等都交给Ajax引擎自己来做, 只有确定需要从服务器读取新数据时再由Ajax引擎代为向服务器提交请求。
>
> Ajax其核心有JavaScript、XMLHTTPRequest、DOM对象组成，通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用JavaScript来操作DOM而更新页面。这其中最关键的一步就是从服务器获得请求数据。

## 3. XHR对象

Ajax最核心的依赖是浏览器提供的**XMLHttpRequest**对象简称（XHR），这个对象使得浏览器可以发出HTTP请求与接收HTTP响应。

> 所有现代浏览器（IE7+、Firefox、Chrome、Safari以及Opera）均内建 XMLHttpRequest 对象（即**window**的子对象），IE6及以下使用**ActiveXObject**对象。

### 1.创建xhr对象

```js
var xhr = null;
if (window.XMLHttpRequest){
    //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xhr = new XMLHttpRequest();
}else{//兼容IE5 IE6浏览器
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
```

### 2.xhr对象的方法

- `open()`： 建立对服务器的调用

  ```js
  open("method","url",[async],["userName"],["password"])
  //method参数可以是GET、POST或PUT。
  //url参数是服务器上文件的地址或api接口，可以是相对URL或绝对URL。
  //是否异步。true（异步）
  //用户名，密码。（可选）
  ```

- `setRequestHeader()`： 向请求添加 HTTP 头

  ```js
  setRequestHeader("header", "value")
  //在设置任何首部之前必须先调用open()。
  //设置header并和请求一起发送。(如果需要像表单那样POST提交数据，则必须使用此方法)
  //("Content-type","application/x-www-form-urlencoded") 表示提交的是字符数据
  //post还可以同时提交二进制数据，只要在from表单标签上添加entype属性，并设置其值为"multipart/form-data"。
  ```

- `getAllResponseHeaders() `：把HTTP请求的所有响应头部作为键/值对返回

- `getResponseHeader(“header”)`： 返回指定头部的串值

- `send(content)`： 向服务器发送请求，仅当发送 POST 请求时填写content

- `abort()`： 取消当前请求，调用后readyState将被设置为0

### 3. xhr对象的属性

- `readyState`：请求的交互状态

  > 0（未打开）在定义后自动具有的状态值，请求已建立但还没有调用open()方法
  > 1 （初始化）请求已建立，但未发送，已调用open()但还没有调用send()方法
  > 2 （发送数据）请求已发送，send()方法已调用并收到响应头
  > 3 （数据传送中）请求处理中，正在下载解析响应体内容
  > 4 （完成）响应的数据接收解析完成，可以在客户端进行调用

- `status` ：服务器对请求反馈的HTTP状态码（200，302，404…）

- `statusText`： 服务器返回的状态文本信息（OK，Move temporarily，Not Found…）

- `responseXML` ：获得 XML 形式的响应数据（返回的XML对象可以解析为一个DOM对象）

- `responseText` ：获得字符串形式的响应数据

- `responseBody` ：服务器返回的主体（非文本格式）

- `responseStream` ：服务器返回的数据流

### 4. xhr对象的事件

当请求被发送到服务器时，我们需要执行一些基于响应的任务。每当 readyState 改变时，就会触发`onreadystatechange` 事件，通常会调用一个JavaScript函数。

## 4. Demo实例

```js
//1.声明一个空对象来装入XMLHttpRequest对象
var xhr = null; 
//2.创建并实例化XMLHttpRequest对象xhr
if(window.XMLHttpRequest){
	xhr = new XMLHttpRequest();
}else{
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

//5.注册http状态改变时的事件回调函数
xhr.onreadystatechange = function(){    
	if(xhr.readyState == 4){//在处理响应之前，事件处理器应该首先检查readyState的值和HTTP状态码
		if(xhr.status == 200){
			alert(xhr.responseText); //5.处理服务器返回的数据
		}
	}
}

//3.调用open()初始化xhr,并采取异步请求
xhr.open("GET","test.php",true);
//4.使用send()方法将该请求发送出去
xhr.send(); //使用get方式提交，可以使用null作为参数调用
//post方式提交数据
xhr.open("POST","test.php",true);
//使用setRequestHeader()方法设置请求头
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("user=walker&pass=123456");
```

## 5. Ajax优缺点

### 优点：

**1. 无刷新更新数据**

AJAX最大优点就是能在不刷新整个页面的前提下与服务器通信维护数据。减少了用户等待时间，带来非常好的用户体验。

**2. 异步与服务器通信**

AJAX使用异步方式与服务器通信，不需要打断用户的操作，具有更加迅速的响应能力。优化了Browser和Server之间的沟通，减少不必要的数据传输、时间及降低网络上数据流量。

**3. 前端与后端负载均衡**

AJAX的原则是“按需取数据”，把以前一些服务器负担的工作转移到客户端，可以最大程度的减少冗余请求和响应对服务器造成的负担，提升站点性能。

**4. 基于标准被广泛支持**

不需要下载浏览器插件或者小程序，但需要客户允许JavaScript在浏览器上执行。

**5. 界面与应用分离**

Ajax使WEB中的界面与应用分离（也可以说是数据与呈现分离），有利于分工合作，提高效率。

### 缺点：

**1. 干掉了Back与History功能，即对浏览器机制的破坏**

在动态更新页面的情况下，用户无法回到前一个页面状态或将某个特定的状态保存到收藏夹中。因为浏览器仅能记忆历史记录中的静态页面。

> 解决方法：HTML5之前的一种方式是使用URL片断标识符（通常被称为锚点，即URL中#后面的部分）来保持追踪，允许用户回到指定的某个应用程序状态。（许多浏览器允许JavaScript动态更新锚点，这使得Ajax应用程序能够在更新显示内容的同时更新锚点。）HTML5 以后可以直接操作浏览历史，并以字符串形式存储网页状态，将网页加入网页收藏夹或书签时状态会被隐形地保留。上述两个方法也可以同时解决无法后退的问题。

**2. AJAX的安全问题**

> Ajax技术就如同对企业数据建立了一个直接通道。这使得开发者在不经意间会暴露比以前更多的数据和服务器逻辑。Ajax的逻辑可以对客户端的安全扫描技术隐藏起来，允许黑客从远端服务器上建立新的攻击。还有Ajax也难以避免一些已知的安全弱点，诸如跨站点脚步攻击、SQL注入攻击和基于Credentials的安全漏洞等等。

**3. 因为网络延迟需要给用户提供必要提示**

> 进行Ajax开发时，网络延迟（即用户发出请求到服务器发出响应之间的间隔）需要慎重考虑。如果不给予用户明确的回应，没有恰当的预读数据，或者对XMLHttpRequest的不恰当处理，都会使用户感到厌烦。通常的解决方案是，使用一个可视化的组件来告诉用户系统正在进行后台操作并且正在读取数据和内容。