
### gulp-file-include
a plugin of gulp for file include

### install
```bash
npm install gulp-file-include
```

### 运行

* 下载下来，输入 gulp fileinclude

### example

index.html
```html
@@include('example/resources/head.html')
@@include('example/page.html', {
  "name": "haoxin",
  "age": 12345,
  "socials": {
    "fb": "facebook.com/include",
    "tw": "twitter.com/include"
  }
})
  @@include('example/resources/foot.html')

```

head.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
　　<h1>这是 header 的内容</h1>
```

foot.html
```html
    <h1>这是 footer 的内容</h1>
</body>
</html>
```

page.html
```html
    <label>@@name</label>
    <label>@@age</label>
    <strong>@@socials.fb</strong>
    <strong>@@socials.tw</strong>
```

gulpfile.js
```js
var fileinclude = require('gulp-file-include'),
    gulp = require('gulp');
 
gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist/'));
});
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