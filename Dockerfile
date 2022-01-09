FROM node:16-alpine

WORKDIR /app

COPY package.json /app

RUN npm install --production

COPY . /app

# CMD [ "npm", "start" ]