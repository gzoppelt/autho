var gulp = require('gulp'),
    //sass = require('gulp-ruby-sass'),
    //autoprefixer = require('gulp-autoprefixer'),
    //minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    //uglify = require('gulp-uglify'),
    //imagemin = require('gulp-imagemin'),
    //rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    //cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

var PATHS = {
    src: 'src/**/*.ts'
};

gulp.task('clean', function (done) {
    del(['dist'], done)
        .pipe(notify({message: 'gulp task clean completed'}));
});
/*
gulp.task('styles', function () {
    return sass('** /*.scss', {style: 'expanded'})
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({message: 'Task styles completed.'}))
    ;
});
*/
gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src(PATHS.src)
        .pipe(typescript(tscConfig.compilerOptions))
    ;

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
    gulp.src('src/*.html')
    //do all the stuff here: minification, ...
        .pipe(gulp.dest('dist'))
    ;
});

gulp.task('play', ['ts2js'], function () {
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src, ['ts2js']);

    app = connect().use(serveStatic(__dirname));
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

gulp.task('default', ['play']);
