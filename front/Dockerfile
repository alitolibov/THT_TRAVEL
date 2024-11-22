FROM node:18-alpine as build-stage
WORKDIR /app

COPY package.json pnpm-lock.json ./
RUN npm i
COPY . .

FROM build-stage as prod
RUN npm run lint
RUN npm run build
CMD npm run start