# specify the node base image with your desired version node:<version>
FROM node:8.9.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn config set registry https://registry.npmjs.org/ && yarn install --maxsockets 10 --verbose

EXPOSE 3000