'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

gulp.task('stylesheet', function() {
  return gulp.src('./urldecoder.scss')
    .pipe(sass())
    .pipe(cleanCSS({ debug: true }, function(details) {
      console.log(`${ details.name }: ${ details.stats.originalSize } to ${ details.stats.minifiedSize }`);
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('javascript', function() {
  return browserify('urldecoder.js')
    .bundle()
    .pipe(source('urldecoder.js'))
    .pipe(buffer())
    .pipe(uglify())
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
