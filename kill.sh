#!/bin/bash

# 指定要删除的镜像名称列表
IMAGE_NAMES=("react-image")

# 循环遍历每个镜像名称
for IMAGE_NAME in "${IMAGE_NAMES[@]}"
do
    # 获取所有使用该镜像的容器ID
    CONTAINERS=$(docker ps -a -f "ancestor=${IMAGE_NAME}" -q)
    
    if [ -n "$CONTAINERS" ]; then
        echo "找到以下使用镜像 ${IMAGE_NAME} 的容器：$CONTAINERS"
        # 循环删除每个容器
        for CONTAINER_ID in $CONTAINERS
        do  
            docker rm -f $CONTAINER_ID
        done
    else
        echo "没有找到使用镜像 ${IMAGE_NAME} 的容器。"
    fi

    # 删除镜像
    docker rmi $IMAGE_NAME
done

