// gulp
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var argv = require('yargs').argv;
var connect = require('gulp-connect');

var paths = gulp.paths = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'test/e2e',
    unit: 'test/unit',
    deps: 'bower_components',
    run: 'run'
};

var browserSync = require('browser-sync').create();

gulp.task('connect', function () {
      connect.server({
            root: 'app/',
            port: 3000
     });
});

// Downloads the selenium webdriver
gulp.task('webdriver-update', $.protractor.webdriver_update);
gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

function runProtractor(done) {
    gulp.src(paths.e2e + '/**/*.js')
        .pipe($.protractor.protractor({
            configFile: 'test/e2e/protractor.conf.js',
            //args: ['--baseUrl', 'http://localhost:3000']
        }))
        .on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        })
        .on('end', function () {
            // Close browser sync server
            browserSync.exit();
            done();
        });
}

gulp.task('e2e', ['connect','webdriver-update'], runProtractor);

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('run', function () {
    //var routes = {
    //    '/bower_components': 'bower_components'
    //};
    browserSync.init({
        server: {
            baseDir: ["./app", 'run', 'bower_components', 'src'],
         //   routes: routes
        },
        //port: argv.port || 3000
    });
});


//gulp.task('e2e', function() {
//
//    return gulp.src(["./test/e2e/**/*.js"])
//        .pipe(protractor({
//            configFile: "test/e2e/protractor.conf.js",
//            args: ['--baseUrl', 'http://localhost:8888']
//        }))
//        .on('error', function(e) { throw e });
//
//});

