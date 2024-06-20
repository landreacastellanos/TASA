FROM node:16-alpine AS builder

COPY . /app
WORKDIR /app

RUN npm install --legacy-peer-deps
RUN npm run build

FROM nginx:1.20.0-alpine
COPY --from=builder /app/dist/front . /usr/share/nginx/html/