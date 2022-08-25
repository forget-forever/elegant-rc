---
title: ProTable实用方法
nav:
  title: 实用方法
  path: /func
group:
  path: /func
---

# 收集了一些 ProTable 的实用的方法

## renderColumns

二次封装一下 Columns, 增加了 dataIndex 的限制, dataIndex 为‘options’的时候会默认固定右边

## 全部不需要隐藏 search,只有个别需要

<code src="./demos/NoSearch.tsx" />
