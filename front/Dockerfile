FROM node:16-alpine as build-stage

WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .

FROM build-stage as prod
RUN npm run build
CMD npm run start