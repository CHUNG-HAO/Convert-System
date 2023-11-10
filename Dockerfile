FROM node:latest

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN yarn install && yarn cache clean

COPY . /usr/src/app

EXPOSE 8080

CMD [ "yarn", "start" ]