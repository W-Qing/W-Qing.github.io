---
category: Algorithm

tags: 
  - SortAlgorithm

title: '排序算法'

description: '排序算法是将一系列的值按照顺序进行排列的方法。'
date: 2019-03-23
vssue-title: '排序算法'
vssue: false
---

<!-- more -->

以下两个函数是排序中会用到的通用函数，就不一一写了

```js
function checkArray(array) {
  if (!array || array.length <= 2) return
}
// es6中可以直接使用解构赋值
// [ arr[left], arr[right] ] = [ arr[right], arr[left] ]
// 作为交换函数
function swap(array, left, right) {
  let rightValue = array[right]
  array[right] = array[left]
  array[left] = rightValue
}
```

## 冒泡排序

> 冒泡排序（Bubble Sort）是最易懂的排序算法，但是效率较低，生产环境中很少使用。

**算法思想：**

依次比较相邻的两个数，如果不符合排序规则，则调换两个数的位置。这样一遍比较下来，能够保证最大(或最小)的数排在最后一位。

再对除最后一位以外的数组，重复前面的过程，直至全部排序完成。

由于每进行一次这个过程，在该次比较的最后一个位置上，正确的数会自己冒出来，就好像“冒泡”一样，这种算法因此得名。

**算法实现：**

```javascript
function bubbleSort(arr){
  checkArray(arr)
  // 从 0 到 `length - 1` 遍历
  for (var i = 0; i < arr.length - 1; i++){
    for (var j = 0; j < arr.length - i - 1; j++){
      if (arr[j] > arr[j + 1]){
        swap(arr, j, j + 1)
      }
    }
  }
  return arr
}
// 或者用另一种判断方式
function bubbleSort(arr) {
  checkArray(arr)
  for (var i = arr.length - 1; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]){
        swap(arr, j, j + 1)
      }
    }
  }
  return arr
}
```

该算法的操作次数是一个等差数列 `n + (n - 1) + (n - 2) + 1` ，去掉常数项以后得出时间复杂度是 O(n * n)

## 选择排序

> 选择排序（Selection Sort）与冒泡排序类似，也是依次对相邻的数进行两两比较。不同之处在于，它不是每比较一次就调换位置，而是一轮比较完毕，找到最小值（或最大值）之后，将其放在正确的位置，其他数的位置不变。

**算法思想：**

遍历数组，先假设索引为 0的值为最小值，如果后续取出的值比当前最小值小，就替换最小值索引，遍历完成后，将第一个元素和最小值索引上的值交换。如上操作后，第一个元素就是数组中的最小值，下次遍历就可以从索引 1 开始重复上述操作。

**算法实现：**

```js
function selectionSort(arr) {
  checkArray(arr)
  for(var i = 0; i < arr.length - 1;i++){
    var minIndex = i
    for(var j = i + 1; j < arr.length; j++){
      minIndex = arr[j]<arr[i]? j : minIndex
    }
    swap(arr,i,minIndex)
  }
  return arr
}
```

该算法的操作次数是一个等差数列 `n + (n - 1) + (n - 2) + 1` ，去掉常数项以后得出时间复杂度是 O(n * n)

## 插入排序

> 插入排序（insertion sort）比前面两种排序方法都更有效率。它将数组分成“已排序”和“未排序”两部分，一开始的时候，“已排序”的部分只有一个元素，然后将它后面一个元素从“未排序”部分插入“已排序”部分，从而“已排序”部分增加一个元素，“未排序”部分减少一个元素。以此类推，完成全部排序。

**算法思想：**

第一个元素默认是已排序元素，取出下一个元素和当前已排序元素比较，如果当前已排序元素大就交换位置。那么此时前两个元素已排序，第一个元素就是当前的最小数，所以下次取出操作从第三个元素开始，向前与已排序元素对比，重复之前的操作。

**算法实现：**

