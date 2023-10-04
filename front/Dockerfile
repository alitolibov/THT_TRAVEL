FROM node:16-alpine as build-stage

WORKDIR /app
COPY package.json .npmrc ./
RUN npm i
COPY . .

FROM build-stage as prod
RUN npm build
CMD npm start