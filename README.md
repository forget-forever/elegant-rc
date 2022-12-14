# react 通用组件库项目

docs: http://rcdocs.zhoumeilei.cn

## description

对于 react 项目中可以做解藕的公共组件，特意创建的一个项目，可以将日常开发中觉得有复用价值的组件收集到这个项目中
通过在日常的开发中写过的小而美的代码能够进行一个统一的收集

## dev 开发

```bash
# 安装
yarn
# 启动项目，可以看自己写的demo
npm run start

```

## 目录结构

```bash
|--src
  |--encapsulation # 二次封装的组件
    |--componentDemo
      index.tsx # 组件入口
      index.md # 组件说明文档
      |--demos # 使用范例
    index.ts # 二次封装组件统一加入的入口，每加一个组件记得到这里面去加入口
  |--independent # 自开发组件
    |--componentDemo
      index.tsx # 组件入口
      index.md # 组件说明文档
      |--demos # 使用范例
    index.ts # 自开发组件统一加入的入口，每加一个组件记得到这里面去加入口
  |--hooks # hooks,放入一些有复用价值的hook
    |--hookDemo
      index.ts # hook的入口
      index.md # hook的文档说明
      |--demos # demo演示
    index.ts # hooks 的统一入口，加入一个hook之后记得在这里添加一下入口
  |--utils # 一些实用的方法，可以将一些好用的通用方法加入在这，方式与hook类似
  index.ts # 库的统一入口，
```

## 发布

```bash
npm run release
```

## 注意事项（attention）

- 加一个组件记得在 src/index.ts 中加入入口
- 出于一个规范化的考虑，对于 ts 编译不通过的情况都会不允许发布
- 对于依赖的添加，不要轻易的加 dependency，一般加 devDependency 和 peerDependency 就好了
- 对于新开发的东西建议可以在 src/index.ts 中加统一的导出
- 新加入的物料方法，hook，组件建议做到小而美
