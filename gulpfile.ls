require! <[gulp gulp-webserver]>

gulp.task \webserver ->
  gulp.src \.
    .pipe gulp-webserver do
      host: \localhost
      port: 8000
      livereload: true
