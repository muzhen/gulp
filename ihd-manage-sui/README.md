### mzUI
>任务复用 初步完成

### 初始化，根据package.json文件安装项目用到的gulp插件
```bash
npm install 
```
### 运行

* 下载下来，输入 gulp ,会生成src文件夹

###项目目录安排
```
mzUI(项目名称)
|–.git 
|–node_modules 本项目用到的gulp插件
|–dist 发布环境
　　|–assets
　　　　|–css 样式文件（合并 压缩）
　　　　|–images 图片文件(压缩图片)
　　　　|–js js文件(校验 合并 压缩 )
　　|–pages
　　	|-index.html 静态文件(压缩html)

|–src 生产环境
　　|–assets
　　　　|–less less文件
　　　　|–images 图片文件
　　　　|–js js文件
　　　　|–css css文件
　　|–pages 
　　　　|–components 组件 
　　　	    |–modal 弹窗文件
　　　　    |–tab tab切换文件
　　　    　|–form 表单文件
　　　    　|–table 表格文件
　　    |-include 共用页面
			|–foot 
			|–head 
			|–layout 
　　    |–test 测试
　　　　|–uidemo  
　　|–tasks 任务
　　　　|–  
　　　　|–    

|–gulpfile.js gulp任务文件

|–pacjage.json 项目信息文件

```
