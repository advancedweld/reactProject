#!/bin/bash

# 加载镜像
docker load -i app.tar

# 检查镜像是否成功加载
if docker images | grep -q "react-image"; then
  echo "镜像加载成功，启动容器..."
  docker run -d -p 80:80 --name react-frontend -e NODE_ENV=production react-image:latest
else
  echo "镜像加载失败或未找到指定的镜像标签。"
fi
