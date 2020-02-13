---
category: Notes

tags: 
  - Webpack

title: 'Webpack 进阶学习（一）'

description: '入门了 Webpack4.0，然后是对一些进阶概念的学习与理解的笔记。 '

date: 2019-09-06

vssue: false

vssue-title: 'Webpack 进阶学习（一）'

---

<!-- more -->

## Entry 与 Output 的基础配置

通过 [《webpack 快速入门》](https://sunburst.wang/posts/2018/12/28/webpack-quick-start.html) 的基础学习，已经了解到应用程序通过 webpack 执行打包的入口 entry 及文件输出 output。它们的默认值分别是 `'./src'` 和 `main.js`。

但如果我们的项目是一个可能会有多个入口文件的多页面的应用。

```javascript
entry: {
    home: './home.js',
    about: './about.js',
    contact: './contact.js'
  }
```

那么此时 output 下的配置也要进行相应的更改。最简单的方式就是通过占位符去设置打包输出的文件名。

```javascript
output: {
  publicPath: 'http://cdn.com' // 或指定目录 '/assets/',
  filename: '[name].js' // name 占位符
}
// 打包输出 home.js、about.js、contact.js
```

很多时候我们可能会将打包生成的文件给后端或者将资源托管到 CDN 时。那么我们在打包生成的 html 文件内去引用这些文件就需要一个指定的 URL 前缀。打包后的文件在 html 内的引用方式会如下所示：

```html
<script src="http://cdn.com/about.js"></script>
```

查阅文档，学习更多 [entry](<https://webpack.docschina.org/configuration/entry-context/#entry>) 与 [output](<https://webpack.docschina.org/configuration/output/>) 的配置参数以及 [Output Management](<https://webpack.docschina.org/guides/output-management/>) 的知识。

## Source Map 的配置

当 webpack 打包源代码时，可能会很难追踪到 error（错误） 和 warning（警告） 在源代码中的原始位置。

例如，如果将三个源文件（`a.js`, `b.js` 和 `c.js`）打包到一个 bundle（`bundle.js`）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会直接指向到 `bundle.js`。你可能需要准确地知道错误来自于哪个源文件，所以这种提示这通常不会提供太多帮助。

为了更容易地追踪 error 和 warning，JavaScript 提供了 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 功能（一个映射关系），可以将编译后的代码映射回原始源代码。

通过设置 webpack 的 devtool 属性就可以配置 Scource Map。

```javascript
// ...
mode: 'development', // 开发环境
devtool: 'source-map', // 默认为 none
```

重新打包后，如果有报错或者警告信息那么就可以通过控制台提示定位到对应位置的代码。

同时 dist 目录下会增加一个 `bundle.js.map` 文件。打包后的文件代码与源代码就是通过这个文件进行映射的。

查看文档，webpack 提供了十几种 [source map](<https://webpack.docschina.org/configuration/devtool/>) 的配置格式。其中：

1. `inline-source-map`

   效果与 source map 一致，区别在于这种方式不会生成 map 文件，而是将其映射关系的内容通过 dataUrl 的方式直接写入到打包后的 bundle.js 文件底部。

2. `inline-cheap-source-map`

   上面提到的配置格式，在提示错误和警告信息的时候，会帮我们精确到项目文件代码中的具体某行某列。

   而加了 cheap 之后，它只会精确到行，而不会精确到哪一列。同时，它会只关心我们写的业务代码，不再关心其他部分的代码，所以这种方式的构建过程就会变得比较快。

3. `inline-cheap-module-source-map`

   如果我们在 cheap 的基础上还想让 webpack 为我们提供 loader、第三方模块等部分代码的错误信息，那么可以加上 module 关键字。

4. `eval`

   效果与 source map 的方式是一样的，但是 dist 目录下不会生成 map 文件，同时 bundle.js 文件底部也没有 Base64 的 dataUrl 字段。但是有一个 eval() 方法，所以它是通过 eval 的 js 执行形式来生成 source map 的对应关系的。

   这种方式是执行效率最快，性能最好的方式，但缺点是针对于比较复杂的代码情况下，不能正确的显示行数。

**最佳实践：**

- 开发环境 development: `cheap-module-eval-source-map`
- 生成环境 production: `none` 或 `cheap-module-source-map`
- 或者使用 [SourceMapDevToolPlugin](https://webpack.docschina.org/plugins/source-map-dev-tool-plugin) 进行更细粒度的配置。(*切勿和 devtool 选项同时使用* )

## 模块热更新 Hot Module Replace

在我们使用 webpack-dev-server 实现代码的热加载之后，每次源代码有改动，这个本地服务器就会自动帮我们打包并刷新浏览器。这确实很方便，但其实有时候我们其实却并不希望它去刷新页面。

> 比如，我们在页面上通过很多的点击交互操作，最终在页面显示出一个特定列表。然后为了修改列表项样式，我们对源代码做了更改。如果此时 webpack-dev-server 帮我们自动刷新浏览器页面了，那我们就需要再重新进行一遍点击操作才能看到更改样式后的列表… 😟

此时我们就可以使用 webpack-dev-server 的模块热更新功能 (HMR)。

1. 修改 devServer 配置项

```js
devServer: {
  port: 8086,
  hot: true, // 开启 hmr 功能
  hotOnly: true // 可选，意思是即使 hrm 不生效，浏览器也不刷新
},
```

2. 引入 HotModuleReplacementPlugin 插件 (webpack 自带）

```js
// 先引入 webpack
const webpack = require('webpack');
//...
plugins:[
	new HtmlWebpackPlugin({
		template: './src/index.html'
	}),
  // 使用插件
	new webpack.HotModuleReplacementPlugin()
]
```

3. 重启一下`npm start` 使修改后的配置文件生效

关于热模块替换的更多用法指南、及实现原理、API 用法可以翻阅以下文档：

[指南](https://webpack.docschina.org/guides/hot-module-replacement/)、[概念](https://webpack.docschina.org/concepts/hot-module-replacement)、[API](https://webpack.docschina.org/api/hot-module-replacement)

## Tree Shaking

开发过程中我们经常会需要 import 一些外部的公共方法来实现方法复用，但我们大多数时候都是只需要这个公共方法模块里的几个方法，而不是全部。借助 Tree Shaking，我们就可以将模块中没有用到的方法摇晃掉。

> Tree Shaking 只支持 ES module 这种静态的 import 的模块引入方式，而不支持 common js 动态的 require 引入方式。

**配置：** 默认的开发模`mode: 'development'`  是没有 tree shaking 功能的，要想加上 tree shaking 首先在配置文件中加入 optimization 配置项。

```javascript
{
  plugins: [
    //...
  ],
  optimization: {
    usedExports: true // 只将使用到的导出模块进行打包
  },
}
```

但是这样会可能遗漏掉那些不导出任何内容的模块。实际上，只要 import 引入一个模块，Tree Shaking 就会检查这个模块导出了什么，代码引用了什么，如果没有导出或者没有引用，就会忽略这个模块引入。

比如`@babel/poly-fill `这种只是单纯地在 window 对象上绑定了一些全局变量而不导出内容的模块，或者是代码里引入的一些 CSS、SCSS 样式文件。

此时要在 package.json 中加入`sideEffects`配置，将这些需要特殊处理的模块放进一个数组里。

```javascript
{
  "name": 'webpack-demo',
  "sideEffects": [
    "@babel/poly-fill",
    "*.css",
    "*.scss"
  ]
  // 如果业务逻辑里没有要特殊处理的模块就直接将 sideEffects 设为 false
  // "sideEffects:false"
}
```

其实 Development 模式下，即使我们配置了 tree shaking ，它也不会将你不用的代码从打包后的 main.js 中剔除掉，而只是在注释中提醒你一下。🌚

这是因为我们在开发环境生成的代码一般都需要做一些调试，如果 tree shaking 把一些代码删除掉的话，sourceMap 代码对应的一些行数就会错误，所以开发环境下的 tree shaking 还会保留这些代码。但是如果我们真正的要将项目打包上线，将 mode 改为 production，那么它就会生效了。但同时要注意这时我们的 devtool 属性在生成环境一般都使用`cheap-module-source-map`而不是带 eval 的配置。

另外在生产环境下，我们甚至都不用写上面的 optimization 配置，它会默认按这个配置去执行。但是 sideEffects 还是要自己配置的。🤪

## 开发与生产模式的配置

由上可见，开发环境与线上生产环境的配置在很多地方是有区别的。为了方便起见，我们也可以编写两份不同的配置文件，来实现两种环境的切换。

```javascript
// package.json 文件
"scripts": {
  // "start": "webpack-dev-server --open"  开发环境
  "dev": "webpack-dev-server --config webpack.dev.js",
  // "build": "webpack --mode development" 生产环境
  "build": "webpack --config webpack.prod.js"
}
```
然后遵循不重复原则(Don't repeat yourself - DRY)，创建一个 webpack.common.js 文件来报存两种环境下的通用配置。

然后再安装使用`cnpm i webpack-merge -D`将这些配置合并在一起。此工具会引用 "common" 配置，因此我们不必再在环境特定的配置中编写重复代码。

```javascript
// webpack.prod.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const prodConfig = {
    mode: 'production',
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ]
}
module.exports = merge(commonConfig, prodConfig)
```

也可以将这些新加的配置文件统一放入一个 build 文件夹内，但同时要注意修改各个配置文件及 package.json 里 script 字段的文件路径。

## 代码分离 Code Splitting

webpack 默认会根据配置将我们项目的代码都打包到 output 的文件中，但其实我们的项目代码不全是业务代码，肯定会引用一些第三方类库或者像 lodash 这样的工具函数库。如果都各种代码全都打包到一个 JS 文件输出，不仅页面加载这个文件时不仅会很慢，而且一旦业务代码有任何改动，下次访问就需要重新获取。

所以我们需要将代码进行分离，然后将不同的代码打包到多个文件输出，这样下次访问时因为浏览器的缓存机制，没有变动的代码文件便不用去重新获取。

> 代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

- 代码分离最简单的方法就是通过手动配置 webpack 的**入口起点**来实现。

```javascript
// 在src下新建一个 lodash.js 并将 lodash 挂载到全局
import _ from 'lodash';
window._ = _;

// 配置入口起点
entry: {
    index: './src/index.js',
    lodash: './src/lodash.js' // 打包 lodash.js
}
```

然后重新运行打包命令，会发现 dist 下多出一个单独打包 lodash 工具函数库代码的 lodash.js。



