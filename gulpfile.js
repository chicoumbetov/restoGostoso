//Loading Gulp Plugins
//Load in all the Gulp plugins by including the following code in the Gulp file:
'use strict';

const { series } = require('gulp');
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

//Adding Gulp Tasks for SASS and Browser-Sync
//Next, we will add the code for the SASS task, the Browser-Sync task and the default task as follows:
 
gulp.task('sass', function () {
    return gulp.src('./css/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));
  });
  
  gulp.task('sass:watch', function () {
    gulp.watch('./css/*.scss', (done) => {
        gulp.series(['sass'])(done);
    });
  });
  
  gulp.task('browser-sync', function () {
     var files = [
        './*.html',
        './css/*.css',
        './img/*.{png,jpg,gif}',
        './js/*.js'
     ];
  
     browserSync.init(files, {
        server: {
           baseDir: "./"
        }
     });
  
  });
  
  // Default task
gulp.task('default', gulp.series(['browser-sync', 'sass:watch']));
  