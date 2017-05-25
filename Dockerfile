FROM nginx:1.13.0-alpine

RUN apk add --update bash

RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.backup
COPY ./nginx.conf /etc/nginx/conf.d/
COPY ./listen.conf /etc/nginx/

RUN mkdir /static
COPY ./static /static

CMD /bin/bash -c "echo \"listen $PORT;\" > /etc/nginx/listen.conf && nginx -g 'daemon off;'"
