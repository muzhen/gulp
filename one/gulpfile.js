
var gulp = require('gulp'),
    fileinclude = require('gulp-file-include');
 
gulp.task('fileinclude', function() {
  gulp.src(['src/pages/uidemo/btn.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist/pages/'));
});

 

gulp.task('default', ['fileinclude']);