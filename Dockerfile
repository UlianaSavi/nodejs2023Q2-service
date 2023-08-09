# BUILD FOR DEVELOPMENT #

# TODO: 
#   1) Оптимизировать images до > 500mb
#   2) Проверить работоспособность пункта "container auto restart after crash" - и если не работает - заработать его!
#   3) Почитать подробнее про пункт "database files and logs to be stored in volumes instead of container" - и удостоверится, что все точно работает.

FROM node:18.17.0-alpine As development

WORKDIR /src

COPY package*.json ./

RUN npm install --only=development

VOLUME ["./:/src"]

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]