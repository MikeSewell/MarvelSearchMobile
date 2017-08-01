var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('default',function(){

})
gulp.task('scss',function(){
  return gulp.src('./')
    .pipe(sass())
    .pipe(gulp.dest('.//'))
})
