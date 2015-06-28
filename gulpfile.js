'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');

gulp.task('stylesheet', function() {
  return gulp.src('./urldecoder.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build'));
});

gulp.task('javascript', function() {
  return gulp.src('urldecoder.js')
    .pipe(browserify({
      debug: false
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('build', [
  'stylesheet',
  'javascript'
]);

gulp.task('watch', function() {
  gulp.watch(['./urldecoder.scss', './urldecoder.js'], ['build']);
});

gulp.task('default', [
  'build',
  'watch'
]);
