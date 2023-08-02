FROM node:18.17.0

WORKDIR /src

COPY package*.json ./

RUN npm i

COPY . .

ENV PORT=4000

EXPOSE $PORT

RUN npm run build

CMD [ "node", "dist/main" ]