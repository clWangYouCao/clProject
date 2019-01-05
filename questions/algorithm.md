## 排序算法   

### 1. 冒泡排序

算法描述：   

* 比较相邻的元素，如果第一个比第二个大，就交换两个位置
* 对每一对相邻元素做同样的工作，从开始一对到最后一对，这样最大元素会被排到最后
* 针对所有元素重复以上步骤，除了最后一个
* 重复步骤1-3，直到排序完成

见以下代码：

```
function bubbleSort(arr) {
    var len = arr.length;
    for(var i = 0; i < len - 1; i++) {
        for(var j = 0; j < len - 1 - i; j++) {
            console.log(arr[j], arr[j+1]) 
            if(arr[j] > arr[j+1]) {
                var temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
                console.log(arr);
            }
        }
    }
    return arr;
}

bubbleSort([9,2,6,3])

<!-- 打印:
9 2
[2, 9, 6, 3]
9 6
[2, 6, 9, 3]
9 3
[2, 6, 3, 9] //完成第一轮 -- 最大数 9 排到最后

2 6
6 3
[2, 3, 6, 9] //完成第二轮 -- 6 排到 9 前面
2 3
[2, 3, 6, 9] //完成第三轮 排序完成
-->
```

### 2. 选择排序

工作原理：`首先在未排序序列中找到最小元素存放到排序序列起始位置，然后再从剩余未排序元素中继续寻找最小元素放到排序序列的末尾。以此类推，直到所有元素排序完成。`   

见以下代码：

```
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for(var i = 0; i < len - 1; i++) {
        minIndex = i;
        for(var j = i + 1; j < len; j++) {
            console.log(arr[minIndex], arr[j]);
            if(arr[j] < arr[minIndex]) { // 寻找最小数
                minIndex = j; // 保存最小数索引
                console.log(minIndex);
            }
        }

        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
        console.log(arr);
    }
    return arr;
}

selectionSort([9, 2, 6, 3])

<!-- 打印：
9 2
1
2 6
2 3
[2, 9, 6, 3] // 完成第一轮 将最小数位置与第一位位置元素进行交换

9 6
2
6 3
3
[2, 3, 6, 9] // 完成第二轮 将剩余3位中最小数位置与第二位位置元素进行交换
6 9
[2, 3, 6, 9] // 完成排序
-->
```

### 3. 插入排序

算法描述：

* 从第一个元素开始，该元素可以认为已经被排序
* 取出下一个元素，在已经排序的元素序列中从后向前扫描
* 如果该元素（已排序）大于新元素，将该元素移到下一位置
* 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
* 将该元素插入到该位置后
* 重复步骤2~5

见以下代码：

```
function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for(var i = 1; i < len; i++) {
        preIndex = i - 1;  // 已排序 - 最后索引
        current = arr[i];  // 未排序 - 第一个索引
        console.log(arr[preIndex], current);
        while(preIndex >= 0 && arr[preIndex] > current) { // 未排序数值current与已排序序列一一从后往前进行比较
            arr[preIndex + 1] = arr[preIndex]; // 未排序值小于已排序比较值 -- 则将已排序值放最后
            preIndex--; // 从后往前跟当前 current 一一比较
        }
        arr[preIndex + 1] = current;
        console.log(arr);
    }
    return arr;
}

insertionSort([9, 2, 1, 3])

<!-- 打印：
9 2
[2, 9, 1, 3]
9 1
[1, 2, 9, 3]
9 3
[1, 2, 3, 9]
-->
```

### 4. 快速排序

算法描述：把一个串分为两个子串

* 从数列中挑出一个元素，称为“基准”
* 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准后面（相同数可以任一边）。   
在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区操作
* 递归的把小于基准值元素的子数列和大于基准值元素的子数列排序

见以下代码：

```
function quickSort(arr) {
  if (arr.length <= 1) { return arr; }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0]; 
  console.log(pivot);
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++){
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  console.log(left, right);
  return quickSort(left).concat([pivot], quickSort(right)); // 递归
};

quickSort([9, 2, 6, 5, 3, 7]);

<!-- 打印：
5
[2, 3]  [9, 6, 7]
3
[2]     []  // quickSort(left) => [2].concat(3, []) => [2, 3]
6
[]      [9, 7] // quickSort(right) => [].concat(6, quickSort([9, 7]))
7                                                                         =>[].concat(6, [7, 9]) => [6, 7, 9]
[]      [9] // quickSort([9, 7] => [].concat(7, 9) => [7, 9] 

[2, 3, 5, 6, 7, 9]   // 最终拼接完成排序 => [2, 3].concat(5, [6, 7, 9]) => [2, 3, 5, 6, 7, 9] 
-->
```

可参考：<https://www.cnblogs.com/gitnull/p/9532191.html>


