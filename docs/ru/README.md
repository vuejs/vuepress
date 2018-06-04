---
home: true
heroImage: /hero.png
actionText: Введение →
actionLink: /ru/guide/
features:
- title: Простой
  details: Минимальная настройка с markdown-ориентированной структурой проекта позволяет сосредоточиться на написании.
- title: Сделано на Vue
  details: Наслаждайтесь опытом разработки на Vue + webpack, используйте компоненты Vue в markdown, и создавайте собственные темы с Vue.
- title: Производительный
  details: VuePress генерирует пре-рендеренный статический HTML для каждой страницы, и запускается как SPA после загрузки страницы.
footer: MIT Licensed | Copyright © 2018-present Evan You
---

### Просто как 1, 2, 3

``` bash
# устанавливаем
yarn global add vuepress # OR npm install -g vuepress

# создаём markdown-файл
echo '# Hello VuePress' > README.md

# начинаем писать
vuepress dev

# собираем в статичные файлы
vuepress build
```

::: warning ПРИМЕЧАНИЕ СОВМЕСТИМОСТИ
VuePress требует Node.js >= 8.
:::
