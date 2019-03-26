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

## 冒泡排序

> 冒泡排序（Bubble Sort）是最易懂的排序算法，但是效率较低，生产环境中很少使用。

**基本思想：**

依次比较相邻的两个数，如果不符合排序规则，则调换两个数的位置。这样一遍比较下来，能够保证最大(或最小)的数排在最后一位。

再对最后一位以外的数组，重复前面的过程，直至全部排序完成。

由于每进行一次这个过程，在该次比较的最后一个位置上，正确的数会自己冒出来，就好像“冒泡”一样，这种算法因此得名。

**算法实现：**

```javascript
// 1.先定义一个交换函数，作用是交换两个位置的值。
function swap(array, p1, p2){
  var temp = array[p1]
  array[p1] = array[p2]
  array[p2] = temp
}
// 2.然后定义主函数
function bubbleSort(array){
  var len = array.length
  var stop
  for (var i = 0; i < len - 1; i++){
    for (var j = 0, stop = len - 1 - i; j < stop; j++){
      if (array[j] > array[j + 1]){
        swap(array, j, j + 1)
      }
    }
  }
  return array
}
```

## 插入排序
## 快速排序
