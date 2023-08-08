FROM node:18.17.0-alpine As development

WORKDIR /src

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

ENV PORT=4000

EXPOSE $PORT