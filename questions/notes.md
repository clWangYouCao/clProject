### 1.js相加减乘引发的精度问题

解决思路：一般是将小数乘以10^n都转化为整数，进行运算后再进行统一除法除以10^n

解决代码：

```
numAdd: function(num1, num2) {
  let baseNum, baseNum1, baseNum2;
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  return (Math.round(num1 * baseNum) + Math.round(num2 * baseNum)) / baseNum;
}

numSub: function(num1, num2) {
  let baseNum, baseNum1, baseNum2;
  let precision;// 精度
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
  return Number(((Math.round(num1 * baseNum) - Math.round(num2 * baseNum)) / baseNum).toFixed(precision));
}

numMulti: function(num1, num2) {
  let baseNum = 0;
  try {
    baseNum += num1.toString().split(".")[1].length;
  } catch (e) {
  }
  try {
    baseNum += num2.toString().split(".")[1].length;
  } catch (e) {
  }
  return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
}
```

### 2.日期计算问题
(1)获取当前时间

代码：

```
function getCurentTime(){ 
    var now = new Date();
    
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    
    var hour = now.getHours();            //时
    var minute = now.getMinutes();          //分
    var second = now.getSeconds();           //秒 (皆为number类型)
    
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    
    return year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second; 
}
```

(2)已知几点以来的豪秒数，计算时间

代码(以下是零点以来)：

```
getTime: function(seconds) {
  let msec = (new Date().setHours(0, 0, 0, 0)) + Number(seconds)*1000;
  let date = new Date(msec);
  let hour = date.getHours();
  hour = hour < 10 ? "0" + hour : hour;
  let minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  let second = date.getSeconds();
  second = second < 10 ? "0" + second : second;
  return hour + ":" + minute + ":" + second;
}
```

(3)已知开始日期，间隔天数，计算结束日期

代码：

```
function getDate(datestr){ //格式必须为20180822
	//获取标准零点时间
  var date = new Date(datestr.substr(0, 4), parseInt(datestr.substr(4, 2)) - 1, datestr.substr(6, 2));
  return date;
}

function getEndDate(dateTemp, days){
    var nDate = getDate(dateTemp);
    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000); //转化成毫秒计算
    var rDate = new Date(millSeconds);
    var year = rDate.getFullYear();
    var month = rDate.getMonth() + 1;
    var day = rDate.getDate();
    month = (month > 9) ? ("" + month) : ("0" + month);
		day = (day > 9 ) ? ("" + day) : ("0" + day);
    return year + month + day;
}

调用：getEndDate("20180822", 5); // 20180827
```

(4)已知开始和结束日期，计算中间日期以及间隔天数

代码：

```
function dispLimit(start, end) {
  var startTime = getDate(start);  
  var endTime = getDate(end);  
  var dates = [];
  while((endTime.getTime() - startTime.getTime()) >= 0){  
    var year = startTime.getFullYear();  
    var month = startTime.getMonth() + 1;
    var day = startTime.getDate();
    month = (month > 9) ? ("" + month) : ("0" + month);
    day = (day > 9 ) ? ("" + day) : ("0" + day);
    dates.push((year + month + day));
    startTime.setDate(startTime.getDate() + 1);  //计算后一天毫秒
  }
  return dates;
}

function getDate(datestr){
  var date = new Date(datestr.substr(0, 4), parseInt(datestr.substr(4, 2)) - 1, datestr.substr(6, 2));
  return date;
}

调用：var arr = dispLimit("20180818", "20180822"); // ["20180818", "20180819", "20180820", "20180821", "20180822"]
间隔天数：var days = arr.length - 1; //4
```

(5)计算毫秒数

代码：

```
var date = new Date(); // Wed Aug 22 2018 16:41:41 GMT+0800 (中国标准时间)
date.valueOf(); // 
Math.abs(date); // 可能做了valueOf转换
date.getTime(); // 皆为1534927301256

```
