# 第一阶段：构建应用
FROM node:18-alpine as builder

# 创建工作目录
WORKDIR /app

# 复制package.json和yarn.lock文件
COPY package.json yarn.lock ./

# 安装yarn
# RUN npm install -g yarn

# 安装项目依赖
RUN yarn install

# 复制项目文件
COPY . .

# 构建项目
RUN yarn build


# 第二阶段：构建Nginx镜像
FROM nginx:alpine

# 复制构建的文件到nginx html目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制nginx配置文件
COPY nginx.conf /etc/nginx/conf.d/

# 暴露端口 暴露内部容器端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]



