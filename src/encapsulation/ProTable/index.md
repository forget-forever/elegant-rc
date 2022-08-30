---
title: ProTable
nav:
  title: 组件
  path: /components
group:
  path: /components
---

# 简洁配置的 ProTable

将一些常用的配置项简化的 ProTable，更好的去书写业务代码

## 基础使用

与 ProTable 的使用方法一致，可以做到无痛迁移，可以配合组件库中提供的 renderColumns 去生成 Columns 或者自己写 Columns
<code src="./demos/index.tsx" />

## 全部不需要隐藏 search,只有个别需要

使用 renderColumns，快速的配置全部隐藏 search，只有个别需要

<code src="./demos/NoSearch.tsx" />

## 使用 Columns 中新加的 searchSpan 实现搜索框自由的调整宽度

<code src="./demos/SearchSpan.tsx" />

<API></API>
