
const gulp = require('gulp');

const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const del = require('del')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const template = require('art-template');
const fs = require('fs')

gulp.task('default',function(){
    console.log('Welcome to Frontend Automation!')
    gulp.watch('./src/less/*.less',['less']);
    gulp.watch('./src/originjs/*.js',['js']);
    gulp.watch('./src/originhtml/*.html',['html']);
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
    .pipe(uglify()).pipe(gulp.dest('./src/js'))
    // console.log('js compile completed~~~')
})


// 4.less 功能
gulp.task('less',function(){
    // console.log('less compile start~~')
    gulp.src('./src/less/*.less')
    .pipe(less()).pipe(autoprefixer({
        browsers: ['last 8 versions'],
        cascade: false
    })).pipe(cleanCss({compatibility:'ie8'})).pipe(gulp.dest('./src/css'))
    // console.log('less compile completed~~')
})

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