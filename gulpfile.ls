require! <[gulp gulp-webserver gulp-pug gulp-exec]>

gulp.task \webserver ->
  gulp.src \.
    .pipe gulp-webserver do
      host: \0.0.0.0
      port: 8000
      livereload: true

gulp.task \copy_js ->
  gulp.src <[
    bower_components/jquery/dist/jquery.min.js
    bower_components/prelude-ls/browser/prelude-browser-min.js
    node_modules/riot/riot.min.js
  ]>
    .pipe gulp.dest \lib/js

gulp.task \copy_materialize ->
  gulp.src <[
    bower_components/materialize/dist/fonts/**/*
    bower_components/materialize/dist/js/*
    bower_components/materialize/dist/css/*
  ]>, base:'bower_components/materialize/dist/'
    .pipe gulp.dest \lib

gulp.task \riot !->
  gulp.src \src/tags
    .pipe gulp-exec 'riot --ext pug --template pug src/tags app/tags'

gulp.task \pug1 ->
  gulp.src \index.pug
    .pipe gulp-pug!

gulp.task \pug2 ->
  gulp.src \src/index.pug
    .pipe gulp-pug!
    .pipe gulp.dest \app

gulp.task \pug3 ->
  gulp.src \src/templates
    .pipe gulp-pug!
    .pipe gulp.dest \app/templates

gulp.task \pug, <[pug1 pug2 pug3]>

gulp.task \build, <[copy_materialize copy_js riot pug]>

gulp.task \watch, !->
  gulp.watch <[src/tags/**/*.pug src/tags/**/*.ls]>, <[riot]>
  gulp.watch <[src/templates/*.pug]>, <[pug3]>
  gulp.watch <[src/index.pug]>, <[pug2]>
  gulp.watch <[index.pug]>, <[pug1]>

