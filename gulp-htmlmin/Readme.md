# gulp-htmlmin 
> gulp plugin to minify HTML.


## 安装

```sh
npm i gulp-htmlmin --save-dev
```

## 运行
> 输入 gulp 运行， 生成压缩后的mini文件夹

## 例子

index.html
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

任务
```js
var gulp = require('gulp'),
	htmlmin = require('gulp-htmlmin');
 
gulp.task('minify', function() {
  return gulp.src('dist/*.html')//压缩的对象
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('mini/'))//压缩后的文件
});
gulp.task('default', ['minify']);

```
result
```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body><h1>这是 header 的内容</h1><label>haoxin</label><label>12345</label><strong>facebook.com/include</strong> <strong>twitter.com/include</strong><h1>这是 footer 的内容</h1></body></html>
```
