# gulp 实战
## 开发了一个监听js,less变动 压缩js,css ,es6转es5的功能
## 目前还存在的问题：
1.没有热更新，
2.单个文件改动只需要改动单个文件。
3.插件不需要被压缩等预处理。
4.公共文件抽取。
5.html压缩。
6.小图片处理。
7.删除文件处理。
8.缓存处理。
gulp.watch('js/**/*.js')  表示监控所有的js
    gulp.task('watchfile',function(){
        gulp.watch('./src/index.html',['task1'])
    })
    gulp.task('watchfile2',function(){
        gulp.watch('./src/index.html',function(){
            
        })
    })
    
    gulp.task('task1',function(){
        console.log('task1')
    })
