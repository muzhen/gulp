var gulp = require('gulp'),
	htmlmin = require('gulp-htmlmin');
 
gulp.task('minify', function() {
  return gulp.src('dist/*.html')//压缩的对象
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('mini/'))//压缩后的文件
});
gulp.task('default', ['minify']);