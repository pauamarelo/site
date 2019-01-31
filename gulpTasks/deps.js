const gulp = require('gulp')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts'])

gulp.task('deps.js', () => {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/materialize/dist/js/materialize.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-materialize/src/angular-materialize.js',
        'bower_components/angular-scroll/angular-scroll.min.js',
        'bower_components/angular-lazy-img/release/angular-lazy-img.min.js',
        'bower_components/wow/dist/wow.min.js',
        'bower_components/angularUtils-disqus/dirDisqus.js'
    ])
    .pipe(uglify())
    .pipe(concat('deps.min.js'))
    .pipe(gulp.dest('public/js'))
})

gulp.task('deps.css', () => {
    return gulp.src([
        'bower_components/materialize/dist/css/materialize.min.css',
        'bower_components/animate.css/animate.min.css',
        'bower_components/font-awesome/css/font-awesome.min.css'
    ])
    .pipe(uglifycss({ 'uglyComments': true }))
    .pipe(concat('deps.min.css'))
    .pipe(gulp.dest('public/css'))
})

gulp.task('deps.fonts', () => {
    return gulp.src([
        'bower_components/font-awesome/fonts/*.*'
    ])
    .pipe(gulp.dest('public/fonts'))
})