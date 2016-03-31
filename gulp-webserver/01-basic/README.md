#gulp-webserver-article
======================
>配置一个本地 web 服务器

#运行
> gulp , 然后可以在浏览器中打开 localhost:8080, 就能看到 index.html 的内容
```
gulp

```

任务
```js
var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('webserver', function() {
  connect.server();
});

gulp.task('default', ['webserver']);

```