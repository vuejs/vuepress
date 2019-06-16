---
en: 0ba55dbbf14ea5cef2f28bcef1f9a4d6a249e5e6
lang: ru-RU
---

# Развертывание

Следующие руководства основаны на нескольких общих предположениях:

- Вы размещаете свои документы в каталоге `docs` вашего проекта;
- Вы используете выходное местоположение сборки по умолчанию (`.vuepress/dist`);
- VuePress установлен как локальная зависимость в вашем проекте, и вы настроили следующие сценарии npm:

``` json
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```

## GitHub Pages

1. Установите правильный `base` в `docs/.vuepress/config.js`.

   Если вы развертываете в `https://<USERNAME>.github.io/`, вы можете опустить `base`, так как по умолчанию используется `"/"`.

   Если вы развертываете в `https://<USERNAME>.github.io/<REPO>/`, (т.е. ваш репозиторий находится в `https://github.com/<USERNAME>/<REPO>`), установите `base`, как `"/<REPO>/"`.

2. Внутри вашего проекта создайте `deploy.sh` со следующим содержимым (с выделенными строками без комментариев) и запустите его для развертывания:

``` bash{13,20,23}
#!/usr/bin/env sh

# прервать, при ошибках
set -e

# сбока
npm run docs:build

# переход в выходной каталог сборки
cd docs/.vuepress/dist

# если вы развертываете на пользовательский домен
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# если вы развертываете по адресу https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы развертываете по адресу https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

::: tip Совет
Вы также можете запустить приведенный выше скрипт в настройке CI, чтобы включить автоматическое развертывание при каждом нажатии.
:::

### GitHub Pages и Travis CI

1. Установите правильный `base` в `docs/.vuepress/config.js`.

   Если вы развертываете в `https://<USERNAME или GROUP>.github.io/`, вы можете опустить `base`, так как по умолчанию используется `"/"`.
        
   Если вы развертываете в `https://<USERNAME или GROUP>.github.io/<REPO>/`, (т.е. ваш репозиторий находится в `https://github.com/<USERNAME>/<REPO>`), установите `base`, как `"/<REPO>/"`.

2. Создайте файл с именем `.travis.yml` в корне вашего проекта.

3. Используйте шаблон поставщика развертывания GitHub Pages и следуйте [документации travis](https://docs.travis-ci.com/user/deployment/pages/).

``` yaml
language: node_js
node_js:
  - lts/*
script:
  - npm run docs:build
deploy:
  provider: pages
  skip-cleanup: true
  local_dir: docs/.vuepress/dist
  github-token: $GITHUB_TOKEN # токен, сгенерированный на github, позволяющий travis помещать код в ваш репозиторий
  keep-history: true
  on:
    branch: master
```

## GitLab Pages и GitLab CI

1. Установите правильный `base` в `docs/.vuepress/config.js`.

   Если вы развертываете в `https://<USERNAME или GROUP>.gitlab.io/`, вы можете опустить `base`, так как по умолчанию используется `"/"`.
    
   Если вы развертываете в `https://<USERNAME или GROUP>.gitlab.io/<REPO>/`, (т.е. ваш репозиторий находится в `https://gitlab.com/<USERNAME>/<REPO>`), установите `base`, как `"/<REPO>/"`.

2. Установите `dest` в `.vuepress/config.js`, как `public`.

3. Создайте файл с именем `.gitlab-ci.yml` в корне вашего проекта с содержанием ниже. Это создаст и развернет ваш сайт всякий раз, когда вы вносите изменения в свой контент.

``` yaml
image: node:9.11.1

pages:
  cache:
    paths:
    - node_modules/

  script:
  - npm install
  - npm run docs:build
  artifacts:
    paths:
    - public
  only:
  - master
```


## Netlify

1. На Netlify настройте новый проект из GitHub со следующими настройками:

  - **Build Command:** `npm run docs:build` или `yarn docs:build`
  - **Publish directory:** `docs/.vuepress/dist`

2. Нажмите кнопку развертывания!

## Google Firebase

1. Убедитесь, что у вас установлен [firebase-tools](https://www.npmjs.com/package/firebase-tools).

2. Создайте `firebase.json` и `.firebaserc` в корне вашего проекта со следующим содержанием:

`firebase.json`:
```json
{
 "hosting": {
   "public": "./docs/.vuepress/dist",
   "ignore": []
 }
}
```

`.firebaserc`:
```js
{
 "projects": {
   "default": "<YOUR_FIREBASE_ID>"
 }
}
```

3. После запуска `yarn docs:build` или `npm run docs:build` выполните развертывание с помощью команды `firebase deploy`.

## Surge

1. Для начала установите [surge](https://www.npmjs.com/package/surge), если вы еще этого не сделали.

2. Запустите `yarn docs:build` или `npm run docs:build`.

3. Разверните на surge, набрав `surge docs/.vuepress/dist`.

Вы также можете выполнить развертывание в [пользовательский домен](http://surge.sh/help/adding-a-custom-domain), добавив `surge docs/.vuepress/dist yourdomain.com`.

## Heroku

1. Для начала установите [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

2. Создать учетную запись Heroku [здесь](https://signup.heroku.com).

3. Запустите `heroku login` и введите свои учетные данные Heroku:
  
 ``` bash
 heroku login
 ```

4. Создайте файл с именем `static.json` в корне вашего проекта с содержанием ниже:

 `static.json`:
 ```json
 {
   "root": "./docs/.vuepress/dist"
 }
 ```

Это конфигурация вашего сайта. Смотрите больше в [heroku-buildpack-static](https://github.com/heroku/heroku-buildpack-static).

5. Настройте ваш Heroku git remote:

``` bash
# изменение версии
git init
git add .
git commit -m "Мой сайт готов к развертыванию."

# создание нового приложения с указанным именем
heroku apps:create example

# установка buildpack для статических сайтов
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
```

6. Развертывание вашего сайта

``` bash
# публикация сайт
git push heroku master

# открытие браузера для просмотра версии Heroku CI на приборной панели
heroku open
```

## Now

Пожалуйста, обратитесь к [Пример развертывания веб-сайта Vuepress с Now](https://zeit.co/examples/vuepress/).
