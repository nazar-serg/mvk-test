# MVK Test - WordPress Custom Theme & Blocks

Полнофункциональная WordPress тема с кастомными Gutenberg блоками и современным адаптивным дизайном.

## 🚀 Особенности

### 🎨 Кастомная тема "Theme"
- **Адаптивный header** с burger меню для мобильных устройств
- **Стильный footer** с градиентным фоном и анимациями
- **Система случайных брендов** с JavaScript API
- **Мобильная адаптивность** - Mobile-first подход
- **Современные анимации** и плавные переходы

### 🧱 Кастомные Gutenberg блоки
- **Hero Section** - Главный баннер с заголовком и подзаголовком
- **Testimonial** - Блок отзывов с ID поддержкой
- **Полная интеграция** с WordPress Block Editor

### ⚡ Технические особенности
- **JavaScript API** для динамической загрузки брендов
- **PHP endpoints** для данных
- **Webpack сборка** для блоков
- **SVG логотипы** для четкого отображения
- **CSS Grid/Flexbox** для современной верстки

## 📁 Структура проекта

```
wp-content/
├── themes/
│   └── theme/                 # Основная тема
│       ├── header.php         # Адаптивный header
│       ├── footer.php         # Gradient footer
│       ├── style.css          # Основные стили
│       ├── functions.php      # WordPress функции
│       ├── js/
│       │   ├── script.js      # Burger меню
│       │   └── random-brand.js# Система брендов
│       ├── api/
│       │   └── random-brand.php# API endpoint
│       └── assets/
│           └── logos/         # Логотипы брендов
└── plugins/
    └── custom-block-collection/# Кастомные блоки
        └── blocks/
            ├── hero/          # Hero Section блок
            └── testimonial/   # Testimonial блок
```

## 🛠 Установка

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/nazar-serg/mvk-test.git
   ```

2. **Активируйте тему:**
   - Перейдите в WordPress Admin → Внешний вид → Темы
   - Активируйте тему "Theme"

3. **Активируйте плагин:**
   - Перейдите в WordPress Admin → Плагины
   - Активируйте "Custom Block Collection"

4. **Соберите блоки (если нужно):**
   ```bash
   cd wp-content/plugins/custom-block-collection/blocks/hero
   npm install && npm run build
   ```

## 📱 Адаптивность

### Мобильные устройства (до 768px)
- Burger меню с анимированными линиями
- Вертикальное расположение элементов
- Оптимизированные размеры шрифтов

### Планшеты (768px - 1024px)
- Промежуточные размеры элементов
- Адаптивная сетка

### Десктоп (1024px+)
- Полное горизонтальное меню
- Максимальные размеры контента

## 🎨 Дизайн системы

### Цветовая палитра
- **Primary:** #2c3e50
- **Accent:** #3498db
- **Gradient:** linear-gradient(135deg, #667eea 0%, #764ba2 100%)

### Типографика
- **Заголовки:** Arial, sans-serif
- **Основной текст:** Arial, sans-serif
- **Адаптивные размеры:** от 14px до 24px

## 🔧 JavaScript API

### Система случайных брендов
```javascript
// Автоматическая загрузка при загрузке страницы
document.addEventListener('DOMContentLoaded', loadRandomBrand);

// API endpoint
fetch('/wp-content/themes/theme/api/random-brand.php')
```

## 📝 Кастомные блоки

### Hero Section
```php
// Регистрация блока
register_block_type('custom/hero', array(
    'editor_script' => 'hero-block-editor',
    'editor_style' => 'hero-block-editor',
    'style' => 'hero-block'
));
```

### Testimonial
```php
// Блок с ID поддержкой
<div id="testimonial" class="testimonial-block">
    // Контент отзыва
</div>
```

## 🚀 Производительность

- **Минифицированные файлы** в продакшене
- **Оптимизированные изображения**
- **Ленивая загрузка** для брендов
- **Кеширование** WordPress

## 🔄 Обновления

### Версия 1.0.0
- Начальный релиз
- Hero Section и Testimonial блоки
- Адаптивная тема с burger меню
- Система случайных брендов

## 👨‍💻 Разработка

Для локальной разработки:

1. **WordPress окружение** (XAMPP/MAMP)
2. **Node.js** для сборки блоков
3. **Git** для версионирования

## 📞 Поддержка

Если у вас есть вопросы или предложения:
- Создайте Issue в этом репозитории
- Отправьте Pull Request с улучшениями

## 📄 Лицензия

Этот проект создан для демонстрации возможностей WordPress разработки.

---

**Создано с ❤️ для демонстрации современной WordPress разработки**
