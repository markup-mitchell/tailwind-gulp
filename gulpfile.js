const gulp = require('gulp');
const {watch} = require('gulp');
const postcss = require('gulp-postcss');

const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');
const htmlmin = require('gulp-htmlmin');

function minifyHtml() {
  return gulp.src('src/html/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'));
}

function minifyCss() {
  const plugins = [
    cssnano(),
    purgecss({
      content: ['./build/*.html']})
    ];
  return gulp.src('dist/styles.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('build/'));
}

function css() {
  const plugins = [
    tailwindcss('./tailwind.js'),
    autoprefixer({browsers: ['last 1 version']})
  ];
  return gulp.src('src/css/styles.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('dist/'));
};

function dev() {
  gulp.watch(['src/css/styles.css','src/html/**/*.html']);
};


// function watchFiles() {
//   gulp.watch('src/css/styles.css', css);
//   gulp.watch('src/html/*.html', minify);
// }

gulp.task('refresh', gulp.parallel(minifyHtml,css));

gulp.task(dev, 'refresh');

// gulp.task('build', series(minifyHtml,minifyCss))