const gulp = require('gulp');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

function js() {
  return gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env', {
        sourceType: 'unambiguous',
      }],
    }))
    .pipe(gulp.dest('dist'))
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

exports.js = js;
exports.lintJs = lintJs;
exports.lint = lint;
exports.build = gulp.parallel(js, lint);
