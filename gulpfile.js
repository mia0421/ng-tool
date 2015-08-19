var gulp       = require('gulp'),
    uglify     = require('gulp-uglify'),
    concat     = require('gulp-concat'),
    notify     = require('gulp-notify'),
    browserify = require('browserify'),
    connect    = require('gulp-connect'),
    sass       = require('gulp-sass'),
    minifyCss  = require('gulp-minify-css'),
    plumber    =require('gulp-plumber'),
    babelify  = require('babelify'),
    source = require('vinyl-source-stream'),
    browserifyCss = require('browserify-css');

var path = {
  All: ['src/**/*.+(scss|css)','main.scss','src/**/*.js' ,'src/ngToolapp.js', 'app.js', 'index.html', 'view/**/*.html'],
  Js : ['app.js'],
  Css: ['src/**/*.+(scss|css)','main.scss'],
  library:['library/*.js'],
  Html:['index.html', 'view/*.html', 'src/**/*/html'],
  DEST_BUILD: 'build'
};

/*建立網站*/
gulp.task('startServer',function(){
  connect.server({
    port:6952,
    livereload:true
  });
});

gulp.task('closeServer',function(){
  connect.serverClose();
});

gulp.task('librartTool',function(){
  gulp.src(path.library)
  .pipe(plumber())
  .pipe(concat('librar.min.js'))
  .pipe(gulp.dest(path.DEST_BUILD));
})

gulp.task('srcTool',function () {
    //browserify 取得 import 的檔案
     browserify(path.Js)
    //es6 to es5 (也可寫在package.json)
     // "browserify": {
  //   "transform": ["babelify"]
  // },
  .transform(browserifyCss)
    .transform(babelify)

    .bundle()

    .pipe(plumber())
     //取得及已經轉es5的檔案轉成實體檔案
    .pipe(source('app.min.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest(path.DEST_BUILD))
   /*當執行到此處重整頁面*/
    .pipe(connect.reload())
    .pipe(notify({ message: 'js完成' }));
});

gulp.task('cssTool',function() {
   gulp.src(path.Css)

  .pipe(plumber())

  .pipe(sass())

    /*打包成一個新的檔案*/
  .pipe(concat('main.min.css'))

    /*壓縮他
  .pipe(minifyCss())*/

    /*建立在這個位置下*/
  .pipe(gulp.dest(path.DEST_BUILD))

  .pipe(notify({ message: 'css完成' }));

});


gulp.task('watch',function(){
    /*某個目录及其所有子目录中的所有后缀名为js的文件*/
    gulp.watch(path.All,['srcTool','cssTool'])
})

gulp.task('default',['startServer','librartTool','srcTool','cssTool','watch']);

