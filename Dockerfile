
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install axios@1.6.0
RUN npm install convertapi@1.13.0
RUN npm install express@4.18.2
RUN npm install multer@1.4.5-lts.1
RUN npm install mysql@2.18.1


COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]