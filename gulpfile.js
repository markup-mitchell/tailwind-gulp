const gulp = require('gulp');
const postcss = require('gulp-postcss');

const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');
const htmlmin = require('gulp-htmlmin');

gulp.task('minify:html', () => {
  return gulp.src('src/html/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('minify:css', () => {
  const plugins = [
    cssnano(),
    purgecss({
      content: ['./build/*.html']})
    ];
  return gulp.src('dist/styles.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('build/'));
});

gulp.task('css', function () {
  const plugins = [
    tailwindcss('./tailwind.js'),
    autoprefixer({browsers: ['last 1 version']})
  ];
  return gulp.src('src/css/styles.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('dist/'));
});