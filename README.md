## introduction

第一个项目 20220716

主要是用来搞 webpack 相关的配置

## 技术栈

- 动画： [framer-motion](https://www.framer.com/motion/)

**踩坑**

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

2.监控数据管理

3.地图接入

4.echarts
