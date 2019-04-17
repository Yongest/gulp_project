
var gulp = require('gulp');

var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var del = require('del')
var babel = require('gulp-babel')
var uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('default',function(){
    console.log('Welcome to Frontend Automation!')
    gulp.watch('./src/less/*.less',['less']);
    gulp.watch('./src/originjs/*.js',['js']);
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

