'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cleanCSS = require('gulp-clean-css');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

gulp.task('stylesheet', function() {
  return gulp.src('./urldecoder.css')
    .pipe(postcss([require('precss'), require('autoprefixer')]))
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
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build'));
});

gulp.task('build', [
  'stylesheet',
  'javascript'
]);

gulp.task('watch', function() {
  gulp.watch(['./urldecoder.css', './urldecoder.js'], ['build']);
});

gulp.task('default', [
  'build',
  'watch'
]);
