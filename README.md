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
## Start app with using Docker

### With Docker compose:
**По дефолту прописан npm run start, для работы d dev модe добавьте в Dockerfile в CMD  вместо ["npm", "run", "start"] - ["npm", "run", "start:dev"] и в docker-compose.yml в поле command:  вместо npm run start - npm run start:dev**

1 step:
```
docker-compose build
```
2 step:
### Dev start
```
docker-compose up --build -V
```
### Usual start 
```
npm run start
```

### Dev start
```
npm run start:dev
```

After starting the app on port (`4000` as default) you can open:
- `http://localhost:4000/api/` - for see main page
- `http://localhost:4000/doc/` OpenAPI documentation (For more information about OpenAPI/Swagger please visit `https://swagger.io/`.)

### Migration:
(instructions for migrations)

РУ Миграции должны запускаться на бд, на которой до этого их не было - иначе будет ошибка.

EN Migrations must be run on a database that did not have them before, otherwise there will be an error.

**generate** migration from entities:
```
npm run typeorm -- -d ./src/typeOrm.config.ts migration:generate ./migrations/test
```

**run** migration:
```
npm run typeorm:run-migrations
```

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


### Information for CROSSCHECK (#3):
**RU**
*Для упрощения проверки ниже списком выведены пункты с баллами и краткая информация о том, куда смотреть, чтобы их проверить (не считая совсем очевидные пункты):*

- `+20` Custom LoggingService is implemented and used for logging

- `+20` Custom Exception Filter is implemented and used for handling exceptions during request processing - лежит в папке `utils` и используется в `main.ts`

- `+20` Logging for request (of at least url, query parameters, body) and response with status code is implemented. - можно зайди в любой контроллер и увидеть там а) перед обращением к сервису логирование запроса, а после б) логирование статуса кода ответа.

- `+20` Error handling is implemented including sending response with an appropriate http status code and errors logging.

- `+10` Error handling and logging is implemented for uncaughtException event. - в Exception Filter.

- `+10` Error handling and logging is implemented for unhandledRejection event. - в Exception Filter.

- `+30` Route `/auth/signup` implemented correctly, related logic is divided between controller and corresponding service

- `+30` Route `/auth/login` has been implemented, related logic is divided between controller and corresponding service

- `+10` User password saved into database as hash - в методе `signUp` сервиса `AuthService` строка `29` `hashPassword`

- `+20` Access Token is implemented, JWT payload contains userId and login, secret key is saved in .env. - имя env перемнной `JWT_SECRET_KEY`.

- `+40` Authentication is required for the access to all routes except `/auth/signup`, `/auth/login`, /doc and /. - для этого в `utils` есть `public.decorator.ts` и возле соотв. роутов к контроллерах выставлены `@Public()`.

- `-10` Separate module is implemented within application scope to check that all requests to all routes except mentioned above contain required JWT token

- `+20` Logs are written to a file. - по пути `Logger/logs/`.

- `+10` Logs files are rotated with size.  - в функции `writeLogToFile` - используется `checkRotation`.

- `-10` Add environment variable to specify max file size.

- `+10` Error logs are written to a separate file (either only to a separate file or in addition to logging into a common file). - по пути `Logger/logs/` есть несколько файлов, под: 1) ошибки, 2)запросы, 3) ответы, 4)uncaught.

- `+20` Add environment variable to specify logging level and corresponding functionality. Logs with configured level to be registered as well as other higher priority     
levels. For example if you set level 2, all messages with levels 0, 1 and 2 should be logged. You should use Nest.js logging levels. - в `package.json` - сетятся в команды запуска соотв. env переменные, а уровень логирования указан в `main.ts`.

- `-30` Route /auth/refresh implemented correctly, related logic is divided between controller and corresponding service

**EN**
*To simplify the crosscheck, the points and brief information about where to look to check them are listed below:*

- `+20` Custom LoggingService is implemented and used for logging

- `+20` Custom Exception Filter is implemented and used for handling exceptions during request processing - it's in utils folder and use in `main.ts`.

- `+20` Logging for request (of at least url, query parameters, body) and response with status code is implemented. - you can go to any controller and see there a) before call the service, logging the request, and after b) logging the status of the response code.

- `+20` Error handling is implemented including sending response with an appropriate http status code and errors logging.

- `+10` Error handling and logging is implemented for uncaughtException event. - in Exception Filter.

- `+10` Error handling and logging is implemented for unhandledRejection event. - in Exception Filter.

- `+30` Route `/auth/signup` implemented correctly, related logic is divided between controller and corresponding service

- `+30` Route `/auth/login` has been implemented, related logic is divided between controller and corresponding service

- `+10` User password saved into database as hash  - in method `signUp` in the service `AuthService` str `29` `hashPassword`

- `+20` Access Token is implemented,JWT payload contains userId and login, secret key is saved in .env.

- `+40` Authentication is required for the access to all routes except `/auth/signup`, `/auth/login`, /doc and /. - to do this, there is `public.decorator.ts` in `utils` folder and next to the corresponding the routes to the controllers are set to `@Public()`.

- `-10` Separate module is implemented within application scope to check that all requests to all routes except mentioned above contain required JWT token

- `+20` Logs are written to a file. - in `Logger/logs/`.

- `+10` Logs files are rotated with size. - in func `writeLogToFile` - use `checkRotation` logic.

- `-10` Add environment variable to specify max file size.

- `+10` Error logs are written to a separate file (either only to a separate file or in addition to logging into a common file). - there are several files under the path `Logger/log/`: 1) errors, 2)requests, 3) responses, 4)sm uncaught.

- `+20` Add environment variable to specify logging level and corresponding functionality. Logs with configured level to be registered as well as other higher priority     
levels. For example if you set level 2, all messages with levels 0, 1 and 2 should be logged. You should use Nest.js logging levels. - in `package.json` - sets in the start commands .env variables, and the logging level is specified in `main.ts`.

- `-30` Route /auth/refresh implemented correctly, related logic is divided between controller and corresponding service
