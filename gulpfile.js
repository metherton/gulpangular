// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8888
  });
});

var protractor = require("gulp-protractor").protractor;

gulp.task('e2e', function() {

    return gulp.src(["./test/e2e/**/*.js"])
        .pipe(protractor({
            configFile: "test/e2e/protractor.conf.js",
            args: ['--baseUrl', 'http://localhost:8888']
        }))
        .on('error', function(e) { throw e });

});

