FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY app/api/package*.json ./app/api/
COPY packages/shared/package*.json ./packages/shared/

RUN npm ci

COPY app/api ./app/api
COPY packages/shared ./packages/shared

WORKDIR /app/app/api

EXPOSE 8787

CMD ["npx", "tsx", "src/index.ts"]
