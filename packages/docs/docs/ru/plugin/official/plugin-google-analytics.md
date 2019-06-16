---
en: 94f52e14e2dbd9b90bdf9f44dc83ac518ca35c87
lang: ru-RU
title: google-analytics
metaTitle: Плагин Google Analytics | VuePress
---

# [@vuepress/plugin-google-analytics](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-google-analytics)


> Плагин Google Analytics

## Установка

```bash
yarn add -D @vuepress/plugin-google-analytics@next
# ИЛИ npm install -D @vuepress/plugin-google-analytics@next
```

## Использование

```javascript
module.exports = {
  plugins: [
    [ 
      '@vuepress/google-analytics',
      {
        'ga': '' // UA-00000000-0
      }
    ]  
  ] 
}
```

::: tip
Пожалуйста, имейте в виду [GDPR (реформа правил защиты данных ЕС в 2018 году)](https://ec.europa.eu/commission/priorities/justice-and-fundamental-rights/data-protection/2018-reform-eu-data-protection-rules_en) и рассмотрите возможность настройки Google Analytics для [анонимизации IP-адресов](https://support.google.com/analytics/answer/2763052?hl=ru), где это уместно и/или необходимо.
:::

## Опции

### ga

- Тип: `string`
- По умолчанию: `undefined`

Укажите идентификатор Google Analytics, чтобы включить интеграцию.