```js
function insertSort(arr) {
	checkArray(arr)
  // i 为未排序部分取出的当前元素的索引
  for (var i = 1; i < arr.length; i++) {
    // j 为之前已排序部分的值的索引
  	for (var j = i - 1; j >= 0 && array[j] > array[j + 1]; j--) {
    	// 向前与已排序部分比较，如果已排序元素大于插入的元素，就交换位置
      swap(arr, j, j + 1)
    }
  }
	return arr
}

// 优化版，每次比较不再交换，而是移动位置来优化提高性能
function insertSort(arr) {                         
  // i 未排序部分的当前位置                      
	for (var i=1; i < arr.length; i++) {
    // 先把目标元素复制一份，保存起来，不去贸然交换位置
    var target = arr[i]
    // j 已排序部分的最后一位的位置
    /*
     * 当已排序部分的当前元素大于targt，
     * 就将当前元素向后移一位，再将前一位与target比较
     */
    for (var j=i; j > 0 && arr[j - 1] > target; j--) {
        arr[j] = arr[j - 1]
    }
    // 最后将目标元素放在已排序部分中合适的位置
    arr[j] = target
	}
	return arr
}
```

该算法的操作次数是一个等差数列 `n + (n - 1) + (n - 2) + 1` ，去掉常数项以后得出时间复杂度是 O(n * n)

## 合并排序

> 前面三种排序算法只有教学价值，因为效率低，很少实际使用。合并排序（Merge sort）则是一种被广泛使用的排序方法。

**算法思想：**

将两个已经排序的数组合并，要比从头开始排序所有元素来得快。因此，可以将数组拆开，分成n个只有一个元素的数组，然后不断地两两合并，直到全部排序完成。

**算法实现：**

这里的关键是如何合并两个已经排序的数组。具体实现请看下面的函数。

```js
function merge(left, right){ 
	var result = [], il = 0, ir = 0;
	while (il < left.length && ir < right.length){
	    if (left[il] < right[ir]){
	        result.push(left[il++]);
	    } else {
	        result.push(right[ir++]);
	    }
	}
	return result.concat(left.slice(il)).concat(right.slice(ir));
}
```

上面的merge函数，合并两个已经按升序排好序的数组。首先，比较两个数组的第一个元素，将其中较小的一个放入result数组；然后，将其中较大的一个与另一个数组的第二个元素进行比较，再将其中较小的一个放入result数组的第二个位置。以此类推，直到一个数组的所有元素都进入result数组为止，再将另一个数组剩下的元素接着result数组后面返回（使用concat方法）。

有了merge函数，就可以对任意数组排序了。基本方法是将数组不断地拆成两半，直到每一半只包含零个元素或一个元素为止，然后就用merge函数，将拆成两半的数组不断合并，直到合并成一整个排序完成的数组。

```js
function mergeSort(myArray){
	if (myArray.length < 2) {
	    return myArray;
	}
	var middle = Math.floor(myArray.length / 2),
	    left    = myArray.slice(0, middle),
	    right   = myArray.slice(middle);
	return merge(mergeSort(left), mergeSort(right));
}
```

上面的代码有一个问题，就是返回的是一个全新的数组，会多占用空间。因此，修改上面的函数，使之在原地排序，不多占用空间。

```js
function mergeSort(myArray){
if (myArray.length < 2) {
    return myArray;
}
var middle = Math.floor(myArray.length / 2),
    left    = myArray.slice(0, middle),
    right   = myArray.slice(middle),
    params = merge(mergeSort(left), mergeSort(right));
	// 在返回的数组头部，添加两个元素，第一个是0，第二个是返回的数组长度
	params.unshift(0, myArray.length);
	// splice用来替换数组元素，它接受多个参数，
	// 第一个是开始替换的位置，第二个是需要替换的个数，后面就是所有新加入的元素。
	// 因为splice不接受数组作为参数，所以采用apply的写法。
	// 这一句的意思就是原来的myArray数组替换成排序后的myArray
	myArray.splice.apply(myArray, params);
	// 返回排序后的数组
	return myArray;
}
```

