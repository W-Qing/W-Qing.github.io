---
category: Notes
tags: 
  - Node.js
title: '初识Node.js'
description: '一切能用Js实现的，终将被Js实现。'
date: 2018-05-15
vssue-title: '初识Node.js'
---

<!-- more -->

## Node.js是什么

**Node.js® is a JavaScript runtime built on Chrome’s V8 JavaScript engine.Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.Node.js’ package ecosystem, npm, is the largest ecosystem of open source libraries in the world.**

> Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。Node.js 的包管理器 npm，是全球最大的开源库生态系统。

- Node.js既不是一门新的语言，也不是框架，它是JavaScript在服务器端的运行环境 。

所谓“运行环境（平台）”有两层意思：

- 首先，**编程语言能做什么取决于平台，也就是它的运行环境。** JavaScript最早是运行在浏览器中，然而浏览器只是提供了一个上下文，它定义了使用JavaScript可以做什么，但并没有“说”太多关于JavaScript语言本身可以做什么。事实上，JavaScript是一门“完整”的语言，它可以使用在不同的上下文中，其能力与其他同类语言相比有过之而无不及。Node事实上就是另外一种上下文， 内部使用Google Chrome的V8 引擎在服务端解释执行JavaScript代码，在这个意义上Node有点像JavaScript的虚拟机。
- 其次，**是Node选择了JavaScript，而不是JavaScript发展出了Node。** Node提供大量工具库（通过自行开发的libuv库，调用系统资源），使得JavaScript语言与操作系统交互（比如文件读写，新建子进程），在这个意义上，Node又是JavaScript的工具库。

## Node.js能干什么

- 高性能的Web服务器
- 实时多人游戏后台服务器
- 简单易用的命令行工具（npm hexo）
- gulp、bower、fis、http-server
- 高大上的桌面应用程序
- electron Linus + Max + Windows
- 底层的物联网开发
- 移动开发
- … …

## 认识Node中的Javascript

- ECMAScript

  > 和浏览器环境中的Javascript不一样，Node没有DOM和BOM对象（console.log(window)或console.log(document)会报错），Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。

- 核心模块

  > Node为Javascript提供了很多服务器级别的API，这些API大多都被包装到了一个具名的核心模块中，例如文件操作的`fs`模块，http服务构建的`http`模块、路径操作的`path`模块、`os`操作系统信息模块……

- 用户自定义模块、第三方模块

  > 相对路径必须加 ‘./‘，否则会报错。
  >
  > 可以省略 .js后缀名（推荐）

- 模块系统

  > Node中还有一个很重要的概念：模块系统（ 其遵循CommonJS的模块规范）

## 创建一个简单的Http服务应用

Node.js 应用是由哪几部分组成的：

1. **引入 required 模块：** 我们可以使用 **require** 指令来载入 Node.js 模块。
2. **创建服务器：** 服务器可以监听客户端的请求，类似于 Apache 、Nginx 等 HTTP 服务器。
3. **接收请求与响应请求：**  客户端通过浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据。

```js
//使用require方法加载http核心模块
const http = require('http')

//定义服务器的主机名与端口号
const hostname = '127.0.0.1'
const port = 3000

//使用http.creatServer() 方法创建一个web服务器
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')//设置请求头
  //res.write('Hello World\n')
  //res.end()
  res.end('Hello World\n')
})
//绑定主机名与端口号 启动服务器
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
```

- 必须使用res.end()来结束响应，否则客户端会一直等待

## fs文件系统模块

在Node中如果想要进行文件操作，必须引入file-system这个核心模块。它提供了所有的文件操作相关的API。

```js
//使用require方法加载fs核心模块
const fs = require("fs")

// 异步读取
fs.readFile('demo.txt', function (err, data) {
   if (err) {
       return console.error(err)
   }
   //此时err为null
   console.log("异步读取: " + data.toString())
   //默认文件中存储的二进制数据被转为16进制输出
   //<Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 2e 6a 73>
   //使用toString方法将其转为字符串输出 hello node.js
})
```

- 给客户端发送的响应信息必须为字符串或者是二进制数据
- 因此console.log()打印文件内容或使用res.write()向页面返回信息需要使用toString方法

