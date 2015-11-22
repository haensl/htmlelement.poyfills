(function() {
  'use strict';

  var gulp = require('gulp');
  var karma = require('karma');
  var $ = require('gulp-load-plugins')();
  var runSequence = require('run-sequence');

  var startKarma = function(done) {
    new karma.Server({
      configFile: __dirname + '/karma.conf.js'
    }, done).start();
  };

  gulp.task('default', ['tdd']);

  gulp.task('test', function(done) {
    startKarma(done);
  });

  gulp.task('tdd', function(done) {
    gulp.watch('**/*.js', ['test']);
  });

  gulp.task('jscs', function(done) {
    return gulp.src(['lib/*.js', 'spec/*.js'])
      .pipe($.jscs({fix: true}))
      .pipe($.jscs.reporter())
      .pipe($.jscs.reporter('fail'))
      .pipe($.size());
  });

  gulp.task('clean', function() {
    return require('del')('dist');
  });

  gulp.task('distribute', function(done) {
    return gulp.src('lib/*.js')
      .pipe($.uglify())
      .pipe($.rename(function(path) {
        path.basename += '.min';
      }))
      .pipe(gulp.dest('dist'))
      .pipe($.size());
  });

  gulp.task('dist', ['jscs', 'clean', 'distribute']);
})();
