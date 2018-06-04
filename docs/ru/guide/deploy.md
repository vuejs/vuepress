# Публикация

Эти руководства основаны на нескольких предположениях:

- Вы располагаете вашу документацию внутри каталога `docs` вашего проекта;
- Вы используете местоположение по умолчанию для итоговой сборки (`.vuepress/dist`);
- VuePress установлен как локальная зависимость в проекте, и есть следующие npm scripts:

``` json
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```

## GitHub Pages

1. Установите корректное значение `base` в `docs/.vuepress/config.js`.

    Если вы публикуете по адресу `https://<USERNAME>.github.io/`, вы можете опустить `base`, так как по умолчанию значение `"/"`.

    Если вы публикуете по адресу `https://<USERNAME>.github.io/<REPO>/`, (т.е. ваш репозиторий находится по адресу `https://github.com/<USERNAME>/<REPO>`), установите `base` в значение `"/<REPO>/"`.

2. Внутри вашего проекта создайте файл `deploy.sh` со следующим содержимым (раскомментировав некоторые строки при необходимости) и запустите его для публикации:

``` bash{13,20,23}
#!/usr/bin/env sh

# прервать публикацию при ошибках
set -e

# сборка
npm run docs:build

# переход в каталог с итоговой сборкой
cd docs/.vuepress/dist

# если вы публикуете на собственный домен
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# если вы публикуете по адресу https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

::: tip СОВЕТ
Вы также можете запустить приведённый выше скрипт в вашей конфигурации CI, чтобы использовать автоматическую публикацию при каждом push в репозиторий.
:::

## GitLab Pages и GitLab CI

1. Установите корректное значение `base` в `docs/.vuepress/config.js`.

    Если вы публикуете по адресу `https://<USERNAME>.github.io/`, вы можете опустить `base`, так как по умолчанию значение `"/"`.

    Если вы публикуете по адресу `https://<USERNAME>.github.io/<REPO>/`, (т.е. ваш репозиторий находится по адресу `https://github.com/<USERNAME>/<REPO>`), установите `base` в значение `"/<REPO>/"`.

2. Установите `dest` в `.vuepress/config.js` в значение `public`.

3. Создайте файл с именем `.gitlab-ci.yml` в корне вашего проекта с указанным содержимым. Это будет собирать и публиковать ваш сайт, когда вы вносите изменения.

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

1. На Netlify создайте новый проект из GitHub со следующими настройками:

  - **Команда сборки:** `npm run docs:build` или `yarn docs:build`
  - **Каталог публикации:** `docs/.vuepress/dist`

2. Нажмите кнопку для публикации!

## Google Firebase

1. Убедитесь, что у вас установлены [firebase-tools](https://www.npmjs.com/package/firebase-tools).

2. Создайте файлы `firebase.json` и `.firebaserc` в корне вашего проекта:

    `firebase.json`:
    ``` json
    {
      "hosting": {
        "public": "./docs/.vuepress/dist",
        "ignore": []
      }
    }
    ```

    `.firebaserc`:
    ``` js
    {
      "projects": {
        "default": "<YOUR_FIREBASE_ID>"
      }
    }
    ```

3. После запуска `yarn docs:build` или `npm run docs:build`, опубликуйте с помощью команды `firebase deploy`.

## Surge

1. Установите [surge](https://www.npmjs.com/package/surge), если ещё этого не сделали.

2. Запустите `yarn docs:build` или `npm run docs:build`.

3. Опубликуйте в surge, с помощью команды `surge docs/.vuepress/dist`.

Вы также можете опубликовать на [собственный домен](http://surge.sh/help/adding-a-custom-domain) добавив в команду `surge docs/.vuepress/dist yourdomain.com`.

## Heroku

1. Установите [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

2. Создайте аккаунт на Heroku [здесь](https://signup.heroku.com).

3. Запустите `heroku login` и введите данные вашего аккаунта Heroku:
  
 ``` bash
 heroku login
 ```

4. Создайте файл `static.json` в корне вашего проекта:

 `static.json`:
 ``` json
 {
   "root": "./docs/.vuepress/dist"
 }
 ```

Это конфигурация вашего сайта. Подробнее в документации [heroku-buildpack-static](https://github.com/heroku/heroku-buildpack-static).

5. Установите Heroku в вашем git remote:

``` bash
# изменение версии
git init
git add .
git commit -m "Мой сайт готов для публикации."

# создание нового приложения с указанным именем
heroku apps:create example

# устанавливает buildpack для статичных сайтов
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
```

6. Опубликуйте ваш сайт

``` bash
# публикация сайта
git push heroku master

# открыть браузер для отображения страницы Heroku CI
heroku open
```
