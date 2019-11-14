---
category: Notes

tags: 
  - Webpack

title: 'Webpack进阶学习(一)'

description: '入门了Webpack4.0，然后是对一些进阶概念的学习与理解的笔记。 '

date: 2019-09-06

vssue: false

vssue-title: 'Webpack进阶学习(一)'

---

<!-- more -->

## Entry 与 Output 的基础配置

通过[《webpack快速入门》](https://sunburst.wang/posts/2018/12/28/webpack-quick-start.html)的基础学习，已经了解到应用程序通过 webpack 执行打包的入口 entry 及文件输出 output。它们的默认值分别是 `'./src'` 和 `main.js`。

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

当 webpack 打包源代码时，可能会很难追踪到 error(错误) 和 warning(警告) 在源代码中的原始位置。

例如，如果将三个源文件（`a.js`, `b.js` 和 `c.js`）打包到一个 bundle（`bundle.js`）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会直接指向到 `bundle.js`。你可能需要准确地知道错误来自于哪个源文件，所以这种提示这通常不会提供太多帮助。

为了更容易地追踪 error 和 warning，JavaScript 提供了 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 功能(一个映射关系)，可以将编译后的代码映射回原始源代码。

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

## Hot Module Replace 热模块更新

在我们使用 webpack-dev-server 实现代码的热加载之后，每次源代码有改动，这个本地服务器就会自动帮我们打包并刷新浏览器。这确实很方便，但其实有时候我们其实却并不希望它去刷新页面。

> 比如，我们在页面上通过很多的点击交互操作，最终在页面显示出一个特定列表。然后为了修改列表项样式，我们对源代码做了更改。如果此时 webpack-dev-server 帮我们自动刷新浏览器页面了，那我们就需要再重新进行一遍点击操作才能看到更改样式后的列表… 😟

此时我们就可以使用 webpack-dev-server 的热模块更新功能(HMR)。

1. 修改 devServer 配置项

```js
devServer: {
  port: 8086,
  hot: true, // 开启 hmr 功能
  hotOnly: true // 可选，意思是即使 hrm 不生效，浏览器也不刷新
},
```

2. 引入 HotModuleReplacementPlugin 插件(webpack 自带)

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

将模块中用不到的方法摇晃掉

tree shaking 只支持静态的 import 的 ES module方式的引入

而不支持动态的 require 的 common js的引入方式

配置：

默认的 development 的mode 是没有 tree shaking 功能的

要想加上 tree shaking 首先在配置文件中加入optimization 配置项

```javascript
{
  plugins: [
    //...
  ],
  optimization: {
    usedExports: true // 只讲使用到的导出模块进行打包
  },
}
```

但是这样会可能遗漏掉那些不导出任何内容的模块，比如@babel/poly-fill 

此时要在package.json中加入“sideEffects”配置项，将那些需要特殊处理的模块放进去

```javascript
{
  "name": 'webpack-demo',
  "sideEffects": ["@babel/poly-fill"]
  // 如果业务逻辑里没有要特殊处理的模块就直接讲sideEffects设为false
  // "sideEffects:false"
}
```

一般需要处理的还有"*.css"或者

是"*.scss"

Development 模式下 即使你配置了 tree shaking ，他也不会将你不用的代码从打包后的main.js中剔除掉，而只是在注释中提醒你一下。这是因为我们在开发环境生成的代码一般都需要做一些调试，如果tree shaking把一些代码删除掉的话，sourceMap 代码对应的一些行数就会错误，所以开发环境下的tree shaking还会保留这些代码。但是如果我们真正的要将项目打包上线，将 mode 改为 production ，那么它就会生效了。但同时要注意这时我们的devtool属性在生成环境一般都使用 cheap-module-source-map 而不是带eval的配置。

其实在生产环境下 我们甚至都不用写上面的optimization 配置，它会默认按这个配置去执行。但是sideEffects还是要自己配置的



## Code Splitting



