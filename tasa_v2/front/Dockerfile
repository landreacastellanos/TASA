FROM node:10-alpine AS builder

COPY . /app
WORKDIR /app

RUN npm ci
RUN npm run build:prod

FROM nginx:1.20.0-alpine
COPY --from=builder /app/dist/front . /usr/share/nginx/html/