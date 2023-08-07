FROM node:18.17.0-alpine

WORKDIR /src

COPY package*.json ./

RUN npm ci --only=production

COPY . .

ENV PORT=4000

EXPOSE $PORT

CMD [ "node", "dist/main" ]