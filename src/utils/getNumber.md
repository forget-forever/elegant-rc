---
title: getNumber
nav:
  title: 实用方法
  path: /func
group:
  path: /func
---

# 提取字符串或数字中的数字的方法

## 基础用法

出来是字符串类型

```typescript
import { getNumber } from 'tc-rc';
const str = 'ferwrtg4656879hgrjhny';
const num = getNumber(str); // '4656879'
```

## 强转数字类型

第二个变量传 true 则返回就是数字

```typescript
import { getNumber } from 'tc-rc';
const str = 'ferwrtg4656879hgrjhny';
const num = getNumber(str, true); // 4656879
```
