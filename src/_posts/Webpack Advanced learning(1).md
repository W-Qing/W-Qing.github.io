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
然后遵循不重复原则 (Don't repeat yourself - DRY)，创建一个 webpack.common.js 文件来报存两种环境下的通用配置。

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

### 入口起点

代码分离最简单的方法就是通过手动配置 webpack 的入口起点来实现。

```javascript
// 在 src 下新建一个 lodash.js 并将 lodash 挂载到全局
import _ from 'lodash';
window._ = _;

// 配置入口起点
entry: {
    index: './src/index.js',
    lodash: './src/lodash.js' // 打包 lodash.js
}
```

然后重新运行打包命令，会发现 dist 下多出一个单独打包 lodash 工具函数库代码的 lodash.js，且打包后的 index.html 里也能自动引入。

但这种方式存在一些隐患：

- 如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
- 这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来。

这两点中的第一点，对我们的示例来说毫无疑问是个严重问题，因为我们如果在 `./src/index.js` 中也引入 `lodash`，这样就造成在两个 bundle 中重复引用。我们可以通过使用 [`SplitChunksPlugin`](https://webpack.docschina.org/plugins/split-chunks-plugin/) 插件来移除重复模块。

### 去除重复

其实，本质上 Code Splitting 只是一个分割代码的概念，与 webpack 没有直接关系。但之所以说它是 webpack 的特性是因为 webpack4 里面直接捆绑了`SplitChunks`这样的插件，我们不用再手动配置或是安装其他插件就可以很方便的实现代码分割。

```javascript
optimization: {
	splitChunks: {
    chunks: 'all'
  }
}
```

该插件可以将公共的依赖模块提取到已有的 entry chunk 中，或者提取到一个新生成的 chunk。比如通过设置配置文件的`optimization.splitChunks`选项，此插件将 `lodash` 这个沉重负担从主 bundle 中移除，然后分离到一个单独的 chunk 中，同时将项目中重复的依赖项删除掉。

另外一些由社区提供，对于代码分离很有帮助的 plugin 和 loader：

- [`mini-css-extract-plugin`](https://webpack.docschina.org/plugins/mini-css-extract-plugin)：用于将 CSS 从主应用程序中分离。
- [`bundle-loader`](https://webpack.docschina.org/loaders/bundle-loader)：用于分离代码和延迟加载生成的 bundle。
- [`promise-loader`](https://github.com/gaearon/promise-loader)：类似于 `bundle-loader` ，但是使用了 promise API。

### 动态引入

当涉及到对动态引入的代码进行拆分时，webpack 推荐选择的方案是：使用符合 [ECMAScript 提案](https://github.com/tc39/proposal-dynamic-import) 的 [`import()` 语法](https://webpack.docschina.org/api/module-methods#import-) 来实现动态导入。👉🏻[dynamic imports](https://webpack.docschina.org/guides/code-splitting/#动态导入-dynamic-imports-)

```javascript
// 动态引入 lodash 的 demo 
function getComponent() {
  // Lodash, now imported by this script
	return import('lodash').then(({ default: _ }) => {
		var element = document.createElement('div');
		element.innerHTML = _.join(['Hello', 'webpack'], '🎉');
		return element;
	}).catch(
    error => 'An error occurred while loading the component');
}

getComponent().then(component => {
	document.body.appendChild(component);
})
```

由于 `import()` 会返回一个 promise，因此它可以和`async`一起使用。但是，需要使用像 Babel 这样的预处理器和 [Syntax Dynamic Import Babel Plugin](https://babel.docschina.org/docs/en/babel-plugin-syntax-dynamic-import/#installation)。

```javascript
async function getComponent() {
  var element = document.createElement('div');
  
  // Notice the default
  const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
```

> `/*webpackChunkName: "lodash"*/` ：import() 语法的魔法注释，为动态引入的模板设置打包后的文件名。

## Lazy Loading 懒加载

懒加载或者按需加载，并不是 webpack 里的概念，而是一种很好的优化网页或应用的方式。借助 EcmaScript 的 import() 实验性质语法的支持，从而实现先把代码在一些逻辑断点处分离开，然后在代码块中完成某些操作后，再引用另外一些新的代码块。

通过懒加载，页面可以在执行的时候需要哪个模块再去请求对应模块的源代码（因为某些代码块可能永远不会被加载），而不是一次性地把所有代码都加载到页面上，减小了总体体积，所以可以加快应用的初始加载速度。

```javascript
// 利用懒加载，只有页面被点击后才会加载 lodash
document.addEventListener('click', () => {
  getComponent().then(component => {
    document.body.appendChild(component);
  })
})
```

## SplitChunksPlugin 配置

上面👆我们通过设置 SplitChunksPlugin 的`splitChunks.chunks`配置就实现了去除重复依赖项以及同步与异步动态引入代码的打包分离。

这是该插件的默认配置：

```javascript
optimization: {
	splitChunks: {
  	chunks: 'async',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
    	vendors: {
      	test: /[\\/]node_modules[\\/]/,
        priority: -10,
        filename: 'vendors.js'
      },
      default: {
      	minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }
}
```

**chunks：** async 只对异步引入的模块进行打包分离，initial 同步，all 两者都可。

**minSize/maxSize：** 模块的文件大小范围。

**minChunks：** 打包生成的 chunks 至少有几个引用了该模块，符合条件的模块才会被分离。

**maxAsyncRequests：** 同时加载的模块数，后续超出部分的模块不会被分离。

**maxInitialRequests：** 入口文件引用模块代码分离的上限数。

**automaticNameDelimiter：** 生成的文件名默认连接符。

**name：** 使下面设置的 filename 生效，从而可以为生成的文件重命名。

**cacheGroups：** 缓存组 打包同步引入的代码时必须配合这个配置项一起使用才能生效，它决定分离出来的代码到底要放到哪个文件里面。vendors 为默认的分组名，test 为模块来源，priority 当前组的优先级，先放入优先级高的分组下的文件里。reuseExistingChunk 忽略已打包过的模块，直接复用。

想要更好的控制代码分离的流程，请查阅 [SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin/)。

## Prefetch 和 Preload

既然我们通过将`splitChunks.chunks`字段配置成 all 之后，可以同时对同步与异步代码进行分割，将 loadash、jQuery 等代码单独分割打包生成一个文件。在第一次加载后，再次访问就可以使用浏览器缓存来提高访问速度。

**那为什么 webpack 还要将其默认值设为`async,`只对异步代码进行分割打包呢？**

这是因为按照我们的上述配置，只通过将 jQuery、loadash 打包成单独的文件，加载后使用缓存只能提高第二次及以后再访问这些文件时的速度，而不能真正对页面访问性能做优化。webpack 所希望达到的效果是第一次访问页面时，它的速度就是最快的。

```js
document.addEventListener('click', () => {
	const element = document.createElement('div');
	element.innerHTML = 'Bingo!!!';
	document.body.appendChild(element);
})
```

比如这样一段代码，在页面加载之后，我们可以在 Chrome 控制台通过查看到 Sources 源文件里代码的执行情况以及 Coverage 的 Unused Bytes 覆盖率。 其中点击回调方法里的代码是需要点击之后才会被覆盖执行到的。

如果想提高页面核心代码的利用率，我们可以将那些交互之后才用到的代码方法封装到另外一个文件中，再在需要执行的时候将其加载进来。

```js
// 将点击的回调方法封装进 click.js
function handleClick() { 
  const element = document.createElement('div');
	element.innerHTML = 'Bingo!!!';
	document.body.appendChild(element);
}
export default handleClick;
// index.js
document.addEventListener('click', () => {
	// 这里通过 default 来拿到导出的方法后重命名为 func
	import('./click.js').then(({default: func}) => {
		func();
	})
})
```

由此可见，webpack 认为只有这种异步的组件才能真正的提升网页的打包性能。而同步的代码模块只能增加一个缓存，而对性能的提升是有限的。即我们**在做前端代码性能优化的时候，最重要的点其实不是缓存，而是 Code Coverage 代码覆盖率。即缓存带来的代码性能提升是非常有限的，而应该通过提高页面核心代码的覆盖和利用率，从而提升代码性能与页面加载速度。**

一些网站的登录模态框功能就是使用这种方式去实现的，但是如果我们只在点击后才去加载登录相关的代码，加载速度有可能会比较慢，影响用户体验。那么此时就需要用到 webpack [预取 prefetching 和预加载 preloading 模块](https://webpack.docschina.org/guides/code-splitting/#预取-预加载模块-prefetch-preload-module-)) 的功能。从而既能提高首页核心代码的加载速度，同时也可以在页面展示完成后将登陆功能的代码加载进来，保证用户点击登录后的快速响应。

```js
import(/* webpackPrefetch: true */ './click.js').then(({default: func}) => {
		func();
	})
```

通过加入`/* webpackPrefetch: true */`后我们就可以等待页面核心代码加载完成之后，浏览器带宽闲置时再去懒加载 prefetch 对应的文件。

至于 webpackPreload，与 webpackPrefetch 不同的一点就在于它是和业务代码主线程一起去加载的。

> 这里也并不适用 webpackPreload，关于两者细节的区别请查看文档。另外不正确地使用 webpackPreload 也会有损性能。

## 打包分析

当我们使用 webpack 对各种模块代码进行了分离打包之后，理所应当应该利用一些打包分析的工具来对输出的结果进行检查，分析是否合理。

使用 [webpack 官方打包分析工具](https://github.com/webpack/analyse) 生成一个打包分析的说明文件 stats.json，然后可以上传到 [这里](http://webpack.github.com/analyse) 上查看结果。

```js
// package.json
"scripts": {
  // 可以在 build 字段中加入 --profile --json > stats.json 
  "build": "webpack --profile --json > stats.json --config webpack.prod.js",
  // 也可以专门添加一条生成分析文件的指令
  "analyse": "webpack --profile --json  > stats.json"
},
```

其他一些打包分析的可视化工具：

- [webpack-chart](https://alexkuz.github.io/webpack-chart/)：webpack stats 可交互饼图。
- [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/)：可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)：一个 plugin 和 CLI 工具，它将 bundle 内容展示为便捷的、交互式、可缩放的树状图形式。
- [webpack bundle optimize helper](https://webpack.jakoblind.no/optimize)：此工具会分析你的 bundle，并为你提供可操作的改进措施建议，以减少 bundle 体积大小。

## CSS 代码分离

上面我们已经实现了对项目引用的一些 JS 代码进行分离打包，但是 CSS 代码依然还是被打包进了 JS 文件里 (css-in-js) 。

要想对 CSS 文件也进行分离打包，可以使用 [MiniCssExtractPlugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin/) 。

但目前这个插件还不支持 HMR，所以我们只是在线上环境使用。

使用`yarn add mini-css-extract-plugin -D`完成安装后，配置 webpack 线上环境的文件。

```js
// webpack.prod.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // 可选参数
      filename: "[name].css",
      chunkFilename: "[name].chunk.css"
    })
  ],
  module: {
    rules: [
    	{
      	test: /\.(css|scss)$/,
        use: [
          // 与开发环境使用 style-loader 不同，这里要使用 MiniCssExtractPlugin 的 loader
        	MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  }
}
```

如果想对打包后的 css 文件代码进压缩可以使用官方推荐的 [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)(Webpack5 已内置）

其他关于多入口的时候打包对应 CSS 的需求，配置相关的`optimization.splitChunks.cacheGroups`即可实现。

## Caching 缓存

目前我们每次打包后生成的文件都是按以下格式来配置的：

```js
output:{
	// 使用占位符来命名即项目直接引用的 app.js
	filename:"[name].js",
	// 代码在 node-modules 下的模块打包生成的 chunks 会按照这个格式命名
 	chunkFilename: "[name].chunk.js"
}
```

这样有一个问题，就是如果我们更改了源代码，将重新打包生成的文件放到服务器之后。在浏览器端去请求时，会因为本地有缓存的同名文件，而不会去使用最新上传服务器的文件，导致最新代码无法生效。

开发环境下我们不需要关心缓存的问题，因为 HMR 会为我们解决这个问题，所以我们只需要使用`[contenthash]`占位符修改一下生成环境的打包配置。

```js
output:{
	filename:"[name].[contenthash].js", 
	// app.6df1cf350155facd60f5.js
	chunkFilename: "[name].[contenthash].js"
	// lodash.96223b700cd12e8a3a4d.js
}
```

使用一串哈希值为文件内容添加上一个标识，这样只要我们的源代码不发生改变，打包后的文件名就不会变。相应的，如果源代码发生变动，文件名的hash值也会发生改变。从而解决本地缓存的问题。

> 一些因为旧版本的boilerplate(引导模板)，特别是 runtime 和 manifest引起的，不改动源代码，文件名却发生变化的问题，查看官网具体[最佳方案](https://webpack.docschina.org/guides/caching/#提取引导模板-extracting-boilerplate-)解决。