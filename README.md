# gulp 实战
## 开发了一个监听js,less变动 压缩js,css ,es6转es5的功能

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