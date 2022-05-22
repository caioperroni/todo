FROM alpine:latest

WORKDIR /api

RUN apk add --no-cache bash
RUN apk add --no-cache nodejs
RUN apk add --no-cache npm
RUN apk add --no-cache git

COPY api/package*.json ./
COPY api/dist ./

RUN npm i

EXPOSE 3001

CMD ["node", "index.js"]