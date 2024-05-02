FROM nginx:latest

RUN apt -y update && apt -y install nodejs npm
RUN ln -s /usr/bin/nodejs /usr/local/bin/node

COPY config/default.conf /etc/nginx/conf.d/default.conf
COPY www /usr/share/nginx/html

RUN mkdir -p /srv/app
WORKDIR /srv/app


RUN npm config set registry http://registry.npmjs.org/
RUN npm install ws serialport

COPY src /srv/app/
