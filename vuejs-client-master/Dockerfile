FROM node:10-alpine AS build

ADD . /client-vuejs

WORKDIR /client-vuejs

RUN yarn install

RUN yarn build


FROM nginx:1.13-alpine

COPY --from=build /client-vuejs/dist/ /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
