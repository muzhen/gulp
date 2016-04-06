var gulp = require('gulp'),
	less = require('gulp-less'),//编译成css
	uglify = require('gulp-uglify'),//压缩js
  jshint = require('gulp-jshint'),//校验js
  concat = require('gulp-concat'),//拼接
  fileinclude = require('gulp-file-include'),//合并文件
  livereload = require('gulp-livereload'),//实时刷新，同步
  watch = require('gulp-watch'),
  autoprefix = require('gulp-autoprefixer');//自动补全css的前缀


//合并文件
gulp.task('fileinclude', function() {
  gulp.src(['src/pages/test/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist/pages/test/'));
});

//监听到所有与src/assets/less/*/*.less( less文件夹下的文件夹的文件)相匹配的文件的变化。
//监听到所有与src/assets/less/*.less(less文件夹下的文件)相匹配的文件的变化。
//一旦监测到变化，就会生成css并保存，然后重新加载网页
gulp.task('less', function() {
   gulp.src('src/assets/less/*.less')
      .pipe(watch("src/assets/less/*.less"))
      .pipe(less())
      .pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
      .pipe(gulp.dest('dist/assets/css/'))
      .pipe(livereload());
});

//js--校验 压缩 合并 
gulp.task('js', function () {
   return gulp.src('src/assets/js/*/*.js')
      .pipe(jshint())//校验语法
      .pipe(jshint.reporter('default'))
      .pipe(uglify())//压缩js
      .pipe(concat('mz.min.js'))//合并成一份
      .pipe(gulp.dest('dist/assets/js/'));//生成目录
});


//监控器
gulp.task('watch', function() {
    gulp.watch('src/pages/test/*.html', ['fileinclude']);
    gulp.watch('src/assets/less/*.less', ['less']);
    gulp.watch('src/assets/js/*/*.js', ['js']);
})

gulp.task('default', ['fileinclude','less','js', 'watch']);