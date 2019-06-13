FROM node:12-alpine

COPY . /app
WORKDIR /app

RUN npm ci
RUN npm run build

RUN apk add --no-cache nginx
ADD nginx.conf /

EXPOSE 5000
