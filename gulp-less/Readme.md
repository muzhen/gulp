### gulp-less
a plugin of gulp for file include

### install
```bash
npm install gulp-less  --save-dev
```
### 运行

* 下载下来，输入 gulp ,会生成src文件夹

### example

main.less
```less
@base: #f938ab;

.box-shadow(@style, @c) when (iscolor(@c)) {
  -webkit-box-shadow: @style @c;
  box-shadow:         @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div { .box-shadow(0 0 5px, 30%) }
}
```

gulpfile.js
```js
var less = require('gulp-less'),
	gulp = require('gulp');

gulp.task('less', function () {
  return gulp.src('assets/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['less']);
```

and the result is:
```html

  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
　　<h1>这是 header 的内容</h1>
  <label>haoxin</label>
<label>12345</label>
<strong>facebook.com/include</strong>
<strong>twitter.com/include</strong>
    <h1>这是 footer 的内容</h1>
</body>
</html>

```
