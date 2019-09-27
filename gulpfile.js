var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');

const bundlesConfig = [
  {
    basedir: '.',
    debug: true,
    entries: ['public/src/ts/main/main.ts'],
    destination: 'bundle.js',
    cache: {},
    packageCache: {},
    watchOn: 'public/src/ts/main/*'
  },
  {
    basedir: '.',
    debug: true,
    entries: ['public/src/ts/service worker/main.ts'],
    destination: 'sw.js',
    cache: {},
    packageCache: {},
    watchOn: 'public/src/ts/service worker/*'
  }
];

function buildBundle(options) {
  return browserify({
    basedir: options.basedir,
    debug: options.debug,
    entries: options.entries,
    cache: options.cache,
    packageCache: options.packageCache,
  })
    .plugin(tsify)
    .bundle()
    .pipe(source(options.destination))
    .pipe(gulp.dest('public'));
}

function buildBundles() {
  return bundlesConfig.map((options) => {
    return (cb) => {
      buildBundle(options);

      cb();
    };
  });
}

function watchBundles() {
  return bundlesConfig.map((options) => {
    return (cb) => {
      gulp.watch(options.watchOn, (watchCallback) => {
        buildBundle(options);

        watchCallback();
      });

      cb();
    };
  });
}

gulp.task('default', gulp.parallel(...buildBundles(), ...watchBundles()));