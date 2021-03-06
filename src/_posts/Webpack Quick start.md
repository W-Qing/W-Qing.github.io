---
category: Notes

tags: 
  - Webpack

title: 'Webpack快速入门'

description: '虽然在项目中也经常使用Webpack，但是自己没有认真梳理过它的用法，写篇文章记录下。'

date: 2018-12-28

vssue: false

vssue-title: 'Webpack快速入门'

---

<!-- more -->

## 什么是 Webpack？

自从出现前端模块化以后，我们就可以将原本是一坨的代码分离到一个个的模块中。但是由此引发了一个问题，每个 JS 文件都需要浏览器通过网络请求向服务器去获取，这样会导致页面加载速度变慢。

Webpack 最主要的目的就是为了解决这个问题，将项目中所有应用的文件和模块打包成一个或多个大文件。官网的图片就很好的诠释了这个事情：👇

![webpack](/articleImg/webpack.png)



🗿**WebPack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)：**

它会分析你的项目结构，找到 JavaScript 模块以及其它的一些浏览器不能直接运行的扩展语言(如 ES6、TypeScript、Sass 等)，将其转换和打包为合适的格式后供浏览器使用。

## Webpack 有什么作用？

当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

**构建**就是把源代码转换成发布到线上可执行的 JavaScript、CSS、HTML 代码，包括以下内容：

- **代码转换**：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等
- **文件优化**：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等
- **代码分割**：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载
- **模块合并**：在采用模块化的项目有很多模块和文件，需要构建功能把模块分类合并成一个文件
- **自动刷新**：监听本地源代码的变化，自动构建，刷新浏览器
- **代码校验**：在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过
- **自动发布**：更新完代码后，自动构建出线上发布代码并传输给发布系统

 构建其实是工程化、自动化思想在前端开发中的体现。把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。😎

## webpack 的基本概念

