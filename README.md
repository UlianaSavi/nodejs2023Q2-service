# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

### Usual start
```
npm start
```

## Start app with using Docker

### Single image:
Create docker image:
```
docker build -t <YOUR IMAGE NAME> . (exemple: docker build -t test-app .)
```

Find created docker image `ID` (table where `IMAGE ID` - our `ID`):
```
docker images
```

Create container in image: (after this command app already run in container on `http://localhost:4000/api`)
```
docker run -d -p 4000:4000 --restart=always <IMAGE ID>
```

Find docker `ID` (table where `CONTAINER ID` - our `ID`):
```
docker ps
```

Stop container:
```
docker stop <CONTAINER ID>
```

Delete all containers:
```
docker container prune
```

Delete all images:
```
docker image prune
```

### with Docker compose:
**По дефолту прописан npm run start, для проверки работы dev мода добавьте в Dockerfile в CMD  вместо ["npm", "run", "start"] - ["npm", "run", "start:dev"] и в docker-compose.yml в поле command:  вместо npm run start - npm run start:dev. Так же при проверке работы dev мода нужно учесть его скорость, подробнее ниже, в рекомендации 0**
1 step:
```
docker-compose build
```
2 step:
```
docker-compose up --build -V
```

After starting the app on port (`4000` as default) you can open:
- `http://localhost:4000/api/` - for see main page
- `http://localhost:4000/doc/` OpenAPI documentation (For more information about OpenAPI/Swagger please visit `https://swagger.io/`.)

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


### Information for CROSSCHECK (#2):
**RU**
- Команды для запуска Docker указаны выше в нужной последовательности (для проверки можно смотреть все, что под загоовком "with Docker compose").
- Чтобы проверить пункт "+30 container auto restart after crash" - вы можете почитать инфу по этой ссылке и по ссылкам на статьи, указанные внизу страницы (https://serverfault.com/questions/884759/how-does-restart-always-policy-work-in-docker-compose). Еще можно зайти в `docker-compose.yml` и убедиться в наличии строки `restart: always`.
- Чтобы проверить пункт "+20 Your build image is pushed to DockerHub" - При запуске команды из `Step 2` вы можете видеть там флаг `--build`. Так же в ПР приложила скринот с запушенным репозиторием. И вы можете запустить команду `docker pull ulianasavi/test-app:latest` - это спулит вам image с DockerHub
- Чтобы проверить пункт "+10 Variables used for connection to database to be stored in `.env`" - зайдите в app.controller, там идет коннект с базой данных через typeorm и в `TypeOrmModule.forRoot` вы увидите, что все переменные вынесены как в `.env` файл и используются от туда, так и в константы для подстраховки. Далее в файле `docker-compose.yml`
так же используются переменны из `.env`.
- Для проверки пункта "+30 database files and logs to be stored in volumes instead of container" - Этот пункт можно проверить зайдя в `docker-compose.yml` -  тут у базы данных есть поле
`volumes`, так же как и у сервера свой, все `volumes` указаны внизу того же файла.
- Для проверки пункта "+10 Implemented npm script for vulnerabilities scanning (free solution)" - запустите команду `npm run start:scan` - она соотв. запустит проверку на уязвимости и выведет их в консоль.
- Для проверки пункта "+30 user-defined bridge is created and configured" - запустите все "with Docker compose" и затем введите во второй терминал команду `docker network ls`
в появившейся таблице вы найдете помимо дефолтного моста кастомный. Скопируйте его имя и вызовете команду `docker inspect <NETWORK NAME>`. В появившемся массиве найдите поле 
`"Containers"` - в этом объекте вы найдете информацию о контейнерах, между которыми шарится сеть. Там должен быть каки сервер, так и база данных. ("Name": "server" и "Name": "nodejs2023q2-service-postgres-1").
- Рекомендация 0: При запуске в dev моде после сообщения от сервера `Found 0 errors. Watching for file changes.` часто сервер ОЧЕНЬ долго собирается или виснет (до 5 минут - нужно подождать, если дольше - значит упал, нужно все остановить, удалить и пересобрать). В таком случае нужно либо подождать минут 3-5, либо перезапустить все. Так же лучше для проверки работы тестов и тд выключать дев мод, тк он может упасть и завалить тесты (либо заставит долго ждать).
- Рекомендация 1: не создавайте слишком много контейнеров, тк все может полететь из-за нехватки памяти на компе.
- Рекомендация 2:Так же если вы используете Docker с винды - нужно учитывать, что docker desktop должен быть запущен. Он частенько может вылетать и нуждаться в перезагрузке, поэтому
если видите ошибку, попробуйте перезапустить docker desktop, почистить все существующие контейнеры и images, созданные в процессе кроссчек
и после этого заново пройтись по командам, указанным выше (создание и запуск контейнеров и т.д.)

**EN**
- The commands to run Docker are listed above in the correct sequence. (for crosscheck, you can look at everything under the heading "with Docker compose").
- Tto check the point "+30 container auto restart after crash" - you can read info at this link and at the links to the articles listed in the bottom of page (https://serverfault.com/questions/884759/how-does-restart-always-policy-work-in-docker-compose ). You can also go to `docker-compose.yml` and make sure there is a line `restart: always`.
- To check the item "+20 Your build image is pushed to Docker Pub" - When running the command from `Step 2` you can see the flag `--build` there. I also attached a screenshot with the pushed repository in the PR. And you can run the command `docker pull ulianasav/testapp:latest` - this pull you an image from DockerHub.
- To check the point "+10 Variables used for connection to database to be stored in `.env`" - go to app.controller, there is a connection to the database via typeorm and in   `TypeOrmModule.forRoot` you will see that all variables are rendered as in `.env` file and used from there, and in constants for safety. Also in `docker-compose.yml`
you can see using of `.env` variables.
- To check the item "+30 database files and logs to be stored in volumes instead of container" - This point can be checked by going to `docker-compose.yml` - here the database has a field
`volumes`, just like the server has its own, all `volumes` are listed at the bottom of the same file.
- To check the item "+10 Implemented npmscript for vulnerabilities scanning (free solution)" - run the command `npm run start:scan` - it corresponds to it will run a vulnerability check and display them in the console.
- To check the point "+30 user-defined bridge is created and configured" - do everything under "using Docker compose" title in README.md and then enter the command `docker network ls` into the second terminal.
In the table that appears, you will find a custom bridge in addition to the default one. Copy it name and enter the command `docker inspect <NETWORK NAME>`. In the array that appears, find the field 
`"Containers"` - here you will find info about the contaiыners between which the network is available. There should be both - a server and a database. ("Name": "server" and "Name": "nodejs2023q2-service-postgres-1").
- Recommendation 0: When running in dev mode after a message from the server `Found 0 errors. Watching for file changes.` often the server takes a VERY long time to build or hangs (up to 5 minutes - need to wait, if longer - fell, you need to stop everything, delete and rebuild). In this case, you either need to wait 3-5 minutes, or restart everything. It is also better to turn off the dev mod to check the work of tests because it can fall and fail the tests (or make you wait a long time).
- Recommendation 1: do not create too many containers, because everything can fly due to lack of memory on the computer.
- Recommendation 2: Also, if you use Docker from Windows, you need to take into account that docker desktop must be running. It can often crash and need to be restarted, so
if you see an error, try restarting docker desktop, cleaning all existing containers and images created during the crosscheck process
and then re-go through the commands listed above (creating and starting containers, etc.)