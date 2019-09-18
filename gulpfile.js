var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var tsify = require('tsify');
var fancy_log = require('fancy-log');

var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['public/src/ts/main.ts'],
  cache: {},
  packageCache: {}
}).plugin(tsify));

function bundle() {
  return watchedBrowserify
    .bundle()
    .on('error', fancy_log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/dist'));
}

gulp.task('default', bundle);
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', fancy_log);