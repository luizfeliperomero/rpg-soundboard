FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli --legacy-peer-deps
COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]

