**HitOn**是我之前和朋友开玩笑地说自己也能发明一个轻量级标记语言。  
之后在无聊的时候，就想着是不是真的能去实现一个标记语言来玩玩呢？

于是，就有了现在的**HitOn**。

**HitOn**是一个 markdown 的解析器。  
支持一些常见的 md 语法，**但单因为个人喜好问题，也有一些不兼容的地方。**

如果你既要又要，也可以去尝试一下我的另一个玩具[modell-markedjs-plus](https://github.com/undeadway/modell-markedjs-plus)。  
这个玩具是以 [markedjs](https://marked.js.org/) 为基础，在 markedjs 的基础上，增加了图片名称、标题计数、表格引用三个功能。

不过**HitOn**既然是我自己写的一个玩具，也就是我图个乐子写的，  
所以什么时候支持更多功能，也不知道，  
什么时候可以解决 Bug ，我不保证。

不爽你顺着网线过来咬我啊。

功能如下。

# 基本功能

斜体、粗体、删除线和其他 md 解析器一致。

**但只支持 `**`的加粗，`_` 的斜体设置，不支持 `*` 的斜体和 `__` 的加粗。**

不详细说明。

## 链接

支持一下形式的链接。

### 输入

```
[](https://www.baidu.com)  
[百度](https://www.baidu.com)  
[](https://www.baidu.com "百度一下，你就知道")  
[百度](https://www.baidu.com "百度一下，你就知道")
```

### 输出

```
<a href="www.baidu.com">www.baidu.com</a>
<a href="www.baidu.com">百度</a>
<a title="百度一下，你就知道" href="https://www.baidu.com">https://www.baidu.com</a>
<a title="百度一下，你就知道" href="https://www.baidu.com">百度</a>
```

不支持以下形式的链接

```
<https://www.baidu.com>
```

## 邮件

支持邮件。

### 输入

```
<hzwaygc@gmail.com>
```

### 输出

```
<a href="mailto:hzwaygc@gmail.com">hzwaygc@gmail.com</a>
```

## 图片

### 输入

```
![微信公众号](https://static.waygc.net/imgs/qrcode/wechat.jpg)
```

图片可以输出显示图片名称

### 输出

```
<div>
  <img src="${https://static.waygc.net/imgs/qrcode/wechat.jpg}" />
  <div>图：微信公众号</div>
</div>
```

也可以关闭该选项。

## 行内代码

```
`var a = "10";`。
```

## 列表

```
1. aaa
  1. aaaa
  2. bbbb
2. bbb
3. ccc
```

```
* aaa
* bbb
  * aaaa
  * bbbb
* ccc
* ddd
```

## 引用

```
> 这里是引用外部的文字
>
> > 还可以进行内部再次引用
>
> 引用结束
```

## 表格

```
| 字段一 | 字段二 | 字段三 |
| --- | --- | --- |
| 1-1 | 1-2 | 1-3 |
| 2-1 | 2-2 | 2-3 |
| 3-1 | 3-2 | 3-3 |
```

注意：不支持如在一些方言中，通过第二行设置 `:---` 的方式来进行左右对齐。

## 代码

代码依赖插件实现。

```javascript
var a = 10;
var b = 10;
var c = a + b;
console.log(c);
```

## 计数模式

在使用 \# 的时候，可以变为计数模式。

当输入 `#` 符号时，会判断是几重标题，并输出对应的内容。  
**仅当输入 `#` 时有效。**

但此种方式有以下注意事项

1. 必须保证 # 是连续的 一层层增加，不然中间的断层会从 0 开始计数
2. 最多只能有 6 层

### 输入

```
# 第一段
## 第一段第一章
### 第一段第一章第一节
### 第一段第一章第二节
#### 第一段第一章第一节第一小节
#### 第一段第一章第一节第二小节
## 第一段第二章
### 第一段第二章第一节
### 第一段第二章第二节
### 第一段第一章第三节
#### 第一段第二章第三节第一小节
#### 第一段第二章第三节第二小节
### 第一段第二章第三节
# 第二段
```

### 输出

```
1. 第一段
1.1. 第一段第一章
1.1.1. 第一段第一章第一节
1.1.2. 第一段第一章第二节
1.1.2.1. 第一段第一章第一节第一小节
1.1.2.2. 第一段第一章第一节第二小节
1.2. 第一段第二章
1.2.1. 第一段第二章第一节
1.2.2. 第一段第二章第二节
1.2.3. 第一段第一章第二节
1.2.3.1. 第一段第二章第三节第一小节
1.2.3.1. 第一段第二章第三节第二小节
1.2.4. 第一段第二章第三节
2. 第二段
```

也可以关闭该选项

## 颜色

### 输入

```
#[FF0000]{这里是红字}
```

### 输出

```
<span style="color:#FF0000;">这里是红字</span>
```

## 表格的题注和引用

### 4.1. 题注

在表格后面加入，可以显示为表格的题注。  
表格的名称可以用任意字符。

### 输入

```
@[table]{:表的名称}
```

### 输出

```
<div>表 1</div>
```

# 使用方式

## 安装

```
npm install hiton
```

## 使用

```
import HitOn from "hiton";

const hitOn = HitOn.create({
  image: {
    calling: false
  },
  table: {
    calling: false
  },
  heading: {
    coutingMode: false
  }
});

const html = hitOn.parse(input);
```

其中的参数
```
image: {
  calling: false
}
```

表示不使用 image 的增强功能。  
** 只有明确写出 `calling:false` 才表示不使用增强功能。没有该选项，和 `calling: true` 都会认为是使用该选项`。

表格的增强功能也一样。

### 代码

代码需要额外的插件来实现。

```
const hitOn = HitOn.create({
  codes: (code, name) => { // code = 代码原始内容；name=代码语言
    const output = highlighter(code); // 这里就是外部的插件实现
    return output;
  }
});
```