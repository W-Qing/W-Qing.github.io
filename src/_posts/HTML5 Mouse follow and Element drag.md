---
category: Notes
tags: 
  - HTML5
title: 'HTML5 鼠标跟随与元素拖放'
description: '在 HTML5 中，拖放（抓取对象以后拖到另一个位置）是标准的一部分，任何元素都能够拖放。'
date: 2018-01-31
vssue-title: 'HTML5 鼠标跟随与元素拖放'
---

<!-- more -->

## 鼠标位置跟随

```html
<div id="target" style="width: 100px;height: 100px; background: red;position: absolute;"></div>
```

```javascript
window.onload = function(){
	var target = document.getElementById("target");
	target.onmousedown = function(){
		document.onmousemove = function(e){
			one.style.left = e.clientX+'px';
			one.style.top = e.clientY+'px';
		}
	}
}
```

## 元素拖放（Drag 和 Drop）

### 1. 拖拽元素对象

#### 1. 设置元素为可拖拽

将其 draggable 属性设置为 true `<img draggable="true" src="./demo.jpg"/>`

#### 2. 拖拽元素事件

1. **dragstart** 拖拽开始，在鼠标按下并移动的一瞬间触发
2. **drag** 在拖拽开始到结束的过程中持续触发（无论开始拖拽后鼠标位置是否移动）
3. **dragend** 拖拽结束，鼠标抬起时触发

### 2. 目标元素对象

#### 1. 目标元素事件

1. **dragenter** 进入目标后触发（相当于mouseover）
2. **dragover** 进入目标，离开目标之间，连续触发
3. **dragleave** 离开目标元素触发（相当于mouseout）
4. **drop** 在目标元素上释放鼠标触发

#### 2.设置元素为可放置

**默认地，无法将数据/元素放置到其他元素中。目标元素div的ondragover 属性规定在何处放置被拖动的元素。想要设置允许放置，我们必须在 dragover 事件里使用event.preventDefault() 阻止对元素的默认处理方式（drop 事件的默认行为是以链接形式打开）。**

```javascript
oDiv.ondragover = function(ev){
    ev.preventDefault();
    //ondragover属性调用的函数就是dragover事件
}
```

### 3. 事件执行顺序

- drop不触发的时候

  `dragstart => drag => dragenter =>dragover =>dragleave => dragend`

- drop触发的时候（dragover的时候阻止了默认事件）

  `dragstart => drag => dragenter =>dragover =>drop => dragend`

### 4. 解决火狐下的问题

- 必须设置**dataTransfer**对象（在event对象下）的**setData()**方法才可以拖拽除图片外的其他标签

- setData() : 设置数据 key和value(必须是字符串)

  ```javascript
  //当开始拖动元素时， ondragstart属性触发dragstart事件，规定了被拖动的数据。
  oDiv.ondragstart = function(ev){
    ev.dataTransfer.setData("id",ev.target.id);
    //设置被拖数据的数据类型"Text"和值ev.target.id。
    console.log("拖拽开始");
  }
  ```

- getData() : 获取数据，根据key值，获取对应的value

  ```javascript
  //当放置被拖元素时ondrop属性触发了drop(event)事件
  Div1.ondrop = function drop(ev)
  {
      var data=ev.dataTransfer.getData("id");
      //通过getData()方法的key值获取数据的value值
  }
  ```

- 通过 **dataTransfer.getData(“Text”)**方法获得被拖的数据。该方法将返回在 `dataTransfer.setData()` 方法中设置为相同类型的任何数据 id (“theImg”)。

- 注意：拖放之后Firefox会对`setData()`里设置的值进行搜索。

### 5. dataTransfer对象其他应用

- **effectAllowed** : 设置光标样式(none, copy, copyLink, copyMove, link, linkMove, move, all 和 uninitialized)

- **setDragImage** ：设置鼠标拖动的图像，三个参数（指定的拖动元素，坐标X，坐标Y）

  ```html
  <img src="./mouseImg.jpg" id="mouseImg" style="display:none" />
  ```

  ```javascript
  var mouseImg = document.getElementById('mouseImg');
  //即使元素隐藏也可以用来拖动，因此常用来做鼠标拖动时的小图标
  oDiv.ondragstart = function(ev){
  	var ev = ev || window.event;
  //当设置这个属性后，即使其他元素可拖动，鼠标也只能拖动MouseImg这个元素
  	ev.dataTransfer.setDragImage(oImg,0,0);
      //坐标参数设置鼠标在图像上的位置
  };
  ```

