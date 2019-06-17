---
en: 3a4fa7b0acd7ae6e71b78445714dae2986d5990c
lang: ru-RU
---

# Интерфейс командной строки

## Использование

```bash
vuepress <command> targetDir [options]
```

## build

Сборка dir в виде статического сайта.

### -p, --port `<port>`
Смотрите [port](../config/README.md#port).

### -t, --temp `<temp>`
Смотрите [temp](../config/README.md#temp).

### -c, --cache `[cache]`
### -no--cache
Смотрите [cache](../config/README.md#cache).

### --dest `<dest>`
Смотрите [dest](../config/README.md#dest).

### --debug
Запуск сервера разработки в режиме отладки.

### --silent
Запуск сервера разработки в автоматическом режиме.

## dev

Запуск сервера разработки. Доступны все опции из `vuepress build`. Также есть несколько вариантов специально для dev:

### --host `<host>`
Смотрите [host](../config/README.md#host).

### --open
Открывает браузер, когда будет готов к работе.

### --no-clear-screen
Не очищает экран, когда сервер разработки будет готов к работе.

## eject

Копирование темы по умолчанию в `.vuepress/theme` для настройки.

## info

Показывает отладочную информацию о локальной среде.

## more commands

Вы можете создать пользовательскую команду с помощью [extendCli](../plugin/option-api.md#extendcli).
