# BUILD FOR DEVELOPMENT #

FROM node:18.17.0-alpine As development

WORKDIR /app

COPY package*.json ./

RUN npm install --only=development

VOLUME ["./:/app"]

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]