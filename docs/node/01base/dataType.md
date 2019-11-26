<!-- ## 数据类型 -->
### 1. js一共有几种数据类型？  
  6个基础类型1个对象类型。  

  基础类型:字符串(string)、数字(number)、布尔(boolean)、空值(null)、未定义(undefined)、符号(symbol)。  
  对象类型: 也叫引用类型(object)，包括数组(array)、方法(function)。  
> string、number、boolean和null、undefined称为5种原始类型，表示不能再细分下去的类型。  

> null 和 undefined 通常被认为是特殊值，这两种类型的值唯一，就是其本身。  

>symbol是ES6中新增的数据类型，symbol 表示独一无二的值，通过 Symbol 函数调用生成，由于生成的 symbol 值为原始类型，所以 Symbol 函数不能使用new 调用；
### 2.类型转换规则:ToPrimitive(转换为原始值)
<font color="#ff502c">ToPrimitive</font>对原始类型不发生转换处理，只针对引用类型（object）的，其目的是将引用类型（object）转换为非对象类型，也就是原始类型。  
<font color="#ff502c">ToPrimitive</font> 运算符接受一个值，和一个可选的期望类型作参数。  
<font color="#ff502c">ToPrimitive</font> 运算符将值转换为非对象类型，如果对象有能力被转换为不止一种原始类型，可以使用可选的 期望类型 来暗示那个类型。  
转换后的结果原始类型是由期望类型决定的，期望类型其实就是我们传递的type。直接看下面比较清楚。  
<font color="#ff502c">ToPrimitive</font> 方法大概长这么个样子具体如下。  
``` js
/**
* @obj 需要转换的对象
* @type 期望转换为的原始数据类型，可选
*/
ToPrimitive(obj,type)
```
**type为string:**  
先调用obj的toString方法，如果为原始值，则return，否则进行第2步  
调用obj的valueOf方法，如果为原始值，则return，否则进行第3步  
抛出TypeError 异常

**type为number:**  
先调用obj的valueOf方法，如果为原始值，则return，否则进行第2步  
调用obj的toString方法，如果为原始值，则return，否则第3步  
抛出TypeError 异常

**type参数为空:**  
该对象为Date，则type被设置为String  
否则，type被设置为Number  

**ToPrimitive 总结**  
ToPrimitive转成何种原始类型，取决于type，type参数可选，若指定，则按照指定类型转换，若不指定，默认根据实用情况分两种情况，Date为string，其余对象为number。那么什么时候会指定type类型呢，那就要看下面两种转换方式了

**toString**  
Object.prototype.toString()  
toString() 方法返回一个表示该对象的字符串。  
每个对象都有一个 toString() 方法，当对象被表示为文本值或者被期望字符串的方式引用对象时，该方法被自动调用。  

**valueOf**  
Object.prototype.valueOf()方法返回指定对象的原始值。  
* Number -> 返回数字值
* String -> 返回字符串值
* Date -> 返回时间戳(毫秒)
* Boolean -> 返回布尔的this值
* Object -> 返回this

**Number**  
调用规则:  
* Number(null) -> 0  
* Number(undefined) -> NaN  
* Number(false) -> 0  
* Number(true) -> 1  
* Number('string:String') -> NaN。  
> 对象在这里要先调用ToPrimitive转换成原始值, type为number, 先valueOf(), 再toString。

**String**  
调用规则
* String(null) -> 'null'  
* String(undefined) -> 'undefined'  
* String(false) -> 'false'
* String(true) -> 'true'  
* 数字转换遵循通用规则，极大极小的数字使用指数形式  
> 对象在这里要先调用ToPrimitive转换成原始值, type为string, 先toString, 再valueOf()  

**Boolean**
除一下5种情况为false，其他情况均为true:
1. undefined
2. null
3. NaN
4. 0、-0、+0
5. ''(空字符串)  

