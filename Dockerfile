# 使用官方 Node.js 14 影像作為基底
FROM node:14

# 設定工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝應用程式的依賴項
RUN npm install

# 複製應用程式的源碼
COPY . .

# 開放容器的 8080 連接埠
EXPOSE 8080

# 啟動應用程式
CMD [ "node", "server.js" ]