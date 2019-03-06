---
category: skills
tags: 
  - css
title: '三种定位模式与5种清除浮动的常用方法'
description: '了解CSS中三种定位模式的特性与5种清除元素浮动的方法'
date: 2018-02-05
vssue-title: '三种定位模式与5种清除浮动的常用方法'
---

<!-- more -->

## 三种定位模式：
### 1. 常规流（Normal Flow）
- 除根元素、浮动元素和绝对定位元素外，其他元素都在常规流之内（in-flow）
- 而根元素、浮动元素和绝对元素会脱离常规流（out of flow）
- 常规流中的盒子，属于块级格式化上下文或行级格式化上下文

**块级格式化上下文（Block Formatting Context**

- 盒子在容器（包含块）内从上到下一个接一个地放置
- 两个兄弟盒子之间的竖直距离由margin属性决定
- 同一个BFC内垂直margin会合并
- 盒子的左边缘挨着容器（包含块）的左边

**创建BFC的方式：**

- 浮动框
- 绝对定位框（元素的 `position`为 `absolute` 或 `fixed`）
- 非块级的容器（`inline-block`）
- 弹性盒子（ `display: flex` 或 `inline-flex`）
- overflow属性非visible的块框（`overflow: hidden`）

**BFC的特性：**

- BFC内的浮动不会影响到BFC外部的元素
- BFC的高度会包含其内的浮动元素
- BFC不会和浮动元素重叠

**BFC的作用：**

1. 清除浮动
2. 防止margin折叠
3. 双栏布局

**行级格式化上下文（Inline Formattinh Context）**

- 盒子一个接一个水平放置
- 盒之间的水平margin，border和padding都有效
- 同一行的盒子所在矩形区域叫做行盒（Line box）
- 当一个行盒放不下上下文内所有盒子时，会被分到多个垂直堆叠的行盒里
- 行盒内的水平分布由“text-align”属性决定
- 如果一个行级块无法分割（单词、inline-block），该元素会被当作一个整体决定分布在哪一个行盒

### 2. 浮动（Float）

**浮动的定义：**

- 浮动元素从常规流/文档流中脱离，按照指定浮动方向发生移动，漂浮在容器（包含块）的左边或右边

- 浮动盒会一直漂浮到其外边缘挨到父级容器边缘或另外相邻的浮动盒

  ```css
  .father{
  	width: 300px;
  	margin: 0 auto;
  	border: 10px solid #444;
  }
  .son{
  	width: 200px;
  	height: 200px;
  	background: pink;
  	float: left;
  }
  ```

  ```html
  <div class="father">
  	我是父级元素：
  	<div class="son">我是子元素</div>
  	<p><span>这是父级元素里面的内容</span></p>
  </div>
  ```

**浮动的影响：**

1. 高度塌陷：浮动元素父元素高度自适应（父级元素不设定高度时，子元素浮动后，父元素会发生高度塌陷）
2. 字围现象：浮动元素不会挡住没有浮动元素中的文字， 没有浮动的文字会自动给浮动的元素让位置，这个就是浮动元素字围现象（浮动元素不会影响其后面的流内块级盒，但是浮动元素后面的行级盒子会变短以避开浮动元素）

### 3. 绝对定位(Absolute Positioning)

通过position的属性来设置定位：

- static，非定位，默认值
- relative，相对定位（相对自己）
- absolute，绝对定位，相对非static祖先元素定位
- fixed，相对于视口绝对定位

1. relative
   - 在常规流里面布局
   - 相对于自己本应该在的位置进行偏移
   - 使用top、left、bottom、right设置偏移长度
   - 流内其他元素当它没有偏移一样布局
2. absolute
   - 脱离正常流
   - 相对于最近的非static祖先的padding box定位
   - 不会对流内元素布局造成影响
   - 可以有margin，但不会折叠
3. fixed
   - 相对于Viewport定位
   - 不会随页面滚动发生位置变化

## 清除CSS浮动的几种常用方法：

### 1. 给父级元素定义高度height

原理：高度塌陷是因为给浮动元素的父级元素高度自适应导致的，那么我们给它的设置适当的高度就可以解决这个问题了

缺点：只适合高度固定的布局，要给出精确的高度，如果父级元素高度不合适，还是会产生溢出问题

### 2. 给父级元素也添加浮动float

原理：因为子元素浮动之后会脱离文档流，所以如果给父级div也添加相同方向的浮动之后，父级就可以包裹子级div（通过浮动框创建BFC，利用其特性清除浮动）

缺点：与父元素相邻的元素布局会受到影响，另外需要给每个浮动元素父级添加浮动，浮动多了容易出现问题

### 3. 给父级元素设置display:inline-block属性

原理：通过非块级的容器`inline-block`创建BFC，利用其特性清除浮动

缺点：父级的margin左右auto失效，无法使用margin: 0 auto;设置居中

### 4. 在浮动元素下面添加空的div 为其加clear类

原理：利用clear:both清除浮动，让父级元素能自动获取到高度

```css
.clear{height:0; font-size:0; clear: both;}
```

此方法在IE6下存在最小高度问题(在IE6下，高度小于19px的元素的高度会被处理成19px)。 解决办法：再添加一条overflow:hidden;

另外在元素下添加br 标签的方法是因为其自带clear属性，将它设置成both其实和添加空div原理是一样的。

缺点：会添加大量无语义标签，结构与表现未分离，不利于维护

### 5. 利用:after伪类（推荐用法）

原理：原理同上，但IE8以上和非IE浏览器才支持:after。为了兼容IE，需要使用zoom:1（设置或检索对象的缩放比例，Firefox不支持）触发hasLayout（ 根据元素自身内容进行计算大小和组织，或者依赖于父元素来计算尺寸和组织内容）

```css
.clear{zoom:1;} /*兼容ie6*/
.clear:after{
    content:"";
    display:block;
    clear:both;
    /*以下代码非必需*/
    height:0;
    overflow:hidden;
    visibility:hidden;
}
```

tips: 在IE6、7下浮动元素的父级有宽度的话就不用清除浮动