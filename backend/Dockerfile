FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production && npm audit fix

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]
