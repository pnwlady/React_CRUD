var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var less = require('gulp-less');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var production = process.env.NODE_ENV === 'production';

var dependencies = [
  'alt',
  'react',
  'react-dom',
  'react-router',
  'underscore'
];

//combine all js libraries into a singler file for few http req
gulp.task('vendor', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/jquery.magific-popup.js',
    'bower_components/toastr/toastr.js'
  ]).pipe(concat('vendor.js'))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest('public/js'));
});

//compile 3rd party dependencies
gulp.task('browserify-vendor', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor .bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest('public/js'));
});
