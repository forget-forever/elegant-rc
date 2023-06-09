---
title: EditTable组件
nav:
  title: 组件
  path: /components
group:
  path: /components
---

# EditTable

配合 Form 表单，通过配置 columns 可以完成一个可编辑表格的创建工作

## 基础使用

基础配置

<code src="./demos/index.tsx" />

## 可以忽略唯一 key

可以规避 EditTable 中的 uniqueKey 带来的尴尬场景，使用 symbol 类型，做到开发者无感知 key 的存在，在序列化的时候，symbol 的键会被去掉

<code src="./demos/others.tsx" />

## 自己传受控节点

目前自己只集成了 Input 和 Select 控件， 也可以使用 renderItem 来自定义控件

## Attention

由于时间原因，EditTable、EditTable.EditTableSym 俩组件都只适合在 Form 表单中使用，不适合独立受控

<code src="./demos/self.tsx" />

<API></API>
