"use strict";

var gulp        = require('gulp'),
    del         = require('del'),               // Удаление файлов или очистка папок
    concat      = require('gulp-concat'),       // Сбор нескольких файлов в один
    uglify      = require('gulp-uglify'),       // Сжатие js-файлов
    minify      = require('gulp-minify-css'),   // Сжатие css-файлов
    resize      = require('gulp-image-resize'), // Обрезка изображений
    spritesmith = require('gulp.spritesmith');  // Сборка спрайтов

// Очищаем папку res
gulp.task('clear', function (cb) {
  del('./res/**/*', cb);
});

// Создаем спрайты из картинок
gulp.task('sprite', ['clear'], function() {
  var spriteData =
    gulp.src('./dev/img/*.*')   // Путь, откуда берем картинки для спрайта
      .pipe(spritesmith({
        imgName: 'sprite.png',  // Название исходного файла картинки
        cssName: 'all.css',     // Название исходного файла стилей
        padding: 1,             // Отступ между картинками
      }));

    spriteData.img.pipe(gulp.dest('./res/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./res/css/')); // путь, куда сохраняем стили
});

// Собираем все js и сжимаем
gulp.task('js', ['clear'], function () {
  return gulp.src(['./dev/js/*'])
    .pipe(concat('*.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./res/js/'));
});

// Собираем все css и сжимаем
gulp.task('css', function () {
  return gulp.src('./dev/css/*.css')
    .pipe(concat('app.css'))
    .pipe(minify())
    .pipe(gulp.dest('./res/css/'));
});
