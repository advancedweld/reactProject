## introduction

第一个项目 20220716

~~主要是用来搞 webpack 相关的配置~~ **现在是已经个人技术栈学习项目**

## 主要技术栈

**框架** [react18](https://react.dev/)+[typescript](https://www.tslang.cn/docs/home.html)+[webpack](https://www.webpackjs.com/)

**状态管理** [zustand](https://github.com/pmndrs/zustand) + [mobax](https://cn.mobx.js.org)

**ui 框架** [antd5](https://ant.design/docs/react/introduce-cn)

**网络请求** [axios](https://github.com/axios/axios) + [react-query](https://cangsdarm.github.io/react-query-web-i18n/react/)

**动画** [framer-motion](https://www.framer.com/motion/)

**路由** [react-router-dom](https://reactrouter.com/en/main)

**打包部署** [docker + nginx](https://juejin.cn/post/7385132405798813705)

**其他**

1. 图像编辑器,基于[konva](https://github.com/konvajs/react-konva) 实现了图像的组合，旋转平移缩放以及图像颜色对比度等的调整
2. 智能抠图，前端基于 canvas 实现，后端基于 stable-diffusion-webui 的图像分割模型实现
3. 性能监控自己写的 sdk，采集上报 fcp,lcp,fps,网络延迟等数据

## 踩坑

- antd5 默认采用了 dayjs 作为日期处理库，所以 dayjs 直接引入，不需要再额外安装，要不然会报错

## attention

请用 yarn 命令，不要用 npm 命令

## bash

```bash

yarn

yarn dev
```

## docker 部署

```bash
# 构建镜像并启动容器
docker-compose up --build -d

# 构建镜像
docker-compose build

# 导出镜像tar包
docker save -o app.tar image-name:latest
# docker save -o app.tar react-image:latest

# 解压并加载镜像tar包
docker load -i /home/ubuntu/app.tar

# 根据镜像启动容器
# 宿主机端口 - 容器端口
docker run -d -p 80:80 --name container-name -e NODE_ENV=production image-name:latest

docker run -d -p 80:80 --name react-container -e NODE_ENV=production  react-image:latest
# 删除未使用资源(包括镜像/容器/网络  谨慎使用！)
docker system prune -a

# 清理悬空镜像
docker rmi $(docker images -f "dangling=true" -q)

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

~~2.性能监控~~

3.性能监控管理

~~3.amap 地图接入~~

4.echarts
