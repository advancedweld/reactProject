## introduction

第一个项目 20220716

主要是用来搞 webpack 相关的配置

**踩坑**

- antd5 默认采用了 dayjs 作为日期处理库，所以 dayjs 直接引入，不需要再额外安装，要不然会报错

## attention

请用 yarn 命令，不要用 npm 命令

## bash

```bash

yarn

yarn dev
```

## 目录结构

├─App //根目录
│ ├─auth //页面级别权限控制
│ ├─components //公共组件
│ │ └─dragUpload
│ ├─Dashboard
│ ├─layout
│ │ └─header
│ ├─monitoring
│ └─views // 页面
│ ├─About
│ ├─Components
│ ├─Group
│ ├─HooksTestCom
│ ├─ImageEditor
│ ├─Login
│ │ ├─components
│ │ └─service
│ ├─Mobx
│ ├─MyCollect
│ ├─NestRequest
│ │ └─service
│ ├─NetRequest
│ ├─NoPermission
│ ├─Performance
│ └─TestCode
│ └─bff
├─assets
│ └─images
├─routes
├─store
├─types
└─utils

### TODO list

~~1.error boundary(已完成)~~

2.监控数据管理

3.地图接入

4.echarts