**[入口(entry point)](https://link.juejin.im/?target=https%3A%2F%2Fwww.webpackjs.com%2Fconcepts%2Fentry-points%2F)**

指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始，webpack 会找出有哪些模块和 library 是入口起点（直接和间接）依赖的。

> 默认值是 `./src/index.js`，然而，可以通过在 webpack 配置中配置 entry 属性，来指定一个不同的入口起点（或者也可以指定多个入口起点）。

**[出口(output)](https://link.juejin.im/?target=https%3A%2F%2Fwww.webpackjs.com%2Fconcepts%2Foutput%2F)**

告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件。

> 主输出文件默认为 `./dist/main.js`，其他生成文件的默认输出目录是 `./dist`

**[加载器(loader)](https://link.juejin.im/?target=https%3A%2F%2Fwww.webpackjs.com%2Fconcepts%2Floaders%2F)**

让 webpack 能够去处理那些非 JavaScript 文件（webpack 本身只能加载 JavaScript/JSON 模块）。loader 可以将所有类型的资源文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

> loader 本身是一个函数，接受源文件作为参数，返回转换后的结果。注意，loader 能够 import 导入任何类型的模块（例如 .css 文件），这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持。我们认为这种语言扩展是有很必要的，因为这可以使开发人员创建出更准确的依赖关系图。

**[插件(plugins)](https://link.juejin.im/?target=https%3A%2F%2Fwww.webpackjs.com%2Fconcepts%2Fplugins%2F)**

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

> 常用插件：
>
> - CleanWebpackPlugin：自动清除指定文件夹资源
> - HtmlWebopackPlugin：根据模板自动生成 html 并引入 script 脚本
> - UglifyJSPlugin：压缩 JS 代码

**[模式(mode)](https://link.juejin.im/?target=https%3A%2F%2Fwww.webpackjs.com%2Fconcepts%2Fmode%2F)**

通过设置`mode`参数来选择 development(开发环境) 或 production(生产环境) 生产环境之中的一个，从而启用相应模式下的 webpack 内置的优化。

> 简单来说，开发时可能需要打印 debug 信息，还有定义 `sourcemap` 、`UglifyJSPlugin`文件，而生产环境是用于线上的即代码都是压缩后，运行时不打印 debug 信息等。譬如 axios、antd 等我们的生产环境中需要使用到那么我们应该安装该依赖在生产环境中，而 `webpack-dev-server` 则是需要安装在开发环境中。

👾 **webpack 构建过程：** 🏗

1. 从 Entry 里配置的 Module 开始递归解析 Entry 依赖的所有 Module。
2. 每找到一个 Module， 就会根据配置的 Loader 去找出对应的转换规则。
3. 每找到一个 Module， 就会根据配置的 Loader 去找出对应的转换规则。
4. 这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk(编码块)。
5. 最后 Webpack 会把所有 Chunk 转换成文件输出。
6. 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。

## WebPack VS Grunt/Gulp？

**其实 Webpack 和另外两个并没有太多的可比性，Gulp/Grunt 是一种能够优化前端开发工作流程的工具，而 WebPack 是一种模块化的解决方案，不过 Webpack 的优点使它在很多场景下可以替代 Gulp/Grunt 类的工具。**

### Grunt 和 Gulp 的工作方式

在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，这个工具之后可以自动替你完成这些任务。

![Grunt和Gulp的工作流程](/articleImg/gulp工作流程.png)


### Webpack 的工作方式

把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack 将从这个文件开始找到你的项目的所有依赖文件（如：component.js 、helper.js ），然后将这些模块使用不同的 loaders（第三方包）来处理它们，最后打包为一个浏览器可识别的 JavaScript 文件。（如：app.js）👇

![webpack的工作流程](/articleImg/webpack工作流程.png)

## 搭建前端开发环境

在明白了 Webpack 的概念之后，我们现在一步步的开始简单的使用 Webpack4.0+ 搭建基本的前端开发环境。👨🏻‍💻

**主要包括以下几个方面：**

- 打包构建发布需要的 HTML、CSS、JS、图片等资源
- 配置 babel 转码器， 使用 es6+语法
- 使用 CSS 预处理器，这里使用 scss
- 处理和压缩图片
- 配置热加载，HMR

### 安装命令

```bash
# 卸载默认： 
npm uninstall webpack
# 全局安装：
npm install webpack -g
# 局部安装： 
npm install webpack webpack-cli --save-dev
# 将 webpack 和 webpack-cli 放入项目开发环境依赖中
```

> - **不推荐全局安装，它会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。** ⚠️
> - webpack 即 webpack 核心库。它提供了很多 [API](https://webpack.js.org/api/node/), 在 Node.js 脚本中通过  `require('webpack')` 的方式来使用 webpack。
> - webpack-cli 是 webpack 的命令行工具。让我们可以不用写打包脚本，只需配置打包配置文件，然后在命令行输入 `webpack-cli --config webpack.config.js` 来使用 webpack, 简单很多。webpack 4 之前命令行工具是集成在 webpack 包中的，4.0 开始 webpack 包本身不再集成 cli。**简单来说，如果不安装 webpack-cli 这个包，我们就没办法在命令行中使用 webpack 里的各种命令。** 🤷🏻‍♂️
> - webpack-serve (非必需) 是 webpack 提供的用来开发调试的服务器，让你可以用 <http://127.0.0.1:8080/> 这样的 url 打开页面来调试，有了它就不用配置 [nginx](https://nginx.org/en/) 了，方便很多。 🍻

### 准备工作

```bash
# 1. 新建一个空的练习文件夹
mkdir  webpack-demo
cd webpack-demo

# 2. 创建 package.json 
# npm 的说明文件,包括当前项目的基本信息，依赖模块，自定义的脚本任务
npm init 
# 这里会问一些问题，可以直接回车跳过或者 npm init -y

# 3. 局部安装
npm i webpack webpack-cli -D

# 4. 创建项目代码文件夹src
mkdir src
cd src

# 5. 创建项目入口文件
touch index.html
touch index.js
```

index.html入口页面：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Webpack 学习</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

index.js 入口文件：

```javascript
let testStr = 'Hello World, this is a webpack-demo.'
document.getElementById('root').innerText = testStr
console.log(testStr)
```

### 自定义配置文件

其实 webpack 从 v4.0.0 开始已经可以一个配置文件都不写，实现**零配置** (使用默认配置文件)。😶

比如我们此时在终端执行`npx webpack`，发现 webpack 已经把 src/index.js 文件里的内容打包生成到了 dist (将来部署到服务器上的文件夹)目录 mian.js 文件里。

![npx webpack](/articleImg/npxwebpack.png)

**🤖关于如何运行webpack:**

- 这里直接执行 webpack 命令会提示command not found: webpack，这是因为我们之前没有将 webpack 以及 webpack-cli 进行全局安装，而是选择了在项目内局部安装。
- 项目内安装的 webpack 实际上执行的是 node_modules 目录下 .bin 目录内的 webpack.js 脚本，所以使用`node ./node_modules/.bin/webpack`就可以启动 webpack。
- **更简单点的方式就是通过 npm 的包执行器 npx，`npx command` 默认就是执行 `./node_modules` 目录中安装的可执行脚本。如果这里 webpack 未安装，它也会自动从 npm 源下载安装后再执行。(使用`npx webapck -v`命令查看此项目安装的 webpack 版本号)** 🤠
- **但是在4.0版本的 webpack 中，终端会因为未定义 webpack 的构建模式(`mode`属性)而出现 WARNING⚠️ ，所以最好的方式是在 package.json 文件的 scripts 里添加一段`"build": "webpack --mode development"`(默认 production ，会压缩打包后的代码)后使用 `npm run build` 来运行 webpack。** 👏

实际情况是，大多数项目都会需要我们对 webpack 增加更多的自定义配置信息，那么我们就需要在根目录下创建 webpack 的配置文件 `webpack.config.js` 。🙃

然后再执行 `npm run build`，webpack 就会使用我们在这个文件里定义的配置信息了。

```bash
cd webpack-demo
touch webpack.config.js
```

`webpack.config.js` 中常用的基本配置信息：

```javascript
module.exports = {
  entry: '', // 打包入口：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始
  output: '', // 出口目录
  mode: 'development', // 在这里更改了模式，就不必在package.json里再设置 --mode
  resolve: {}, // 配置解析：配置别名、extensions 自动解析确定的扩展等等
  devServer: {}, // 开发服务器：run dev/start 的配置，如端口、proxy等
  module: {}, // 模块配置：配置loader（处理非 JavaScript 文件，比如 jsx、sass、vue、图片等等）
  plugins: [] // 插件配置：打包优化、资源管理和注入环境变量
}
```

> 注意这个文件是在 node.js 中运行的，遵循`CommonJS`规范，因此不支持 ES6 的 `import` 语法。

### 配置打包入口和出口

```JavaScript
// 引入 webpack 自带的 node 核心模块
const path = require('path')

module.exports = {
    /*
    entry: {
    	main:  './src/index.js'
    }
    */
  	// 简写
  	entry:  './src/index.js',
    // 配置打包输出相关
    output: {
      // 打包输出目录，必须使用绝对地址，输出文件夹路径
      path: path.resolve(__dirname, 'dist'), // 解析路径为 ./dist
      // 入口 js 的打包输出文件名，默认为 main.js
      filename: "bundle.js" 
    }
  }
```

也可以使用下面的写法：👇

```javascript
const path = require('path')

// 重新配置入口文件路径以及出口文件路径
const PATH = {
    app:path.join(__dirname, "./src/index.js"),
    build:path.resolve(__dirname, "./dist")
}

module.exports = {
    entry:{
        //这里面的key值决定了下面name的名字叫什么
        app:PATH.app
    },
    output:{
        path:PATH.build,
        filename:"[name].js" // 即app.js
    }
  }
```

⚠️要自定义 webapck 打包后的 output 路径，必须要先引入 webpack 自带的 node 核心模块 path `const path = require('path')`。

- `path.join()` 将第一个参数和第二个参数进行链接(路径连接)，该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是 /，Windows系统是 \。
- `path.resolve() `会把一个路径或路径片段的序列参数解析为一个绝对路径， 也可以变成相对路径。
- `__dirname` 变量指的就是`webpack.config.js`这个文件所在的，当前这个目录的绝对路径。

### 打包 html 入口文件

通过上面的配置，执行`npm run build`之后我们可以发现 webpack 已经将打包入口文件 src/index.js 打包到了 dist 目录下的 bundle.js 文件里。

此时在 src/index.html 文件里引用`<script src="../dist/bundle.js"></script>`文件后在浏览器打开就能看到我们在 src/index.js 写的代码运行结果了。或者也可以将 src/index.html 移动到 dist 文件夹下，然后引入文件`<script src="./bundle.js"></script>`。

这样做也可以，但没必要。 😏 因为手动引用打包后的 js 文件显得一点都不智能，而且当我们修改配置文件里打包输出的文件名后，index.html 里的引用路径就会出错。

所以我们可以使用 [html-webpack-plugin](<https://webpack.docschina.org/plugins/html-webpack-plugin/>) 插件以 src/index.html 为模板来生成 dist/html 文件 ，并将 HTML 引用 JS 的路径和我们的构建结果自动关联起来。👏

安装：

`npm install html-webpack-plugin -D`

修改 webpack.config.js 文件：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  //...
  plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html', 
        template: './src/index.html',
      /*
      因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
      https://github.com/jantimon/html-webpack-plugin/issues/870
      */
        chunksSortMode: 'none'
      })
  ]
}
```

> template 参数指定入口 html 文件路径，插件会把这个文件作为 html 模板交给 webpack 去编译，并将构建结果储存为 html 文件到输出目录，默认文件名为 index.html。也可以通过 filename 参数指定输出的文件名。
>
> html-webpack-plugin 也可以不指定 template 参数，它会使用插件默认的 html 模板。

重新执行 npm run build ，dist 目录下会产生一个包含以下内容的 index.html 文件：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Webpack 学习</title>
</head>
<body>
    <div id="root"></div>
<script type="text/javascript" src="bundle.js"></script></body>
</html>
```

> 插件已经自动帮我们把打包后的 bundle.js 文件正确地引用到根据指定模板生成的 html 里啦。👆

### 打包 css/scss 文件

接下来如果我们希望使用 webpack 来进行构建 css 文件，那么就需要在配置文件中引入 [css-loader](<https://webpack.docschina.org/loaders/css-loader/>) 和  [style-loader](<https://webpack.docschina.org/loaders/style-loader/>) 这两个 loader 来解析和处理 css文件。

为什么要安装两个 loader，是因为前者可以让 css 文件也支持 `import`，并且会解析多个 css 文件的关系，最终把它们合并成一段 css。后者可以将解析出来的 css 通过 `style` 标签的形式插入到 HTML 页面中的 `<head>` 部分，所以  `style-loader` 依赖 `css-loader` 。

安装：

`npm install css-loader style-loader -D`

另外，如果要处理 scss 文件，还需要引入 `sass-loader`。同样，它依赖于前两个loader。

**同时还要安装 `node-sass`，[node-sass](https://github.com/sass/node-sass) 是 sass-loader 的 [peerDependency](https://docs.npmjs.com/files/package.json#peerdependencies)。**(ps:就是安装很慢的那个 🙄

安装：

`npm install sass-loader node-sass -D`

> 💣 **注意是 sass-loader 不是 scss-loader 哦！** 🤪

添加样式文件：

```bash
cd src
mkdir styles && cd styles
touch index.scss
```

在 index.scss 文件里编辑样式代码后，并且在 src/index.js 中引入 `import './styles/index.scss'`

修改 `webpack.config.js` 文件：

```javascript
module.exports = {
  //...
  /*
    配置各种类型文件的加载器，称之为 loader
    webpack 当遇到 import ... 时，会调用这里配置的 loader 对引用的文件进行编译
    */
  module: {
    /**
     * test: 匹配特定条件。一般是提供一个正则表达式或正则表达式的数组
     * include: 匹配特定条件。一般是提供一个字符串或者字符串数组
     * exclude: 排除特定条件
     * and: 必须匹配数组中的所有条件
     * or: 匹配数组中任何一个条件
     * nor: 必须排除这个条件
     * use: 指定处理该文件的 loader, 值可以是字符串或者数组。loader 的执行顺序是从最后一个到第一个。
     */
    rules: [
      {
        test: /\.(css|scss)$/, // 匹配css和scss文件
        include: [path.resolve(__dirname, 'src')],
        use: ['style-loader', 'css-loader', 'sass-loader']
        // loader的执行顺序是从右至左/从下往上。
        // use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      }
    ]
  }
  //...
}
```

1. 如果匹配到 scss 文件那么首先经过 sass-loader 翻译处理为 css。
2. 然后 css-loader 将 css 文件内容存为 js 字符串，并转化成 CommonJS 模块，把 background、@font-face 等引用的图片，字体文件交给指定的 loader 打包。
3. 最后 style-loader 将 js 字符串生成为 style 节点挂载到页面的 head 里。

经由上述 sass-loader 和 css-loader 的处理后，css/scss 代码会转变为 JS， 如果需要单独把 css 文件分离出来，我们需要使用 [mini-css-extract-plugin](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fmini-css-extract-plugin) 插件。

同时，在使用 css3 里一些需要添加厂商前缀的新特性的时候，我们可以使用 [postcss-loader](<https://webpack.docschina.org/loaders/postcss-loader/>) 配合 [autoprefixer](<https://webpack.js.org/loaders/postcss-loader/#autoprefixing>) 插件来实现自动添加厂商前缀的功能。

### 打包图片

安装：

`npm install file-loader -D`

**[file-loader](https://webpack.docschina.org/loaders/file-loader):** 不只是用来处理图片，可以用于处理很多类型的静态资源文件( txt、svg、ex )，它的主要作用是直接输出文件，并把构建后的文件路径返回。

添加图片资源文件夹：

```bash
cd src
mkdir assets && cd assets
mkdir images 
```

编辑配置文件：

```js
rules: [
      // ...
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/', //输出到dist的images文件夹
            }
          }
        ]
      }
    ]
```

在 assets/images 文件夹内放入 webpack.jpg 图片，然后修改 index.js 文件引入这个图片并使用它。

```js
import './styles/index.scss';
import webpackImg from './assets/images/webpack.jpg';
// var webpackImg = require('./assets/images/webpack.jpg')
console.log(webpackImg)

let img = new Image();
img.src = webpackImg;

let testStr = 'Hello World, this is a webpack-demo.';
let root = document.getElementById('root');
root.innerText = testStr;
root.append(img);
console.log(testStr);
```

 `npm run build`之后，我们会发现 file-loader 已经把图片重命名后打包到了 dist 目录下的 images 文件夹里，同时会把该文件相对于 dist 目录的文件路径名称作为返回值返回。(可打开控制台查看输出信息 👀)

如果我们不想被打包后的文件名称发生改变或者是想指定打包文件的存放位置，那么可以通过编辑 file-loader 的 options 属性来完成配置。

```js
{
	loader: 'file-loader',
	options: {
	  outputPath: 'images/', //输出到 dist 的 images文件夹
      name: '[name].[ext]', // placeholder 的具体含义可查看文档
	}
}
```

**[url-loader](https://webpack.docschina.org/loaders/url-loader/):** 有了`file-loader`我们就可以对图片进行打包，但如果图片较多，页面加载时就要发出很多 http 请求，这会降低性能。

而`url-loader` 会把引入的图片编码，生成 `dataURl`。相当于把图片数据翻译成一串字符。再把这些字符串打包到一个文件中，最终只需要引入这个文件就能访问图片了，这可以节省 http 请求。

But! 如果图片较大，编码会消耗性能。因此 `url-loader` 提供了一个 `limit` 参数，小于 limit 字节的文件会被转为 DataURl，大于 limit 的还是会使用 `file-loader` 进行 copy。

> - url-loader 可以看作是增强版的 file-loader。
> - url-loader 在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。然后把图片编码成 base64 格式写进页面，从而减少服务器请求。

```javascript
rules: [
      // ...
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader', // 指定使用 url-loader 处理图片
            options: {
              outputPath: 'images/', 
              name: '[name].[ext]',
              limit: 600 //是把小于600B的文件打成Base64的格式
            }
          }
        ]
      }
]
```

> - 同时安装 file-loader、url-loader 后，可以只指定 url-loader 处理图片资源文件。
>
> - 当文件大于 limit 时，url-loader 会调用 file-loader, 把文件储存到输出目录，并把引用的文件路径改写成输出后的路径。
>
> - 当文件体积小于 limit 时，url-loader 把文件转为 Data URI 的格式内联到引用的地方。(打开控制台查看效果)
>
>   ```html
>   <img src="./assets/images/smallpic.png">
>   <!--会被编译成-->
>   <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA...">
>   ```
>

### 配置 babel

接下来，为了能让不支持 ES6 的浏览器（比如万恶的 IE ）也能照常运行，我们需要安装 [babel](http://babeljs.io/), 它会把我们写的 ES6 源代码转化成 ES5，这样我们源代码写 ES6，打包时生成 ES5。

安装：

> webpack 4.x | babel-loader 8.x | babel 7.x

`npm i babel-loader @babel/core @babel/preset-env -D`

> - Babel 7.x 的相关依赖包需要加上 `@babel/ scope`(babel核心库)
> - 用 babel 转换 ES6 代码需要使用到 `babel-loader`
> -  `@babel/preset-env`默认情况下是等于 ES2015 + ES2016 + ES2017，也就是说它对这三个版本的 ES 语法进行转化
> - Babel 7.x 一个主要变化是 presets 设置由原来的 `env` 换成了 `@babel/preset-env`, 可以配置 `targets`, `useBuiltIns` 等选项用于编译出兼容目标环境的代码
> - 其中 `useBuiltIns` 如果设为 `"usage"`，Babel 会根据实际代码中使用的 ES6/ES7 代码，以及与你指定的 targets，按需引入对应的 `polyfill`，而无需在 src/index.js 代码中直接引入 `import '@babel/polyfill'`，避免输出的包过大，同时又可以放心使用各种新语法特性。

配置webpack.config.js：

```javascript
{
	test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
    	loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
}
```

此时 webpack 就可以转义并打包我们 ES6 的语法了，**同时我们也可以将对 babel 的详细配置写到 .babelrc 文件中。** 在根目录下新建 .babelrc 文件 `touch .babelrc`

```javascript
{
  "presets": [
    ["@babel/preset-env", {
      modules: false,
      useBuiltIns: 'usage',
      targets: {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }]
  ]
}
```

> 这就是 babel-preset-env 的作用，帮助我们配置 babel。我们只需要告诉它我们要兼容的情况（目标运行环境），它就会自动把代码转换为兼容对应环境的代码。
>
> 以上代码表示我们要求代码兼容最新两个版本的浏览器，不用兼容 IE 8，另外市场份额超过 1% 的浏览器也必须支持。
>
> 只需要告诉 babel-preset-env 你想要兼容的环境，它就会自动转换。

但是这种方式也并不是所有场景都适用的，如果你正在开发的是一个类库或者第三方模块，那么就不能使用这种配置方式。(因为 polyfill 的代码是通过全局变量的形式注入的，这样会污染全局环境)

此时就要安装`@babel/plugin-transform-runtime`这个插件，然后再参照文档进行相关配置。

**具体babel 在各种情况下的配置方法可以在官网的[setup](https://babeljs.io/setup#installation)页面查看** 😋

### 配置热加载

上面的一系列操作都是研究如何打包文件，但每次编辑代码之后我们都需要在终端重新执行一次`npm run build`重新打包，然后再去 dist 目录下找到输出的文件并打开查看打包编译后的结果。

🤦🏻‍♂️为了不那么痛苦，我们可以采取一些措施来提升开发效率。

最简单的是使用 webpack 的 [watch mode](https://webpack.docschina.org/guides/development/#%E4%BD%BF%E7%94%A8-watch-mode-%E8%A7%82%E5%AF%9F%E6%A8%A1%E5%BC%8F-)，在 package.json 文件的 scripts 中再添加一条：

`"watch": "webpack --watch"`

加入`—watch`参数后，再在终端执行`npm run watch`，此时 webpack 就会帮我们 watch 监听文件的变化并自动重新打包。

修改代码后不用在终端重新执行命令，但要刷新浏览器才能查看更新的效果。🙃

更好一点的方案是使用 [webpack-dev-server ](https://webpack.docschina.org/guides/development/#使用-webpack-dev-server) 在本地开启一个简单的本地静态服务来进行开发。从而实现每次 src 目录下的源代码发生改变，dist 目录就会自动重新打包。😄

(ps: 其实并不会生成 dist 文件夹，而是将打包后的内容放到电脑的内存中，从而提升打包速度。)

> `webpack-dev-server` 是 webpack 官方提供的一个工具，可以基于当前的 webpack 构建配置快速启动一个静态服务。
>
> 当 `mode` 为 `development` 时，会具备热加载 （hot reload） 的功能，即当源码文件变化时，会即时更新当前页面，以便你看到最新的效果。

安装：

`npm i webpack-dev-server -D`

在 package.json 的 scripts 中添加：

`"start": "webpack-dev-server --open"`

> `--open` 参数会帮助我们自动打开浏览器并访问 web server

然后执行`npm start`，webapck 就会默认开启一个 web server [http://localhost:8080/](https://link.juejin.im/?target=http%3A%2F%2Flocalhost%3A8080%2F) 便于我们开发。🥳

```javascript
// devtool:{}
devServer: {
	contentBase: './dist', // web server 服务器的根路径
	open: 'true',  // 等于 --open
	port: '8086', // 服务器端口号
	proxy: {
      '/api': 'http://localhost:3000' // 配置代理
    }
}
```

它还有很多配置选项可以来帮助我们提升开发效率，具体可查阅[文档](https://webpack.docschina.org/configuration/dev-server/)使用。