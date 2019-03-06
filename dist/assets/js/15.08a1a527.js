(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{424:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"三种定位模式："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三种定位模式：","aria-hidden":"true"}},[t._v("#")]),t._v(" 三种定位模式：")]),t._v(" "),s("h3",{attrs:{id:"_1-常规流（normal-flow）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-常规流（normal-flow）","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. 常规流（Normal Flow）")]),t._v(" "),s("ul",[s("li",[t._v("除根元素、浮动元素和绝对定位元素外，其他元素都在常规流之内（in-flow）")]),t._v(" "),s("li",[t._v("而根元素、浮动元素和绝对元素会脱离常规流（out of flow）")]),t._v(" "),s("li",[t._v("常规流中的盒子，属于块级格式化上下文或行级格式化上下文")])]),t._v(" "),s("p",[s("strong",[t._v("块级格式化上下文（Block Formatting Context")])]),t._v(" "),s("ul",[s("li",[t._v("盒子在容器（包含块）内从上到下一个接一个地放置")]),t._v(" "),s("li",[t._v("两个兄弟盒子之间的竖直距离由margin属性决定")]),t._v(" "),s("li",[t._v("同一个BFC内垂直margin会合并")]),t._v(" "),s("li",[t._v("盒子的左边缘挨着容器（包含块）的左边")])]),t._v(" "),s("p",[s("strong",[t._v("创建BFC的方式：")])]),t._v(" "),s("ul",[s("li",[t._v("浮动框")]),t._v(" "),s("li",[t._v("绝对定位框（元素的 "),s("code",[t._v("position")]),t._v("为 "),s("code",[t._v("absolute")]),t._v(" 或 "),s("code",[t._v("fixed")]),t._v("）")]),t._v(" "),s("li",[t._v("非块级的容器（"),s("code",[t._v("inline-block")]),t._v("）")]),t._v(" "),s("li",[t._v("弹性盒子（ "),s("code",[t._v("display: flex")]),t._v(" 或 "),s("code",[t._v("inline-flex")]),t._v("）")]),t._v(" "),s("li",[t._v("overflow属性非visible的块框（"),s("code",[t._v("overflow: hidden")]),t._v("）")])]),t._v(" "),s("p",[s("strong",[t._v("BFC的特性：")])]),t._v(" "),s("ul",[s("li",[t._v("BFC内的浮动不会影响到BFC外部的元素")]),t._v(" "),s("li",[t._v("BFC的高度会包含其内的浮动元素")]),t._v(" "),s("li",[t._v("BFC不会和浮动元素重叠")])]),t._v(" "),s("p",[s("strong",[t._v("BFC的作用：")])]),t._v(" "),s("ol",[s("li",[t._v("清除浮动")]),t._v(" "),s("li",[t._v("防止margin折叠")]),t._v(" "),s("li",[t._v("双栏布局")])]),t._v(" "),s("p",[s("strong",[t._v("行级格式化上下文（Inline Formattinh Context）")])]),t._v(" "),s("ul",[s("li",[t._v("盒子一个接一个水平放置")]),t._v(" "),s("li",[t._v("盒之间的水平margin，border和padding都有效")]),t._v(" "),s("li",[t._v("同一行的盒子所在矩形区域叫做行盒（Line box）")]),t._v(" "),s("li",[t._v("当一个行盒放不下上下文内所有盒子时，会被分到多个垂直堆叠的行盒里")]),t._v(" "),s("li",[t._v("行盒内的水平分布由“text-align”属性决定")]),t._v(" "),s("li",[t._v("如果一个行级块无法分割（单词、inline-block），该元素会被当作一个整体决定分布在哪一个行盒")])]),t._v(" "),s("h3",{attrs:{id:"_2-浮动（float）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-浮动（float）","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. 浮动（Float）")]),t._v(" "),s("p",[s("strong",[t._v("浮动的定义：")])]),t._v(" "),s("ul",[s("li",[s("p",[t._v("浮动元素从常规流/文档流中脱离，按照指定浮动方向发生移动，漂浮在容器（包含块）的左边或右边")])]),t._v(" "),s("li",[s("p",[t._v("浮动盒会一直漂浮到其外边缘挨到父级容器边缘或另外相邻的浮动盒")]),t._v(" "),s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".father")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("width")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 300px"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("margin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0 auto"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("border")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 10px solid #444"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".son")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("width")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 200px"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 200px"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("background")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" pink"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("float")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" left"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("father"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t我是父级元素：\n\t"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("son"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("我是子元素"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("span")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("这是父级元素里面的内容"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("span")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])])]),t._v(" "),s("p",[s("strong",[t._v("浮动的影响：")])]),t._v(" "),s("ol",[s("li",[t._v("高度塌陷：浮动元素父元素高度自适应（父级元素不设定高度时，子元素浮动后，父元素会发生高度塌陷）")]),t._v(" "),s("li",[t._v("字围现象：浮动元素不会挡住没有浮动元素中的文字， 没有浮动的文字会自动给浮动的元素让位置，这个就是浮动元素字围现象（浮动元素不会影响其后面的流内块级盒，但是浮动元素后面的行级盒子会变短以避开浮动元素）")])]),t._v(" "),s("h3",{attrs:{id:"_3-绝对定位-absolute-positioning"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-绝对定位-absolute-positioning","aria-hidden":"true"}},[t._v("#")]),t._v(" 3. 绝对定位(Absolute Positioning)")]),t._v(" "),s("p",[t._v("通过position的属性来设置定位：")]),t._v(" "),s("ul",[s("li",[t._v("static，非定位，默认值")]),t._v(" "),s("li",[t._v("relative，相对定位（相对自己）")]),t._v(" "),s("li",[t._v("absolute，绝对定位，相对非static祖先元素定位")]),t._v(" "),s("li",[t._v("fixed，相对于视口绝对定位")])]),t._v(" "),s("ol",[s("li",[t._v("relative\n"),s("ul",[s("li",[t._v("在常规流里面布局")]),t._v(" "),s("li",[t._v("相对于自己本应该在的位置进行偏移")]),t._v(" "),s("li",[t._v("使用top、left、bottom、right设置偏移长度")]),t._v(" "),s("li",[t._v("流内其他元素当它没有偏移一样布局")])])]),t._v(" "),s("li",[t._v("absolute\n"),s("ul",[s("li",[t._v("脱离正常流")]),t._v(" "),s("li",[t._v("相对于最近的非static祖先的padding box定位")]),t._v(" "),s("li",[t._v("不会对流内元素布局造成影响")]),t._v(" "),s("li",[t._v("可以有margin，但不会折叠")])])]),t._v(" "),s("li",[t._v("fixed\n"),s("ul",[s("li",[t._v("相对于Viewport定位")]),t._v(" "),s("li",[t._v("不会随页面滚动发生位置变化")])])])]),t._v(" "),s("h2",{attrs:{id:"清除css浮动的几种常用方法："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#清除css浮动的几种常用方法：","aria-hidden":"true"}},[t._v("#")]),t._v(" 清除CSS浮动的几种常用方法：")]),t._v(" "),s("h3",{attrs:{id:"_1-给父级元素定义高度height"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-给父级元素定义高度height","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. 给父级元素定义高度height")]),t._v(" "),s("p",[t._v("原理：高度塌陷是因为给浮动元素的父级元素高度自适应导致的，那么我们给它的设置适当的高度就可以解决这个问题了")]),t._v(" "),s("p",[t._v("缺点：只适合高度固定的布局，要给出精确的高度，如果父级元素高度不合适，还是会产生溢出问题")]),t._v(" "),s("h3",{attrs:{id:"_2-给父级元素也添加浮动float"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-给父级元素也添加浮动float","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. 给父级元素也添加浮动float")]),t._v(" "),s("p",[t._v("原理：因为子元素浮动之后会脱离文档流，所以如果给父级div也添加相同方向的浮动之后，父级就可以包裹子级div（通过浮动框创建BFC，利用其特性清除浮动）")]),t._v(" "),s("p",[t._v("缺点：与父元素相邻的元素布局会受到影响，另外需要给每个浮动元素父级添加浮动，浮动多了容易出现问题")]),t._v(" "),s("h3",{attrs:{id:"_3-给父级元素设置display-inline-block属性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-给父级元素设置display-inline-block属性","aria-hidden":"true"}},[t._v("#")]),t._v(" 3. 给父级元素设置display:inline-block属性")]),t._v(" "),s("p",[t._v("原理：通过非块级的容器"),s("code",[t._v("inline-block")]),t._v("创建BFC，利用其特性清除浮动")]),t._v(" "),s("p",[t._v("缺点：父级的margin左右auto失效，无法使用margin: 0 auto;设置居中")]),t._v(" "),s("h3",{attrs:{id:"_4-在浮动元素下面添加空的div-为其加clear类"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-在浮动元素下面添加空的div-为其加clear类","aria-hidden":"true"}},[t._v("#")]),t._v(" 4. 在浮动元素下面添加空的div 为其加clear类")]),t._v(" "),s("p",[t._v("原理：利用clear:both清除浮动，让父级元素能自动获取到高度")]),t._v(" "),s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".clear")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-size")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("clear")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" both"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("此方法在IE6下存在最小高度问题(在IE6下，高度小于19px的元素的高度会被处理成19px)。 解决办法：再添加一条overflow:hidden;")]),t._v(" "),s("p",[t._v("另外在元素下添加br 标签的方法是因为其自带clear属性，将它设置成both其实和添加空div原理是一样的。")]),t._v(" "),s("p",[t._v("缺点：会添加大量无语义标签，结构与表现未分离，不利于维护")]),t._v(" "),s("h3",{attrs:{id:"_5-利用-after伪类（推荐用法）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-利用-after伪类（推荐用法）","aria-hidden":"true"}},[t._v("#")]),t._v(" 5. 利用:after伪类（推荐用法）")]),t._v(" "),s("p",[t._v("原理：原理同上，但IE8以上和非IE浏览器才支持:after。为了兼容IE，需要使用zoom:1（设置或检索对象的缩放比例，Firefox不支持）触发hasLayout（ 根据元素自身内容进行计算大小和组织，或者依赖于父元素来计算尺寸和组织内容）")]),t._v(" "),s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".clear")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("zoom")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*兼容ie6*/")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".clear:after")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("content")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("display")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("block"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("clear")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("both"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*以下代码非必需*/")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("overflow")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("hidden"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("visibility")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("hidden"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("tips: 在IE6、7下浮动元素的父级有宽度的话就不用清除浮动")])])},[],!1,null,null,null);a.default=e.exports}}]);