var less = require('gulp-less'),
	gulp = require('gulp');

gulp.task('less', function () {
  return gulp.src('assets/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['less']);