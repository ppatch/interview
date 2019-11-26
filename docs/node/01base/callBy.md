### 1.值传递。
当我们用 **=** 将一个变量的值赋值到另外一个变量的时候，实际上是将对应的值拷贝了一份，然后重新赋值给新的变量。赋值后两个变量单独存储对应的值，相互修改不会造成值的影响。
``` js
  var x = 10;
  var y = 'qwe';

  var a = x;
  var b = y;
  console.log(x, y, a, b); // 10 'qwe' 10 'qwe'

  a = 5;
  b = 'asd'
  console.log(x, y, a, b); // 10 'qwe' 5 'asd'
```
### 2.引用传递。
对象是通过引用传递，而不是值传递。也就是说，变量赋值只会将地址传递过去。
``` js
var reference = [1];
var refCopy = reference;
```
变量 | 地址 | 对象
 - | - | -
 reference | #001 | [1]
 refCopy | #001 | 
 reference和refCopy指向同一个数组。 如果我们更新reference，refCopy也会受到影响。
 ``` js
 reference = [1,2]
 ```

变量 | 地址 | 对象
 - | - | -
 reference | #001 | [1,2]
 refCopy | #001 | 
 ``` js
 console.log(reference); // [1,2]
 console.log(refCopy); // [1,2]
 ```
### 3.引用传递和值传递。
* [基本数据类型](/node/01base/dataType.md)都为值传递。
* [对象数据类型](/node/01base/dataType.md)都为引用传递。

### 4.题目
``` js
var Obj = {
  a: 1,
  b: '2'
}
function fn(obj) {
  var _obj = obj
  _obj.a = 2
  return Obj.a + _obj.b
}
fn(Obj; // '22'
```