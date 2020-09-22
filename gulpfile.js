const gulp = require('gulp');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const twig = require('gulp-twig');
const prettier = require('gulp-prettier');
const wrap = require('gulp-wrap');

function jsMuster(template, babelConfig = {}, suffix = '') {
  return gulp.src('src/js/**/*.js')

    // template for module type
    .pipe(wrap({
      src: template,
    }))

    // es version
    .pipe(babel(babelConfig))

    // filename suffix
    .pipe(rename((pathParam) => {
      if (suffix !== '') {
        const path = pathParam;
        path.basename += `.${suffix}`;
      }
    }))

    // save normal
    .pipe(gulp.dest('dist'))

    // minify (add suffix .min)
    .pipe(uglify())
    .pipe(rename((pathParam) => {
      const path = pathParam;
      path.basename += '.min';
    }))

    // save minified
    .pipe(gulp.dest('dist'))

    // save for docs demos
    .pipe(gulp.dest('docs/js'));
}

// ES5 IIFE
function jsEs5Iife() {
  return jsMuster(
    'src/js/class-toggler-iife.jst',
    {
      presets: ['@babel/env', {
        sourceType: 'unambiguous',
      }],
    },
  );
}

// ES6 IIFE
function jsEs6Iife() {
  return jsMuster(
    'src/js/class-toggler-iife.jst',
    {},
    'es6',
  );
}

// ES6 module
function jsEsm() {
  return jsMuster(
    'src/js/class-toggler-esm.jst',
    {},
    'esm',
  );
}

function js(cb) {
  return gulp.parallel(jsEs5Iife, jsEs6Iife, jsEsm)(cb);
}

function lintJs() {
  return gulp.src(['src/js/**/*.js', '*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
}

function lint(cb) {
  return gulp.parallel(lintJs)(cb);
}

function demos() {
  return gulp.src([
    'src/demos/view/*.twig',
    '!src/demos/view/@*.twig',
  ])
    .pipe(twig({
      base: 'src/demos/view/',
    }))
    .pipe(prettier())
    .pipe(gulp.dest('docs'));
}

exports.js = js;
exports.lintJs = lintJs;
exports.lint = lint;
exports.demos = demos;
exports.build = gulp.parallel(js, demos, lint);
