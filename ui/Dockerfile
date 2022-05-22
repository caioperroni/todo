FROM alpine:latest
WORKDIR /public

RUN apk add --no-cache bash
RUN apk add --no-cache nodejs
RUN apk add --no-cache npm
RUN npm i -g local-web-server

COPY ui/build ./

EXPOSE 8000
CMD ["ws", "--spa", "index.html"]