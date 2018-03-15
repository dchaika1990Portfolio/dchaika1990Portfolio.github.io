Basic gulp-scss template
=====================

### Возможности
1. Компиляция из scss в css
2. Минификация css
3. Добавление вендорных префиксов в css
4. Автоматическое обновление браузера
5. Минификация и конкатенация JavaScript
6. Оптимизация картинок
7. Создание спрайтов


**Процесс установки.**

1. Клонируем репозиторий
```js
git clone https://github.com/dmgame/template.git
```
2. Перейдите в склонированную папку или откройте е в редакторе кода
```js
cd template
```

3. Разворачивание проекта (установка всех модулей). У вас должен быть установлен nodejs и gulp глобально
```js
 npm up
```
---
**Запуск gulp**

1. Запуск gulp. Запустится таск default
```js
 gulp
```
---
***Установка gulp глобально `(если он не установлен)`***
1. Установите nodejs по ссылке [Nodejs](https://nodejs.org/uk/)

2. Установите gulp глобально
```js
npm i gulp -g
```
---
***Привяжите к своему репозиторию***
1. Создайте новый репозиторий на github

2. Подвяжите текущий template к своему репозиторию
```js
git remote set-url origin "ссылка на ваш репозиторий"
```
---


**Структура папок**

Название папок  | Содержание файла
----------------|----------------------
app             | Директория с готовым проектом
app/css         | Готовые стили к продакшену
app/js          | Готовый js к продакшену
app/img         | Готовые картинки к продакшену
app/fonts       | Шрифты
src             | Директория с исходными файлыми
src/css         | Исходные стили, здесь мы пишем наши стили и они будут конвертироваться в app/css
src/img         | Исходные картинки, они будут минифицироваться и перегоняться в app/img
src/js          | Исходный js будет минифицироваться и переносится в app/js
src/sprite      | Папка для нарезанных картинок под будущие спрайты, после конветрации попадут в app/img

---
**Используемые по модули**

```js
var gulp         = require('gulp'), // Подключаем Gulp
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    spritesmith = require('gulp.spritesmith'), // Подключение библиотеки для создания спрайтов
    merge = require('merge-stream');

```
**Все таски gulp file**


```js

gulp.task('css', function(){ // Создаем таск Sass
    return gulp.src('src/css/**/*.css') // Берем источник
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('sass', function () {
    gulp.src('src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'))
}) ;

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('sprite', function () { // Создаем таск sprite
    var spriteData = gulp.src('src/sprite/*.png').pipe(spritesmith({ // Настройка спрайта
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));
    // return spriteData.pipe(gulp.dest('app/img/')); // выгружаем спрайты в папку img
    var imgStream = spriteData.img
        .pipe(gulp.dest('app/img/'));

    var cssStream = spriteData.css
        .pipe(gulp.dest('src/css/'));

    return merge(imgStream, cssStream);
});


gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('plugins.min.js')) // Собираем их в кучу в новом файле plugins.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('css-libs', ['css'], function() {
    return gulp.src('app/css/style.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync', 'css', 'scripts', 'sprite', 'sass'], function() {
    // gulp.watch('src/css/**/*.css', ['css']); // Наблюдение за css файлами в папке css
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/sprite/*.png', ['sprite']); // Наблюдение за папкой с картинками для спрайтов  папке sprite
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
    gulp.watch('app/js/**/*.js', ['scripts']);   // Наблюдение за JS файлами в папке js
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('app/img')); // Выгружаем на продакшен
});


gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);

```

---

Спецификация к проекту "Dashboard"
-------------------------------

#### Подключаемые плагины
+ **Formstayler** - плагин для стилизации элементов форм;
+ **Datepicker** - форма для выбора даты;
+ **Chart.js** - график;
+ **jQuery.bPopup.js** - плагин для модальноо окна;
+ **jQuery.Scrollbar** - плагин для стилизации скрола;
+ **jQuery UI Slider** - стилизация слайдера;
+ **Loader** - плагин для стилизации загрузки.
---
#### Default Classes
+ **.text-bold** - обладает свойством *font-weight: 700*;
+ **.text-center** - обладает свойством *text-align: center*;
+ **.text-right** - обладает свойством *text-align: right*;
+ **.title-margin** - обладает свойством *margin-bottom: 35px*;
+ **text-alarm** - обладает свойствами *color: #ff0000; text-transform: uppercase*;
+ **.fixed-to-top** - обладает свойствами *position: fixed; z-index: 99; top: 0*;
+ **.flex-container** - обладает свойством *display: flex*;
+ **.align-items-center** - обладает свойством *align-items: center*;
+ **.justify-content-sb** - обладает свойством *justify-content: space-between*;
+ **.flex-column** - обладает свойством *flex-direction: column*;
+ **.border** - обладает свойством *border-right: 1px solid $lightGrey*
---
#### Default components
+ **.section-title** - задает свойства для основных заголовков;
+ **.page-title** - задает заголовкам заглавные литеры;
+ **.page-title.small-title** - заголовок с меньшим шрифтом;
+ **#Loader** - стилизация загрузчика;
+ **.link** - стилизация ссылок;
+ **.btn** - стилизация кнопок;
+ **.icon** - стилизация иконок;
+ **.table** - стилизация таблицы;
+ **.pagination** - стилизация пагинации;
+ **.circle** - стилизация кругов для табов;
+ **.chart** - стилизация табов;
+ **.form-control** - стилизация форм;
+ **.datepicker-form** - стилизация формы выбора даты;
+ **.notification** стилизация уведомлений;
+ **.container-fluid** - создаем контейнер с одинаковыми отступами для размещения в него основного контента;
+ **.container-sm** - специальный контейнер с меньшой шириной;
+ **.row** - служит для оступов по краям;
+ **.header** - стилизация шапки;
+ **.aside** - стилизация бокового меню;
+ **.content-wrapper** - основные свойства для блоков, на которых будет размещатся основной контент;
+ **.modal** - модальное окно;
---
#### Используемые переменные
##### Font var
+ $fontFamily: 'Roboto', sans-serif;
+ $fontLight: 300;
+ $fontRegular: 400;
+ $fontMedium: 500;
+ $fontBold: 700;
+ $LineHeight: 1;
+ $fontSize: 14px;

##### Color var
+ $black: #333;
+ $darkGrey: #979797;
+ $grey: #bababa;
+ $lightGrey: #e3e3e3;
+ $xsLightGrey: #f5f5f2;
+ $orange: #f58220;
+ $orangeLight: #ffa200;
+ $green: #04ae00;
+ $lightGgreen: #74b67a;
+ $xsLightGgreen: #96cc9b;
+ $red: #ff0000;
+ $pink: #de5252;
+ $lightPink: #ec7171;
+ $blue: #56819f;

##### Default padding
+ $defaultIndent: 18px;

##### LINK component
+ $linkColor: #56819f;
+ $linkHoverColor: #ffa200;
+ $linkFontSizeDefault: 13px;
+ $linkLargeFont: 16px;

##### TITLE component
+ $titleColor: #a6a6a6;
+ $titleFontSize: 16px;
+ $smallTitleFontSize: 14px;

##### Btn component
+ $btnFontSize: 18px;
+ $btnDefaultColor: #fff;
+ $btnDefaultBg: $darkGrey;
+ $btnDefaultBgHover: $grey;
+ $btnActionBg: $orange;
+ $btnActionBgHover: $orangeLight;
+ $btnDisabledBg: $lightGrey;
+ $btnDisabledBgHover: $lightGrey;

##### Table component
+ $tableFontSize: 13px;
+ $tableTrHover:#f1f3f3;

##### Tabs component
+ $tabsCircleGreenBG: #59b66d;
+ $tabsCircleBlueBG: #80bfca;
+ $tabsCircleOrangeBG: #ff9a38;

##### Aside component
+ $asideBG: #191919;
+ $asideWidth: 188px;

##### Sidebar
+ $sidebarMobileWidth: 60px;