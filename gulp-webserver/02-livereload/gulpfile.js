var gulp = require('gulp'),
  connect = require('gulp-connect'),
  less = require('gulp-less');

gulp.task('webserver', function() {
  connect.server({
    port: 80,//端口号
    host: 'gulp.dev'//主机名
    livereload: true
  });
});

//自动把 LESS 文件编译成 CSS 样式
gulp.task('less', function() {
  gulp.src('src/assets/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(connect.reload());
});

//监控器
gulp.task('watch', function() {
    gulp.watch('src/assets/less/*.less', ['less']);
})

gulp.task('default', ['less', 'webserver', 'watch']);