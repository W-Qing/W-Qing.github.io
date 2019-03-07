(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{398:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"_1-ajax定义"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-ajax定义","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. Ajax定义")]),t._v(" "),a("p",[t._v("Ajax是一种在无需重新加载整个网页的情况下，通过在后台与服务器进行少量数据交换，实现网页部分更新的技术。")]),t._v(" "),a("h2",{attrs:{id:"_2-ajax原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-ajax原理","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. Ajax原理")]),t._v(" "),a("blockquote",[a("p",[t._v("Ajax的工作原理相当于在用户和服务器之间加了—个中间层(AJAX引擎)，使用户操作与服务器响应异步化。并不是所有的用户请求都提交给服务器,像—些数据验证和数据处理等都交给Ajax引擎自己来做, 只有确定需要从服务器读取新数据时再由Ajax引擎代为向服务器提交请求。")]),t._v(" "),a("p",[t._v("Ajax其核心有JavaScript、XMLHTTPRequest、DOM对象组成，通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用JavaScript来操作DOM而更新页面。这其中最关键的一步就是从服务器获得请求数据。")])]),t._v(" "),a("h2",{attrs:{id:"_3-xhr对象"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-xhr对象","aria-hidden":"true"}},[t._v("#")]),t._v(" 3. XHR对象")]),t._v(" "),a("p",[t._v("Ajax最核心的依赖是浏览器提供的"),a("strong",[t._v("XMLHttpRequest")]),t._v("对象简称（XHR），这个对象使得浏览器可以发出HTTP请求与接收HTTP响应。")]),t._v(" "),a("blockquote",[a("p",[t._v("所有现代浏览器（IE7+、Firefox、Chrome、Safari以及Opera）均内建 XMLHttpRequest 对象（即"),a("strong",[t._v("window")]),t._v("的子对象），IE6及以下使用"),a("strong",[t._v("ActiveXObject")]),t._v("对象。")])]),t._v(" "),a("h3",{attrs:{id:"_1-创建xhr对象"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-创建xhr对象","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.创建xhr对象")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" xhr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("XMLHttpRequest"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码")]),t._v("\n    xhr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("XMLHttpRequest")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//兼容IE5 IE6浏览器")]),t._v("\n    xhr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ActiveXObject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Microsoft.XMLHTTP"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"_2-xhr对象的方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-xhr对象的方法","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.xhr对象的方法")]),t._v(" "),a("ul",[a("li",[a("p",[a("code",[t._v("open()")]),t._v("： 建立对服务器的调用")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"method"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"url"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"userName"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"password"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//method参数可以是GET、POST或PUT。")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//url参数是服务器上文件的地址或api接口，可以是相对URL或绝对URL。")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//是否异步。true（异步）")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//用户名，密码。（可选）")]),t._v("\n")])])])]),t._v(" "),a("li",[a("p",[a("code",[t._v("setRequestHeader()")]),t._v("： 向请求添加 HTTP 头")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setRequestHeader")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"header"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"value"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//在设置任何首部之前必须先调用open()。")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//设置header并和请求一起发送。(如果需要像表单那样POST提交数据，则必须使用此方法)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//("Content-type","application/x-www-form-urlencoded") 表示提交的是字符数据')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//post还可以同时提交二进制数据，只要在from表单标签上添加entype属性，并设置其值为"multipart/form-data"。')]),t._v("\n")])])])]),t._v(" "),a("li",[a("p",[a("code",[t._v("getAllResponseHeaders()")]),t._v("：把HTTP请求的所有响应头部作为键/值对返回")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("getResponseHeader(“header”)")]),t._v("： 返回指定头部的串值")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("send(content)")]),t._v("： 向服务器发送请求，仅当发送 POST 请求时填写content")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("abort()")]),t._v("： 取消当前请求，调用后readyState将被设置为0")])])]),t._v(" "),a("h3",{attrs:{id:"_3-xhr对象的属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-xhr对象的属性","aria-hidden":"true"}},[t._v("#")]),t._v(" 3. xhr对象的属性")]),t._v(" "),a("ul",[a("li",[a("p",[a("code",[t._v("readyState")]),t._v("：请求的交互状态")]),t._v(" "),a("blockquote",[a("p",[t._v("0（未打开）在定义后自动具有的状态值，请求已建立但还没有调用open()方法\n1 （初始化）请求已建立，但未发送，已调用open()但还没有调用send()方法\n2 （发送数据）请求已发送，send()方法已调用并收到响应头\n3 （数据传送中）请求处理中，正在下载解析响应体内容\n4 （完成）响应的数据接收解析完成，可以在客户端进行调用")])])]),t._v(" "),a("li",[a("p",[a("code",[t._v("status")]),t._v(" ：服务器对请求反馈的HTTP状态码（200，302，404…）")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("statusText")]),t._v("： 服务器返回的状态文本信息（OK，Move temporarily，Not Found…）")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("responseXML")]),t._v(" ：获得 XML 形式的响应数据（返回的XML对象可以解析为一个DOM对象）")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("responseText")]),t._v(" ：获得字符串形式的响应数据")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("responseBody")]),t._v(" ：服务器返回的主体（非文本格式）")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("responseStream")]),t._v(" ：服务器返回的数据流")])])]),t._v(" "),a("h3",{attrs:{id:"_4-xhr对象的事件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-xhr对象的事件","aria-hidden":"true"}},[t._v("#")]),t._v(" 4. xhr对象的事件")]),t._v(" "),a("p",[t._v("当请求被发送到服务器时，我们需要执行一些基于响应的任务。每当 readyState 改变时，就会触发"),a("code",[t._v("onreadystatechange")]),t._v(" 事件，通常会调用一个JavaScript函数。")]),t._v(" "),a("h2",{attrs:{id:"_4-demo实例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-demo实例","aria-hidden":"true"}},[t._v("#")]),t._v(" 4. Demo实例")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//1.声明一个空对象来装入XMLHttpRequest对象")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" xhr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//2.创建并实例化XMLHttpRequest对象xhr")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("XMLHttpRequest"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\txhr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("XMLHttpRequest")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\txhr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ActiveXObject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Microsoft.XMLHTTP"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//5.注册http状态改变时的事件回调函数")]),t._v("\nxhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onreadystatechange")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("    \n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("readyState "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//在处理响应之前，事件处理器应该首先检查readyState的值和HTTP状态码")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("status "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("responseText"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//5.处理服务器返回的数据")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//3.调用open()初始化xhr,并采取异步请求")]),t._v("\nxhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GET"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test.php"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//4.使用send()方法将该请求发送出去")]),t._v("\nxhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("send")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//使用get方式提交，可以使用null作为参数调用")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//post方式提交数据")]),t._v("\nxhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"POST"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test.php"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//使用setRequestHeader()方法设置请求头")]),t._v("\nxhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setRequestHeader")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Content-type"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/x-www-form-urlencoded"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nxmlhttp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("send")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"user=walker&pass=123456"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"_5-ajax优缺点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-ajax优缺点","aria-hidden":"true"}},[t._v("#")]),t._v(" 5. Ajax优缺点")]),t._v(" "),a("h3",{attrs:{id:"优点："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优点：","aria-hidden":"true"}},[t._v("#")]),t._v(" 优点：")]),t._v(" "),a("p",[a("strong",[t._v("1. 无刷新更新数据")])]),t._v(" "),a("p",[t._v("AJAX最大优点就是能在不刷新整个页面的前提下与服务器通信维护数据。减少了用户等待时间，带来非常好的用户体验。")]),t._v(" "),a("p",[a("strong",[t._v("2. 异步与服务器通信")])]),t._v(" "),a("p",[t._v("AJAX使用异步方式与服务器通信，不需要打断用户的操作，具有更加迅速的响应能力。优化了Browser和Server之间的沟通，减少不必要的数据传输、时间及降低网络上数据流量。")]),t._v(" "),a("p",[a("strong",[t._v("3. 前端与后端负载均衡")])]),t._v(" "),a("p",[t._v("AJAX的原则是“按需取数据”，把以前一些服务器负担的工作转移到客户端，可以最大程度的减少冗余请求和响应对服务器造成的负担，提升站点性能。")]),t._v(" "),a("p",[a("strong",[t._v("4. 基于标准被广泛支持")])]),t._v(" "),a("p",[t._v("不需要下载浏览器插件或者小程序，但需要客户允许JavaScript在浏览器上执行。")]),t._v(" "),a("p",[a("strong",[t._v("5. 界面与应用分离")])]),t._v(" "),a("p",[t._v("Ajax使WEB中的界面与应用分离（也可以说是数据与呈现分离），有利于分工合作，提高效率。")]),t._v(" "),a("h3",{attrs:{id:"缺点："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缺点：","aria-hidden":"true"}},[t._v("#")]),t._v(" 缺点：")]),t._v(" "),a("p",[a("strong",[t._v("1. 干掉了Back与History功能，即对浏览器机制的破坏")])]),t._v(" "),a("p",[t._v("在动态更新页面的情况下，用户无法回到前一个页面状态或将某个特定的状态保存到收藏夹中。因为浏览器仅能记忆历史记录中的静态页面。")]),t._v(" "),a("blockquote",[a("p",[t._v("解决方法：HTML5之前的一种方式是使用URL片断标识符（通常被称为锚点，即URL中#后面的部分）来保持追踪，允许用户回到指定的某个应用程序状态。（许多浏览器允许JavaScript动态更新锚点，这使得Ajax应用程序能够在更新显示内容的同时更新锚点。）HTML5 以后可以直接操作浏览历史，并以字符串形式存储网页状态，将网页加入网页收藏夹或书签时状态会被隐形地保留。上述两个方法也可以同时解决无法后退的问题。")])]),t._v(" "),a("p",[a("strong",[t._v("2. AJAX的安全问题")])]),t._v(" "),a("blockquote",[a("p",[t._v("Ajax技术就如同对企业数据建立了一个直接通道。这使得开发者在不经意间会暴露比以前更多的数据和服务器逻辑。Ajax的逻辑可以对客户端的安全扫描技术隐藏起来，允许黑客从远端服务器上建立新的攻击。还有Ajax也难以避免一些已知的安全弱点，诸如跨站点脚步攻击、SQL注入攻击和基于Credentials的安全漏洞等等。")])]),t._v(" "),a("p",[a("strong",[t._v("3. 因为网络延迟需要给用户提供必要提示")])]),t._v(" "),a("blockquote",[a("p",[t._v("进行Ajax开发时，网络延迟（即用户发出请求到服务器发出响应之间的间隔）需要慎重考虑。如果不给予用户明确的回应，没有恰当的预读数据，或者对XMLHttpRequest的不恰当处理，都会使用户感到厌烦。通常的解决方案是，使用一个可视化的组件来告诉用户系统正在进行后台操作并且正在读取数据和内容。")])])])},[],!1,null,null,null);s.default=e.exports}}]);