const gulp = require('gulp');
const {watch} = require('gulp');
const postcss = require('gulp-postcss');

const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');
const htmlmin = require('gulp-htmlmin');

// +++++++++++++++//
// BUILD FOR DEV //
// +++++++++++++++//

// No real reason to minify into the dev build but it gets the files there without adding gulp-copy as another dep

function minifyHtml() {
  return gulp.src('src/html/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'))
    .pipe(gulp.dest('build/'));
}

// This unpacks the styles.css file into a master CSS containing all the tailwind classes and any custom CSS added to the sheet

function css() {
  const plugins = [
    tailwindcss('./tailwind.js'),
    autoprefixer({browsers: ['last 1 version']})
  ];
  return gulp.src('src/css/styles.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('dist/'));
};

// +++++++++++++++//
// BUILD FOR PROD //
// +++++++++++++++//


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

function dev() {
  gulp.watch(['src/css/styles.css','src/html/**/*.html']);
};

gulp.task('html', minifyHtml);
gulp.task('css', minifyCss);

gulp.task('refresh', gulp.parallel(minifyHtml,css));

gulp.task(dev, 'refresh');


// gulp.task('build', series(minifyHtml,minifyCss))