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
npm install or npm install --force
```

## Running application

```
npm start
```

After starting the app on port (`4000` as default) you can open
in your browser OpenAPI documentation by typing `http://localhost:4000/doc/`.
For more information about OpenAPI/Swagger please visit `https://swagger.io/`.

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


### Information fot CROSSCHECK:
**RU**
- Информация о старте сервака и прочем написана чуть выше, поэтому кастомная информация относится непостредственно к кроссчеку :)
- По поводу запуска тестов: `npm run start` в одном терминале и параллельно `npm run test` - результатом должен быть экран на втором терминале как в PR в прикрипленном скриншоте. В таком случае выставляем соотв. пункту "+10 For each successfully passed test" - `+670` баллов (67 кейсов по 10 баллов за каждый)
- За информацию в `readme.md` который вы сейчас читаете - `+10`
- По поводу пунктов имеющих описание типа "divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)" - заходите в любой файл с расширением `.controller.ts` в папке `src` - будет наглядно видно соответствие контроллера архитектурным паттеринам
Неста + ниже использование роутов из `@nestjs/common`. Далее можно зайти в файлы с расширением `.servise.ts` - собстно сервисы. Тут вам будет видно бизнес логику - храниттся как и должна - по сервисам. Остальные файлы так же содержат только то, что должны по паттернам неста и ангуляра. - `+50` (10 баллов за каждый модуль. P.s. они там целом все аналогичны друг другу).
- "PORT value is stored into .env file" - `+10` - есть файл `.env.example` - его нужно переименовать в `.env` и юзать.
- "OpenAPI spec in doc folder corresponds with assignment" - для проверки этого пункта запустите сервак `npm run start`, откройте по пути, написаном в консоли (локалхост 4000) 
и перейдите на роут `/doc` - увидите UI использующий файл `api.yaml` - проверить это использование можно зайдя в файлах в `main.ts` и посмотреть на строку
`SwaggerModule.setup('doc', app, swaggerDocument);` - `+20`
- запустите `npm run lint` - и если есть какие-то ошибки - за каждый НОВУЮ, не повторившуюся снимаем -10 баллов (но вообще ошибок быть не должно !!, поэтому если будут -
пишите мне!) )

Контакты указаны в ПР

**EN**
- Information about the start of the server and others is written a little higher, so this information is directly about crosscheck :)
- About running tests: `npm run start` in one terminal and in parallel `npm run test` - the result should be a screen on the second terminal as in the PR in the attached screen. In this case, we set "+10 For each successfully passed test" - `+670` points (67 cases of 10 points each)
- For information in `readme.md ` which you are reading now - `+10`
- About items having a description of the type "divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)" - go to any file with the extension `.controller.ts` in the folder `src` - the compliance of the controller with architectural patterns will be clearly visible
Nest + below is the use of routes from `@nestjs/common'`. Then you can go to the files with the extension `.servise.ts` - own services. 
Here you will see the business logic - stored as it should - by services. The rest of the files also contain only what they should according to the nest and angular patterns. - `+50` (10 points for each module. P.S. they are generally all similar to each other).
- "PORT value is stored into .env file" - `+10` - there is a file `.env.example` - it needs to be renamed to `.env` and used.
- "OpenAPI spec in doc folder correspondences with assignment" - to check this item, run the server `npm run start`, open the path written in the console (localhost 4000)
and go to the router `/doc` in chrome - you will see the UI using the file `api.yaml` - you can check this file usage by going to the files in `main.ts` and look at the line
`SwaggerModule.setup('doc', app, swaggerDocument);` - `+20`
- run `npm run lint` - and if there are any errors - for each NEW, not repeated, we remove -10 points (but there should be no errors **at all!!**, so if there are -
write to me!))

Contacts are listed in the PR
