FROM node:16 as backend
WORKDIR /usr/src/api
COPY . .
RUN npm install -g pm2 typescript nodemon ts-node
RUN npm install
RUN npm run build
EXPOSE 9000
