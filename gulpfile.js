
const gulp = require('gulp');

const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const del = require('del')


const babel = require('gulp-babel')
const uglify = require('gulp-uglify');

const template = require('art-template');
const fs = require('fs')

// 创建一个未命名的实例
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
    gulp.watch('./src/originjs/*.js',['js']);
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
    // console.log('js compile start~~~')
    gulp.src('./src/originjs/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify()).pipe(gulp.dest('./src/js')).pipe(reload({stream: true}));
    // console.log('js compile completed~~~')
})


// 4.less 功能
gulp.task('less',function(){
    // console.log('less compile start~~')
    gulp.src('./src/less/*.less')
    .pipe(less()).pipe(autoprefixer({
        browsers: ['last 8 versions'],
        cascade: false
    })).pipe(cleanCss({compatibility:'ie8'})).pipe(gulp.dest('./src/css')).pipe(reload({stream: true}));
    // console.log('less compile completed~~')
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