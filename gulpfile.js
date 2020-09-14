const gulp = require('gulp');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const twig = require('gulp-twig');
const htmlbeautify = require('gulp-html-beautify');

function js() {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist'))
    .pipe(babel({
      presets: ['@babel/env', {
        sourceType: 'unambiguous',
      }],
    }))
    .pipe(uglify())
    .pipe(rename((pathParam) => {
      const path = pathParam;
      path.basename += '.min';
    }))
    .pipe(gulp.dest('dist'));
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
    ]).pipe(twig({
        base: 'src/demos/view/',
      }))
      .pipe(htmlbeautify({
        indent_size: 2,
        wrap_attributes_indent_size: 2,
      }))
      .pipe(gulp.dest('demos'));
}

exports.js = js;
exports.lintJs = lintJs;
exports.lint = lint;
exports.demos = demos;
exports.build = gulp.parallel(js, demos, lint);
