FROM node:18.17.0-alpine As development

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=4000

EXPOSE $PORT

FROM node:18.17.0-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

COPY --from=development /src/dist ./dist

CMD ["node", "dist/main"]