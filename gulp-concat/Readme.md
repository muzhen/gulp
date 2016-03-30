# gulp-concat 
> Concatenates files


## 安装

```sh
npm i gulp-concat --save-dev
```

## 运行
> 输入 gulp 运行， 生成dist文件夹,里面是合并的js文件

## 例子

新建head.js
```js

//注解
alert('head');

```

新建page.js
```js

console.log('page');

```


任务
```js
var gulp = require('gulp'),
  concat = require('gulp-concat');
 
gulp.task('scripts', function() {
  return gulp.src('example/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['scripts']);

```

result
```html

console.log('page');
//注解
alert('head');

```
