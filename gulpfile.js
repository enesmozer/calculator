const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');

const { reload } = browserSync;

gulp.task('browser-sync', () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './',
    },
  });
  gulp.watch('./js/*.js').on('change', reload);
  gulp.watch('./*.html').on('change', reload);
  gulp.watch('./scss/**/*.scss', ['css']);
});

gulp.task('css', () =>
  gulp
    .src('./scss/main.scss')
    .pipe(plumber([{ errorHandler: false }]))
    .pipe(sass())
    .pipe(prefix())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
);
gulp.task('default', ['browser-sync', 'css']);
