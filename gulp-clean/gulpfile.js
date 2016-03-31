var gulp = require('gulp'),
    clean = require('gulp-clean');
 
gulp.task('clean', function () {
	return gulp.src('assets/*', {read: false})
		.pipe(clean());
});

gulp.task('default', ['clean']);