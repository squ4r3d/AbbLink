# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY app/api/package*.json ./app/api/
COPY app/web/package*.json ./app/web/
COPY packages/shared/package*.json ./packages/shared/

RUN npm ci

COPY app/web ./app/web
COPY packages/shared ./packages/shared

ARG VITE_API_BASE
ENV VITE_API_BASE=${VITE_API_BASE}

WORKDIR /app/app/web

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/app/web/dist /usr/share/nginx/html

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
