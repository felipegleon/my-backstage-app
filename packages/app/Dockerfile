# ---------- Build Step -----------
#FROM node:16-buster AS build

#RUN mkdir /app
#COPY . /app
#WORKDIR /app

#RUN yarn install
#RUN yarn workspace app build
# ---------------------------------

FROM nginx:mainline

RUN apt-get update && apt-get -y install jq && rm -rf /var/lib/apt/lists/*

COPY dist /usr/share/nginx/html
COPY docker/default.conf.template /etc/nginx/templates/default.conf.template

COPY docker/inject-config.sh /docker-entrypoint.d/40-inject-config.sh

ENV PORT 80