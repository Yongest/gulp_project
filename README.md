# gulp 实现一个企业级前端架构
### 主要功能：
1. es6转es5，js压缩，
2. less,css前缀，css压缩
3. html 公共模板抽取。
4. 浏览器热更新，
5. html 压缩
6. 
### 目前还存在的问题：
1. 一键处理命令
2. 单个文件改动只需要改动单个文件。
3. 插件不需要被压缩等预处理。
5. html压缩。
6. 小图片处理。
7. 删除文件处理。
8. 缓存处理。

    
### 具体代码如下：
	    const gulp = require('gulp');
	
	   	// 对css进行less预处理，压缩，前缀
	    const less = require('gulp-less');
	    const cleanCss = require('gulp-clean-css');
	    const autoprefixer = require('gulp-autoprefixer');
	
	    //删除文件模块
	    const del = require('del')
	
	    //对js进行处理，压缩，转es5
	    const babel = require('gulp-babel')
	    const uglify = require('gulp-uglify');
	    //html 公共模板继承
	    const template = require('art-template');
	    const fs = require('fs')
	
	    // 文件热更新
	    const browserSync = require('browser-sync').create()
	    const reload =  browserSync.reload;
	
	    // 静态服务器
	    gulp.task('server', function() {
	        browserSync.init({
	            server: {
	                baseDir: "./",
	                index:'./src/index.html'
	            },
	            port:8080
	        });
	        gulp.watch("./src/less/*.less", ['less']);
	        gulp.watch('./src/originhtml/*.html',['html']);
	        gulp.watch('./src/originjs/*.js',['js']);
	        gulp.watch("./src/*.html").on('change', reload);
	    });
	
	
	    gulp.task('default',function(){
	        console.log('Welcome to Frontend Automation!')
	        // gulp.watch('./src/less/*.less',['less']);
	       // gulp.watch('./src/originjs/*.js',['js']);
	        // gulp.watch('./src/originhtml/*.html',['html']);
	    })
	
	    // 2.删除
	    gulp.task('del',function(){
	        del([
	            './src/css/*.css'
	        ])
	    })
	
	    // 3.js
	    gulp.task('js',function(){
	    
	        gulp.src('./src/originjs/*.js')
	        .pipe(babel({
	            presets: ['@babel/env']
	        }))
	        .pipe(uglify()).pipe(gulp.dest('./src/js')).pipe(reload({stream: true}));
	        
	    })
	
	
	    // 4.less 功能
	    gulp.task('less',function(){
	       
	        gulp.src('./src/less/*.less')
	        .pipe(less()).pipe(autoprefixer({
	            browsers: ['last 8 versions'],
	            cascade: false
	        })).pipe(cleanCss({compatibility:'ie8'})).pipe(gulp.dest('./src/css')).pipe(reload({stream: true}));
	        
	    })
	    // 5.实现HTML模板继承功能
	    gulp.task('html',function(){
	
	        let filename = fs.readdirSync("./src/originhtml");
	        filename.forEach(v=>{
	            let html = template(__dirname+'/src/originhtml/'+v,{})
	            // console.log(html)
	            fs.writeFile(__dirname+'/src/'+v, html,(err)=>{
	                console.log(err)
	            });
	        })
	
	    })