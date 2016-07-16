var gulp = require('gulp');
var htmlMin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var runSequence = require('run-sequence');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uuid = require('uuid');
var htmlReplace = require('gulp-html-replace');
var _ = require('lodash');

var uniqueId = uuid.v4();

gulp.task('default', function () {
    return runSequence(
        ['clean-dist'],
        ['html', 'scripts', 'styles']
    );
});

gulp.task('clean-dist', function () {
    return del('./dist/**/*');
});

gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(htmlReplace({
            js: 'wedding-website-' + uniqueId + '.js',
            css: 'wedding-website-' + uniqueId + '.css'
        }))
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function () {
    return gulp.src([
        './scripts/lib/jquery-2.2.4.js',
        './scripts/lib/bootstrap.js',
        './scripts/wedding-website.js',
    ])
        .pipe(concat('wedding-website-' + uniqueId + '.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function () {
    return gulp.src('./styles/**/*.scss')
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(concat('wedding-website-' + uniqueId + '.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(concat('wedding-website.css'))
        .pipe(gulp.dest('./styles'));
});

gulp.task('watch-styles', ['styles'], function () {
    return gulp.watch('./styles/**/*.scss', _.debounce(function () {
        runSequence(['styles']);
    }, 150));
});
