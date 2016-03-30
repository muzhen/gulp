var gulp = require('gulp'),
	concat = require('gulp-concat');
 
gulp.task('scripts', function() {
  return gulp.src('example/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['scripts']);
