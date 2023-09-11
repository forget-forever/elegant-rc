---
title: FormItemCnf 更改Form的路径前缀
nav:
  title: 组件
  path: /components
group:
  path: /components
---

一些情况下我嗯可能需要给 Form.Item 添加前缀，可以通过这个组件提供的方案实现

## 基础使用

<code src='./demos/basic.tsx' />

### FormItemCnfProvider

<API src='./FormItemCnfProvider.tsx' />

- 除了以上的属性，其他的属性与 FormContent 一致，这里面的除了 preNamePath 属性，其他属性都会向下面的 FormItemCnf 注入

### FormItemCnf

<API src='./FormItemCnf.tsx' />

- 除了以上的属性，其他的属性与 FormContent 一致
