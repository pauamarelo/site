const gulp = require('gulp')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts'])

gulp.task('deps.js', () => {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/materialize-css/dist/js/materialize.min.js',
        'node_modules/angular/angular.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-sanitize/angular-sanitize.min.js',
        'node_modules/angular-touch/angular-touch.min.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-messages/angular-messages.min.js',
        'node_modules/angular-material/angular-material.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'node_modules/angular-scroll/angular-scroll.min.js',
        'node_modules/angular-lazy-img/dist/angular-lazy-img.min.js',
        'node_modules/angular-utils-disqus/dirDisqus.js',
        'node_modules/wowjs/dist/wow.min.js',
        'node_modules/oclazyload/dist/ocLazyLoad.min.js',
        'node_modules/angular-filter/dist/angular-filter.min.js',
        'node_modules/ng-meta/dist/ngMeta.min.js',
        'node_modules/oclazyload/dist/ocLazyLoad.js'
    ])
    .pipe(uglify())
    .pipe(concat('deps.min.js'))
    .pipe(gulp.dest('public/js'))
})

gulp.task('deps.css', () => {
    return gulp.src([
        'node_modules/animate.css/animate.min.css',
        'node_modules/angular-material/angular-material.min.css',
        'node_modules/materialize-css/dist/css/materialize.min.css',
        'node_modules/font-awesome/css/font-awesome.min.css'
    ])
    .pipe(uglifycss({ 'uglyComments': true }))
    .pipe(concat('deps.min.css'))
    .pipe(gulp.dest('public/css'))
})

gulp.task('deps.fonts', () => {
    return gulp.src([
        'node_modules/font-awesome/fonts/*.*'
    ])
    .pipe(gulp.dest('public/fonts'))
})