
var gulp = require('gulp'),
    fileinclude = require('gulp-file-include');
 
gulp.task('fileinclude', function() {
  gulp.src(['src/pages/uidemo/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist/pages/'));
});

 
//监控器
gulp.task('watch', function() {
    gulp.watch('src/pages/uidemo/*.html', ['fileinclude']);
})

gulp.task('default', ['fileinclude', 'watch']);