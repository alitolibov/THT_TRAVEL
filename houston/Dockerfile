FROM node:18-alpine as build-stage

WORKDIR /app
RUN npm install -g pnpm@9.12.0
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm i
COPY . .

FROM build-stage as prod
RUN pnpm lint
RUN pnpm build
CMD pnpm start:prod

FROM build-stage as dev
CMD pnpm dev
