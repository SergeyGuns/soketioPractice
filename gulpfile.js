const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('server', ['css','html','js'], () => {

  browserSync.init({
    server: './public'
  });

  gulp.watch('src/*.css', ['css']);
  gulp.watch('src/*.js', ['js']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch('public/*.*').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('css', () => {
  return gulp.src('src/*.css')
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.stream());

});


gulp.task('js', () => {
  return gulp.src('src/*.js')
    .pipe(gulp.dest('public/'))
})


gulp.task('html', ()=> {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('public/'))
})

gulp.task('default', ['server']);
