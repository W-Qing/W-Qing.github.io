---
category: React
tags: 
  - Notes
title: 'React笔记'
description: 'React笔记'
date: 2019-06-23
vssue: false
---

<!-- more -->

# React笔记

先撸一遍基础文档：[React官网文档](https://reactjs.org/docs/getting-started.html) 👈 [中文版](https://zh-hans.reactjs.org/docs/getting-started.html) 👈

## 1. JSX

### 1. JSX 的本质是语法糖

```jsx
const name = 'mintnoii';
const element = <h1 className="demo">Hello, {name}</h1>;
```

这种既不是字符串也不是 HTML 的语法形式被称为 JSX，是一个看起来很像 XML 的 JavaScript 语法扩展。

“ JSX 可能会使人联想到模版语言，但它具有 JavaScript 的全部功能。” (JSX 是在 JavaScript 内部实现的)

所以它不是模板语言，而是纯 JavaScript，React 使用 JSX (非必须)来描述界面 UI 的样式及交互。

>  JSX 最终会被 babel 编译为合法的 JS 语句调用（编译器在遇到`{`时采用JS语法进行解析，遇到`<`就采用HTML规则进行解析）

而实际上 babel 会把 JSX 编译给`React.createElement()`函数调用。

上面的代码等同于以下语句：

```jsx
const name = 'mintnoii';
const element = React.createElement(
  'h1',
  {className: 'demo'}, // html标签属性
	'Hello, ',
  name
);
```

`React.createElement()`方法会首先对你写的 JSX 进行一些避免 bug 🐛的检查，然后创建一个类似于以下例子的对象：

```jsx
// 注意：这是简化后的结构,与React.createElement()创建的并不完全一样
const element = {
    type: 'h1',
    props: {
        className: 'demo',
        children: 'Hello, mintnoii'
    }
}
```

这样的对象，则称为`React元素`，代表将要呈现在屏幕上的东西。React正是通过读取这些对象来构建DOM，从而保持数据和 UI 同步更新的。

在传统模式下，我们通常需要学习额外的模板 DSL (Domain-Specific Language 领域特定语言) 来创建应用界面从而方便去描述 UI 状态变化或定义交互行为。而在 React  中使用 JSX 有以下几个优点：

1. 利用原生或自己定义的标签来直观的声明式的创建应用界面
2. 利用代码动态灵活的控制界面 UI 结构及属性变化 
3. 不需要学习新的模板语言

🗿总结：**JSX 的本质并不是模板引擎，而是(利用JavaScript动态创建React元素的)语法糖。**

### 2. 在 JSX 中使用表达式

1. JSX 本身也是表达式

   ```jsx
   const element = <h1>hello, world!</h1>;
   //JSX可以像其他表达式一样，用于给一个变量赋值、作为函数实参、作为函数返回值等等
   ```

2. 表达式作为子元素

   ```jsx
   const element = <li>{props.message}</li>;
   //子元素是React的一个特殊属性，这个属性会传给 React.createElement 的 children参数
   //所以React要求这个子元素的返回值是一个可 render 的节点(组件Node、原始Node、字符串...)
   ```

3. 在属性中使用表达式

   ```jsx
   <MyComponent size={100+500}/>
   //如果要给组件传一个属性的值，那么这个值可以是 JavaScript 表达式
   ```

4. 延展属性

   ```jsx
   const props = {name: 'mintnoii', age: '21'};
   const student = <Student {...props}/>;
   //如果要给组件传一组属性值，那么可以使用 es6 的延展操作符来实现
   ```

[深入 React 中的 JSX](https://zh-hans.reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized) 👈

## 2. 元素渲染

### 1. 元素 != 组件

**元素(`elements`)是构成 React 应用的最小单位，元素描述了想要在屏幕中展示的内容。**

```jsx
const element = <h1>Hello, world!</h1>;
```

> 与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。

上面提到了利用 JSX 来创建`React元素`从而来构建用户界面 UI。

但是 ⚠️注意：不要将元素与另一个被熟知的概念——“组件”混淆。🏗**组件是由元素构成的。**

### 2. 将一个元素渲染为 DOM

React中，使用`ReactDOM.render()`方法来将 React元素 渲染进一个 DOM 中。

```jsx
<div id="root"></div> //”根“ DOM节点

const element = <h1>Hello, world</h1>; //React元素

ReactDOM.render(element, document.getElementById('root'));
//节点内的所有内容都将由 React DOM 管理
```

> 仅使用 React 构建的应用通常只有单一的根 DOM 节点。
>
> 而如果将 React 集成进一个已有应用，那么你可以在应用中包含任意多的独立根 DOM 节点。

### 3. React 元素是不可变对象

- React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。
- 根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 `ReactDOM.render()`。
- React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

如果非要使用元素来构成可变化的 UI 界面，就需要使用`setInterval`等定时器函数来不停的调用
`ReactDOM.render`来实现了。

而在实际开发中，大多数 React 应用只会调用一次`ReactDOM.render()`，所以更好的方式是使用`有状态组件`。

## 3. 组件&props

> 组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

React中有两种定义组件的方式：`函数定义`和`class 类定义`

### 1. 函数组件与 class 组件

定义组件最简单的方式就是编写 JavaScript 函数：

```jsx
function Welcome (props) {
    return <h1>Hello, {props.name}</h1>;
}
```

它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。

这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

也可以使用 ES6 的 class 来定义组件：

```js
//Welcome 类继承自 React.Compnent 类方法 
class Welcome extends React.Component {
  render() {
    // this.props上的属性是由外部调用时传递进来的
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

这种方式比起`函数定义`的方式则更加灵活，同时还有一些额外特性。

### 2. Props 的只读性

> 当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）转换为单个对象传递给组件，这个对象被称之为 “props”。

```jsx
const element = <Welcome name="Sara" />;
//React元素 element 接收一个 name 属性

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

1. 我们调用 `ReactDOM.render()` 函数，并传入 `<Welcome name="Sara" />` 作为参数。
2. React 调用 `Welcome` 组件，并将 `{name: 'Sara'}` 作为 props 传入。
3. `Welcome` 组件将 `<h1>Hello, Sara</h1>` 元素作为返回值。
4. React DOM 将 DOM 高效地更新为 `<h1>Hello, Sara</h1>`。

但无论组件是使用 函数声明 还是通过 class 声明，都决不能修改自身的 props。

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

> 纯函数：函数体内不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。

## 4. State&生命周期

之前的元素渲染部分，我们了解到一种更新 UI 界面的方法。即通过调用 `ReactDOM.render()` 来修改我们想要渲染的元素。同时也提到，如果考虑一个定时器组件的实现，重复调用`ReactDOM.render()`来渲染页面的方法是不可取的，更好的方案是使用`有状态组件`。而上面介绍类定义组件时，我们了解到使用`类定义组件`有一些额外的好处，拥有`私有状态`这一特性就是其中之一。

### 1. 正确地使用 state

> State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。
>
> state 允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容。

```jsx
class Clock extends React.Component {
  constructor(props) {
    //Class 组件应该始终使用 props 参数来调用父类的构造函数。
    super(props);
    
    //初始化状态
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    //this.state.date = new Date() ❌
    this.setState({
      date: new Date()
    });
  }
  
	// render() 方法用来返回需要呈现的组件内容
  render() {
    //使用this.state.xxx来引用一个状态属性
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  //无需传入 props，组件实现了自我更新
  <Clock />,
  document.getElementById('root')
);
```

想正确地使用sate，就要牢记下面三点：

⚠️**1. 不要直接修改State** 

构造函数(constructor)是唯一可以给 `this.state` 赋值的地方。

所以在其他函数(tick方法👆)里不能直接使用`this.state.xxx = xxx`的方式来改变一个`state`的值，而应该使用`this.setState()`。

⚠️**2. State 的更新可能是异步的**

`this.setState()`会自动覆盖`this.state`里相应的属性，并触发`render()`重新渲染组件。

所以出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。

**因为 `this.props` 和 `this.state` 可能会异步更新，所以不能依赖他们的值来更新下一个状态。**

例如，此代码可能会无法更新计数器：

```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

> 要解决这个问题，可以让 `setState()` 接收一个函数而不是一个对象。
>
> 这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数。

⚠️**3. State 的更新会被合并**

当你调用 `setState()` 的时候，React 会把你提供的对象合并(浅合并)到当前的 state。

### 2. 单向数据流

- 对一个组件来说，不管是它的父组件还是子组件它们都无法知道这个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。

- 这就是为什么称`state`为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。
- 这个组件可以选择把它的`state`作为`props`继续向下传递到它的子组件中。而子组件会在`props`中接受数据，但它无法知道传递进来的数据是来自父组件的`props`还是`state`，或者是手动输入的。

> 🗿**总结：这通常会被叫做“自上而下”或是“单向”的数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。**
>
> 👏**官网的这个比喻十分生动：**
>
> **如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。**

### 3. 组件生命周期

在前面的 `Clock` 组件中，我们在`componentDidMount`中设置了定时器，该方法会在组件 UI 已经被渲染到 DOM 中(挂载 mount )后调用。它只会执行一次，典型的应用场景就是在这个方法里进行数据请求，获取外部资源。

同样，我们在`componentWillUnmount`中清除了定时器。一旦组件从 DOM 中被移除(卸载 unmount )，React 就会调用这个生命周期方法。典型的应用场景就是释放资源。

React 的`componentDidUpdate`也是一个常用的生命周期方法。

此外，`render`方法也是React生命周期方法，这也是组件唯一必须定义的生命周期方法。

关于组件生命周期这部分的详细信息看下面的链接：

[React 中的生命周期API](https://zh-hans.reactjs.org/docs/react-component.html#the-component-lifecycle)👈

[React生命周期图谱速查表](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)👈

## 5. 事件处理

### 1. 注意语法的区别

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同:

- React 事件采用`camelCase`小驼峰式命名(`onClick`），而不是纯小写(`onclick`)。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

```jsx
//传统 HTML
<button onclick="handleClick()">Click me</button>

//React
<button onClick={increment}>Click me</button>
```

还有一个不同在于，在原生DOM中，我们可以通过返回`false`来阻止默认行为，但是这在React中是行不通的，在React中需要明确使用`preventDefault()`来阻止默认行为。

举个栗子🌰：

```jsx
//传统 HTML
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>

//React
function ActionLink () {
    function handleClick (event) {
        event.preventDefault();
        alert('Hello, world!');
    }

    return (
        <a href="#" onClick={handleClick}>Click me</a>
    );
}
```

这里事件回调函数里的`event`是经过 React 根据 W3C 规范定义的一个合成事件，所以我们可以放心地使用它而不用担心跨浏览器的兼容性问题。

### 2. 注意 this 指向问题

当我们使用 ES6 class 类定义组件时，通常的做法是将事件处理函数声明为 class 中的方法。

⚠️但这样一来，我们需要特别注意 JSX 回调函数中的 `this`。

因为在 class 组件里，**除了构造函数和生命周期钩子函数里会自动绑定 this 为当前组件外，其他的都不会自动绑定 this 的指向为当前组件**。

如果你在 JSX 里忘记将 this 绑定到 `this.handleClick` 并把它传入了 `onClick`，那么当你调用这个函数的时候 `this` 的值为 `undefined`。(这和 ES6 里 Class 的 this 指向以及 JS 函数工作原理有关，并不是 React 独有的问题）

```jsx
 <button onClick={this.handleClick.bind(this)}>Click me</button>
```

 如果觉得上面这样每次都要写`.bind(this)`很麻烦，可以使用 ES6 箭头函数来进行隐式绑定 this：

```jsx
<button onClick={(e) => this.handleClick(e)}>Click me </button>
```

但其实这两种方法都有一个潜在的性能问题(实际上由此引发的性能问题往往不值一提)：👻

**当组件每次重新执行`render`渲染时，都会有一个新的函数创建。如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。**

😝而我们有更好的方法就是可以**在组件的 constructor 里统一为回调方法绑定 this 指向**，如：

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 this，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

但就实际编程体验而言，这种方式不如上面两种写法简明扼要，往往要写很多重复代码。在可读性和可维护性上也有些欠缺。同时，在 constructor 内声明的方法不会存在实例的原型上，而属于实例本身。如此一来，每个实例都有一个同样的 handleClick，这也是一种重复和浪费。

此外，如果你拥抱 ES next 且能够使用 stage-2 的新特性(实验性的🤖)，那么你还可以**在定义阶段使用箭头函数绑定**来正确的绑定 this，如：

```jsx
class Counter extends React.Component {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    handleClick = () => {
      console.log('this is:', this);
    	this.setState(state => ({
       isToggleOn: !state.isToggleOn
    }));
    // ...
}
```

使用这种方式的优点：

- 使用箭头函数，有效绑定了 this
- 没有在 JSX 内绑定的潜在性能问题
- 避免了 constrcutor 内绑定的组件实例重复问题

### 3. 向事件函数传递参数

通常我们会为事件处理函数传递额外的参数，方式有以下两种：

```jsx
//使用箭头函数(不推荐)
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
//bind绑定
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

- 关于事件参对象 event，在使用箭头函数的情况下，参数`e`要显式传递，而使用 bind 的情况下，事件对象以及更多的参数将会被隐式的进行传递。
- 由上面的 this 指向问题可知，更好的方式是在 constructor 内绑定 this 后，在事件函数调用时直接传递参数`onClick={this.deleteRow.bind(id)}`

## 6. 条件渲染

> 在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后，依据应用的不同状态，你可以只渲染对应状态下的部分内容。

```jsx
//代码并不优雅，仅做demo
function UserLogin(props) {
    const isLogined = props.isLogined;
 		const isVip = props.isVip;
  	const isQbVip = props.isQbVip; //穷b vip
  	var welcome
  	if (isLogined) {	
      //存储 react 元素
      welcome = <span>欢迎,尊敬的vip用户{isQbVip && <a>请尽快升级为正式Vip!</a>}</span>
        return <button>{isVip ? welcome: ''}退出</button>
    } else {
        return <button>登陆</button>
    }
}
```

- 使用变量存储 React 元素，帮助我们有条件地渲染组件的一部分，而其他的渲染部分并不会因此而改变。
- 可以使用 if 语句进行条件渲染或者在 JSX 内使用更简洁的条件运算符
- 如果条件是 `true`，`&&` 右侧的元素就会被渲染，如果是 `false`，React 会忽略并跳过它。
- 在较复杂的表达式中使用三元运算符会使代码结构不太直观，此时应该考虑提取组件。

> 在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 `render` 方法直接返回 `null`，而不进行任何渲染。
>
> **注意：** 在组件的`render`方法中返回`null`并不会影响组件生命周期函数的触发，如`componentWillUpdate`和`componentDidUpdate`等仍然会被调用。

## 7. 列表 & Key

### 1. 列表渲染

在 React 里，我们是使用`map()`方法来将数组项进行列表渲染的：

```jsx
function TodoList (props) {
    const todos = props.todos;
    const TodoItems = todos.map(item => {
        return (
            <li>{item}</li>
        )
    });
    return <ul>{TodoItems}</ul>
}
```

当我们运行以上的代码的时候，会发现控制台提示：`Each child in an array or iterator should have a unique "key" prop`，意思是当你创建一个元素时，必须包括一个特殊的 `key` 属性。

### 2.  Key 属性的作用

弄清楚`key`属性的作用之前，先了解一下 React 中 JSX 的运行基础 Virtual Dom ：

> 在 React 组件内部，它维护了一套虚拟 Dom 的状态。这套虚拟状态树最终会映射到真实的 DOM 节点上。当虚拟 DOM 的状态发生变化的时候， 它需要去计算前后两个虚拟 DOM 之间的区别，并产生一个 Diff。最终在真实的 DOM 节点上并不是整体刷新所有 DOM，而是把 Diff 的部分通过高效地方式更新到 UI 上，从而能够保证性能。

以及它的 `Diff算法`（复杂度O(n) ）的工作原理：

1. 当前后两个虚拟节点的 DOM 树发生变化之后，React 的 Diff 算法会从它们的根节点开始  一层层地比较，即**广度优先的分层比较**。
2. 如果同一层里的节点顺序发生变化，算法会要求节点都必须有唯一的标识，然后才能交换节点的位置。
3. 如果是节点的类型发生变化，则 React 会简单粗暴的将旧类型的节点删掉（不会检查是否在该DOM 树的其他位置也有一样的节点），然后创建一个新类型的节点。
4. DOM 节点的跨层移动，这种情况下 diff 算法只会将发生位置变化的节点及其子元素整个一起删除掉，后续在新位置上重新创建这个节点及其子元素 (也就是不会进行”剪切“和”粘贴“操作)。

React 之所以不对发生移动的节点进行”剪切和粘贴“，而直接放弃检查是因为这个算法的实现基于两个假设：

- 组件的 DOM 结构是相对稳定的。(很少发生节点跨层移动)
- 类型相同的兄弟节点可以被唯一标识。（主要用在同一层的节点顺序与位置发生变化的场景 ）

🔑正因为 Diff 算法的要求，所以**相同类型的子元素需要一个 key 去唯一的标识它**。如果没有这个 key，React 不但会报一个 Warning，其内部工作时可能就不会去做 DOM 节点交换这样的操作，而是做一些重新创建节点等性能开销更大的操作。所以 **key 并不只是用来消除 warning，而是一个用来提升性能的属性**。

### 3. 设置 key 的值

我们在设置 key 时要注意以下几点：

- 一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的 id 来作为元素的 key。
- 当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key。(如果不为数组元素显式的指定 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。)
- 如果列表项目的顺序可能会变化，则更不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。
- 元素的 key 只有放在就近的数组上下文中才有意义。一个好的经验法则是：在 `map()` 方法中的元素需要设置 key 属性。
- key 不需要全局唯一，只需要在一个数组内，兄弟节点之间区分彼此时唯一便可。当我们生成两个不同的数组时，我们可以使用相同的 key 值。
- key 会传递信息给 React 在进行 Diff 计算的时候使用，但不会传递给你的组件。如果你的组件中需要使用 `key` 属性的值，可以使用其他属性名显式传递这个值。

[深度解析使用索引作为 key 的负面影响](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) 👈

[深入解析为什么 key 是必须的](https://zh-hans.reactjs.org/docs/reconciliation.html#recursing-on-children)👈

## 8. 表单

### 1. 受控组件

### 2. 处理多个输入

### 3. 非受控组件

## 9. 状态提升

