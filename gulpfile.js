//Loading Gulp Plugins
//Load in all the Gulp plugins by including the following code in the Gulp file:
'use strict';

const { series } = require('gulp');
var gulp = require('gulp'),
   sass = require('gulp-sass'),
   browserSync = require('browser-sync'),
   del = require('del'),
   imagemin = require('gulp-imagemin'),
   uglify = require('gulp-uglify'),
   usemin = require('gulp-usemin'),
   rev = require('gulp-rev'),
   cleanCss = require('gulp-clean-css'),
   flatmap = require('gulp-flatmap'),
   htmlmin = require('gulp-htmlmin');


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

// Clean
gulp.task('clean', function () {
   return del(['dist']);
});

gulp.task('copyfonts', async function () {
   gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eot,svg}')
      .pipe(await gulp.dest('./dist/fonts'));
});

// Images
gulp.task('imagemin', function () {
   return gulp.src('img/*.{png,jpg,gif}')
      .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
      .pipe(gulp.dest('dist/img'));
});

//We configure the usemin and the build task as follows:
gulp.task('usemin', gulp.series(function() {
   return gulp.src('./*.html')
   .pipe(flatmap(function(stream, file){
       return stream
         .pipe(usemin({
             css: [ rev() ],
             html: [ function() { return htmlmin({ collapseWhitespace: true })} ],
             js: [ uglify(), rev() ],
             inlinejs: [ uglify() ],
             inlinecss: [ cleanCss(), 'concat' ]
         }))
   }))
   .pipe(gulp.dest('dist/'));
 }));
 
 gulp.task('build', gulp.series(['clean']), function() {
     gulp.start('copyfonts','imagemin', 'usemin');
 });