- **files** ： **获取外部拖拽的文件** ，返回一个filesList列表。filesList下有个type属性，返回文件的类型。

### 6. 读取文件信息

- **FileReader()** ：生成读取文件信息的对象
- **readAsDataURL** ：参数为要读取的文件对象（结合dataTransfer.files使用），将文件读取为DataUrl
- **onload** ：当读取文件成功完成的时候触发此事件
- **this. result** ： 获取读取的文件数据（如果是图片，将返回base64格式的图片数据）

## 示例Demo

### 元素拖放Demo代码

```j
<div id="one" style="width: 200px;height: 200px;border: 1px solid red;margin-bottom: 30px;">目标投放区</div>
<div id="two" draggable="true" style="width: 100px;height: 100px;border: 2px solid green;background-color: #ccc;">拖动元素</div>
window.onload = function(){
   	var one = document.getElementById("one");
   	var two = document.getElementById("two");
   	var i = 0; 
    
   	//拖拽区事件
   	two.ondragstart = function(e){
   		this.style.background = 'green';
   		e.dataTransfer.setData("Text","data from two");
   		console.log("拖拽开始");
   	}
   	two.ondrag = function(){
   		document.title = i++;
        console.log("位置移动");//注意观察页面标题
   	}
   	two.ondragend = function(){
   		this.style.background = 'yellow';
        console.log("移动结束");
   	}

   	//投放区事件
    one.ondragenter = function(e){
       	this.style.background = 'blue';
   		e.preventDefault();
        console.log("进入投放区");
        //dragenter也可能会受到默认浏览器的影响，使ondrap属性失效。
   		//所以在这个事件中要使用e.preventDefault();来阻止浏览器默认事件。
   	}
   	one.ondragover = function(e){
   		//要想放置要拖动的元素--触发drop事件，就必须在dragover当中阻止默认事件
   		this.style.background = 'blue';
   		e.preventDefault();
        console.log("规定投放位置");
   	}
   	one.ondragleave = function(){
   		this.style.background = 'pink';
   		console.log("离开投放区");
   	}
   	one.ondrop = function(e){
        e.preventDefault();
        var data=e.dataTransfer.getData("Text");
        one.append(two);
        console.log("放置目标");
   		alert(data);
	}
}
```

### 上传图片预览demo代码

```javascript
<div id="div1" style="width: 200px;height: 200px; background: red;margin:100px;">将文件拖拽到此区域</div>
<ul id="ul1"></ul>
window.onload = function(){
	var oDiv = document.getElementById('div1');
    var oUl = document.getElementById('ul1');
    
	oDiv.ondragenter = function(){
		this.innerHTML = '可以释放啦';	
	};
	oDiv.ondragover = function(ev){
		ev.preventDefault();
	};
	oDiv.ondragleave = function(){
		this.innerHTML = '将文件拖拽到此区域';
	};
	oDiv.ondrop = function(ev){
		ev.preventDefault();
		//阻止浏览器的默认事件(拖拽图片会默认打开)

		//获取外部拖拽的文件列表
		var fs = ev.dataTransfer.files;
		
        for(var i=0;i<fs.length;i++){
            //.type属性可以获取拖入文件的类型
			if(fs[i].type.indexOf('image')!=-1){
                
                //生成读取文件信息的对象
				var fd = new FileReader();
			
                //将文件列表内的文件读取为DataUrl 
				fd.readAsDataURL( fs[i] );
				
                //当读取文件成功完成触发onload事件
				fd.onload = function(){
					var oLi = document.createElement('li');
					var oImg =document.createElement('img');
                    
                    //this. result属性可以获取读取的文件数据
					oImg.src = this.result;
                     //（如果是图片，将返回base64格式的图片数据）
					oLi.appendChild(oImg);
					oUl.appendChild(oLi);
				};
			}else{
				alert('亲，请上传图片类型');
			}
		}
	};
};
```