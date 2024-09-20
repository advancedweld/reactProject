#!/bin/bash
# 检查是否有同名正在运行的容器
if docker ps | grep -q "react-frontend"; then
  echo "发现同名容器正在运行，请先停止或移除该容器。"
  exit 1
fi

# 加载镜像
docker load -i app.tar

# 检查镜像是否成功加载
if docker images | grep -q "react-image"; then
  echo "镜像加载成功，启动容器..."
  docker run -d -p 80:80 --name react-frontend -e NODE_ENV=production react-image:latest
else
  echo "镜像加载失败或未找到指定的镜像标签。"
fi
