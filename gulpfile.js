const gulp = require('gulp'); // Load Gulp!
// Now that we've installed the terser package we can require it:
const browserSync = require('browser-sync').create();
const terser = require('gulp-terser'),

    rename = require('gulp-rename');
const eslint = require('gulp-eslint');

gulp.task('scripts', function () {
    return gulp
        .src('./js/*.js') // What files do we want gulp to consume?
        .pipe(terser()) // Call the terser function on these files
        .pipe(rename({ extname: '.min.js' })) // Rename the uglified file
        .pipe(gulp.dest('./build/js')); // Where do we put the result?
});


gulp.task('watch', function () {
    gulp.watch('js/*.js', gulp.series('lint', 'scripts', 'reload'));
    gulp.watch('./*.html', gulp.series('reload'));
    gulp.watch('./css*.css', gulp.series('reload'));
    //watch Sass files, if there are any changes, run the styles task
});


gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});


gulp.task('say_hello', function (done) {
    console.log('Hello!');
    done();
});


gulp.task('lint', function () {
    return gulp
        .src('./js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});





//First run the default task, and then run scripts if any changes

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});


gulp.task('default', gulp.parallel('lint', 'scripts', 'watch', 'browser-sync'));


