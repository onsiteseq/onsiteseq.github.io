# Кастомные кнопки социальных сетей

В проекте заменены стандартные кнопки Soopr (Twitter, Facebook, LinkedIn) на кастомные кнопки для Dzen и Telegram.

## Файлы

- `_includes/custom_social_share.html` - Основные кнопки с иконками и текстом
- `_includes/compact_social_share.html` - Компактные кнопки с иконками и текстом
- `_includes/date_and_social_share.html` - Обновлен для использования новых кнопок

## Использование

### Основные кнопки (с иконками и текстом)
```liquid
{% include custom_social_share.html %}
```

### Компактные кнопки (с иконками и текстом)
```liquid
{% include compact_social_share.html %}
```

## Иконки

Используются следующие иконки:
- Dzen: `/assets/images/logo/dzen.png`
- Telegram: `/assets/images/logo/telegram.webp`

## Стили

Кнопки адаптивны и поддерживают:
- Темную и светлую темы
- Hover эффекты с цветами брендов
- Мобильную адаптацию
- Плавные анимации
- Иконки размером 20px (16px на мобильных)

## Отключение Soopr

Soopr отключен в следующих файлах:
- `_config.yml` - закомментирована секция soopr
- `_layouts/default.html` - закомментирована загрузка скрипта

## URL для шаринга

- **Dzen**: `https://dzen.ru/share?url={URL}&title={TITLE}`
- **Telegram**: `https://t.me/share/url?url={URL}&text={TITLE}`

Где `{URL}` и `{TITLE}` автоматически подставляются из метаданных страницы. 