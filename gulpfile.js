import { task, watch, src, dest } from 'gulp';

import sass from 'gulp-sass';
import prefix from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';

const browserSync = require('browser-sync').create();

const { reload } = browserSync;

task('browser-sync', () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './',
    },
  });
  watch('./js/*.js').on('change', reload);
  watch('./*.html').on('change', reload);
  watch('./scss/**/*.scss', ['css']);
});

task('css', () =>
  src('./scss/main.scss')
    .pipe(plumber([{ errorHandler: false }]))
    .pipe(sass())
    .pipe(prefix())
    .pipe(dest('./'))
    .pipe(browserSync.stream())
);
task('default', ['browser-sync', 'css']);
