FROM node:slim
LABEL maintainer = "talindvl@gmail.com"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./server/ ./
RUN npm install
CMD ["node", "src/index.js"]