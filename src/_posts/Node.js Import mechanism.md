---
category: Notes

tags: 
  - Node.js

title: 'Node.js模块加载机制'

description: 'Node应用是由模块组成的，Node遵循了CommonJS的模块规范，来隔离每个模块的作用域，使每个模块在它自身的命名空间中执行。'

date: 2018-05-20

vssue-title: 'Node.js模块加载机制'
---

<!-- more -->

## 前言

**CommonJS规范的主要内容：**

> 模块必须通过 module.exports 导出对外的变量或接口，通过 require() 来导入其他模块的输出到当前模块作用域中。

**CommonJS模块的特点：**

> （1）所有代码运行在当前模块作用域中，不会污染全局作用域 。
>
> （2）模块同步加载，根据代码中出现的顺序依次加载 。
>
> （3）模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。

## 模块的创建与加载

### exports导出模块

**Module与exports对象**

```js
//创建一个js文件并打印输出module
console.log(module)

/*Module {
  id: '.',
  exports: {}, //module 对象中有一个 exports 对象
  parent: null,
  filename: 'C:\\Users\\Sunburst\\Desktop\\node.js',
  loaded: false,
  children: [],
  paths:
   [ 'C:\\Users\\Sunburst\\Desktop\\node_modules',
     'C:\\Users\\Sunburst\\node_modules',
     'C:\\Users\\node_modules',
     'C:\\node_modules' ] }
*/
```

- 每个模块中都有一个 module 对象，是所有Node.js类型的文件中都默认隐式存在的
- 把需要导出的成员都挂载到 module.exports 接口对象中，每个模块最终return 的也是 modules.exports
- 但为了简化书写，Node.js同时在每一个模块中都提供了一个成员叫：`exports`
- 即`exports === module.exports`，exports只是一个地址指向module.exports对象的引用
- 所以对于使用`moudle.exports.xxx = xxx` 的方式导出的模块，也可以通过`exports.xxx = xxx`的方式导出
- **但当一个模块需要导出单个成员的时候，则必须使用：module.exports = xxx 的方式**

**通过在exports对象上设置属性的方式来创建并导出模块**

```js
//创建foo.js文件，定义变量和方法
var foo = 'bar'

function add(x, y) {
  return x + y
}

exports.add = add
// 外部只能得到挂载到exports对象上的成员，这样做的目的是为了解决变量命名冲突的问题
// 我们也可以通过多次为这个对象添加成员实现对外导出多个内部成员
exports.str = 'hello'
```



```js
const Foo = require('./foo')
//在别的文件中通过require引入foo.js模块

console.log(Foo)
//{add: [Function:add], str:'hello'}
//默认得到的是对象 只能使用 . 点访问的方式来得到对象里的某个成员
```

**通过module.exorts的方式来创建并导出模块**

> 上面的方式可以得到模块中的方法和变量，但有时候，对于一个模块，我们的需求是仅仅导出一个方法/数组/字符串来使用就可以了。比如，只导出foo.js文件中的add方法，即Foo就是add方法，而不必通过Foo.add就能直接使用。
>
> - 当一个模块需要导出单个成员的时候，可能会想到 `exports = xxx`这种方式 ，但这种方式不行，导出的exports为空对象
> - 因为 exports 只是 module.exports 的一个引用，这样相当于给exports指向的地址重新赋值，切断了exports与module.exports之间的联系，而最终模块向外 return的是 module.exports，所以为空对象

```js
// 如果一个模块需要直接导出某个成员，而非挂载的方式，则必须使用module.exports的方式
//导出方法
module.exports = add
//function add(x, y) {
//  return x + y
//}

//导出字符串
module.exports = 'hello'

//导出对象
module.exports = {
  add: function () {
    return x + y
  },
  str: 'hello'
}
```

- 但是如果是通过：

  ```js
  exports = module.exports 
  ```

  赋给exports对象module.exports这个的值，则可以用来重新建立引用关系

  ```js
  let name = 'walker'
  let age = 12
  
  //exports = xx 重新赋值，不会影响最后导出的 module.exports
  //exports = {name,age}
  
  
  module.exports = {
    name: 'mint',
    age: 20
  }
  
  // 重新建立 exports 和 module.exports 之间的引用关系
  exports = module.exports
  
  exports.foo = 'bar'
  //此时导出的对象为 { name: 'mint', age: 20, foo: 'bar' }
  ```

### require加载模块

```js
const 自定义变量名 = require('模块')
```

另外require 方法有两个作用：

> 1. 加载文件模块并执行里面的代码
> 2. 拿到被加载文件模块导出的接口对象

**require优先从缓存中加载模块**

目的是为了避免重复加载，提高模块加载效率

```js
//a.js文件
console.log('a.js 被加载了')
var fn = require('./b')

console.log(fn)

//b.js文件
console.log('b.js 被加载了')

module.exports = {
  name:'b.js'
}

//main.js文件
require('./a')
var fn2 = require('./b')

console.log(fn2)
```

1. 通过执行`node main.js`，首先加载a.js文件（放入缓存）并执行a.js文件中的代码
2. 打印输出： a.js 被加载了，然后加载b.js文件（放入缓存）并执行b.js文件中的代码
3. 打印输出： b.js 被加载了，然后导出 “Hello ,I’m b.js.”
4. 继续执行a.js文件中的代码，将b.js文件导出的对象赋值给fn，然后打印输出fn
5. 再执行main.js文件中的代码，但此时并不会重复加载执行b.js文件里面的代码（优先从缓存中加载）
6. 把从缓存中拿到b.js文件的接口对象赋值给fn2，然后打印输出fn2

```js
//运行结果
a.js 被加载了

b.js 被加载了
{ name: 'b.js' }

//这里没有再打印一遍b.js文件被加载了
//说明只是从缓存取到b.js导出的接口对象，但并没有再执行b.js文件里的代码
{ name: 'b.js' }
```

## 模块查找机制

### 模块标识符分析

1. 核心模块（require(‘fs’)）：
   - 核心模块文件已经被编译成二进制文件放进node.js中了
   - 不需要写加载路径，只需要按照名字来加载就可以了
2. 路径形式的自定义模块（require(‘../utils/foo.js’)）：
   - `/xxx` `d:/files/foo.js` 几乎不用
   - 首位的 / 在这里表示的是当前文件模块所属磁盘根路径
   - `./` 当前目录 `../`上一级目录，不可省略
3. 第三方模块（require(‘express)）：
   - 第三方模块都必须通过 npm 来下载
   - 不可能有任何一个第三方包和核心模块的名字是一样的

### 模块查找机制

优先从缓存加载

核心模块

路径形式的自定义文件模块

第三方模块

> 1. 先找到当前文件所处目录中的 node_modules 目录
> 2. node_modules/express
> 3. node_modules/express/package.json 文件
> 4. node_modules/express/package.json 文件中的 main 属性
> 5. main 属性中就记录了 express的入口模块
> 6. 然后加载使用这个第三方包
>
> ------
>
> - 如果 package.json 文件不存在或者 main 指定的入口模块也没有
> - 则 node 会自动找该目录下的 index.js（默认备选项）
>
> ------
>
> - 如果以上所有任何一个条件都不成立，则会进入上一级目录中的 node_modules 目录查找
> - 如果上一级还没有，则继续往上上一级查找……
> - 如果直到当前磁盘根目录还找不到，最后报错： `can not find module xxx`
> - 注意： 我们一个项目有且只有一个 node_modules，放在项目根目录中，这样的话项目中所有的子目录中的代码都可以加载到第三方包，不会出现有多个 node_modules