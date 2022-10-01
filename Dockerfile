ARG NODE_VERSION=16.14.2-alpine
ARG NGINX_VERSION=1.15


# Stage build

FROM node:${NODE_VERSION} AS spa_builder

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

# Stage run

FROM nginx:${NGINX_VERSION} AS spa_ui

COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY .docker/nginx/docker-entrypoint.sh /docker-entrypoint.sh

COPY --from=spa_builder /app/build/ /usr/share/nginx/html

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD [ "nginx", "-g","daemon off;" ]
