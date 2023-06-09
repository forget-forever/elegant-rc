---
title: ButtonAsync 按钮自动loading
nav:
  title: 组件
  path: /components
group:
  path: /components
---

# ButtonAsync 组件

用于一些异步点击需要需要 loading 的情况

## 基础使用

<code src="./demos/index.tsx" />

## 非异步函数

onClick 函数返回值在不是 Promise 时，就不会触发按钮中的 loading 事件，节省性能

<code src="./demos/util.tsx" />

## 手动触发

也可以手动的去触发 loading

<code src="./demos/manul.tsx" />

## 延时 loading

给 loading 加 delay

<code src="./demos/delay.tsx" />

<API></API>

除以上 API 外，倒计时按钮还支持 Button 组件（Ant Design）的所有 API 。
