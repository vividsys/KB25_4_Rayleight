# VDNH_KB25_4_Rayleight

## Начало работы ##

Для начала работы:
- Клонируйте репозиторий;
- Затем с помощью терминала/командной строки перейдите в корень каталога;
- Установите NPM;
- Создайте символическую ссылку на каталог "public/dist";
- Запустите сборку проекта.

```
cd <корень проекта> // Переход в каталог с проектом
npm install         // Установка NPM
```
```
// Создание символической ссылки на каталог "public/dist" (Windows)
mklink /d dist public\dist
```
```
// Создание символической ссылки на каталог "public/dist" (Unix)
ln -s public/dist dist
```
```
// Запуск сборки
grunt
```
```
// URL для просмотра главной
http://localhost:7700/dist/
```

Для дизайнеров необходимо создать каталог Project_Status. Каталог Project_Status содержит скомпилированный проект в текущем состоянии. 
Для просмотра скопируйте папку Project_Status на компьютер и откройте файл index.html

## Структура проекта ##

- **grunt/** 

Конфиги задач для сборки проекта. в данный момент сборка проекта настроена только на разработку.
- **public/** 

Все исходники проекта, а также каталог dist, в котором находятся файлы скомпиированного проекта.
Придерживаться строго такой структуры!!!

- **public/block/**

Блоки. Пишем разметку и стили строго по **[БЭМ методологии](https://ru.bem.info/methodology/quick-start/)**.
Один блок - один слайд. Отдельно есть блок с кнопками закрытия попапов и сайдбаров. В **common/** содержаться 
общие стили. Внимательно изучите данные файлы и придерживаться их логики. Обратите внимание, что иконки в base64, 
анимации отдельно, переменные для шрифтов и цветов отдельно. Не нужно плодить много вспомогательных миксинов и классов.
Прежде чем писать 20 миксинов с margin подумайте поймет ли вас ваш коллега и сколько времени у него уйдет на 
понимание проекта.

Все стили пишем строго на SASS (не SCSS, все CSS/SCSS файлы конвертируем в SASS). Это занимает 1 минуту времени.

Обращаю внимание, что в проекте используется Vue.js . **[Отработка кликов](https://stackoverflow.com/questions/33731939/vue-js-toggle-class-on-click)** и смена классов для показа 
попапов и сайдбаров должна быть реализована на нем. Не пишите портянки на jQuery!!! 

- **public/dist/**

Скомпилированные файлы проекта

- **public/fonts/**

Файлы шрифтов. Не подключать из интернета, только локальные.

- **public/img/**

Иконки строго в SVG, далее **[кодируем в base64](https://www.base64-image.de)**.
Все растровые изображения **[оптимизировать с помощью](https://tinypng.com)**.
Есть **[десктопные приложения](https://github.com/kyleduo/TinyPNG4Mac)**.

- **public/libs/**

Сторонние библиотеки (JS и SASS).

- **public/tpls/**

Один Pug шаблон главной. **Внимание, придерживаться разметки сделанной в шаблоне!**

- **public/video/**

Видео используемые в проекте.

- **public/app-project.js**

Весь JS пишем здесь!

- **public/app-project.sass**

Список с импортированными SASS файлами

- **public/Gruntfile.js**

Конфиг Grunt

## Git ##

Если над проектом работает более 1 разработчика, то следует коммитить часто, т.е. работать небольшими итерациями.
Пример алгоритма следующий:
```
git checkout -b feature/edit-block.title // создали новую ветку от master и перешли в неё
git add -A // сделали задачу, добавили изменения в индекс
git commit -m 'Описание коммита' // сделали коммит
git checkout master // вернулись в ветку master
git pull // затянули посл. изменения из удаленной репы
git checkout feature/edit-block.title // перешли в ветку, в которой только что работали
git push origin feature/edit-block.title:master // слили эту ветку в master в удаленный репозиторий 
git checkout master // вернулись в master 
git pull // затянули изменения
git checkout -b feature/content-blocks // создали новую локальную ветку и перешли в неё
```

## Добавление базовых анимаций ##

1) Создаем сайдбар или блок в каталоге public/block, подключаем его в app-project.sass и index.pug
2) В app-project.js объявляем переменную вида "isActivePopupSatelite5: false".
Далее там же пишем функцию вида:
```
showPopupSatelite5: function() {
    this.isActivePopupSatelite5 = !this.isActivePopupSatelite5;
}
```
3) Открываем pug файл созданного блока и в нем прописываем у корневого элемента "v-bind:class="{ 'popup-satelite-5_active': isActivePopupSatelite5 }".
Где "popup-satelite-5_active" - это класс для показа попапа/сайдбара, а isActivePopupSatelite5 - переменная.
4) Если у нас сайдбар, то в pug файле ниже есть оверлэй. На него вешаем клик "v-on:click="showSidebarGagarin", где "showSidebarGagarin" - функция, написанная в app-project.js ранее.
5) Открываем файл с которого нужно сделать показ попапа/сайдбара и в нем нужной ссылке прописываем "v-on:click="showPopupSatelite5"
6) Остался хэдер и кнопка close. Заходим в blocks/close/close.pug, прописываем кнопку по аналогии с теми, что там есть. Открываем header.pug . Для сдвига языков влево
прописываем переменную в v-bind класс у header__lang. Для того, чтобы поменять заголовок хэдера при клике на попап у header__container добавляем класс. 