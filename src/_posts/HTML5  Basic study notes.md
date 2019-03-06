---
category: Notes
tags: 
  - HTML5
title: 'HTML5基础学习笔记'
description: 'HTML5并不仅仅是HTML 规范的最新版本，而是一系列用来制作现代富Web内容的相关技术的总称，其中最重要的三项技术分别为：HTML5 核心规范（标签元素）、CSS3（层叠样式表第三代）、和JavaScript。'
date: 2018-01-06
vssue-title: 'HTML5基础学习笔记'
---

<!-- more -->

## 设计思想

### 1. 向下兼容

不同于XHTML2.0 要求遵循规则，否则不予显示的方式，HTML5实行“不破坏 Web”的原则，兼容已有的内容。

### 2. 化繁为简

（1）文档类型声明被简化到极致`<!doctype html>`

（2）字符集声明简化为`<meta charset = "utf-8">`

（3）无插件范式，简单强大的API以及用浏览器的原生功能替代复杂的Javascript

### 3. 解决现实问题

比如引入可编程内容，引入原生媒体支持、拖拽、本地存储、地理定位、绘画（Canvas）、Web通信等等

### 4. 优雅降级

比如在引入新标签`video`、`canvas`的同时保证用户的访问通用性

### 5. 尊重事实标准

HTML5 遵循“用户至上”的原则，在出现具体问题时，会把用户放在第一位，其次是开发者，然后是浏览器厂商，最后才是规范制定者。

## 新增标签

### 语义化标签

web语义化有利于SEO，容易兼容不同设备，同时可以使页面结构清晰，利于团队的开发、维护。常见的语义化标签有`<heade>`、`<nav>`、`<article>`、`<section>`、`<aside>`、`<footer>`、`dialog`等。

- `<article>`定义文章，里面可以再利用`<header>`、`<section>`等标签对其内容进行划分。
- `<section>`标签定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。通常里面包裹`<hgroup>`、`h1~h6`标签和`<p>`标签来使用。
- `<mark>`定义有记号的文本，通常在和用户当前行为相关（比如在搜索结果中匹配到的词）或一部分内容需要在后面引用时使用。
- `<wbr>`规定在文本中的何处适合添加换行符。如果单词太长，或者担心浏览器会在错误的位置换行，那么可以使用 `<wbr>` 元素来添加 Word Break Opportunity（单词换行时机）。

- **在HTML5中`<hr>`标签也有新的语义，表示段落级别的话题切换。**
- 另外还有定义输出的`<output>`标签、日期/时间`<time>`标签以及`<ruby>`注释等。

### 媒体元素标签`<figure>`

`<figure>`规定独立的流内容（图像、图表、照片、代码等等）`<figure> `元素的内容应该与主内容相关，但如果被删除，则不应对文档流产生影响。

```html
<figure>
	<figcaption>
          XX图/表/视频
	</figcaption>
	<img>/<video>/<code>
</figure>
```



`<figcaption>` 元素应该被置于 `<figure>` 元素的第一个或最后一个子元素的位置，作为其标题。

### 文档细节`<details>`

```html
<details>
	<summary>Dream</summary>
	<p>做一个理想主义者，升级打怪，拯救世界。</p>
</details>
```

与`<summary>`配合使用可以为 details 定义标题。标题是可见的，用户点击标题时，会显示出关于文档的细节。也可以通过自身的`open`属性控制 details 是否可见。

### 进度条`<progress>`

```html
<progress value="76" max="100"></progress>
```

`<progress>`标签标示任务的进度（进程）。如需表示度量衡，使用`<meter>` 标签代替。

## 新增属性

- `contenteditable`：规定元素内容是否可编辑
- `data-*`：用于存储页面或应用程序的私有定制数据
- `draggable`：规定元素是否可拖动
- `hidden`：隐藏元素
- `spellcheck`：规定是否对元素进行拼写和语法检查

## 表单升级

### 输入类型

HTML5 拥有多个新的表单Input输入类型。这些新特性提供了更好的输入控制和验证。

- `email`、`url`、`tel`：检测邮箱、网址、电话号码的文本框（移动端的键盘会有变化）
- `number`、`range`：一个只能输入数字的文本框和选择特定范围数值的滑动条（用JS来显示数值）。
- `date` `month` `week` `time` `datetime` `datetime-local`（Date pickers ）：选取时间和日期。
- `search`:搜索框（chrome下输入文字后，会出现一个标记取消的X）
- `color`：生成一个颜色选取的按钮。

### 表单元素

- 选项列表`<datalist>`：

```html
<input id="frontEnd" list="web" />
<datalist id="web">
  <option value="HTML5">
  <option value="CSS3">
  <option value="Javascript">
</datalist>
```

`<datalist>`标签定义选项列表。使用 `<input>`的 **list** 属性绑定 datalist，用来定义 input 可能的值。datalist 及其选项不会被显示出来，它仅仅是合法的输入值列表。

- `<keygen>`：是密钥对生成器（key-pair generator）

### 表单属性

- `required`属性规定必须在提交之前填写输入域（不能为空）。
- `autocomplete` 属性规定 form 或 input 域应该拥有自动完成功能。
- `autofocus` 属性规定在页面加载时，域自动地获得焦点。
- `form` 属性规定输入域所属的一个或多个表单。
- `novalidate` 属性规定在提交表单时不应该验证 form 或 input 域。
- `pattern` 属性规定用于验证 input 域的模式（pattern）。