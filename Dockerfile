FROM node:latest as angular
WORKDIR /app
COPY package.json /app
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/rpg-soundboard /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