### 3.数据类型判断
* typeof
用于判断除去null外的基本类型和函数类型。
``` js
// 基础类型
typeof 'seymoe'    // 'string'
typeof true        // 'boolean'
typeof 10          // 'number'
typeof Symbol()    // 'symbol'
typeof null        // 'object' 无法判定是否为 null
typeof undefined   // 'undefined'

// 对象类型
typeof {}           // 'object'
typeof []           // 'object'
typeof(() => {})    // 'function'
```
> 可以看出typeof方法，对null和对象类型的子类型判定有误差。
* instanceof  
通过instanceof也可以对对象类型进行判断，其原理就是测试构造函数的prototype是否出现在被检测对象的原型链上。
``` js
// 可行
[] instanceof Array            // true
({}) instanceof Object         // true
(()=>{}) instanceof Function   // true
// 不足: Array 是 Object的子类型，所以instanceof判断arr的原型链上既有Array，Object。
// arr.__proto__ === Array.prototype；Array.prototype.__proto__ === Object.prototype。
let arr = [] 
let obj = []
arr instanceof Array           // true
arr instanceof Object          // true
obj instanceof Object          // true
```
> **疑惑：** 如果Object.prototype.__proto__ === null，岂不是说 arr instanceof null 也应该为 true，这个语句其实会报错提示右侧参数应该为对象，**这也印证 typeof null 的结果为 object 真的只是javascript中的一个bug。**  
* Object.prototype.toString  
可以说是判断数据类型的终极办法了。
``` js
Object.prototype.toString.call({})              // '[object Object]'
Object.prototype.toString.call([])              // '[object Array]'
Object.prototype.toString.call(() => {})        // '[object Function]'
Object.prototype.toString.call('seymoe')        // '[object String]'
Object.prototype.toString.call(1)               // '[object Number]'
Object.prototype.toString.call(true)            // '[object Boolean]'
Object.prototype.toString.call(Symbol())        // '[object Symbol]'
Object.prototype.toString.call(null)            // '[object Null]'
Object.prototype.toString.call(undefined)       // '[object Undefined]'

Object.prototype.toString.call(new Date())      // '[object Date]'
Object.prototype.toString.call(Math)            // '[object Math]'
Object.prototype.toString.call(new Set())       // '[object Set]'
Object.prototype.toString.call(new WeakSet())   // '[object WeakSet]'
Object.prototype.toString.call(new Map())       // '[object Map]'
Object.prototype.toString.call(new WeakMap())   // '[object WeakMap]'
```
* 该方法本质就是依托Object.prototype.toString()方法得到对象内部属性 [[Class]]
* 传入原始类型却能够判定出结果是因为对值进行了包装
* null 和 undefined 能够输出结果是内部实现有做处理

### 4.NaN概念
NaN是一个全局对象的属性，NaN是一个特殊的Number类型。  
什么时候返回NaN:
* 无穷大除以无穷大
* 给任意负数做开方运算
* 算数运算符与不是数字或无法转换为数字的操作数一起使用
* 字符串解析成数字

### 5.题目
``` js
null === undefined;                       // false
null == undefined;                        // true
var bar = true;
console.log(bar + '1');                   // true1
console.log(bar + 1);                     // 2 
console.log(bar > '1');                   // false
console.log(bar === '1');                 // true
console.log(bar + true);                  // 2
console.log(bar + false);                 // 1
console.log(bar + undefined);             // NaN
console.log(bar + null)                   // 1
console.log(String([1,[2,[3,[4,5]]))      // 1,2,3,4,5
console.log(String(Math.pow(1000,10)))    // '1e+30'
console.log({} === {})                    // false
console.log(NaN === NaN)                  // false

```
> 除了+运算，其他运算都会转成Number类型  

> null转换成数值时为0，undefined转换成数值时为NaN  

**面试题: 数据类型判断的方法有哪些，都有什么缺陷吗? (引导 typeOf、instanceof 、Object.pritotype.toString)**

[参考文献](https://juejin.im/post/5d030e03518825361817032f#heading-24)