## 根据不同请求路径返回不同数据

```js
const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
  const url = req.url
  //Request 请求对象 用来获取客户端请求信息 输入（地址、时间、ip、方法）
  console.log(`客户端请求的地址是：${req.url}`)
  //Response 响应对象 用来给客户端发送响应信息 输出
  //通过修改setHeader的Content-Type来指定响应内容的类型 
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  //'text/plain;'普通文本  'text/html' html文本 image/jpeg .jpg图片
    if(url === '/'){
        //读取html文件并返回
        fs.readFile('./index.html',(err,data)=>{
    		if(err){
    			res.end('文件读取失败')
    		}else{
    			res.setHeader('Content-Type','text/html;charset=utf-8')
    			res.end(data); //end()方法可接受data（默认二进制）数据 不用toString()转成字符串
    		}
    	})
    }else if(url === 'api'){
        const products = [
            {
                name:'苹果',
                price: 10
            },
            {
                name:'樱桃',
                price: 15
            }
        ]
        res.end(JSON.stringify(products))
    }else if(url === '/image'){
        fs.readFile('./image/products.jpg',(err,data)=>{
            if(err){
                res.end('图片读取失败')
            }else{
                res.setHeader('Content-Type','image/jpeg')//图片（非字符）不需要指定编码格式
                res.end(data)
            }
        })
    }else{
        res.end("404 Not Found!")
    }
})
server.listen(3000)
```

- 服务端默认发送的字符数据，默认为utf-8编码
- 浏览器在不知道服务器响应内容编码格式的时候会按照当前操作系统的默认编码去解析
- 中文操作系统默认字符编码为 gkb，会导致页面乱码 此时可以通过`charaset = utf-8`指定字符编码格式

## url路由模块

通过判断Request对象的不同url可以相应地返回不同的数据。但当用户通过get方式请求表单数据时，形如：`comments?name=mintnoii&message=你好`，由于其中含有用户动态填写的内容，所以不可能通过去判断完整的 url 路径来处理这个请求。对此可以引入Node中的url路由模块`const url = require("url");`来根据不同的请求路径来设置路由选择。url一共提供了三个方法：

### 1、url.parse(**urlString,boolean,boolean** )

 将一个url的字符串解析并返回一个url的对象

```js
url.parse("http://user:pass@host.com:8080/p/a/t/h?query=string#hash");

返回值：
{
  protocol: 'http:',   // 底层使用的协议
  slashes: true,       // 是否有协议的双斜线
  auth: 'user:pass',
  host: 'host.com:8080',   // http 是服务器的ip地址或者是域名
  port: '8080',            // 端口号
  hostname: 'host.com',	   // 主机名
  hash: '#hash',		  // 哈希值 对应的是页面上的锚点
  search: '?query=string', 		// 查询字符串参数
  query: 'query=string',		// 发送给http的数据 等号分割的键值称为参数串 字符串
  pathname: '/p/a/t/h',			// 访问资源的路径名
  path: '/p/a/t/h?query=string',	//  路径
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' // 没被解析的完整的超链接地址
 }
```

- 没有把第二个参数(默认为false)设置为true时，query属性为一个字符串类型

```js
url.parse("http://user:pass@host.com:8080/p/a/t/h?query=string#hash",true);
//把第二个参数设置为true，node会用queryStr方法去解析url，并将query属性变成对象
query: { query: 'string' }
```

- 若parse的第三个参数为true，解析时会将url的”//“和第一个”/“之间的部分解析为主机名

### 2、url.format(urlObj)

 将传入的url对象编程一个url字符串并返回

```js
url.format({
protocol: 'http:',
hostname:'www.baidu.com',
port:'80',
pathname :'/news',
query:{page:1}
});

返回值：
http://www.baidu.com/news?page=1
```

### 3、url.resolve(**from,to** )

 返回一个格式为”from/to”的字符串

```js
//第一个参数是域名,第二个参数是 path 路径（前面带不带 / 都行）
 url.resolve('http://www.imooc.com','/course/list?c=fe')

返回值：
'http://www.imooc.com/course/list?c=fe'
```