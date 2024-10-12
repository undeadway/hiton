**HitOn**是我之前和朋友开玩笑地说自己也能发明一个轻量级标记语言。  
之后在无聊的时候，就想着是不是真的能去实现一个标记语言来玩玩呢？

于是，就有了现在的**HitOn**。

**HitOn**是一个 markdown 的解析器。  
支持一些常见的 md 语法，**但单因为个人喜好问题，也有一些不兼容的地方。**

不过**HitOn**自身也不过是我自己写的一个玩具，
也因为这就是我图个乐子写的，所以什么时候支持更多功能，也不知道，
什么时候可以解决 Bug ，我不保证。

不爽你顺着网线过来咬我啊。

功能如下

## 1. 基本功能

斜体、粗体、删除线和其他 md 解析器一致。

**但只支持 `**`的加粗，`_` 的斜体设置，不支持 `*` 的斜体和 `__` 的加粗。**

不详细说明。

## 2. 链接

支持一下形式的链接。

```
[](https://www.baidu.com)  
[百度](https://www.baidu.com)  
[](https://www.baidu.com "百度一下，你就知道")  
[百度](https://www.baidu.com "百度一下，你就知道")
```

输出
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

## 3. 邮件

支持邮件。

```
<hzwaygc@gmail.com>
```

输出
```
<a href="mailto:hzwaygc@gmail.com">hzwaygc@gmail.com</a>
```

## 4. 图片


```
![微信公众号](https://static.waygc.net/imgs/qrcode/wechat.jpg)
```

图片可以输出显示图片名称，输出

```
<div>
  <img src="${https://static.waygc.net/imgs/qrcode/wechat.jpg}" />
  <div>图：微信公众号</div>
</div>
```

也可以关闭该选项。

## 5. 行内代码

```
`var a = "10";`。
```

## 6. 列表

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

## 7. 引用

```
> 这里是引用外部的文字
>
> > 还可以进行内部再次引用
>
> 引用结束
```

8. 表格

```
| 字段一 | 字段二 | 字段三 |
| --- | --- | --- |
| 1-1 | 1-2 | 1-3 |
| 2-1 | 2-2 | 2-3 |
| 3-1 | 3-2 | 3-3 |
```

注意：不支持如在一些方言中，通过第二行设置 `:---` 的方式来进行左右对齐。