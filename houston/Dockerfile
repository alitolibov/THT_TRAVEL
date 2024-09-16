FROM node:16-alpine as build-stage

WORKDIR /app
RUN npm install -g pnpm@8.15.2
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm i --frozen-lockfile
COPY . .

FROM build-stage as prod
RUN pnpm build
CMD pnpm start:prod

FROM build-stage as dev
CMD pnpm dev
