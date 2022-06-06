# react 通用组件库项目

## description

对于 react 项目中可以做解藕的公共组件，特意创建的一个项目，可以将日常开发中觉得有复用价值的组件收集到这个项目中

## dev 开发

```bash
# 安装
yarn
# 启动项目，可以看自己写的demo
npm run start

```

## components 目录结构

|--src
|--component
|--index.tsx 组件入口
|--index.md 组件说明文档
|--demos 使用范例
｜--index.ts 组件统一加入的入口，每加一个组件记得到这里面去加入口

## 发布

```bash
npm run release
```

## 注意事项（attention）

- 加一个组件记得在 src/index.ts 中加入入口
- 出于一个规范化的考虑，对于 ts 编译不通过的情况都会不允许发布
