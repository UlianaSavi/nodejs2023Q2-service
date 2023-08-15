FROM node:18.17.0-alpine as builder

WORKDIR /src

COPY package*.json ./

COPY . .

RUN npm ci && npm run build

FROM node:18.17.0-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /src/dist/ dist/

USER node

ENTRYPOINT ["npm", "run", "start"]