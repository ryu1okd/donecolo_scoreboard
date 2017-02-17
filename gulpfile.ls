require! <[gulp gulp-webserver]>

gulp.task \webserver ->
  gulp.src \.
    .pipe gulp-webserver do
      host: \0.0.0.0
      port: 8000
      livereload: true
