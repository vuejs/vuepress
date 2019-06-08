---
home: true
heroImage: /hero.png
actionText: Приступить →
actionLink: /ru/guide/
footer: MIT Licensed | Copyright © 2018-present Evan You
---

<div style="text-align: center">
  <Bit/>
</div>

<div class="features">
  <div class="feature">
    <h2>Быстрый старт</h2>
    <p>Проект с минимальной настройкой, ориентированный на Markdown-структуру поможет вам сосредоточиться на написании.</p>
  </div>
  <div class="feature">
    <h2>Созданный на Vue</h2>
    <p>Наслаждайтесь опытом разработки Vue + webpack, используйте компоненты Vue в Markdown и разрабатывайте собственные темы с помощью Vue.</p>
  </div>
  <div class="feature">
    <h2>Производительный</h2>
    <p>VuePress генерирует предварительно визуализированный статический HTML для каждой страницы и запускается как SPA после загрузки страницы.</p>
  </div>
</div>

### Также просто, как 1, 2, 3

``` bash
# установка
yarn global add vuepress # ИЛИ npm install -g vuepress

# создайте markdown файл
echo '# Hello VuePress' > README.md

# начните писать
vuepress dev

# соберите статические файлы
vuepress build
```

::: warning Примечание совместимости
Для VuePress необходим Node.js >= 8.
:::
