---
en: 298819210528361b44f0a09479657c243b3af513
lang: ru-RU
---

# Плагины

Обычно плагины добавляют функциональность глобального уровня в VuePress. Не существует строго определенной области действия для плагина, есть несколько типов плагинов:

1. Расширение метаданных страницы, сгенерированных во время сборки, например [@vuepress/plugin-last-updated](./official/plugin-last-updated.md);
2. Создание дополнительных файлов до или после сборки, например [@vuepress/plugin-pwa](./official/plugin-pwa.md);
3. Внедрение глобальных интерфейсов, например [@vuepress/plugin-back-to-top](./official/plugin-back-to-top.md);
4. Расширение CLI с помощью пользовательских команд, например [vuepress-plugin-export](https://github.com/ulivz/vuepress-plugin-export).

Также немного сложный пример плагина [@vuepress/plugin-blog](https://vuepress-plugin-blog.ulivz.com), который использует метаданные во время компиляции для генерации некоторых динамических модулей и их инициализации на стороне клиента с помощью `enhanceAppFiles`.

Архитектура всей системы плагинов выглядит следующим образом:

![Архитектура VuePress](/architecture.png)
