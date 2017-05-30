FROM node:7.10.0

ADD . /api

WORKDIR /api

RUN npm install gulp -g

RUN npm install

RUN gulp scripts

EXPOSE 8888

ENTRYPOINT ["node", "dist/index.js", "--inspect"]