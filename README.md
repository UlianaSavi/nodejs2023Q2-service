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

### Start app with using Docker
Create docker image:
```
docker build -t <YOUR IMAGE NAME> . (exemple: docker build -t test-app .)
```

Find created docker image `ID` (table where `IMAGE ID` - our `ID`):
```
docker images
```

Create container in image: (after this command app already run in container)
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


### Information fot CROSSCHECK (#2):
**RU**
- Команды для запуска Docker указаны выше в нужной последовательности.
- Чтобы проверить пункт "+20 Your built image is pushed to DockerHub" - запустите команду `docker pull ulianasavi/test-app`, а затем `docker images` - в списке images вы
увидите экземпляр, взятый из моего репозитория DockerHub.
- Рекомендация 1: не создавайте слишком много контейнеров, тк все может полететь из-за нехватки памяти на компе.
- Рекомендация 2:Так же если вы используете Docker с винды - нужно учитывать, что docker desktop должен быть запущен. Он частенько может вылетать и нуждаться в перезагрузке, поэтому
если видите ошибку, попробуйте перезапустить docker desktop, почистить все существующие контейнеры и images, созданные в процессе кроссчек
и после этого заново пройтись по командам, указанным выше (создание и запуск контейнеров и т.д.)

**EN**
- The commands to run Docker are listed above in the correct sequence.
- - To check the point "+20 Your build image is pushed to DockerHub" - run the command `docker pull ulianasavi/test-app`, and then `docker images` - in the images list you
will see an instance taken from my DockerHub repository.
- Recommendation 1: do not create too many containers, because everything can fly due to lack of memory on the computer.
- Recommendation 2: Also, if you use Docker from Windows, you need to take into account that docker desktop must be running. It can often crash and need to be restarted, so
if you see an error, try restarting docker desktop, cleaning all existing containers and images created during the crosscheck process
and then re-go through the commands listed above (creating and starting containers, etc.)