### 1.js��Ӽ��������ľ�������

���˼·��һ���ǽ�С������10^n��ת��Ϊ����������������ٽ���ͳһ��������10^n

������룺

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
  let precision;// ����
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

### 2.���ڼ�������
(1)��ȡ��ǰʱ��

���룺

```
function getCurentTime(){ 
    var now = new Date();
    
    var year = now.getFullYear();       //��
    var month = now.getMonth() + 1;     //��
    var day = now.getDate();            //��
    
    var hour = now.getHours();            //ʱ
    var minute = now.getMinutes();          //��
    var second = now.getSeconds();           //�� (��Ϊnumber����)
    
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    
    return year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second; 
}
```

(2)��֪���������ĺ�����������ʱ��

����(�������������)��

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

(3)��֪��ʼ���ڣ���������������������

���룺

```
function getDate(datestr){ //��ʽ����Ϊ20180822
	//��ȡ��׼���ʱ��
  var date = new Date(datestr.substr(0, 4), parseInt(datestr.substr(4, 2)) - 1, datestr.substr(6, 2));
  return date;
}

function getEndDate(dateTemp, days){
    var nDate = getDate(dateTemp);
    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000); //ת���ɺ������
    var rDate = new Date(millSeconds);
    var year = rDate.getFullYear();
    var month = rDate.getMonth() + 1;
    var day = rDate.getDate();
    month = (month > 9) ? ("" + month) : ("0" + month);
		day = (day > 9 ) ? ("" + day) : ("0" + day);
    return year + month + day;
}

���ã�getEndDate("20180822", 5); // 20180827
```

(4)��֪��ʼ�ͽ������ڣ������м������Լ��������

���룺

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
    startTime.setDate(startTime.getDate() + 1);  //�����һ�����
  }
  return dates;
}

function getDate(datestr){
  var date = new Date(datestr.substr(0, 4), parseInt(datestr.substr(4, 2)) - 1, datestr.substr(6, 2));
  return date;
}

���ã�var arr = dispLimit("20180818", "20180822"); // ["20180818", "20180819", "20180820", "20180821", "20180822"]
���������var days = arr.length - 1; //4
```

(5)���������

���룺

```
var date = new Date(); // Wed Aug 22 2018 16:41:41 GMT+0800 (�й���׼ʱ��)
date.valueOf(); // 
Math.abs(date); // ��������valueOfת��
date.getTime(); // ��Ϊ1534927301256

```
